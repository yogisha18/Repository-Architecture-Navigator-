import { useState, useCallback, useMemo } from 'react';
import { analyzeRepo } from './services/api.js';
import HeroInput from './components/HeroInput.jsx';
import GraphCanvas from './components/GraphCanvas.jsx';
import FileDetailPanel from './components/FileDetailPanel.jsx';
import OnboardingPath from './components/OnboardingPath.jsx';
import NLQueryBar from './components/NLQueryBar.jsx';
import Legend from './components/Legend.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import LandingPage from './components/LandingPage.jsx';
import ProfileAvatar from './components/auth/ProfileAvatar.jsx';
import SeniorStatsCard from './components/SeniorStatsCard.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { LogOut, User as UserIcon } from 'lucide-react';

const LOADING_STEPS = ['fetch', 'download', 'analyze', 'graph', 'classify', 'summary', 'path'];

function AppContent() {
  const [step, setStep] = useState('landing'); // landing | input | loading | result | error
  const { user, logout, isLoggedIn } = useAuth();
  const [graphData, setGraphData] = useState(null);
  const [repoInfo, setRepoInfo] = useState(null);
  const [repoUrl, setRepoUrl] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [sidebarTab, setSidebarTab] = useState('onboarding'); // onboarding | commits
  const [error, setError] = useState('');
  const [loadingStep, setLoadingStep] = useState('fetch');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [githubToken, setGithubToken] = useState('');
  const [complexityFilter, setComplexityFilter] = useState('all');
  const [heatmapMode, setHeatmapMode] = useState(false);

  // Cycle through loading steps for visual feedback
  function advanceLoadingStep(idx) {
    setLoadingStep(LOADING_STEPS[idx] || LOADING_STEPS[LOADING_STEPS.length - 1]);
    setLoadingProgress(Math.round((idx / LOADING_STEPS.length) * 100));
  }

  async function handleAnalyze({ repoUrl: url, githubToken: token }) {
    setError('');
    setRepoUrl(url);
    setGithubToken(token);
    setStep('loading');
    setLoadingStep('fetch');
    setLoadingProgress(5);
    setGraphData(null);
    setSelectedNode(null);
    setHighlightedNodes([]);

    // Animate through steps
    const stepTimers = LOADING_STEPS.map((_, i) =>
      setTimeout(() => advanceLoadingStep(i), i * 3500)
    );

    try {
      const data = await analyzeRepo({ repoUrl: url, githubToken: token });
      stepTimers.forEach(clearTimeout);
      setGraphData({ nodes: data.nodes, edges: data.edges, onboardingPath: data.onboardingPath, highImpactFiles: data.highImpactFiles });
      setRepoInfo(data.repoInfo);
      setLoadingProgress(100);
      setStep('result');
      
      // Toast notification for hackathon polish
      console.log('Successfully analyzed repository!');
    } catch (err) {
      stepTimers.forEach(clearTimeout);
      const msg = err.response?.data?.error || err.message || 'Analysis failed';
      setError(msg);
      setStep('error');
    }
  }

  const handleNodeClick = useCallback((nodeData) => {
    if (!nodeData) { setSelectedNode(null); return; }
    const full = graphData?.nodes.find(n => n.id === nodeData.id || n.id === nodeData);
    setSelectedNode(full || nodeData);
  }, [graphData]);

  const handleSelectById = useCallback((id) => {
    const node = graphData?.nodes.find(n => n.id === id);
    if (node) setSelectedNode(node);
    setHighlightedNodes([id]);
  }, [graphData]);

  const enhancedGraphData = useMemo(() => {
    if (!graphData) return null;
    
    const nodes = graphData.nodes.map(node => {
      const depsCount = node.resolvedDeps?.length || 0;
      const locScore = (node.loc || 0) / 10;
      const rawScore = (depsCount * 15) + locScore;
      const score = Math.min(100, Math.round(rawScore));
      
      let level = 'low';
      if (score > 70) level = 'high';
      else if (score > 30) level = 'medium';

      const isDeadCode = node.dependents.length === 0 && node.type !== 'entry';

      return { ...node, complexity: score, complexityLevel: level, isDeadCode };
    });

    const filteredNodes = nodes.filter(n => {
      if (complexityFilter === 'all') return true;
      return n.complexityLevel === complexityFilter;
    });

    const visibleIds = new Set(filteredNodes.map(n => n.id));
    const filteredEdges = graphData.edges.filter(e => visibleIds.has(e.source) && visibleIds.has(e.target));

    return { ...graphData, nodes: filteredNodes, edges: filteredEdges };
  }, [graphData, complexityFilter]);

  const nodeStats = useMemo(() => {
    if (!enhancedGraphData) return null;
    return enhancedGraphData.nodes.reduce((acc, n) => {
      const key = n.isDeadCode ? 'dead' : n.type;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [enhancedGraphData]);

  const seniorStats = useMemo(() => {
    if (!enhancedGraphData) return null;
    const nodes = enhancedGraphData.nodes;
    const avgComplexity = nodes.reduce((acc, n) => acc + (n.complexity || 0), 0) / nodes.length;
    const score = Math.max(0, 100 - avgComplexity);
    
    // Interruption = Complexity > 40 is a potential interruption.
    // Tool "prevents" it if it provides a clear summary.
    // Let's count files with complexity < 40 as "Self Explainable"
    const selfExplainableCount = nodes.filter(n => n.complexity < 40).length;
    const hoursSaved = selfExplainableCount * 0.5;

    return { score, prevented: selfExplainableCount, hours: Math.round(hoursSaved) };
  }, [enhancedGraphData]);

  if (step === 'landing' && !isLoggedIn) {
    return <LandingPage onEnterApp={() => setStep('input')} />;
  }

  if (step === 'input' || step === 'error' || (step === 'landing' && isLoggedIn)) {
    return (
      <div className="app">
        <header className="top-bar">
          <div className="top-bar-logo">
            <div className="logo-dot" />
            Repo Architecture Navigator
          </div>
          <div className="top-bar-actions">
            {isLoggedIn && <ProfileAvatar />}
          </div>
        </header>
        <HeroInput
          onAnalyze={handleAnalyze}
          loading={false}
          error={step === 'error' ? error : ''}
        />
      </div>
    );
  }

  const repoShortName = repoUrl.replace('https://github.com/', '');

  if (step === 'loading') {
    return (
      <div className="app">
        <header className="top-bar">
          <div className="top-bar-logo"><div className="logo-dot" /> Repo Architecture Navigator</div>
          <div className="top-bar-url">
            <span>📦</span>
            <span>{repoShortName}</span>
          </div>
        </header>
        <LoadingScreen activeStep={loadingStep} progress={loadingProgress} repoName={repoShortName} />
      </div>
    );
  }

  // ── RESULT VIEW ──
  return (
    <div className="app">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-logo"><div className="logo-dot" /> Repo Architecture Navigator</div>
        <div className="top-bar-url">
          <span>📦</span>
          <span>{repoShortName}</span>
        </div>
        {repoInfo && (
          <div className="repo-info-strip" style={{ border: 'none', padding: '0 4px', gap: 14 }}>
            <span className="repo-stat">⭐ <strong>{repoInfo.stars?.toLocaleString()}</strong></span>
            <span className="repo-stat">🌿 <strong>{repoInfo.language}</strong></span>
            <span className="repo-stat">📁 <strong>{graphData?.nodes.length}</strong> files</span>
            <span className="repo-stat">🔗 <strong>{graphData?.edges.length}</strong> deps</span>
          </div>
        )}
        <div className="top-bar-actions">
          {isLoggedIn && <div style={{ marginRight: 12 }}><ProfileAvatar /></div>}
          <div className="filter-group" style={{ display: 'flex', gap: 8, marginRight: 16 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', alignSelf: 'center', marginRight: 4 }}>Complexity:</span>
            {['all', 'high', 'medium', 'low'].map(f => (
              <button
                key={f}
                className={`btn btn-xs ${complexityFilter === f ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setComplexityFilter(f)}
                style={{ textTransform: 'capitalize' }}
              >
                {f}
              </button>
            ))}
            <div style={{ width: 1, background: 'var(--border)', margin: '0 8px' }} />
            <button
              className={`btn btn-xs ${heatmapMode ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setHeatmapMode(!heatmapMode)}
            >
              🔥 Heatmap
            </button>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => { setStep('input'); setError(''); }}
            id="new-analysis-btn"
          >
            ← New Analysis
          </button>
        </div>
      </header>

      <div className="workspace">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-tabs">
            <button
              className={`sidebar-tab ${sidebarTab === 'onboarding' ? 'active' : ''}`}
              onClick={() => setSidebarTab('onboarding')}
              id="tab-onboarding"
            >
              📚 Onboarding
            </button>
            <button
              className={`sidebar-tab ${sidebarTab === 'files' ? 'active' : ''}`}
              onClick={() => setSidebarTab('files')}
              id="tab-files"
            >
              🏆 High Impact
            </button>
            <button
              className={`sidebar-tab ${sidebarTab === 'dead' ? 'active' : ''}`}
              onClick={() => setSidebarTab('dead')}
              id="tab-dead"
            >
              ⚠️ Dead Code
            </button>
          </div>
          <div className="sidebar-content">
            {sidebarTab === 'onboarding' && (
              <OnboardingPath
                path={graphData?.onboardingPath}
                onSelectNode={handleSelectById}
              />
            )}
            {sidebarTab === 'files' && (
              <div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>
                  Files depended upon by the most other modules — changes here carry the highest risk.
                </p>
                <div className="onboarding-list">
                  {(graphData?.highImpactFiles || []).map((id, i) => {
                    const node = graphData?.nodes.find(n => n.id === id);
                    if (!node) return null;
                    return (
                      <div
                        key={id}
                        className="onboarding-item"
                        onClick={() => handleSelectById(id)}
                        id={`high-impact-${i}`}
                      >
                        <div className="onboarding-num" style={{ background: 'var(--entry)' }}>🔥</div>
                        <div className="onboarding-info">
                          <div className="onboarding-name">{node.label}</div>
                          <span className={`type-badge ${node.type}`} style={{ fontSize: 10, padding: '1px 7px', display: 'inline-block', marginTop: 3 }}>{node.type}</span>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                            {node.dependents.length} dependents · impact {Math.round(node.impactScore * 100)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {sidebarTab === 'dead' && (
              <div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>
                  Orphaned files with no incoming dependencies. These might be dead code, unused modules, or loose utility scripts.
                </p>
                <div className="onboarding-list">
                  {(enhancedGraphData?.nodes || []).filter(n => n.isDeadCode).map((node, i) => (
                    <div
                      key={node.id}
                      className="onboarding-item"
                      onClick={() => handleSelectById(node.id)}
                      id={`dead-code-${i}`}
                    >
                      <div className="onboarding-num" style={{ background: '#4b5563' }}>⚠️</div>
                      <div className="onboarding-info">
                        <div className="onboarding-name">{node.label}</div>
                        <span className={`type-badge ${node.type}`} style={{ fontSize: 10, padding: '1px 7px', display: 'inline-block', marginTop: 3 }}>{node.type}</span>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                          {node.loc} lines · 0 dependents
                        </div>
                      </div>
                    </div>
                  ))}
                  {(enhancedGraphData?.nodes || []).filter(n => n.isDeadCode).length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: 13 }}>
                      🎉 No dead code detected!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Graph */}
        <main className="graph-area" style={{ position: 'relative' }}>
          <NLQueryBar
            nodes={graphData?.nodes || []}
            onResults={setHighlightedNodes}
            onClear={() => setHighlightedNodes([])}
          />

          <GraphCanvas
            graphData={enhancedGraphData}
            onNodeClick={handleNodeClick}
            highlightedNodes={highlightedNodes}
            selectedNodeId={selectedNode?.id}
            isHeatmapMode={heatmapMode}
          />

          <SeniorStatsCard 
            score={seniorStats?.score || 0} 
            prevented={seniorStats?.prevented || 0} 
            hours={seniorStats?.hours || 0} 
          />

          <Legend 
            stats={nodeStats} 
            deadCount={nodeStats?.dead || 0} 
          />
        </main>

        {/* Right Detail Panel */}
        <FileDetailPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onNodeClick={handleSelectById}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
