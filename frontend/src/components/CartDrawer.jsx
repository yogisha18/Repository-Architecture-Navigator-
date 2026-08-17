import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MapPin, Coffee, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  bookedSeat,
  onProceedToCheckout 
}) {
  // State for seat number selection for direct seat food delivery
  const [selectedSeatNumber, setSelectedSeatNumber] = useState(
    bookedSeat ? bookedSeat.number : 'F-04'
  );

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCheckoutClick = () => {
    onProceedToCheckout({
      items: cartItems,
      seatNumber: selectedSeatNumber,
      subtotal,
      tax,
      total
    });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.25s ease-out'
      }}>
        {/* Cart Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#faf6f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={22} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--espresso)' }}>
              Your Cart
            </h3>
            <span className="badge badge-primary">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>

          <button 
            onClick={onClose}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '0.4rem',
              borderRadius: '50%'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Body */}
        <div style={{ padding: '1.5rem', flexGrow: 1, overflowY: 'auto' }}>
          {/* IMPORTANT SEAT NUMBER SELECTION FOR FOOD DELIVERY */}
          <div style={{
            backgroundColor: 'var(--primary-light)',
            border: '1.5px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <MapPin size={18} color="var(--primary)" />
              <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--espresso)' }}>
                Direct Seat Delivery Location:
              </label>
            </div>
            
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
              Select your study seat number where our staff will deliver your food:
            </p>

            <select
              value={selectedSeatNumber}
              onChange={(e) => setSelectedSeatNumber(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--primary-border)',
                fontWeight: 700,
                color: 'var(--espresso)',
                backgroundColor: '#ffffff',
                fontSize: '0.95rem'
              }}
            >
              <optgroup label="Silent Study Zone Seats">
                <option value="S-01">Seat S-01 (Silent Booth)</option>
                <option value="S-03">Seat S-03 (Silent Booth)</option>
                <option value="S-04">Seat S-04 (Silent Booth)</option>
                <option value="S-06">Seat S-06 (Silent Booth)</option>
              </optgroup>

              <optgroup label="Food + Study Zone Seats (Recommended)">
                <option value="F-01">Seat F-01 (Solo Dining Desk)</option>
                <option value="F-02">Seat F-02 (Solo Dining Desk)</option>
                <option value="F-04">Seat F-04 (Dual Study Desk)</option>
                <option value="F-05">Seat F-05 (Dual Study Desk)</option>
                <option value="F-08">Seat F-08 (Dual Study Desk)</option>
              </optgroup>

              <optgroup label="Food + Discussion Zone Seats">
                <option value="D-01">Seat D-01 (Group Table)</option>
                <option value="D-03">Seat D-03 (Whiteboard Pod)</option>
                <option value="D-04">Seat D-04 (Whiteboard Pod)</option>
              </optgroup>
            </select>

            {bookedSeat && bookedSeat.number === selectedSeatNumber && (
              <div style={{ fontSize: '0.78rem', color: 'var(--accent-green)', fontWeight: 700, marginTop: '0.4rem' }}>
                ✓ Matches your active seat reservation!
              </div>
            )}
          </div>

          {/* Cart Item List */}
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Coffee size={48} color="var(--primary)" style={{ opacity: 0.5, marginBottom: '0.75rem' }} />
              <h4 style={{ fontWeight: 700, color: 'var(--espresso)' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.88rem', marginTop: '0.3rem' }}>
                Add coffee, snacks, or study essentials to start your order.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '52px', height: '52px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                    ) : (
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        {item.icon || '☕'}
                      </div>
                    )}

                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--espresso)' }}>
                        {item.name}
                      </h4>
                      <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Quantity Selector */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      backgroundColor: 'var(--bg-main)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.2rem 0.4rem'
                    }}>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 800, padding: '0 0.3rem' }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 800, padding: '0 0.3rem' }}
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: '#faf6f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '1.25rem', 
              fontWeight: 800, 
              color: 'var(--espresso)',
              marginBottom: '1.25rem',
              paddingTop: '0.5rem',
              borderTop: '1px dashed var(--border-color)'
            }}>
              <span>Total Amount</span>
              <span style={{ color: 'var(--primary)' }}>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.95rem', fontSize: '1.05rem' }}
            >
              Place Order (${total.toFixed(2)}) <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
