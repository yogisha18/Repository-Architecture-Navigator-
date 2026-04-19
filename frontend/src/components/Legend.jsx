const LEGEND_ITEMS = [
  { type: 'entry',    color: '#ff6b6b', label: 'Entry Point'           },
  { type: 'business', color: '#fbbf24', label: 'Business Logic'        },
  { type: 'utility',  color: '#60a5fa', label: 'Utility / Config'      },
  { type: 'external', color: '#34d399', label: 'External Integration'  },
];

export default function Legend({ stats, deadCount }) {
  return (
    <div className="legend">
      <div className="legend-title">Onboarding Readiness</div>
      <div className="legend-item" style={{ marginBottom: 4 }}>
        <span style={{ fontSize: 14 }}>✅</span>
        <span style={{ fontSize: 11 }}>Junior Friendly (Low Complexity)</span>
      </div>
      <div className="legend-item" style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 14 }}>⚠️</span>
        <span style={{ fontSize: 11 }}>Senior Help Recommended (High)</span>
      </div>

      <div className="legend-title">Node Types</div>
      {LEGEND_ITEMS.map(item => (
        <div key={item.type} className="legend-item">
          <div className="legend-dot" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
          <span>{item.label}</span>
          {stats && (
            <span style={{ marginLeft: 'auto', paddingLeft: 12, color: 'var(--text-muted)', fontSize: 11 }}>
              {stats[item.type] ?? 0}
            </span>
          )}
        </div>
      ))}
      {stats && (
        <div style={{ borderTop: '1px solid var(--border)', marginTop: 6, paddingTop: 6 }}>
          <div className="legend-item" style={{ marginBottom: 4 }}>
            <div className="legend-dot" style={{ background: '#4b5563', boxShadow: `0 0 6px #4b5563` }} />
            <span>⚠️ Dead Code / Orphaned</span>
            <span style={{ marginLeft: 'auto', paddingLeft: 12, color: 'var(--text-muted)', fontSize: 11 }}>
              {deadCount ?? 0}
            </span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            Total: <strong style={{ color: 'var(--text-secondary)' }}>{Object.values(stats).reduce((a, b) => a + b, 0)}</strong> files
          </div>
        </div>
      )}
    </div>
  );
}
