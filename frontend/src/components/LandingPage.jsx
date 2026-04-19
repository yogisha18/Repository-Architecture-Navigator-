import { useState } from 'react';
import { ArrowRight, Play, Zap, Shield, Share2 } from 'lucide-react';
import AuthModal from './auth/AuthModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const DEMO_VIDEO_ID = 'dQw4w9WgXcQ'; // <-- REPLACE THIS ID WITH YOUR OWN VIDEO ID

export default function LandingPage({ onEnterApp }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const { login } = useAuth();

  const handleAuthSuccess = (userData) => {
    login(userData);
    setIsAuthModalOpen(false);
    onEnterApp();
  };

  return (
    <div className="landing-page">
      {isDemoModalOpen && (
        <div className="auth-modal-overlay" onClick={() => setIsDemoModalOpen(false)}>
          <div className="auth-modal-card" style={{ maxWidth: 800, padding: 0, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?autoplay=1`}
                title="Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button 
              className="btn btn-primary" 
              style={{ margin: 20, width: 'calc(100% - 40px)' }}
              onClick={() => setIsDemoModalOpen(false)}
            >
              Close Demo
            </button>
          </div>
        </div>
      )}
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <nav className="landing-nav">
        <div className="top-bar-logo">
          <div className="logo-dot" />
          Repo Architecture Navigator
        </div>
        <button className="btn btn-ghost" onClick={() => setIsAuthModalOpen(true)}>Login</button>
      </nav>

      <main className="landing-hero">
        <div className="hero-badge">
          <Zap size={14} className="text-accent" />
          <span>DevKraft 2026 Hackathon Choice</span>
        </div>
        
        <h1 className="hero-title">
          Visualize Codebase <span className="text-gradient">Architectures</span> In Seconds.
        </h1>
        
        <p className="hero-subtitle">
          Instantly understand file dependencies, detect dead code, and identify high-impact modules. 
          Stop guessing and start navigating with AI-powered static analysis.
        </p>

        <div className="hero-actions">
          <button className="hero-analyze-btn" onClick={() => setIsAuthModalOpen(true)}>
            Get Started <ArrowRight size={18} />
          </button>
          <button className="btn btn-ghost" style={{ padding: '14px 28px' }} onClick={() => setIsDemoModalOpen(true)}>
            <Play size={16} fill="currentColor" /> Watch Demo
          </button>
        </div>

        <div className="hero-features-grid">
          <div className="hero-feature">
            <Shield size={20} className="text-accent" />
            <span>Secure Static Analysis</span>
          </div>
          <div className="hero-feature">
            <Share2 size={20} className="text-accent" />
            <span>Interactive Graphs</span>
          </div>
          <div className="hero-feature">
            <Zap size={20} className="text-accent" />
            <span>Fast Processing</span>
          </div>
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
