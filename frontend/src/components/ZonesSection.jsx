import React from 'react';
import { ZONES } from '../data/mockData';
import { ArrowRight, CheckCircle2, Volume2, VolumeX, Utensils, Users } from 'lucide-react';

export default function ZonesSection({ onSelectZoneToBook }) {
  return (
    <section style={{ padding: '4.5rem 0', backgroundColor: '#faf6f0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            Tailored Productivity Environments
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.85rem' }}>
            Choose Your Ideal Study Zone
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Whether you need absolute zero-distraction silence, a comfortable space to study while eating, 
            or a collaborative table for team projects—we have the perfect seat.
          </p>
        </div>

        {/* 3 Zones Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {ZONES.map((zone) => (
            <div 
              key={zone.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Card Image Banner */}
              <div style={{ position: 'relative', height: '200px' }}>
                <img 
                  src={zone.image} 
                  alt={zone.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px'
                }}>
                  <span className="badge badge-primary" style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)' }}>
                    {zone.badge}
                  </span>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  fontSize: '2.2rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  backdropFilter: 'blur(4px)'
                }}>
                  {zone.icon}
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {zone.name}
                  </h3>
                  <div style={{ 
                    fontSize: '0.88rem', 
                    fontWeight: 600, 
                    color: 'var(--primary)',
                    marginBottom: '0.85rem' 
                  }}>
                    {zone.tagline}
                  </div>
                  
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    {zone.description}
                  </p>

                  {/* Rules & Features List */}
                  <div style={{
                    backgroundColor: 'var(--primary-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    border: '1px solid var(--primary-border)'
                  }}>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 700, 
                      color: 'var(--espresso)', 
                      textTransform: 'uppercase',
                      marginBottom: '0.6rem',
                      letterSpacing: '0.04em'
                    }}>
                      Zone Highlights & Rules:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {zone.rules.map((rule, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--espresso)' }}>
                          <CheckCircle2 size={15} color="var(--primary)" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer & Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rate</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--espresso)' }}>
                      ${zone.pricePerHour.toFixed(2)} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ hr</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelectZoneToBook(zone.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Select Zone & Book <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
