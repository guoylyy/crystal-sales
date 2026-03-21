// Product Type
export interface Product {
  id: string;
  name: string;
  description: string;
  features?: string[];
  image?: string;
  category?: string;
}

// Company Data
export const companyInfo = {
  name: 'Crystal Elevator Co., Ltd',
  shortName: 'Crystal Elevator',
  founded: 1992,
  experience: 33,
  exportStart: 2012,
  headquarters: 'Shanghai, China',
  containersExported: 7443,
  countriesServed: 82,
  overseasCustomers: 3000,
  qualityGuarantee: '3 Years',
  ranking: 'TOP 3 Elevator Parts Exporter in China',
  tagline: 'China Leading Provider of Elevator and Elevator Parts',
  email: 'info@crystalelevator.com',
  phone: '+86 21 8888 8888',
  address: 'Shanghai, China'
}

// Flagship Products - Opto-Electro-Mechanical Products
export const flagshipProducts: Product[] = [
  {
    id: 'buttons',
    name: 'Elevator Buttons',
    description: 'High-quality elevator buttons with LED indicators, touch-sensitive controls, and durable construction for residential and commercial elevators.',
    features: ['LED backlit', 'Touch sensitive', 'Multiple colors', 'Durable construction'],
    image: '/products/buttons.jpg'
  },
  {
    id: 'light-curtain',
    name: 'Elevator Light Curtain',
    description: 'Advanced safety light curtains for elevator door protection, ensuring passenger safety with precise detection capabilities.',
    features: ['Infrared technology', 'Multi-beam protection', 'Easy installation', 'CE certified'],
    image: '/products/light-curtain.jpg'
  },
  {
    id: 'photoelectric-switch',
    name: 'Photoelectric Switch',
    description: 'Precision photoelectric switches for elevator door control and position detection systems.',
    features: ['High precision', 'Fast response', 'Long service life', 'Various models'],
    image: '/products/photoelectric.jpg'
  },
  {
    id: 'display',
    name: 'Elevator Display',
    description: 'Digital and LCD elevator displays showing floor indicators, direction arrows, and custom branding options.',
    features: ['LCD/LED options', 'Custom branding', 'Direction indicators', 'Floor numbering'],
    image: '/products/display.jpg'
  },
  {
    id: 'cop-lop',
    name: 'COP & LOP',
    description: 'Car Operating Panel (COP) and Landing Operating Panel (LOP) for complete elevator control solutions.',
    features: ['Complete assemblies', 'Custom designs', 'Multiple finishes', 'Easy maintenance'],
    image: '/products/cop-lop.jpg'
  },
  {
    id: 'traction-machine',
    name: 'Traction Machine',
    description: 'High-performance traction machines for smooth and efficient elevator operation.',
    features: ['Energy efficient', 'Low noise', 'Compact design', 'Various capacities'],
    image: '/products/traction.jpg'
  },
  {
    id: 'door-mechanism',
    name: 'Door Mechanism',
    description: 'Complete door operating mechanisms including operators, motors, and door locks.',
    features: ['Smooth operation', 'Safety features', 'Low maintenance', 'Durable'],
    image: '/products/door.jpg'
  }
]

