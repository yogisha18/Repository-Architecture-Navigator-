import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, User, Github } from 'lucide-react';

export default function SignupForm({ onSignup, onLoginToggle }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (name.length < 2) {
      setError('Please enter your full name');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSignup({ name, email, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}` });
      setLoading(false);
    }, 1500);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-input-group">
        <label>Full Name</label>
        <div className="auth-input-wrapper">
          <User size={18} className="auth-icon" />
          <input 
            type="text" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="auth-input-group">
        <label>Email Address</label>
        <div className="auth-input-wrapper">
          <Mail size={18} className="auth-icon" />
          <input 
            type="email" 
            placeholder="dev@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="auth-input-group">
        <label>Password</label>
        <div className="auth-input-wrapper">
          <Lock size={18} className="auth-icon" />
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Create password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="button" 
            className="auth-toggle-pwd"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="auth-input-group">
        <label>Confirm Password</label>
        <div className="auth-input-wrapper">
          <Lock size={18} className="auth-icon" />
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Repeat password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>

      {error && <div className="auth-error-msg">{error}</div>}

      <div className="flex items-center gap-2 mb-6">
        <input type="checkbox" id="terms" className="auth-checkbox" required />
        <label htmlFor="terms" className="text-xs text-muted">I agree to the Terms & Conditions</label>
      </div>

      <button className="hero-analyze-btn w-full mb-4" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
      </button>

      <div className="auth-divider">
        <span>OR</span>
      </div>

      <div className="flex gap-3">
        <button type="button" className="auth-social-btn flex-1">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google
        </button>
        <button type="button" className="auth-social-btn flex-1">
          <Github size={20} />
          GitHub
        </button>
      </div>

      <p className="text-center text-xs text-muted mt-6">
        Already have an account? <button type="button" onClick={onLoginToggle} className="auth-link font-bold">Sign In</button>
      </p>
    </form>
  );
}
