export function generateOnboardingPath(nodes, edges) {
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const inDegree = new Map(nodes.map(n => [n.id, 0]));
  const adj = new Map(nodes.map(n => [n.id, []]));

  for (const edge of edges) {
    if (nodeMap.has(edge.source) && nodeMap.has(edge.target)) {
      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
      adj.get(edge.source).push(edge.target);
    }
  }

  // Kahn's algorithm (topological sort)
  const queue = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id);
  }

  // Prioritize entry points first
  queue.sort((a, b) => {
    const na = nodeMap.get(a);
    const nb = nodeMap.get(b);
    const typeOrder = { entry: 0, business: 1, external: 2, utility: 3 };
    return (typeOrder[na?.type] ?? 4) - (typeOrder[nb?.type] ?? 4);
  });

  const visited = new Set();
  const path = [];

  while (queue.length > 0) {
    const id = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    const node = nodeMap.get(id);
    if (node) path.push({ id, label: node.label, type: node.type, summary: node.summary, loc: node.loc });

    const neighbors = adj.get(id) || [];
    for (const next of neighbors) {
      inDegree.set(next, (inDegree.get(next) || 1) - 1);
      if (inDegree.get(next) === 0) queue.push(next);
    }
  }

  // Add any remaining unvisited nodes (cycles)
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      path.push({ id: node.id, label: node.label, type: node.type, summary: node.summary });
    }
  }

  return path.slice(0, 30); // Return top 30 for readability
}
