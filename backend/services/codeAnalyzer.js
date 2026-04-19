import path from 'path';

export function extractImports(content, filePath) {
  if (!content) return [];
  const ext = path.extname(filePath).toLowerCase();
  try {
    switch (ext) {
      case '.js': case '.jsx': case '.ts': case '.tsx':
      case '.mjs': case '.cjs': case '.vue': case '.svelte':
        return extractJsImports(content);
      case '.py': return extractPythonImports(content);
      case '.java': case '.kt': case '.scala': return extractJavaImports(content);
      case '.go': return extractGoImports(content);
      case '.rs': return extractRustImports(content);
      case '.rb': return extractRubyImports(content);
      case '.php': return extractPhpImports(content);
      case '.cs': return extractCsharpImports(content);
      default: return [];
    }
  } catch { return []; }
}

function extractJsImports(content) {
  const results = new Set();
  const patterns = [
    /import\s+(?:[\w*{}\s,]+\s+from\s+)?['"]([^'"]+)['"]/g,
    /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /export\s+(?:[\w*{}\s,]+\s+from\s+)?['"]([^'"]+)['"]/g,
    /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /from\s+['"]([^'"]+)['"]/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(content)) !== null) results.add(m[1]);
  }
  return [...results];
}

function extractPythonImports(content) {
  const results = new Set();
  const patterns = [
    /^from\s+([.\w]+)\s+import/gm,
    /^import\s+([\w.,\s]+)/gm,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(content)) !== null) {
      if (re.source.includes('from')) {
        results.add(m[1]);
      } else {
        m[1].split(',').forEach(s => {
          const parts = s.trim().split('.');
          if (parts[0]) results.add(parts[0]);
        });
      }
    }
  }
  return [...results];
}

function extractJavaImports(content) {
  const results = new Set();
  const re = /^import\s+(?:static\s+)?([\w.]+)(?:\.\*)?;/gm;
  let m;
  while ((m = re.exec(content)) !== null) results.add(m[1]);
  return [...results];
}

function extractGoImports(content) {
  const results = new Set();
  const single = /^import\s+"([^"]+)"/gm;
  const multi = /import\s+\(([\s\S]*?)\)/g;
  let m;
  while ((m = single.exec(content)) !== null) results.add(m[1]);
  while ((m = multi.exec(content)) !== null) {
    const lines = m[1].match(/"([^"]+)"/g) || [];
    lines.forEach(l => results.add(l.replace(/"/g, '')));
  }
  return [...results];
}

function extractRustImports(content) {
  const results = new Set();
  const re = /use\s+([\w:]+)/g;
  let m;
  while ((m = re.exec(content)) !== null) results.add(m[1].split('::')[0]);
  return [...results];
}

function extractRubyImports(content) {
  const results = new Set();
  const re = /(?:require|require_relative|load)\s+['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(content)) !== null) results.add(m[1]);
  return [...results];
}

function extractPhpImports(content) {
  const results = new Set();
  const patterns = [
    /use\s+([\w\\]+)/g,
    /(?:require|include)(?:_once)?\s+['"]([^'"]+)['"]/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(content)) !== null) results.add(m[1]);
  }
  return [...results];
}

function extractCsharpImports(content) {
  const results = new Set();
  const re = /^using\s+([\w.]+);/gm;
  let m;
  while ((m = re.exec(content)) !== null) results.add(m[1]);
  return [...results];
}

export function countLines(content) {
  if (!content) return 0;
  return content.split('\n').length;
}
