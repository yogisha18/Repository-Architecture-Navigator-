export const ZONES = [
  {
    id: 'silent',
    name: 'Silent Study Zone',
    tagline: 'Deep Focus & Absolute Quiet',
    description: 'Individual study booths designed for maximum concentration. No talking or food allowed.',
    icon: '🤫',
    image: '/silent_study_zone.png',
    rules: [
      'Individual study only',
      'Strictly NO talking or phone calls',
      'NO food allowed (Water allowed)',
      'Dedicated AC & Reading lamp',
      'Dual Charging Outlets (Power + USB-C)',
      'High-speed 1 Gbps Fiber WiFi'
    ],
    pricePerHour: 3.00,
    seatsCount: 12,
    badge: 'Deep Focus'
  },
  {
    id: 'food_study',
    name: 'Food + Study Zone',
    tagline: 'Study Comfortably While You Eat',
    description: 'Individual & dual desks where you can study and enjoy fresh meals delivered straight to your seat.',
    icon: '🍲',
    image: '/food_study_zone.png',
    rules: [
      'Study while eating',
      'Direct seat delivery for food orders',
      'Soft ambient background music',
      'Dedicated Charging Outlets',
      'High-speed 1 Gbps Fiber WiFi'
    ],
    pricePerHour: 3.50,
    seatsCount: 12,
    badge: 'Most Popular'
  },
  {
    id: 'discussion',
    name: 'Food + Discussion Zone',
    tagline: 'Collaborate & Brainstorm Together',
    description: 'Spacious group tables with whiteboards, perfect for team projects, peer studying, and discussions.',
    icon: '🗣️',
    image: '/discussion_zone.png',
    rules: [
      'Food & drinks allowed',
      'Group discussions & team projects',
      'Bigger tables with whiteboard walls',
      'Moderate conversation permitted',
      'Multiple charging strips for group devices'
    ],
    pricePerHour: 5.00,
    seatsCount: 8,
    badge: 'Group Projects'
  }
];

export const INITIAL_SEATS = {
  silent: [
    { id: 'S-01', number: 'S-01', type: 'Single Booth', isWindow: true, isBooked: false },
    { id: 'S-02', number: 'S-02', type: 'Single Booth', isWindow: true, isBooked: true },
    { id: 'S-03', number: 'S-03', type: 'Single Booth', isWindow: false, isBooked: false },
    { id: 'S-04', number: 'S-04', type: 'Single Booth', isWindow: false, isBooked: false },
    { id: 'S-05', number: 'S-05', type: 'Single Booth', isWindow: false, isBooked: true },
    { id: 'S-06', number: 'S-06', type: 'Single Booth', isWindow: false, isBooked: false },
    { id: 'S-07', number: 'S-07', type: 'Single Booth', isWindow: true, isBooked: false },
    { id: 'S-08', number: 'S-08', type: 'Single Booth', isWindow: true, isBooked: false },
    { id: 'S-09', number: 'S-09', type: 'Single Booth', isWindow: false, isBooked: true },
    { id: 'S-10', number: 'S-10', type: 'Single Booth', isWindow: false, isBooked: false },
    { id: 'S-11', number: 'S-11', type: 'Single Booth', isWindow: false, isBooked: false },
    { id: 'S-12', number: 'S-12', type: 'Single Booth', isWindow: true, isBooked: false }
  ],
  food_study: [
    { id: 'F-01', number: 'F-01', type: 'Solo Dining Desk', isWindow: true, isBooked: false },
    { id: 'F-02', number: 'F-02', type: 'Solo Dining Desk', isWindow: true, isBooked: false },
    { id: 'F-03', number: 'F-03', type: 'Solo Dining Desk', isWindow: false, isBooked: true },
    { id: 'F-04', number: 'F-04', type: 'Dual Study Desk', isWindow: false, isBooked: false },
    { id: 'F-05', number: 'F-05', type: 'Dual Study Desk', isWindow: false, isBooked: false },
    { id: 'F-06', number: 'F-06', type: 'Solo Dining Desk', isWindow: true, isBooked: false },
    { id: 'F-07', number: 'F-07', type: 'Solo Dining Desk', isWindow: true, isBooked: true },
    { id: 'F-08', number: 'F-08', type: 'Dual Study Desk', isWindow: false, isBooked: false },
    { id: 'F-09', number: 'F-09', type: 'Solo Dining Desk', isWindow: false, isBooked: false },
    { id: 'F-10', number: 'F-10', type: 'Dual Study Desk', isWindow: false, isBooked: false },
    { id: 'F-11', number: 'F-11', type: 'Solo Dining Desk', isWindow: true, isBooked: false },
    { id: 'F-12', number: 'F-12', type: 'Solo Dining Desk', isWindow: true, isBooked: false }
  ],
  discussion: [
    { id: 'D-01', number: 'D-01', type: 'Group Desk (4 Seats)', isWindow: true, isBooked: false },
    { id: 'D-02', number: 'D-02', type: 'Group Desk (4 Seats)', isWindow: false, isBooked: true },
    { id: 'D-03', number: 'D-03', type: 'Whiteboard Pod (6 Seats)', isWindow: false, isBooked: false },
    { id: 'D-04', number: 'D-04', type: 'Whiteboard Pod (6 Seats)', isWindow: true, isBooked: false },
    { id: 'D-05', number: 'D-05', type: 'Group Desk (4 Seats)', isWindow: false, isBooked: false },
    { id: 'D-06', number: 'D-06', type: 'Group Desk (4 Seats)', isWindow: true, isBooked: false },
    { id: 'D-07', number: 'D-07', type: 'Project Table (6 Seats)', isWindow: false, isBooked: true },
    { id: 'D-08', number: 'D-08', type: 'Project Table (6 Seats)', isWindow: true, isBooked: false }
  ]
};

