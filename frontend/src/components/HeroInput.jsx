import React, { useState } from 'react';

const EXAMPLES = [
  'https://github.com/expressjs/express',
  'https://github.com/vitejs/vite',
  'https://github.com/fastapi/fastapi',
  'https://github.com/pallets/flask',
];

export default function HeroInput({ onAnalyze, loading, error }) {
  const [url, setUrl] = React.useState('');
  const [token, setToken] = React.useState('');
  const [showToken, setShowToken] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!url.trim()) return;
    onAnalyze({ repoUrl: url.trim(), githubToken: token.trim() });
  }

  return (
    <div className="hero-screen">
      <div className="hero-badge">
        <span>⚡</span> PS3 · DevKraft 2026
      </div>

      <h1 className="hero-title">
        Repository<br /><span>Architecture</span><br />Navigator
      </h1>

      <p className="hero-desc">
        Paste any GitHub repository URL. We'll analyze the codebase, map every dependency,
        and render an interactive architecture graph — instantly.
      </p>

      {error && (
        <div className="error-banner" style={{ maxWidth: 560, marginBottom: 20 }}>
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form className="hero-form" onSubmit={handleSubmit}>
        <div className="hero-input-wrap">
          <div className="hero-url-row">
            <input
              id="repo-url-input"
              className="hero-url-input"
              type="url"
              placeholder="https://github.com/owner/repository"
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="hero-token-row">
            <input
              id="github-token-input"
              className="hero-token-input"
              type={showToken ? 'text' : 'password'}
              placeholder="GitHub token (optional — avoids rate limits)"
              value={token}
              onChange={e => setToken(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setShowToken(v => !v)}
            >
              {showToken ? '🙈' : '👁'}
            </button>
          </div>

          <button
            id="analyze-btn"
            type="submit"
            className="hero-analyze-btn"
            disabled={loading || !url.trim()}
          >
            {loading ? (
              <>
                <span className="step-icon" style={{ background: 'rgba(255,255,255,0.2)', animation: 'spin 1s linear infinite', display: 'inline-block', borderRadius: '50%', width: 18, height: 18 }} />
                Analyzing…
              </>
            ) : (
              <>
                <span>🔭</span> Analyze Repository
              </>
            )}
          </button>
        </div>
      </form>

      <div className="hero-examples">
        <p className="hero-examples-label">Try a popular open-source repo:</p>
        <div className="hero-example-chips">
          {EXAMPLES.map(ex => (
            <button
              key={ex}
              className="hero-chip"
              onClick={() => setUrl(ex)}
              disabled={loading}
            >
              {ex.replace('https://github.com/', '')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
