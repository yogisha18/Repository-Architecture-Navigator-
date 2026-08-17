import React from 'react';
import { FACILITIES } from '../data/mockData';

export default function FacilitiesSection() {
  return (
    <section style={{ padding: '4rem 0', backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
            Built For Student Comfort
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Everything You Need To Study Productively
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem' }}>
            We provide all the infrastructure so you can focus 100% on your exams and assignments.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.75rem'
        }}>
          {FACILITIES.map((fac, idx) => (
            <div 
              key={idx}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{
                fontSize: '2rem',
                backgroundColor: '#ffffff',
                width: '54px',
                height: '54px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
                flexShrink: 0
              }}>
                {fac.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.3rem' }}>
                  {fac.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {fac.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
