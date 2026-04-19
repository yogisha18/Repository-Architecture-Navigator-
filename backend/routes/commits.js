import { Router } from 'express';
import { parseGithubUrl, getCommitHistory } from '../services/githubFetcher.js';

const router = Router();

router.get('/', async (req, res) => {
  const { repoUrl, githubToken } = req.query;
  if (!repoUrl) return res.status(400).json({ error: 'repoUrl is required' });
  try {
    const { owner, repo } = parseGithubUrl(decodeURIComponent(repoUrl));
    const token = githubToken || process.env.GITHUB_TOKEN || '';
    const commits = await getCommitHistory(owner, repo, token);
    res.json({ commits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
