import { Router } from 'express';
import { queryGraph } from '../services/nlQuery.js';

const router = Router();

router.post('/', (req, res) => {
  const { question, nodes } = req.body;
  if (!question || !nodes) return res.status(400).json({ error: 'question and nodes are required' });
  const matchedIds = queryGraph(question, nodes);
  res.json({ matchedIds });
});

export default router;
