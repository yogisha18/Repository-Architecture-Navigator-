const STEPS = [
  { id: 'fetch',    label: 'Fetching repository tree',       icon: '📡' },
  { id: 'download', label: 'Downloading file contents',      icon: '📥' },
  { id: 'analyze',  label: 'Extracting import dependencies', icon: '🔬' },
  { id: 'graph',    label: 'Building dependency graph',      icon: '🕸' },
  { id: 'classify', label: 'Classifying file roles',         icon: '🏷' },
  { id: 'summary',  label: 'Generating file summaries',      icon: '✍️' },
  { id: 'path',     label: 'Computing onboarding path',      icon: '🗺' },
];

export default function LoadingScreen({ activeStep, progress, repoName }) {
  const activeIdx = STEPS.findIndex(s => s.id === activeStep);

  return (
    <div className="loading-screen">
      <div className="loading-orb">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
        </svg>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 className="loading-title">Analyzing Repository</h2>
        {repoName && (
          <p style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--text-muted)', marginTop: 6 }}>
            {repoName}
          </p>
        )}
      </div>

      <div className="loading-progress-track" style={{ width: '100%', maxWidth: 400 }}>
        <div className="loading-progress-fill" style={{ width: `${progress || 0}%` }} />
      </div>

      <div className="loading-steps">
        {STEPS.map((step, i) => {
          const status = i < activeIdx ? 'done' : i === activeIdx ? 'active' : 'pending';
          return (
            <div key={step.id} className={`loading-step ${status}`}>
              <div className="step-icon">
                {status === 'done' ? '✓' : status === 'active' ? '●' : '○'}
              </div>
              <span>{step.icon} {step.label}</span>
              {status === 'done' && (
                <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.6 }}>done</span>
              )}
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
        This may take 15–60 seconds depending on repository size.
      </p>
    </div>
  );
}
