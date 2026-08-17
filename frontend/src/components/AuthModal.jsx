import React, { useState } from 'react';
import { X, User, Lock, Mail, GraduationCap, CheckCircle2, ArrowRight, LogIn } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, currentUser }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('alex.morgan@university.edu');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Alex Morgan');
  const [studentId, setStudentId] = useState('STU-8821');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: name || 'Alex Morgan',
      email: email || 'alex.morgan@university.edu',
      studentId: studentId || 'STU-8821',
      phone: '+1 (555) 234-5678'
    };
    onLoginSuccess(userObj);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="card animate-fade-in" style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#ffffff',
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem auto'
          }}>
            <GraduationCap size={28} />
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--espresso)' }}>
            {currentUser ? 'Student Account' : (isSignUp ? 'Create Student Account' : 'Sign In to Study Café')}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {currentUser ? 'Logged in as student member' : 'Access instant seat bookings, order tracking & student rewards.'}
          </p>
        </div>

        {currentUser ? (
          /* Profile View if already signed in */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--primary-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '1.1rem', color: 'var(--espresso)' }}>{currentUser.name}</strong>
                <span className="badge badge-green">Active Student</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                📧 {currentUser.email}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                🪪 Student ID: {currentUser.studentId}
              </div>
            </div>

            <button 
              onClick={() => {
                onLoginSuccess(null);
                onClose();
              }}
              className="btn btn-outline"
              style={{ width: '100%' }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div>
            {/* Tab Switcher */}
            <div style={{
              display: 'flex',
              backgroundColor: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              padding: '0.3rem',
              marginBottom: '1.5rem'
            }}>
              <button
                onClick={() => setIsSignUp(false)}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: !isSignUp ? '#ffffff' : 'transparent',
                  color: !isSignUp ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: !isSignUp ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  boxShadow: !isSignUp ? 'var(--shadow-sm)' : 'none'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSignUp ? '#ffffff' : 'transparent',
                  color: isSignUp ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: isSignUp ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  boxShadow: isSignUp ? 'var(--shadow-sm)' : 'none'
                }}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.35rem' }}>
                    Full Name:
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      required
                      placeholder="Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.35rem' }}>
                  Student Email:
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="email" 
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.35rem' }}>
                  Password:
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
              >
                <LogIn size={18} /> {isSignUp ? 'Create Student Account' : 'Sign In Now'}
              </button>

              <div style={{
                textAlign: 'center',
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)'
              }}>
                Protected by Student Single Sign-On (SSO)
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