// All Products
export const allProducts: Product[] = [
  // Flagship Products (Opto-Electro-Mechanical)
  ...flagshipProducts,

  // Other Products with Price Advantages
  {
    id: 'guide-rail',
    name: 'Guide Rail',
    description: 'Steel guide rails for elevator car and counterweight guidance',
    category: 'Structural',
    features: ['High strength', 'Precise tolerance', 'Various sizes'],
    image: '/products/guide-rail.jpg'
  },
  {
    id: 'guide-shoe',
    name: 'Guide Shoe',
    description: 'Guide shoes for smooth elevator car movement along rails',
    category: 'Structural',
    features: ['Low friction', 'Replaceable inserts', 'Durable'],
    image: '/products/guide-shoe.jpg'
  },
  {
    id: 'counterweight-filler',
    name: 'Counterweight Filler',
    description: 'Iron filler blocks for elevator counterweight systems',
    category: 'Structural',
    features: ['Standard sizes', 'Heavy duty', 'Cost effective'],
    image: '/products/counterweight.jpg'
  },
  {
    id: 'rope-fastening',
    name: 'Rope Fastening',
    description: 'Wire rope terminations and rope grips for elevator systems',
    category: 'Roping',
    features: ['High strength', 'Easy installation', 'Safety certified'],
    image: '/products/rope-fastening.jpg'
  },
  {
    id: 'wire-rope',
    name: 'Wire Rope',
    description: 'High-quality steel wire ropes for elevator hoisting',
    category: 'Roping',
    features: ['High tensile strength', 'Long life', 'Various specifications'],
    image: '/products/wire-rope.jpg'
  },
  {
    id: 'safety-gear',
    name: 'Safety Gear',
    description: 'Elevator safety gears for passenger and cargo protection',
    category: 'Safety',
    features: ['Instant locking', 'Reusable', 'Meets standards'],
    image: '/products/safety-gear.jpg'
  },
  {
    id: 'speed-governor',
    name: 'Speed Governor',
    description: 'Overspeed governors for elevator safety control',
    category: 'Safety',
    features: ['Precise control', 'Reliable operation', 'Easy maintenance'],
    image: '/products/governor.jpg'
  },
  {
    id: 'oil-buffer',
    name: 'Oil Buffer',
    description: 'Hydraulic buffers for elevator cushioning and braking',
    category: 'Safety',
    features: ['Smooth deceleration', 'Energy absorbing', 'Low maintenance'],
    image: '/products/buffer.jpg'
  },
  {
    id: 'maintenance-box',
    name: 'Maintenance Box',
    description: 'Complete maintenance tool kits and spare parts boxes',
    category: 'Tools',
    features: ['Comprehensive', 'Organized', 'Essential items'],
    image: '/products/maintenance-box.jpg'
  },
  {
    id: 'emergency-device',
    name: 'Emergency Leveling Device',
    description: 'Emergency devices for manual elevator operation',
    category: 'Emergency',
    features: ['Manual operation', 'Safety features', 'Reliable'],
    image: '/products/emergency-device.jpg'
  },
  {
    id: 'intercom',
    name: 'Elevator Intercom',
    description: 'Communication systems for elevator emergency calls',
    category: 'Emergency',
    features: ['Clear audio', 'Auto dial', 'Battery backup'],
    image: '/products/intercom.jpg'
  },
  {
    id: 'limit-switch',
    name: 'Limit Switch',
    description: 'Travel limit switches for elevator position control',
    category: 'Control',
    features: ['Precise control', 'Durable', 'Easy adjustment'],
    image: '/products/limit-switch.jpg'
  },
  {
    id: 'fans',
    name: 'Elevator Fans',
    description: 'Ventilation fans for elevator car air circulation',
    category: 'Comfort',
    features: ['Quiet operation', 'Energy efficient', 'Multiple sizes'],
    image: '/products/fans.jpg'
  }
]

// Product Categories
export const productCategories = [
  { id: 'opto', name: 'Opto-Electro-Mechanical', description: 'Our Core Expertise', products: flagshipProducts },
  { id: 'structural', name: 'Structural Components', description: 'Guide Rails & Support', products: allProducts.filter(p => p.category === 'Structural') },
  { id: 'roping', name: 'Roping Systems', description: 'Wire Ropes & Fastenings', products: allProducts.filter(p => p.category === 'Roping') },
  { id: 'safety', name: 'Safety Components', description: 'Protection Systems', products: allProducts.filter(p => p.category === 'Safety') },
  { id: 'emergency', name: 'Emergency Systems', description: 'Safety Communication', products: allProducts.filter(p => p.category === 'Emergency') },
  { id: 'control', name: 'Control Systems', description: 'Switches & Controls', products: allProducts.filter(p => p.category === 'Control') },
  { id: 'tools', name: 'Tools & Accessories', description: 'Maintenance Equipment', products: allProducts.filter(p => p.category === 'Tools') },
  { id: 'comfort', name: 'Comfort Systems', description: 'Fans & Ventilation', products: allProducts.filter(p => p.category === 'Comfort') }
]

// Company Timeline
export const companyTimeline = [
  { year: 1992, event: 'Shanghai Sunny Elevator Co., Ltd founded' },
  { year: 2000, event: 'Expanded to opto-electro-mechanical products' },
  { year: 2010, event: 'Modernized production facilities' },
  { year: 2012, event: 'Started international export business' },
  { year: 2015, event: 'Reached 50 countries served' },
  { year: 2018, event: 'Launched e-commerce platform' },
  { year: 2020, event: 'Reached 2,000 overseas customers' },
  { year: 2023, event: 'TOP 3 elevator parts exporter in China' },
  { year: 2025, event: 'Serving 3,000+ customers in 82 countries' }
]

