export function queryGraph(question, nodes) {
  if (!question || !question.trim()) return [];

  const q = question.toLowerCase();

  // Extract meaningful keywords (skip stopwords)
  const STOPWORDS = new Set(['where', 'is', 'the', 'how', 'does', 'what', 'show', 'me', 'find', 'which', 'files', 'file', 'are', 'all', 'of', 'for', 'in', 'a', 'an', 'to', 'do', 'i']);
  const keywords = q.split(/\W+/).filter(w => w.length > 2 && !STOPWORDS.has(w));

  if (keywords.length === 0) return [];

  // Domain-specific expansions
  const expansions = {
    auth: ['auth', 'login', 'jwt', 'token', 'session', 'passport', 'oauth', 'signin', 'signup', 'permission', 'role'],
    payment: ['payment', 'stripe', 'billing', 'checkout', 'invoice', 'subscription', 'charge', 'price'],
    database: ['database', 'db', 'model', 'schema', 'query', 'migration', 'repository', 'entity', 'orm', 'prisma', 'mongo', 'postgres', 'sql'],
    api: ['api', 'route', 'endpoint', 'controller', 'handler', 'rest', 'graphql', 'swagger'],
    test: ['test', 'spec', 'mock', 'fixture', 'jest', 'mocha', 'pytest'],
    config: ['config', 'env', 'setting', 'constant', 'environment'],
    ui: ['component', 'view', 'render', 'template', 'page', 'layout', 'style', 'css'],
    email: ['email', 'mail', 'smtp', 'sendgrid', 'mailgun', 'notification'],
    cache: ['cache', 'redis', 'memcached', 'session'],
    log: ['log', 'logger', 'logging', 'monitor', 'trace'],
  };

  // Expand keywords
  const expandedKeywords = new Set(keywords);
  for (const kw of keywords) {
    for (const [domain, terms] of Object.entries(expansions)) {
      if (terms.includes(kw) || kw.includes(domain)) {
        terms.forEach(t => expandedKeywords.add(t));
      }
    }
  }

  // Score each node
  const scored = nodes.map(node => {
    const searchableText = [
      node.id.toLowerCase(),
      (node.summary || '').toLowerCase(),
      node.type,
    ].join(' ');

    let score = 0;
    for (const kw of expandedKeywords) {
      const occurrences = (searchableText.match(new RegExp(kw, 'g')) || []).length;
      score += occurrences;
    }
    return { id: node.id, score };
  }).filter(n => n.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 15).map(n => n.id);
}
