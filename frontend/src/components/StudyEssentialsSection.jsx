import React from 'react';
import { STUDY_ESSENTIALS } from '../data/mockData';
import { BookOpen, Printer, Plus, Check } from 'lucide-react';

export default function StudyEssentialsSection({ onAddToCart, cartItems }) {
  const getQty = (id) => {
    const f = cartItems.find(c => c.id === id);
    return f ? f.quantity : 0;
  };

  return (
    <section style={{ padding: '3.5rem 0 4.5rem 0', backgroundColor: '#faf6f0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
            On-Site Counter Services
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>
            Study Essentials & Printing Counter
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.4rem' }}>
            Forgot your highlighter? Need exam notes printed or bound? Order stationery and document 
            services straight from our counter.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem'
        }}>
          {STUDY_ESSENTIALS.map(item => {
            const qty = getQty(item.id);

            return (
              <div 
                key={item.id}
                className="card"
                style={{
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.25rem'
                }}
              >
                <div>
                  <div style={{
                    fontSize: '2rem',
                    marginBottom: '0.75rem',
                    backgroundColor: 'var(--primary-light)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </div>
                  <span className="badge badge-green" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.35rem' }}>
                    {item.name}
                  </h3>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1.25rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--espresso)' }}>
                    ${item.price.toFixed(2)}
                  </div>

                  <button
                    onClick={() => onAddToCart({ ...item, image: null, description: item.name })}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
                  >
                    {qty > 0 ? `Added (${qty})` : '+ Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
