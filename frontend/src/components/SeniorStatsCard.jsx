import { ShieldCheck, UserMinus, Clock, HelpCircle } from 'lucide-react';

export default function SeniorStatsCard({ score, prevented, hours }) {
  return (
    <div className="senior-stats-card">
      <div className="legend-title flex items-center gap-2 mb-3">
        <ShieldCheck size={14} className="text-accent" />
        Senior Interruption Prevention
      </div>

      <div className="senior-score-main">
        <div className="senior-score-val">{Math.round(score)}%</div>
        <div className="senior-score-label">Self-Onboarding Score</div>
      </div>

      <div className="senior-score-track">
        <div className="senior-score-fill" style={{ width: `${score}%` }} />
      </div>

      <div className="senior-stats-grid">
        <div className="senior-stat-item">
          <div className="senior-stat-label">
            <UserMinus size={11} />
            <span>Prevented</span>
          </div>
          <div className="senior-stat-val text-bright">{prevented}</div>
        </div>
        <div className="senior-stat-item">
          <div className="senior-stat-label">
            <Clock size={11} />
            <span>Saved</span>
          </div>
          <div className="senior-stat-val text-accent">{hours}h</div>
        </div>
      </div>

      <div className="senior-stats-info">
        <HelpCircle size={10} />
        Based on complexity & dependency analysis
      </div>
    </div>
  );
}
