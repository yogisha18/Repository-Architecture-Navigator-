import React, { useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/mockData';
import { Coffee, Search, Plus, Minus, Check, ShoppingBag, Utensils, Sparkles } from 'lucide-react';

export default function FoodMenuSection({ cartItems, onAddToCart, onUpdateQuantity, bookedSeat, onOpenCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getItemCartQty = (id) => {
    const found = cartItems.find(c => c.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section style={{ padding: '3.5rem 0 4.5rem 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
            Fresh Café Menu
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>
            Order Food Directly To Your Desk
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.4rem' }}>
            {bookedSeat ? (
              <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
                ✓ Currently booked at Seat {bookedSeat.number} ({bookedSeat.zoneName}). Your orders will be delivered straight to your desk!
              </span>
            ) : (
              'Order fresh coffee, brain snacks, and warm meals. Select your seat number during checkout for table delivery!'
            )}
          </p>
        </div>

        {/* Search & Category Filter Pills */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          {/* Search bar */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search coffee, snacks, meals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.6rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                fontSize: '0.92rem',
                outline: 'none',
                backgroundColor: 'var(--bg-main)'
              }}
            />
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '0.55rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  border: activeCategory === cat.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: activeCategory === cat.id ? 'var(--primary)' : '#ffffff',
                  color: activeCategory === cat.id ? '#ffffff' : 'var(--espresso)',
                  fontWeight: activeCategory === cat.id ? 700 : 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {filteredItems.map(item => {
            const qty = getItemCartQty(item.id);

            return (
              <div 
                key={item.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 0,
                  overflow: 'hidden',
                  backgroundColor: '#ffffff'
                }}
              >
                <div>
                  {/* Image & Tag */}
                  <div style={{ position: 'relative', height: '190px' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.3rem' }}>
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="badge badge-primary" style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.25rem 1.25rem 0.5rem 1.25rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.35rem' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer: Price & Add to Cart */}
                <div style={{
                  padding: '1rem 1.25rem 1.25rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--border-color)',
                  backgroundColor: '#faf6f0'
                }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>
                    ${item.price.toFixed(2)}
                  </div>

                  {qty === 0 ? (
                    <button 
                      onClick={() => onAddToCart(item)}
                      className="btn btn-primary btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Plus size={16} /> Add to Cart
                    </button>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      backgroundColor: 'var(--primary-light)',
                      border: '1px solid var(--primary-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.25rem 0.5rem'
                    }}>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, qty - 1)}
                        style={{
                          border: 'none',
                          backgroundColor: '#ffffff',
                          color: 'var(--primary)',
                          borderRadius: '4px',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontWeight: 800
                        }}
                      >
                        -
                      </button>

                      <span style={{ fontWeight: 800, color: 'var(--espresso)', fontSize: '0.95rem' }}>
                        {qty}
                      </span>

                      <button 
                        onClick={() => onUpdateQuantity(item.id, qty + 1)}
                        style={{
                          border: 'none',
                          backgroundColor: 'var(--primary)',
                          color: '#ffffff',
                          borderRadius: '4px',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontWeight: 800
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Floating View Cart Notification if items added */}
        {cartItems.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 90
          }}>
            <button
              onClick={onOpenCart}
              className="btn btn-primary pulse-primary"
              style={{
                padding: '0.9rem 1.6rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-lg)',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <ShoppingBag size={20} />
              <span>View Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.25)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: 800 }}>
                ${cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0).toFixed(2)}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
