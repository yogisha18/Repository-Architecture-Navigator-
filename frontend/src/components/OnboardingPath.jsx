export default function OnboardingPath({ path: onboardingPath, onSelectNode }) {
  if (!onboardingPath || onboardingPath.length === 0) {
    return (
      <div className="empty-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        <p>No onboarding path generated yet.</p>
      </div>
    );
  }

  const totalMinutes = onboardingPath.reduce((acc, item) => acc + Math.max(1, Math.ceil((item.loc || 0) / 50)), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>
        Recommended reading order for a new developer to understand this codebase from top to bottom.
      </p>
      <div className="onboarding-list">
        {onboardingPath.map((item, i) => (
          <div
            key={item.id}
            className="onboarding-item"
            id={`onboarding-item-${i}`}
            onClick={() => onSelectNode?.(item.id)}
          >
            <div className="onboarding-num">
              {item.complexity < 40 ? '✅' : item.complexity > 70 ? '⚠️' : i + 1}
            </div>
            <div className="onboarding-info">
              <div className="onboarding-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.label}
                {item.complexity < 40 && <span style={{ fontSize: '10px', color: 'var(--emerald-400)', fontWeight: 'normal' }}>Junior Friendly</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '3px 0' }}>
                <span className={`type-badge ${item.type}`} style={{ fontSize: 10, padding: '1px 7px' }}>{item.type}</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                  • {Math.max(1, Math.ceil((item.loc || 0) / 50))} min read
                </span>
              </div>
              <div className="onboarding-summary">{item.summary?.replace(/\*\*/g, '')}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ 
        marginTop: 'auto', 
        paddingTop: 16, 
        borderTop: '1px solid var(--border)', 
        fontSize: 13, 
        fontWeight: 600,
        color: 'var(--text-bright)',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <span>🕒</span>
        Total Onboarding Time: {totalMinutes} mins
      </div>
    </div>
  );
}
