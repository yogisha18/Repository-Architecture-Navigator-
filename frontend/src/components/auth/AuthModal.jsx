import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="auth-modal-header">
          <h2>{activeTab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{activeTab === 'login' ? 'Sign in to access your saved repositories' : 'Join developers building better architectures'}</p>
        </div>

        <div className="auth-tab-switcher">
          <button 
            className={activeTab === 'login' ? 'active' : ''} 
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={activeTab === 'signup' ? 'active' : ''} 
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="auth-modal-body">
          {activeTab === 'login' ? (
            <LoginForm 
              onLogin={onAuthSuccess} 
              onSignupToggle={() => setActiveTab('signup')} 
            />
          ) : (
            <SignupForm 
              onSignup={onAuthSuccess} 
              onLoginToggle={() => setActiveTab('login')} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