export const MENU_CATEGORIES = [
  { id: 'all', name: 'All Items' },
  { id: 'coffee', name: 'Coffee & Tea' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'meals', name: 'Meals' },
  { id: 'drinks', name: 'Cold Drinks' }
];

export const MENU_ITEMS = [
  {
    id: 'm1',
    category: 'coffee',
    name: 'Concentration Espresso Double',
    description: 'Rich, bold double espresso shot to fuel late-night cram sessions.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    tags: ['Energy Boost', 'Hot']
  },
  {
    id: 'm2',
    category: 'coffee',
    name: 'Caramel Macchiato',
    description: 'Smooth espresso layered with steamed milk and drizzled with buttery caramel.',
    price: 4.80,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
    tags: ['Bestseller', 'Hot']
  },
  {
    id: 'm3',
    category: 'coffee',
    name: 'Iced Matcha Green Tea Latte',
    description: 'Organic Japanese matcha whisked with cold oat milk and light sweetener.',
    price: 5.20,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    tags: ['Antioxidant', 'Iced']
  },
  {
    id: 'm4',
    category: 'snacks',
    name: 'Artisan Butter Croissant',
    description: 'Flaky, buttery French pastry baked fresh daily in our oven.',
    price: 3.20,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    tags: ['Freshly Baked']
  },
  {
    id: 'm5',
    category: 'snacks',
    name: 'Avocado & Egg Toast',
    description: 'Sourdough toast topped with mashed avocado, poached egg, and chili flakes.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    tags: ['Healthy', 'Protein']
  },
  {
    id: 'm6',
    category: 'meals',
    name: 'Grilled Pesto Chicken Panini',
    description: 'Herb-grilled chicken breast, mozzarella, and basil pesto on crispy ciabatta.',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    tags: ['Filling', 'Hot Meal']
  },
  {
    id: 'm7',
    category: 'meals',
    name: 'Student Power Grain Bowl',
    description: 'Quinoa, roasted chickpeas, avocado, edamame, and lemon tahini dressing.',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    tags: ['Vegan', 'Brain Food']
  },
  {
    id: 'm8',
    category: 'drinks',
    name: 'Cold Brew Coffee',
    description: 'Steeped for 18 hours for an ultra-smooth, low-acid caffeine kick.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    tags: ['High Caffeine', 'Iced']
  },
  {
    id: 'm9',
    category: 'drinks',
    name: 'Berry Blast Brain Smoothie',
    description: 'Blended blueberries, strawberries, chia seeds, and almond milk.',
    price: 5.80,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
    tags: ['Superfood', 'Refreshing']
  }
];

export const STUDY_ESSENTIALS = [
  { id: 'e1', name: 'Ergonomic Gel Pen Set (4 Pack)', category: 'Stationery', price: 3.50, icon: '🖊️' },
  { id: 'e2', name: 'A5 Spiral Notebook (Lined 160 Pages)', category: 'Stationery', price: 4.90, icon: '📓' },
  { id: 'e3', name: 'Pastel Neon Highlighters (5 Colors)', category: 'Stationery', price: 3.90, icon: '🖍️' },
  { id: 'e4', name: 'Sticky Notes Multi-Color Cube', category: 'Stationery', price: 2.50, icon: '📝' },
  { id: 'e5', name: 'High-Speed B&W Printing (per page)', category: 'Services', price: 0.10, icon: '🖨️' },
  { id: 'e6', name: 'Color HD Document Printing (per page)', category: 'Services', price: 0.30, icon: '🎨' },
  { id: 'e7', name: 'Document High-Res Scanning (per doc)', category: 'Services', price: 0.50, icon: '📄' },
  { id: 'e8', name: 'Comb Binding & Cover Lamination', category: 'Services', price: 2.00, icon: '📑' }
];

export const FACILITIES = [
  { title: 'High-Speed Fiber WiFi', desc: '1 Gbps ultra-low latency internet for research & streaming.', icon: '⚡' },
  { title: 'Dedicated Charging Outlets', desc: 'Power plugs & USB-C ports at every individual desk.', icon: '🔌' },
  { title: 'Comfortable Study Desks', desc: 'Ergonomic seating and spacious wooden desks.', icon: '🪑' },
  { title: 'Filtered Water Station', desc: 'Unlimited complimentary chilled & hot water refills.', icon: '💧' },
  { title: 'Clean Washrooms', desc: 'Sanitized hourly with organic toiletries provided.', icon: '🧼' },
  { title: 'Study Essentials Counter', desc: 'Stationery, instant printing, binding & scanning.', icon: '📚' }
];
