import axios from 'axios';
import path from 'path';

const SUPPORTED_EXTENSIONS = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
  '.py', '.java', '.go', '.rs', '.rb', '.php',
  '.vue', '.svelte', '.cs', '.kt', '.swift', '.scala',
]);

const EXCLUDE_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', 'coverage',
  '.next', 'vendor', '__pycache__', '.pytest_cache',
  'venv', 'env', '.venv', 'out', '.output',
]);

export function parseGithubUrl(url) {
  const match = url.trim().match(/github\.com[/:]([^/\s]+)\/([^/\s.]+?)(?:\.git)?(?:[/?#]|$)/);
  if (match) return { owner: match[1], repo: match[2] };
  throw new Error('Invalid GitHub URL. Expected: https://github.com/owner/repo');
}

function buildHeaders(token) {
  const headers = { 
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'RepoArchitectureNavigator/1.0'
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function getRepoInfo(owner, repo, token) {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers: buildHeaders(token) }
  );
  return {
    defaultBranch: data.default_branch,
    description: data.description || '',
    language: data.language || 'Unknown',
    stars: data.stargazers_count,
    forks: data.forks_count,
    size: data.size,
  };
}

export async function getRepoTree(owner, repo, branch, token) {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
    { headers: buildHeaders(token) }
  );
  if (data.truncated) console.warn('[GitHubFetcher] Tree truncated — large repo');
  return data.tree.filter(item => item.type === 'blob');
}

export function filterSupportedFiles(tree, maxFiles = 250) {
  return tree.filter(item => {
    const ext = path.extname(item.path).toLowerCase();
    const parts = item.path.split('/');
    const excluded = parts.some(p => EXCLUDE_DIRS.has(p));
    return !excluded && SUPPORTED_EXTENSIONS.has(ext) && item.size < 500_000;
  }).slice(0, maxFiles);
}

export async function fetchFileContent(owner, repo, branch, filePath, token) {
  try {
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${encodeURIComponent(filePath).replace(/%2F/g, '/')}`;
    const { data } = await axios.get(rawUrl, {
      timeout: 10_000,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      responseType: 'text',
    });
    return typeof data === 'string' ? data : JSON.stringify(data);
  } catch {
    return null;
  }
}

export async function fetchMultipleFiles(owner, repo, branch, files, token, onProgress) {
  const BATCH = 8;
  const results = [];
  for (let i = 0; i < files.length; i += BATCH) {
    const batch = files.slice(i, i + BATCH);
    const settled = await Promise.all(
      batch.map(async f => ({
        ...f,
        content: await fetchFileContent(owner, repo, branch, f.path, token),
      }))
    );
    results.push(...settled);
    onProgress?.(Math.round(((i + BATCH) / files.length) * 60));
    if (i + BATCH < files.length) await new Promise(r => setTimeout(r, 80));
  }
  return results;
}

export async function getCommitHistory(owner, repo, token, perPage = 30) {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`,
    { headers: buildHeaders(token) }
  );
  return data.map(c => ({
    sha: c.sha.slice(0, 7),
    message: c.commit.message.split('\n')[0],
    author: c.commit.author.name,
    date: c.commit.author.date,
    url: c.html_url,
  }));
}
