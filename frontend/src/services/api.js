import axios from 'axios';

const API = axios.create({ baseURL: '/api', timeout: 120_000 });

export async function analyzeRepo({ repoUrl, githubToken, openaiKey }) {
  const { data } = await API.post('/analyze', { repoUrl, githubToken, openaiKey });
  return data;
}

export async function queryGraph({ question, nodes }) {
  const { data } = await API.post('/query', { question, nodes });
  return data.matchedIds;
}

export async function fetchCommits({ repoUrl, githubToken }) {
  const { data } = await API.get('/commits', { params: { repoUrl, githubToken } });
  return data.commits;
}
