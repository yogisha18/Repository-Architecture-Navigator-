import React, { useState } from 'react';
import { ZONES } from '../data/mockData';
import { Calendar, Clock, CheckCircle2, AlertCircle, Info, Sparkles, MapPin, Armchair } from 'lucide-react';

export default function BookSeatSection({ 
  selectedZoneId, 
  setSelectedZoneId, 
  seatsData, 
  onConfirmBookingLaunch 
}) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [durationHours, setDurationHours] = useState(2);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const activeZone = ZONES.find(z => z.id === selectedZoneId) || ZONES[0];
  const currentSeats = seatsData[selectedZoneId] || [];

  const calculateTotalPrice = () => {
    return (activeZone.pricePerHour * durationHours).toFixed(2);
  };

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;
    setSelectedSeat(seat);
  };

  const handleProceedToCheckout = () => {
    if (!selectedSeat) return;
    onConfirmBookingLaunch({
      seat: selectedSeat,
      zone: activeZone,
      date: selectedDate,
      durationHours: durationHours,
      totalPrice: calculateTotalPrice()
    });
  };

  return (
    <section style={{ padding: '3.5rem 0 4.5rem 0', backgroundColor: '#faf6f0' }}>
      <div className="container">
        {/* Title & Tagline */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
            Interactive Seat Selector
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>
            Reserve Your Study Seat
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.4rem' }}>
            Choose your date, duration, and preferred zone. Pick an available seat on the interactive map below.
          </p>
        </div>

        {/* Step 1 & 2 Controls: Zone, Date, Duration Bar */}
        <div className="card" style={{
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            {/* Zone Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.4rem' }}>
                1. Select Study Zone:
              </label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {ZONES.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => {
                      setSelectedZoneId(zone.id);
                      setSelectedSeat(null);
                    }}
                    style={{
                      flex: 1,
                      padding: '0.6rem 0.4rem',
                      borderRadius: 'var(--radius-sm)',
                      border: selectedZoneId === zone.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      backgroundColor: selectedZoneId === zone.id ? 'var(--primary-light)' : '#fff',
                      color: selectedZoneId === zone.id ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: selectedZoneId === zone.id ? 700 : 500,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {zone.icon} {zone.name.replace(' Zone', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.4rem' }}>
                2. Select Date:
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--espresso)',
                    backgroundColor: '#fff'
                  }}
                />
              </div>
            </div>

            {/* Duration Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.4rem' }}>
                3. Study Duration:
              </label>
              <select
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--espresso)',
                  backgroundColor: '#fff',
                  cursor: 'pointer'
                }}
              >
                <option value={1}>1 Hour ($3.50)</option>
                <option value={2}>2 Hours ($7.00) - Recommended</option>
                <option value={4}>4 Hours ($14.00) - Half Session</option>
                <option value={6}>6 Hours ($21.00) - Intensive</option>
                <option value={10}>10 Hours ($35.00) - All Day Pass</option>
              </select>
            </div>
          </div>
        </div>

        {/* Zone Info Banner */}
        <div style={{
          backgroundColor: 'var(--primary-light)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '1.8rem' }}>{activeZone.icon}</span>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--espresso)' }}>
                {activeZone.name} — ${activeZone.pricePerHour.toFixed(2)}/hr
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {activeZone.description}
              </p>
            </div>
          </div>

          {/* Seat Status Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: '#ecfdf5', border: '2px solid var(--accent-green)' }} />
              <span>Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: '#fee2e2', border: '2px solid var(--accent-red)' }} />
              <span>Booked</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: 'var(--primary)', border: '2px solid var(--espresso)' }} />
              <span>Selected</span>
            </div>
          </div>
        </div>

        {/* Main Seat Selection Grid & Booking Summary Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.9fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Visual Seat Map Card */}
          <div className="card" style={{ backgroundColor: '#ffffff', padding: '1.75rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Visual Seat Map</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Click an available green seat to select
                </span>
              </div>
              <span className="badge badge-primary">
                {currentSeats.filter(s => !s.isBooked).length} Seats Free
              </span>
            </div>

            {/* Simulated Cafe Desk Layout Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.1rem'
            }}>
              {currentSeats.map((seat) => {
                const isSelected = selectedSeat && selectedSeat.id === seat.id;
                const isBooked = seat.isBooked;

                let borderStyle = '2px solid var(--accent-green)';
                let bgStyle = '#f0fdf4';
                let textColor = 'var(--espresso)';

                if (isBooked) {
                  borderStyle = '2px solid #fca5a5';
                  bgStyle = '#fef2f2';
                  textColor = '#991b1b';
                } else if (isSelected) {
                  borderStyle = '3px solid var(--espresso)';
                  bgStyle = 'var(--primary)';
                  textColor = '#ffffff';
                }

                return (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat)}
                    disabled={isBooked}
                    style={{
                      padding: '1.1rem 0.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: borderStyle,
                      backgroundColor: bgStyle,
                      color: textColor,
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      boxShadow: isSelected ? 'var(--shadow-glow)' : 'none'
                    }}
                  >
                    <Armchair size={24} color={isSelected ? '#fff' : (isBooked ? '#ef4444' : 'var(--accent-green)')} />
                    
                    <span style={{ fontWeight: 800, fontSize: '1rem' }}>
                      {seat.number}
                    </span>

                    <span style={{ fontSize: '0.72rem', fontWeight: 600, opacity: 0.85 }}>
                      {isBooked ? 'Booked' : (isSelected ? 'Selected' : seat.type)}
                    </span>

                    {seat.isWindow && !isBooked && (
                      <span style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        fontSize: '0.65rem',
                        backgroundColor: 'rgba(59, 130, 246, 0.15)',
                        color: '#2563eb',
                        padding: '0.1rem 0.3rem',
                        borderRadius: '4px',
                        fontWeight: 700
                      }}>
                        🪟 Window
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ 
              marginTop: '1.5rem',
              padding: '0.85rem',
              backgroundColor: 'var(--bg-main)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Info size={16} color="var(--primary)" />
              <span>
                All seats include individual AC vents, dual power outlets, and high-speed WiFi access code provided upon booking.
              </span>
            </div>
          </div>

          {/* Booking Confirmation & Price Breakdown Card */}
          <div className="card" style={{ 
            backgroundColor: '#ffffff', 
            padding: '1.75rem',
            position: 'sticky',
            top: '90px'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              Booking Summary
            </h3>

            {selectedSeat ? (
              <div>
                <div style={{
                  backgroundColor: 'var(--primary-light)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  border: '1px solid var(--primary-border)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Selected Seat:</span>
                    <span className="badge badge-primary" style={{ fontSize: '1rem', padding: '0.3rem 0.8rem' }}>
                      {selectedSeat.number}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Zone:</span>
                    <strong style={{ color: 'var(--espresso)' }}>{activeZone.name}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Date:</span>
                    <strong style={{ color: 'var(--espresso)' }}>{selectedDate}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Duration:</span>
                    <strong style={{ color: 'var(--espresso)' }}>{durationHours} Hours</strong>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                    <span>Rate (${activeZone.pricePerHour.toFixed(2)} x {durationHours} hrs)</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                    <span>WiFi & Facilities Fee</span>
                    <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>FREE</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '1.3rem', 
                    fontWeight: 800, 
                    color: 'var(--espresso)',
                    paddingTop: '0.75rem',
                    borderTop: '2px dashed var(--border-color)',
                    marginTop: '0.5rem'
                  }}>
                    <span>Total Amount</span>
                    <span style={{ color: 'var(--primary)' }}>${calculateTotalPrice()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleProceedToCheckout}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
                >
                  <Sparkles size={18} /> Confirm & Pay ${calculateTotalPrice()}
                </button>
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '2.5rem 1rem', 
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                border: '2px dashed var(--border-color)'
              }}>
                <Armchair size={42} color="var(--primary)" style={{ opacity: 0.6, marginBottom: '0.75rem' }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--espresso)', marginBottom: '0.4rem' }}>
                  No Seat Selected
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Please click an available seat on the visual seat map to view booking details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
