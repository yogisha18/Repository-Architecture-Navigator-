import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ZonesSection from './components/ZonesSection';
import FacilitiesSection from './components/FacilitiesSection';
import BookSeatSection from './components/BookSeatSection';
import FoodMenuSection from './components/FoodMenuSection';
import StudyEssentialsSection from './components/StudyEssentialsSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import MyBookingsPage from './components/MyBookingsPage';
import { INITIAL_SEATS } from './data/mockData';
import { Coffee, BookmarkCheck, Utensils, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedZoneId, setSelectedZoneId] = useState('food_study');
  const [seatsData, setSeatsData] = useState(INITIAL_SEATS);
  
  // User state & Auth modal state
  const [currentUser, setCurrentUser] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@university.edu',
    studentId: 'STU-8821',
    phone: '+1 (555) 234-5678'
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 'm2',
      name: 'Caramel Macchiato',
      price: 4.80,
      image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
      quantity: 1,
      category: 'coffee'
    },
    {
      id: 'm4',
      name: 'Artisan Butter Croissant',
      price: 3.20,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      quantity: 1,
      category: 'snacks'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal checkout state
  const [checkoutModalData, setCheckoutModalData] = useState(null);

  // Active bookings state (pre-populated with 1 realistic booking)
  const [bookings, setBookings] = useState([
    {
      id: 'ST-9482',
      seat: { id: 'F-04', number: 'F-04', type: 'Dual Study Desk' },
      zone: { name: 'Food + Study Zone', id: 'food_study' },
      date: new Date().toISOString().split('T')[0],
      durationHours: 2,
      totalPrice: '7.00',
      timestamp: 'Today, 09:30 AM'
    }
  ]);

  // Active food orders state (pre-populated with 1 realistic food order)
  const [orders, setOrders] = useState([
    {
      id: 'FD-4019',
      items: [
        { name: 'Concentration Espresso Double', quantity: 1 },
        { name: 'Grilled Pesto Chicken Panini', quantity: 1 }
      ],
      seatNumber: 'F-04',
      status: 'Preparing', // Order Received -> Preparing -> Ready -> Delivered
      total: 12.40,
      timestamp: 'Today, 10:15 AM'
    }
  ]);

  // Cart actions
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
    } else {
      setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i));
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  // Launch checkout modal for seat booking
  const handleConfirmSeatBookingLaunch = (bookingPayload) => {
    setCheckoutModalData({
      type: 'seat',
      ...bookingPayload
    });
  };

  // Launch checkout modal for food cart
  const handleProceedCartToCheckout = (cartPayload) => {
    setIsCartOpen(false);
    setCheckoutModalData({
      type: 'food',
      ...cartPayload
    });
  };

  // Complete Checkout (Mock Payment)
  const handleCompleteCheckout = (finalData) => {
    if (finalData.type === 'seat') {
      const newBooking = {
        id: `ST-${Math.floor(1000 + Math.random() * 9000)}`,
        seat: finalData.seat,
        zone: finalData.zone,
        date: finalData.date,
        durationHours: finalData.durationHours,
        totalPrice: finalData.totalPrice,
        customerName: finalData.customerName,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Mark seat as booked in state
      setSeatsData(prev => {
        const zoneSeats = prev[finalData.zone.id] || [];
        const updatedSeats = zoneSeats.map(s => s.id === finalData.seat.id ? { ...s, isBooked: true } : s);
        return { ...prev, [finalData.zone.id]: updatedSeats };
      });

      setBookings(prev => [newBooking, ...prev]);
      setCheckoutModalData(null);
      setActiveTab('my-bookings');
    } else {
      const newOrder = {
        id: `FD-${Math.floor(1000 + Math.random() * 9000)}`,
        items: finalData.items,
        seatNumber: finalData.seatNumber,
        status: 'Order Received',
        total: finalData.total,
        customerName: finalData.customerName,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setOrders(prev => [newOrder, ...prev]);
      setCartItems([]);
      setCheckoutModalData(null);
      setActiveTab('my-bookings');
    }
  };

  // Live status simulator for order progression
  const handleSimulateOrderStatus = (orderId) => {
    const statuses = ['Order Received', 'Preparing', 'Ready', 'Delivered'];
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const currIdx = statuses.indexOf(ord.status);
        const nextIdx = Math.min(currIdx + 1, statuses.length - 1);
        return { ...ord, status: statuses[nextIdx] };
      }
      return ord;
    }));
  };

  // Get active booked seat for navbar badge
  const activeBookedSeat = bookings.length > 0 ? {
    number: bookings[0].seat.number,
    zoneName: bookings[0].zone.name
  } : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab === 'cart' ? 'menu' : activeTab}
        setActiveTab={(tab) => {
          if (tab === 'cart') setIsCartOpen(true);
          else setActiveTab(tab);
        }}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        bookedSeat={activeBookedSeat}
        activeBookingsCount={bookings.length}
        activeOrdersCount={orders.length}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Router */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' && (
          <>
            <Hero 
              onBookSeatClick={() => setActiveTab('book')}
              onOrderFoodClick={() => setActiveTab('menu')}
            />

            <ZonesSection 
              onSelectZoneToBook={(zoneId) => {
                setSelectedZoneId(zoneId);
                setActiveTab('book');
              }}
            />

            <FacilitiesSection />
          </>
        )}

        {activeTab === 'book' && (
          <BookSeatSection 
            selectedZoneId={selectedZoneId}
            setSelectedZoneId={setSelectedZoneId}
            seatsData={seatsData}
            onConfirmBookingLaunch={handleConfirmSeatBookingLaunch}
          />
        )}

        {activeTab === 'menu' && (
          <FoodMenuSection 
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            bookedSeat={activeBookedSeat}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {activeTab === 'essentials' && (
          <StudyEssentialsSection 
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
          />
        )}

        {activeTab === 'my-bookings' && (
          <MyBookingsPage 
            bookings={bookings}
            orders={orders}
            onSimulateOrderStatus={handleSimulateOrderStatus}
            onGoToBookSeat={() => setActiveTab('book')}
            onGoToMenu={() => setActiveTab('menu')}
          />
        )}
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        bookedSeat={activeBookedSeat}
        onProceedToCheckout={handleProceedCartToCheckout}
      />

      {/* Modal for Payment Checkout Prototype */}
      <CheckoutModal 
        isOpen={!!checkoutModalData}
        onClose={() => setCheckoutModalData(null)}
        checkoutData={checkoutModalData}
        onCompleteCheckout={handleCompleteCheckout}
      />

      {/* Modal for Student Sign In / Profile */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={(userObj) => setCurrentUser(userObj)}
      />

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--espresso)',
        color: '#d3c7b6',
        padding: '3rem 0 2rem 0',
        marginTop: 'auto',
        borderTop: '1px solid var(--espresso-light)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '2.5rem',
            marginBottom: '2.5rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                <Coffee size={24} color="var(--primary)" />
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                  Study Café
                </h4>
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#a89c8e' }}>
                The ultimate productivity space for students. Reserve quiet study seats and order fresh food directly to your table.
              </p>
            </div>

            <div>
              <h5 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                Study Zones
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem' }}>
                <li>Silent Study Zone</li>
                <li>Food + Study Zone</li>
                <li>Food + Discussion Zone</li>
              </ul>
            </div>

            <div>
              <h5 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                Quick Links
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem' }}>
                <li onClick={() => setActiveTab('book')} style={{ cursor: 'pointer' }}>Book a Seat</li>
                <li onClick={() => setActiveTab('menu')} style={{ cursor: 'pointer' }}>Order Food</li>
                <li onClick={() => setActiveTab('essentials')} style={{ cursor: 'pointer' }}>Study Essentials</li>
                <li onClick={() => setActiveTab('my-bookings')} style={{ cursor: 'pointer' }}>My Bookings & Orders</li>
              </ul>
            </div>

            <div>
              <h5 style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                Café Hours & Location
              </h5>
              <p style={{ fontSize: '0.88rem', color: '#a89c8e', lineHeight: 1.6 }}>
                📍 University Avenue, Block 4<br/>
                ⏰ Open Daily: 7:00 AM - 11:00 PM<br/>
                ⚡ Fiber WiFi Included
              </p>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            paddingTop: '1.5rem',
            borderTop: '1px solid #3d261b',
            fontSize: '0.82rem',
            color: '#8c7e70'
          }}>
            © {new Date().getFullYear()} Study Café. "Study. Eat. Focus." All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
