import { Router } from 'express';
import { parseGithubUrl, getRepoInfo, getRepoTree, filterSupportedFiles, fetchMultipleFiles } from '../services/githubFetcher.js';
import { extractImports, countLines } from '../services/codeAnalyzer.js';
import { buildGraph, getHighImpactFiles } from '../services/graphBuilder.js';
import { classifyNodes } from '../services/classifier.js';
import { generateSummaries } from '../services/aiSummary.js';
import { generateOnboardingPath } from '../services/onboardingPath.js';

const router = Router();

router.post('/', async (req, res) => {
  const { repoUrl, githubToken, openaiKey } = req.body;

  if (!repoUrl) return res.status(400).json({ error: 'repoUrl is required' });

  try {
    // 1. Parse URL
    const { owner, repo } = parseGithubUrl(repoUrl);
    console.log(`[Analyze] Starting: ${owner}/${repo}`);

    // 2. Get repo info + file tree
    const token = githubToken || process.env.GITHUB_TOKEN || '';
    const aiKey = openaiKey || process.env.OPENAI_API_KEY || '';

    const repoInfo = await getRepoInfo(owner, repo, token);
    const tree = await getRepoTree(owner, repo, repoInfo.defaultBranch, token);

    const branch = repoInfo.defaultBranch;
    const supported = filterSupportedFiles(tree);
    console.log(`[Analyze] Found ${supported.length} supported files`);

    // 3. Fetch file contents
    const filesWithContent = await fetchMultipleFiles(owner, repo, branch, supported, token);

    // 4. Extract imports per file
    const analyzedFiles = filesWithContent.map(f => ({
      ...f,
      imports: extractImports(f.content, f.path),
      loc: countLines(f.content),
    }));

    // 5. Build graph
    const { nodes, edges } = buildGraph(analyzedFiles);

    // 6. Classify nodes
    classifyNodes(nodes);

    // 7. Generate summaries
    const contentMap = new Map(filesWithContent.map(f => [f.path, f.content || '']));
    await generateSummaries(nodes, contentMap, aiKey);

    // 8. Onboarding path
    const onboardingPath = generateOnboardingPath(nodes, edges);

    // 9. High impact files
    const highImpactFiles = getHighImpactFiles(nodes);

    // Strip content from response (large)
    const cleanNodes = nodes.map(n => ({
      id: n.id, label: n.label, path: n.path, ext: n.ext,
      loc: n.loc, type: n.type, summary: n.summary,
      impactScore: n.impactScore,
      dependents: n.dependents,
      resolvedDeps: n.resolvedDeps,
    }));

    console.log(`[Analyze] Done. ${nodes.length} nodes, ${edges.length} edges`);

    res.json({
      repoName: `${owner}/${repo}`,
      repoInfo,
      nodes: cleanNodes,
      edges,
      onboardingPath,
      highImpactFiles,
    });

  } catch (err) {
    console.error('[Analyze Error Detail]', err);
    const status = err.response?.status || (err.message.includes('Invalid GitHub URL') ? 400 : 500);
    let message = err.message;

    if (status === 404) {
      message = 'Repository not found. Please check the URL.';
    } else if (status === 403) {
      message = 'GitHub rate limit exceeded. Please provide a GitHub token.';
    } else if (status === 409) {
      message = 'This repository appears to be empty (no commits yet).';
    }

    res.status(status === 400 || status === 404 || status === 403 || status === 409 ? status : 500).json({ 
      error: message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

export default router;
