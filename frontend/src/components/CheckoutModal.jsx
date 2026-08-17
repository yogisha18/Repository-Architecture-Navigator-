import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Smartphone, Wallet, CheckCircle2, MapPin } from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  checkoutData, 
  onCompleteCheckout 
}) {
  const [customerName, setCustomerName] = useState('Alex Morgan');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 234-5678');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !checkoutData) return null;

  const isSeatBooking = checkoutData.type === 'seat';
  const totalAmount = isSeatBooking ? checkoutData.totalPrice : checkoutData.total.toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onCompleteCheckout({
        ...checkoutData,
        customerName,
        customerPhone,
        paymentMethod,
        timestamp: new Date().toLocaleString()
      });
    }, 800);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 250,
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '540px',
        backgroundColor: '#ffffff',
        padding: '2rem',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Close button */}
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

        {/* Title */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.4rem' }}>
            Prototype Checkout & Payment
          </span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--espresso)' }}>
            {isSeatBooking ? 'Confirm Seat Reservation' : 'Place Food Order'}
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Order Summary Box */}
          <div style={{
            backgroundColor: 'var(--primary-light)',
            border: '1px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--espresso)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
              Order Breakdown
            </h4>

            {isSeatBooking ? (
              <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Service:</span>
                  <strong>Study Seat Reservation</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Zone:</span>
                  <strong>{checkoutData.zone.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Seat Number:</span>
                  <span className="badge badge-green">Seat {checkoutData.seat.number}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Date & Duration:</span>
                  <strong>{checkoutData.date} ({checkoutData.durationHours} Hours)</strong>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-green)', fontWeight: 700 }}>
                  <span><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> Delivering To:</span>
                  <span>Seat {checkoutData.seatNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Items Count:</span>
                  <strong>{checkoutData.items.reduce((a, b) => a + b.quantity, 0)} items</strong>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {checkoutData.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                </div>
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '1.2rem', 
              fontWeight: 800, 
              color: 'var(--espresso)',
              marginTop: '0.85rem',
              paddingTop: '0.6rem',
              borderTop: '1px dashed var(--primary-border)'
            }}>
              <span>Total Due:</span>
              <span style={{ color: 'var(--primary)' }}>${totalAmount}</span>
            </div>
          </div>

          {/* Customer Info Form */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.4rem' }}>
              Student Name:
            </label>
            <input 
              type="text" 
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.92rem',
                marginBottom: '1rem'
              }}
            />

            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.4rem' }}>
              Phone Number (for SMS Seat Updates):
            </label>
            <input 
              type="tel" 
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.92rem'
              }}
            />
          </div>

          {/* Payment Method Options */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.5rem' }}>
              Select Payment Method:
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                border: paymentMethod === 'upi' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: paymentMethod === 'upi' ? 'var(--primary-light)' : '#ffffff',
                cursor: 'pointer'
              }}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="upi" 
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                <Smartphone size={20} color="var(--primary)" />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>UPI / QR Code Scan</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                border: paymentMethod === 'card' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: paymentMethod === 'card' ? 'var(--primary-light)' : '#ffffff',
                cursor: 'pointer'
              }}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <CreditCard size={20} color="var(--espresso)" />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Credit / Debit Card</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                border: paymentMethod === 'cash' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: paymentMethod === 'cash' ? 'var(--primary-light)' : '#ffffff',
                cursor: 'pointer'
              }}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cash" 
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <Wallet size={20} color="var(--accent-green)" />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Pay Cash at Counter / Seat</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
          >
            {isSubmitting ? 'Processing Order...' : `Confirm Payment ($${totalAmount})`}
          </button>
        </form>
      </div>
    </div>
  );
}
