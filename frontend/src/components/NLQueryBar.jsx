import { useState } from 'react';

const SUGGESTIONS = [
  'Where is authentication handled?',
  'Show the database layer',
  'Show payment flow',
  'Where are API routes defined?',
  'Find configuration files',
  'Where are tests?',
];

export default function NLQueryBar({ nodes, onResults, onClear }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchCount, setMatchCount] = useState(null);

  async function handleQuery(q) {
    const text = (q || query).trim();
    if (!text) { onClear?.(); setMatchCount(null); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, nodes }),
      });
      const data = await res.json();
      const ids = data.matchedIds || [];
      setMatchCount(ids.length);
      onResults?.(ids);
    } catch {
      onResults?.([]);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setQuery('');
    setMatchCount(null);
    onClear?.();
  }

  return (
    <div className="nl-query-wrap">
      <div className="nl-query-bar">
        <span style={{ fontSize: 16, flexShrink: 0 }}>🔍</span>
        <input
          id="nl-query-input"
          placeholder='Ask anything — "Where is auth handled?"'
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleQuery()}
        />
        {query && (
          <button
            onClick={handleClear}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}
          >×</button>
        )}
        <button id="nl-query-btn" onClick={() => handleQuery()} disabled={loading || !query.trim()}>
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {matchCount !== null && (
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <span className="nl-match-count">
            {matchCount === 0 ? 'No matches found' : `${matchCount} file${matchCount > 1 ? 's' : ''} matched`}
          </span>
        </div>
      )}

      {!query && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
          {SUGGESTIONS.slice(0, 3).map(s => (
            <button
              key={s}
              onClick={() => { setQuery(s); handleQuery(s); }}
              style={{
                padding: '4px 12px', borderRadius: 99,
                background: 'rgba(13,13,38,0.85)', border: '1px solid var(--border)',
                fontSize: 11, color: 'var(--text-muted)', cursor: 'pointer',
                backdropFilter: 'blur(8px)', transition: 'all 0.2s',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
