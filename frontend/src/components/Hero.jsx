import React from 'react';
import { Calendar, Utensils, Zap, Wifi, BatteryCharging, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero({ onBookSeatClick, onOrderFoodClick }) {
  return (
    <section style={{
      padding: '3.5rem 0 3rem 0',
      background: 'linear-gradient(180deg, #fff7ed 0%, #faf6f0 100%)',
      borderBottom: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '3rem',
        alignItems: 'center'
      }}>
        {/* Left Text & Dual Action Hero Focus */}
        <div>
          <div className="badge badge-primary" style={{ marginBottom: '1.25rem', padding: '0.4rem 0.85rem' }}>
            <Zap size={14} /> Ultimate Student Productivity Space
          </div>
          
          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--espresso)',
            marginBottom: '1rem'
          }}>
            Study. Eat. <span style={{ color: 'var(--primary)' }}>Focus.</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            maxWidth: '540px',
            lineHeight: 1.6
          }}>
            A physical café built specifically for students. Reserve your ideal quiet seat across 
            our 3 study zones and get delicious fresh coffee and meals delivered <strong>directly to your desk</strong>.
          </p>

          {/* TWO PROMINENT BUTTONS - PRIMARY FOCUS OF THE HOMEPAGE */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}>
            <button 
              onClick={onBookSeatClick}
              className="btn btn-primary btn-lg pulse-primary"
              style={{
                padding: '1.1rem 2.2rem',
                fontSize: '1.15rem',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <Calendar size={22} />
              BOOK A SEAT
            </button>

            <button 
              onClick={onOrderFoodClick}
              className="btn btn-secondary btn-lg"
              style={{
                padding: '1.1rem 2.2rem',
                fontSize: '1.15rem',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <Utensils size={22} color="#fed7aa" />
              ORDER FOOD
            </button>
          </div>

          {/* Quick Features List */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e7e0d6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                backgroundColor: 'var(--primary-light)',
                padding: '0.4rem',
                borderRadius: '8px',
                color: 'var(--primary)'
              }}>
                <Wifi size={18} />
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--espresso)' }}>
                1 Gbps Fiber WiFi
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                backgroundColor: 'var(--accent-green-bg)',
                padding: '0.4rem',
                borderRadius: '8px',
                color: 'var(--accent-green)'
              }}>
                <BatteryCharging size={18} />
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--espresso)' }}>
                Outlets @ Every Seat
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                backgroundColor: '#eff6ff',
                padding: '0.4rem',
                borderRadius: '8px',
                color: '#2563eb'
              }}>
                <ShieldCheck size={18} />
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--espresso)' }}>
                Direct Seat Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Right Visual Image Card */}
        <div style={{ position: 'relative' }}>
          <div className="card" style={{
            padding: '0.75rem',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            transform: 'rotate(1deg)'
          }}>
            <img 
              src="/hero_study_cafe.png" 
              alt="Study Cafe Interior" 
              style={{
                width: '100%',
                height: '380px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)'
              }}
            />
            <div style={{
              padding: '1rem 0.5rem 0.5rem 0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontWeight: 700, color: 'var(--espresso)', fontSize: '0.95rem' }}>
                  Study Café Main Floor
                </span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Silent Booths • Solo Dining Desks • Group Discussion Rooms
                </p>
              </div>
              <span className="badge badge-green">Open Now (7 AM - 11 PM)</span>
            </div>
          </div>

          {/* Floating Seat Delivery Badge */}
          <div className="card" style={{
            position: 'absolute',
            bottom: '-15px',
            left: '-20px',
            padding: '0.85rem 1.25rem',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            border: '1px solid var(--primary-border)'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              fontSize: '1.2rem'
            }}>
              ☕
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--espresso)' }}>
                Food Delivered to Seat
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                No interruption to your studying
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
