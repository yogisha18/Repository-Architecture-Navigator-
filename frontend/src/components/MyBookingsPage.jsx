import React from 'react';
import { BookmarkCheck, Utensils, Clock, CheckCircle2, MapPin, QrCode, Play, Sparkles } from 'lucide-react';

export default function MyBookingsPage({ 
  bookings, 
  orders, 
  onSimulateOrderStatus,
  onGoToBookSeat,
  onGoToMenu 
}) {
  return (
    <section style={{ padding: '3.5rem 0 5rem 0', backgroundColor: '#faf6f0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
            Active Tickets & Live Tracker
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>
            My Bookings & Orders
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.4rem' }}>
            Track your reserved study seat details and watch your live food order status update in real-time.
          </p>
        </div>

        {/* SECTION 1: SEAT BOOKINGS */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <BookmarkCheck size={22} color="var(--primary)" />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--espresso)' }}>
              Reserved Study Seats ({bookings.length})
            </h3>
          </div>

          {bookings.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem', backgroundColor: '#ffffff' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                You have no active seat reservations yet.
              </p>
              <button onClick={onGoToBookSeat} className="btn btn-primary btn-sm">
                Book a Study Seat Now
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.75rem' }}>
              {bookings.map((b) => (
                <div key={b.id} className="card" style={{ backgroundColor: '#ffffff', borderLeft: '6px solid var(--primary)', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <span className="badge badge-green" style={{ marginBottom: '0.35rem' }}>
                        Active Ticket #{b.id}
                      </span>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--espresso)' }}>
                        {b.zone.name}
                      </h4>
                    </div>

                    <div style={{
                      backgroundColor: 'var(--primary-light)',
                      border: '1.5px solid var(--primary-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.4rem 0.85rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>
                        Seat Number
                      </div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--espresso)' }}>
                        {b.seat.number}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.75rem',
                    backgroundColor: 'var(--bg-main)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    marginBottom: '1rem',
                    fontSize: '0.88rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date</div>
                      <div style={{ fontWeight: 700, color: 'var(--espresso)' }}>{b.date}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Duration</div>
                      <div style={{ fontWeight: 700, color: 'var(--espresso)' }}>{b.durationHours} Hours</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Paid</div>
                      <div style={{ fontWeight: 700, color: 'var(--primary)' }}>${b.totalPrice}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={16} color="var(--accent-green)" />
                      <span>Show this ticket at café desk for check-in</span>
                    </div>
                    <QrCode size={24} color="var(--espresso)" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: LIVE FOOD ORDERS WITH STATUS PROGRESS BAR */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <Utensils size={22} color="var(--primary)" />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--espresso)' }}>
              Live Seat Food Delivery Tracker ({orders.length})
            </h3>
          </div>

          {orders.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem', backgroundColor: '#ffffff' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                You have no food orders in progress.
              </p>
              <button onClick={onGoToMenu} className="btn btn-secondary btn-sm">
                Order Food to Your Seat
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {orders.map((ord) => {
                const statuses = ['Order Received', 'Preparing', 'Ready', 'Delivered'];
                const currentIdx = statuses.indexOf(ord.status);

                return (
                  <div key={ord.id} className="card" style={{ backgroundColor: '#ffffff', padding: '1.75rem' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span className="badge badge-primary">Order #{ord.id}</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{ord.timestamp}</span>
                        </div>
                        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '0.4rem', color: 'var(--espresso)' }}>
                          {ord.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </h4>
                      </div>

                      <div style={{
                        backgroundColor: 'var(--primary-light)',
                        border: '1px solid var(--primary-border)',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'right'
                      }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                          Delivering Directly To
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--espresso)' }}>
                          Seat {ord.seatNumber}
                        </div>
                      </div>
                    </div>

                    {/* LIVE STATUS PROGRESS BAR (Received -> Preparing -> Ready -> Delivered) */}
                    <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                        {statuses.map((st, idx) => {
                          const isActive = idx <= currentIdx;
                          const isCurrent = idx === currentIdx;

                          return (
                            <div key={st} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: isActive ? 'var(--primary)' : '#e7e0d6',
                                color: isActive ? '#ffffff' : 'var(--text-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 0.4rem auto',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                boxShadow: isCurrent ? '0 0 12px rgba(194, 94, 0, 0.4)' : 'none',
                                border: isCurrent ? '2px solid var(--espresso)' : 'none'
                              }}>
                                {idx + 1}
                              </div>

                              <span style={{ 
                                fontSize: '0.82rem', 
                                fontWeight: isCurrent ? 800 : (isActive ? 600 : 400),
                                color: isCurrent ? 'var(--primary)' : 'var(--espresso)'
                              }}>
                                {st}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Progress Line */}
                      <div style={{
                        height: '6px',
                        backgroundColor: '#e7e0d6',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${((currentIdx + 1) / statuses.length) * 100}%`,
                          backgroundColor: 'var(--primary)',
                          transition: 'width 0.4s ease'
                        }} />
                      </div>
                    </div>

                    {/* Footer Controls: Estimated Prep Time & Simulator Button */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                        <Clock size={16} color="var(--primary)" />
                        <span>
                          Estimated Prep Time: <strong>{ord.status === 'Delivered' ? 'Delivered 🎉' : '8 - 12 Minutes'}</strong>
                        </span>
                      </div>

                      {ord.status !== 'Delivered' && (
                        <button
                          onClick={() => onSimulateOrderStatus(ord.id)}
                          className="btn btn-outline btn-sm"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
                        >
                          <Play size={14} color="var(--primary)" /> Simulate Next Status Step
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
