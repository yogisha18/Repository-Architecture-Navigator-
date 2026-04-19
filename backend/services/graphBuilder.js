import path from 'path';

export function buildGraph(analyzedFiles) {
  const nodeMap = new Map();
  const allPaths = new Set(analyzedFiles.map(f => f.path));

  // Create nodes
  for (const file of analyzedFiles) {
    nodeMap.set(file.path, {
      id: file.path,
      label: path.basename(file.path),
      path: file.path,
      ext: path.extname(file.path).toLowerCase(),
      loc: file.loc || 0,
      rawImports: file.imports || [],
      resolvedDeps: [],
      dependents: [],
      impactScore: 0,
      type: 'utility', // will be classified later
    });
  }

  const edges = [];

  // Resolve imports to actual file paths
  for (const file of analyzedFiles) {
    const node = nodeMap.get(file.path);
    const dir = path.dirname(file.path).replace(/\\/g, '/');

    for (const imp of file.imports || []) {
      const resolved = resolveImport(imp, dir, allPaths);
      if (resolved && resolved !== file.path) {
        if (!node.resolvedDeps.includes(resolved)) {
          node.resolvedDeps.push(resolved);
        }
        // Add to dependents of target
        const target = nodeMap.get(resolved);
        if (target && !target.dependents.includes(file.path)) {
          target.dependents.push(file.path);
        }
        edges.push({ source: file.path, target: resolved });
      }
    }
  }

  // Calculate impact score = (in-degree / max-in-degree)
  const maxDependents = Math.max(1, ...Array.from(nodeMap.values()).map(n => n.dependents.length));
  for (const node of nodeMap.values()) {
    node.impactScore = parseFloat((node.dependents.length / maxDependents).toFixed(3));
  }

  return {
    nodes: Array.from(nodeMap.values()),
    edges,
  };
}

function resolveImport(importPath, fromDir, allPaths) {
  // Normalize dot-separated paths (Python/Java/C#) to slashes
  let normalizedPath = importPath.replace(/\./g, '/');
  
  // Handle Python relative imports (e.g. ..utils or .models)
  if (importPath.startsWith('.')) {
    const dots = importPath.match(/^\.+/)[0];
    const level = dots.length;
    const parts = fromDir.split('/');
    const parentDir = parts.slice(0, Math.max(0, parts.length - (level - 1))).join('/');
    normalizedPath = path.posix.normalize(`${parentDir}/${importPath.slice(level).replace(/\./g, '/')}`);
  } else if (!importPath.startsWith('/') && !importPath.startsWith('./') && !importPath.startsWith('../')) {
    // Possibly a package-style absolute import or external
    // Check if it matches any internal path starting from root
    const extensions = ['', '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.go', '.rb', '.php', '.cs'];
    for (const ext of extensions) {
      const candidate = (normalizedPath + ext).replace(/^\//, '');
      if (allPaths.has(candidate)) return candidate;
    }
  }

  const base = normalizedPath.startsWith('/')
    ? normalizedPath.slice(1)
    : path.posix.normalize(`${fromDir}/${normalizedPath}`);

  // Try exact match + common extensions
  const extensions = ['', '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.go', '.rb', '.php', '.cs', '/index.js', '/__init__.py'];
  for (const ext of extensions) {
    const candidate = (base + ext).replace(/^\//, '').replace(/\/+$/, '');
    if (allPaths.has(candidate)) return candidate;
  }
  return null;
}

export function getHighImpactFiles(nodes, topN = 5) {
  return [...nodes]
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, topN)
    .map(n => n.id);
}
