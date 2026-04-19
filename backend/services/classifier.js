import path from 'path';

const ENTRY_NAMES = new Set(['index', 'main', 'app', 'server', 'start', 'bootstrap', 'init', 'entry', 'run', 'manage', 'wsgi', 'asgi', 'cli']);
const UTILITY_KEYWORDS = ['util', 'helper', 'common', 'shared', 'lib', 'tools', 'misc', 'constant', 'config', 'env', 'setting', 'interface', 'dto'];
const BUSINESS_KEYWORDS = ['model', 'schema', 'entity', 'repository', 'service', 'controller', 'view', 'logic', 'core'];
const EXTERNAL_KEYWORDS = ['api', 'client', 'connector', 'adapter', 'gateway', 'integration', 'webhook', 'oauth', 'stripe', 'twilio', 'firebase', 'aws', 'gcp', 'azure', 'database', 'db', 'repository', 'repo', 'store', 'cache', 'redis', 'mongo', 'postgres', 'mysql', 'sqlite', 'prisma', 'mongoose', 'sequelize'];

export function classifyNodes(nodes) {
  for (const node of nodes) {
    node.type = classifyNode(node);
  }
  return nodes;
}

function classifyNode(node) {
  const base = path.basename(node.id, path.extname(node.id)).toLowerCase();
  const segments = node.id.toLowerCase().split(/[/\\]/);

  // Entry point: named index/main/app/server at root or one level deep
  if (ENTRY_NAMES.has(base) && segments.length <= 3) return 'entry';

  // External integration: path contains integration keywords
  if (EXTERNAL_KEYWORDS.some(k => segments.some(s => s.includes(k)))) return 'external';
  if (EXTERNAL_KEYWORDS.some(k => base.includes(k))) return 'external';

  // Utility: path contains utility keywords
  if (UTILITY_KEYWORDS.some(k => segments.some(s => s.includes(k)))) return 'utility';
  if (UTILITY_KEYWORDS.some(k => base.includes(k))) return 'utility';

  // Business: path contains business keywords
  if (BUSINESS_KEYWORDS.some(k => segments.some(s => s.includes(k)))) return 'business';
  if (BUSINESS_KEYWORDS.some(k => base.includes(k))) return 'business';

  // High-impact entry points (many dependents + entry-like names)
  if (node.impactScore > 0.7 && ENTRY_NAMES.has(base)) return 'entry';

  // Test files
  if (base.includes('test') || base.includes('spec') || segments.includes('__tests__') || segments.includes('tests')) return 'utility';

  // Everything else = business logic
  return 'business';
}
