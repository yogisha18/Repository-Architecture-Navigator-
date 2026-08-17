import React from 'react';
import { Coffee, BookmarkCheck, ShoppingBag, BookOpen, Layers, PhoneCall, User } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  bookedSeat,
  activeBookingsCount,
  activeOrdersCount,
  currentUser,
  onOpenAuthModal
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(194, 94, 0, 0.3)'
          }}>
            <Coffee size={24} />
          </div>
          <div>
            <div style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '1.35rem',
              color: 'var(--espresso)',
              lineHeight: 1.1
            }}>
              Study Café
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'var(--primary)', 
              fontWeight: 700, 
              letterSpacing: '0.05em' 
            }}>
              STUDY. EAT. FOCUS.
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('home')}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'home' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'home' ? 'var(--primary)' : 'var(--text-main)',
              fontWeight: activeTab === 'home' ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.92rem'
            }}
          >
            Home
          </button>

          <button 
            onClick={() => setActiveTab('book')}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'book' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'book' ? 'var(--primary)' : 'var(--text-main)',
              fontWeight: activeTab === 'book' ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <BookmarkCheck size={16} />
            Book a Seat
            {bookedSeat && (
              <span className="badge badge-green" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>
                Seat {bookedSeat.number}
              </span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab('menu')}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'menu' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'menu' ? 'var(--primary)' : 'var(--text-main)',
              fontWeight: activeTab === 'menu' ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Coffee size={16} />
            Menu
          </button>

          <button 
            onClick={() => setActiveTab('essentials')}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'essentials' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'essentials' ? 'var(--primary)' : 'var(--text-main)',
              fontWeight: activeTab === 'essentials' ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <BookOpen size={16} />
            Study Essentials
          </button>

          <button 
            onClick={() => setActiveTab('my-bookings')}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'my-bookings' ? 'var(--primary-light)' : 'transparent',
              color: activeTab === 'my-bookings' ? 'var(--primary)' : 'var(--text-main)',
              fontWeight: activeTab === 'my-bookings' ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.92rem',
              position: 'relative'
            }}
          >
            My Bookings
            {(activeBookingsCount > 0 || activeOrdersCount > 0) && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--accent-green)',
                borderRadius: '50%'
              }} />
            )}
          </button>
        </nav>

        {/* Quick Action Buttons: BOOK A SEAT & ORDER FOOD + CART */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={() => setActiveTab('cart')}
            style={{
              padding: '0.55rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              position: 'relative',
              fontWeight: 600,
              color: 'var(--espresso)'
            }}
          >
            <ShoppingBag size={18} color="var(--primary)" />
            <span style={{ fontSize: '0.9rem' }}>Cart</span>
            {cartCount > 0 && (
              <span style={{
                backgroundColor: 'var(--primary)',
                color: '#fff',
                borderRadius: 'var(--radius-full)',
                padding: '0.15rem 0.45rem',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* User Sign In / Profile Button */}
          <button
            onClick={onOpenAuthModal}
            style={{
              padding: '0.55rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: currentUser ? 'var(--primary-light)' : '#ffffff',
              color: currentUser ? 'var(--primary)' : 'var(--espresso)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.88rem'
            }}
          >
            <User size={18} color="var(--primary)" />
            <span>{currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}</span>
          </button>

          <button 
            onClick={() => setActiveTab('book')}
            className="btn btn-outline btn-sm"
          >
            Book Seat
          </button>

          <button 
            onClick={() => setActiveTab('menu')}
            className="btn btn-primary btn-sm"
          >
            Order Food
          </button>
        </div>
      </div>
    </header>
  );
}
