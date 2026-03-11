// data/boda.ts

export interface Rider {
  id: string;
  name: string;
  image: string;
  type: 'boda' | 'taxi' | 'movers';
  vehicle: {
    model: string;
    capacity: string;
    licensePlate: string;
  };
  rating: number;
  totalRides: number;
  verified: boolean;
  location: string;
  online: boolean;
  price: {
    base: number;
    perKm: number;
    minimum: number;
  };
  availableNow: boolean;
  phone: string;
  description?: string;
}

export interface Mover {
  id: string;
  companyName: string;
  logo: string;
  type: 'movers';
  services: string[];
  fleet: {
    type: string;
    capacity: string;
    count: number;
  }[];
  rating: number;
  completedJobs: number;
  verified: boolean;
  location: string;
  serviceArea: string[];
  price: {
    hourly: number;
    perItem?: number;
    minimum: number;
    longDistance: number;
  };
  insurance: boolean;
  packaging: boolean;
  phone: string;
  website?: string;
  description: string;
  available: boolean;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  distance: number; // in km
  duration: number; // in minutes
  popular: boolean;
  basePrice: number;
}

// Riders (Boda & Taxi)
export const riders: Rider[] = [
  {
    id: 'r1',
    name: 'John Mwende',
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1160&q=80',
    type: 'boda',
    vehicle: {
      model: 'Boxer 150',
      capacity: '1 passenger',
      licensePlate: 'KME 123A',
    },
    rating: 4.9,
    totalRides: 1245,
    verified: true,
    location: 'Kwa Ndege Stage',
    online: true,
    price: {
      base: 50,
      perKm: 20,
      minimum: 100,
    },
    availableNow: true,
    phone: '+254 712 345 678',
    description: 'Experienced rider, knows all shortcuts in Tala',
  },
  {
    id: 'r2',
    name: 'Peter Mutua',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    type: 'boda',
    vehicle: {
      model: 'TVS King',
      capacity: '1 passenger',
      licensePlate: 'KME 456B',
    },
    rating: 4.7,
    totalRides: 876,
    verified: true,
    location: 'Tala Town',
    online: true,
    price: {
      base: 50,
      perKm: 20,
      minimum: 100,
    },
    availableNow: true,
    phone: '+254 723 456 789',
  },
  {
    id: 'r3',
    name: 'Mary Kamau',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1061&q=80',
    type: 'boda',
    vehicle: {
      model: 'Bajaj Boxer',
      capacity: '1 passenger',
      licensePlate: 'KME 789C',
    },
    rating: 4.8,
    totalRides: 654,
    verified: true,
    location: 'Kangundo',
    online: false,
    price: {
      base: 50,
      perKm: 20,
      minimum: 100,
    },
    availableNow: false,
    phone: '+254 734 567 890',
  },
  {
    id: 'r4',
    name: 'James Kilonzo',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    type: 'taxi',
    vehicle: {
      model: 'Toyota Corolla',
      capacity: '4 passengers',
      licensePlate: 'KDC 123A',
    },
    rating: 4.6,
    totalRides: 432,
    verified: true,
    location: 'Tala Town',
    online: true,
    price: {
      base: 200,
      perKm: 50,
      minimum: 300,
    },
    availableNow: true,
    phone: '+254 745 678 901',
  },
  {
    id: 'r5',
    name: 'Esther Mwikali',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    type: 'taxi',
    vehicle: {
      model: 'Nissan Note',
      capacity: '4 passengers',
      licensePlate: 'KDC 456B',
    },
    rating: 4.9,
    totalRides: 567,
    verified: true,
    location: 'Kwa Ndege',
    online: true,
    price: {
      base: 200,
      perKm: 50,
      minimum: 300,
    },
    availableNow: true,
    phone: '+254 756 789 012',
  },
];

// Movers (Companies & Individuals)
export const movers: Mover[] = [
  {
    id: 'm1',
    companyName: 'Tala Movers & Logistics',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    type: 'movers',
    services: ['Home Moving', 'Office Relocation', 'Furniture Delivery', 'Piano Moving'],
    fleet: [
      { type: 'Pickup', capacity: '1.5 tons', count: 3 },
      { type: 'Truck', capacity: '5 tons', count: 2 },
      { type: 'Van', capacity: '1 ton', count: 4 },
    ],
    rating: 4.8,
    completedJobs: 234,
    verified: true,
    location: 'Tala Town',
    serviceArea: ['Tala', 'Kangundo', 'Matuu', 'Machakos', 'Nairobi'],
    price: {
      hourly: 1500,
      minimum: 3000,
      longDistance: 80, // per km for long distance
    },
    insurance: true,
    packaging: true,
    phone: '+254 700 123 456',
    website: 'www.talamovers.co.ke',
    description: 'Professional moving services with insured trucks and experienced crew. We handle everything from packaging to unpacking.',
    available: true,
  },
  {
    id: 'm2',
    companyName: 'Kangundo Movers',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    type: 'movers',
    services: ['Home Moving', 'Furniture Delivery', 'Goods Transport'],
    fleet: [
      { type: 'Truck', capacity: '3 tons', count: 2 },
      { type: 'Pickup', capacity: '1 ton', count: 3 },
    ],
    rating: 4.6,
    completedJobs: 156,
    verified: true,
    location: 'Kangundo',
    serviceArea: ['Kangundo', 'Tala', 'Matuu', 'Machakos'],
    price: {
      hourly: 1200,
      minimum: 2500,
      longDistance: 70,
    },
    insurance: true,
    packaging: false,
    phone: '+254 711 234 567',
    description: 'Reliable and affordable moving services in Kangundo and surrounding areas.',
    available: true,
  },
  {
    id: 'm3',
    // name: 'John Mwangi - Independent Mover',
    companyName: 'John\'s Moving Services',
    logo: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1160&q=80',
    type: 'movers',
    services: ['Furniture Moving', 'Delivery', 'Pickup Services'],
    fleet: [
      { type: 'Pickup', capacity: '1 ton', count: 1 },
    ],
    rating: 4.5,
    completedJobs: 78,
    verified: false,
    location: 'Matuu',
    serviceArea: ['Matuu', 'Tala', 'Kangundo'],
    price: {
      hourly: 800,
      minimum: 1500,
      longDistance: 50,
    },
    insurance: false,
    packaging: true,
    phone: '+254 722 345 678',
    description: 'Independent mover with 5 years experience. Affordable rates for local moves.',
    available: true,
  },
];

// Popular routes
export const popularRoutes: Route[] = [
  {
    id: 'rt1',
    from: 'Tala Town',
    to: 'Kwa Ndege',
    distance: 3.5,
    duration: 10,
    popular: true,
    basePrice: 100,
  },
  {
    id: 'rt2',
    from: 'Tala Town',
    to: 'Kangundo',
    distance: 12,
    duration: 25,
    popular: true,
    basePrice: 250,
  },
  {
    id: 'rt3',
    from: 'Tala Town',
    to: 'Matuu',
    distance: 8,
    duration: 20,
    popular: true,
    basePrice: 180,
  },
  {
    id: 'rt4',
    from: 'Tala Town',
    to: 'Machakos',
    distance: 25,
    duration: 40,
    popular: true,
    basePrice: 450,
  },
];