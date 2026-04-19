export default function FileDetailPanel({ node, onClose, onNodeClick }) {
  if (!node) return null;

  const impact = Math.round(node.impactScore * 100);

  return (
    <aside className={`detail-panel open`} id="detail-panel">
      <div className="panel-header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <span className={`type-badge ${node.type}`}>{node.type}</span>
        </div>
        <button className="panel-close" onClick={onClose} id="panel-close-btn" aria-label="Close panel">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div className="panel-body">
        <div className="panel-header-main">
          <div className="panel-file-name">{node.label}</div>
          <div className="panel-path">{node.id}</div>
        </div>

        {node.complexity > 70 ? (
          <div className="auth-error-msg flex items-center gap-2" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', marginTop: 12 }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <div>
              <div style={{ fontWeight: 700 }}>Needs Senior Help</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Complex logic & high dependencies detected.</div>
            </div>
          </div>
        ) : node.complexity < 40 ? (
          <div className="auth-error-msg flex items-center gap-2" style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', marginTop: 12 }}>
            <span style={{ fontSize: 16 }}>✅</span>
            <div>
              <div style={{ fontWeight: 700 }}>Self Explainable</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Junior-friendly module with clear boundaries.</div>
            </div>
          </div>
        ) : null}

        <div className="flex gap-2" style={{ marginTop: 12 }}>
          <div className="panel-section-title">Metrics</div>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="val">{node.loc ?? '—'}</div>
              <div className="lbl">Lines of Code</div>
            </div>
            <div className="stat-card">
              <div className="val">{(node.dependents || []).length}</div>
              <div className="lbl">Dependents</div>
            </div>
            <div className="stat-card">
              <div className="val">{(node.resolvedDeps || []).length}</div>
              <div className="lbl">Dependencies</div>
            </div>
            <div className="stat-card">
              <div className="val">{impact}%</div>
              <div className="lbl">Impact Score</div>
            </div>
          </div>
        </div>

        {/* Impact bar */}
        <div className="impact-bar-wrap">
          <div className="panel-section-title">Impact Score</div>
          <div className="impact-bar-row">
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Low</span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>{impact}%</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>High</span>
          </div>
          <div className="impact-bar-track">
            <div className="impact-bar-fill" style={{ width: `${impact}%` }} />
          </div>
        </div>

        {/* AI Summary */}
        <div>
          <div className="panel-section-title">Summary</div>
          <p className="panel-summary">{node.summary?.replace(/\*\*/g, '') || 'No summary available.'}</p>
        </div>

        {/* Dependencies */}
        {(node.resolvedDeps || []).length > 0 && (
          <div>
            <div className="panel-section-title">Imports ({node.resolvedDeps.length})</div>
            <div className="dep-list">
              {node.resolvedDeps.slice(0, 10).map(dep => (
                <div key={dep} className="dep-item" onClick={() => onNodeClick?.(dep)} title={dep}>
                  → {dep}
                </div>
              ))}
              {node.resolvedDeps.length > 10 && (
                <div style={{ fontSize: 11, color: 'var(--text-muted)', padding: '4px 10px' }}>
                  +{node.resolvedDeps.length - 10} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dependents */}
        {(node.dependents || []).length > 0 && (
          <div>
            <div className="panel-section-title">Imported By ({node.dependents.length})</div>
            <div className="dep-list">
              {node.dependents.slice(0, 10).map(dep => (
                <div key={dep} className="dep-item" onClick={() => onNodeClick?.(dep)} title={dep}>
                  ← {dep}
                </div>
              ))}
              {node.dependents.length > 10 && (
                <div style={{ fontSize: 11, color: 'var(--text-muted)', padding: '4px 10px' }}>
                  +{node.dependents.length - 10} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