// Why Choose Us
export const whyChooseUs = [
  {
    icon: 'Shield',
    title: '33 Years Experience',
    description: 'Since 1992, specializing in opto-electro-mechanical elevator products'
  },
  {
    icon: 'Award',
    title: '3 Year Quality Guarantee',
    description: 'Comprehensive warranty on all products for peace of mind'
  },
  {
    icon: 'Globe',
    title: 'TOP 3 Exporter',
    description: 'Ranked among top 3 elevator parts exporters in China'
  },
  {
    icon: 'Package',
    title: '7,443+ Containers Exported',
    description: 'Successfully delivered to 82 countries worldwide'
  },
  {
    icon: 'Users',
    title: '3,000+ Customers',
    description: 'Trusted by thousands of overseas clients'
  },
  {
    icon: 'Headphones',
    title: 'One-Stop Service',
    description: 'Complete elevator parts solution from a single supplier'
  }
]

// Certifications
export const certifications = [
  'ISO 9001:2015',
  'CE Certification',
  'TÜV Rheinland',
  'SGS Verified',
  'UL Listed',
  'CCC Certified'
]

// Job Openings
export const jobOpenings = [
  {
    id: 'sales-manager',
    title: 'International Sales Manager',
    location: 'Shanghai, China',
    type: 'Full-time',
    description: 'Lead our international sales team and expand our global presence.',
    requirements: [
      '5+ years B2B sales experience',
      'Proficiency in English (additional languages a plus)',
      'Experience in elevator/mechanical industry preferred',
      'Strong communication and negotiation skills'
    ]
  },
  {
    id: 'product-specialist',
    title: 'Product Specialist - Optoelectronics',
    location: 'Shanghai, China',
    type: 'Full-time',
    description: 'Technical expert for our flagship opto-electro-mechanical product line.',
    requirements: [
      'Engineering degree in electronics or related field',
      'Knowledge of elevator systems',
      '3+ years technical experience',
      'Ability to create technical documentation'
    ]
  },
  {
    id: 'ecommerce-specialist',
    title: 'E-commerce Specialist',
    location: 'Remote / Shanghai',
    type: 'Full-time',
    description: 'Manage and optimize our online sales platforms and digital presence.',
    requirements: [
      'Experience with e-commerce platforms',
      'SEO/SEM knowledge',
      'Data analytics skills',
      'English proficiency required'
    ]
  },
  {
    id: 'customer-support',
    title: 'Customer Support Representative',
    location: 'Shanghai, China',
    type: 'Full-time',
    description: 'Provide exceptional support to our international customers.',
    requirements: [
      'Customer service experience',
      'Multi-language skills preferred',
      'Technical aptitude',
      'Problem-solving abilities'
    ]
  },
  {
    id: 'logistics-coordinator',
    title: 'Logistics Coordinator',
    location: 'Shanghai, China',
    type: 'Full-time',
    description: 'Coordinate international shipping and logistics operations.',
    requirements: [
      'Experience in international logistics',
      'Knowledge of export/import procedures',
      'Attention to detail',
      'Project management skills'
    ]
  },
  {
    id: 'quality-inspector',
    title: 'Quality Control Inspector',
    location: 'Shanghai, China',
    type: 'Full-time',
    description: 'Ensure all products meet our high quality standards.',
    requirements: [
      'Quality control experience',
      'Knowledge of industrial standards',
      'Detail-oriented',
      'Documentation skills'
    ]
  }
]

// E-commerce Platform Info
export const ecommerceInfo = {
  name: 'Crystal Elevator Online Store',
  url: 'https://shop.crystalelevator.com',
  description: 'Your one-stop solution for purchasing quality elevator parts online',
  features: [
    {
      icon: 'ShoppingCart',
      title: 'Easy Online Ordering',
      description: 'Browse and order thousands of products with just a few clicks'
    },
    {
      icon: 'CreditCard',
      title: 'Secure Payment',
      description: 'Multiple payment options including PayPal, wire transfer, and credit cards'
    },
    {
      icon: 'Truck',
      title: 'Global Shipping',
      description: 'Shipping to 82 countries with reliable logistics partners'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Round-the-clock customer support via chat, email, and phone'
    },
    {
      icon: 'Shield',
      title: 'Quality Guarantee',
      description: '3-year warranty on all products with easy returns'
    },
    {
      icon: 'BarChart',
      title: 'Order Tracking',
      description: 'Real-time tracking from warehouse to your door'
    }
  ],
  benefits: [
    'Competitive wholesale pricing',
    'Bulk order discounts available',
    'Sample orders welcome',
    'Technical documentation provided',
    'Custom product development support',
    'Regular promotions and deals'
  ]
}
