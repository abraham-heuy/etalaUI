// data/livestock.ts
import { Tractor, PawPrint, Bird, Egg, Cat } from 'lucide-react';

export interface LivestockItem {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'cattle' | 'goats' | 'sheep' | 'pigs' | 'poultry' | 'pets' | 'other';
  breed: string;
  age: string;
  gender: 'male' | 'female' | 'pair' | 'mixed';
  quantity: number;
  healthStatus: 'vaccinated' | 'healthy' | 'dewormed' | 'needs-vaccination';
  purpose: 'breeding' | 'dairy' | 'meat' | 'eggs' | 'wool' | 'pet' | 'guard';
  farmer: {
    id: string;
    name: string;
    verified: boolean;
    rating: number;
    totalSales: number;
    location: string;
    phone: string;
    email?: string;
  };
  rating: number;
  reviews: number;
  available: boolean;
  featured?: boolean;
  tags: string[];
  createdAt: string;
}

export const livestockItems: LivestockItem[] = [
  {
    id: 'l1',
    name: 'Friesian Dairy Cow',
    description: 'Purebred Friesian cow, 3 years old, currently producing 20L of milk per day. Vaccinated, healthy, and ready for breeding. Comes with complete health records and pedigree papers.',
    price: 85000,
    images: [
      'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    ],
    category: 'cattle',
    breed: 'Friesian',
    age: '3 years',
    gender: 'female',
    quantity: 1,
    healthStatus: 'vaccinated',
    purpose: 'dairy',
    farmer: {
      id: 'f1',
      name: 'Kilonzo Farm',
      verified: true,
      rating: 4.9,
      totalSales: 45,
      location: 'Kyumbi',
      phone: '+254 712 345 678',
      email: 'kilonzo.farm@example.com'
    },
    rating: 4.9,
    reviews: 12,
    available: true,
    featured: true,
    tags: ['dairy', 'cow', 'friesian', 'breeding'],
    createdAt: '2026-03-10'
  },
  {
    id: 'l2',
    name: 'Improved Kienyeji Chickens (10)',
    description: '10 improved kienyeji chickens, 6 months old, excellent layers. Disease-resistant breed, free-range raised. Already adapted to local climate.',
    price: 8500,
    images: [
      'https://images.unsplash.com/photo-1548559383-5e2a0c9a2e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1565557623262-b1cacc39e013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    ],
    category: 'poultry',
    breed: 'Improved Kienyeji',
    age: '6 months',
    gender: 'mixed',
    quantity: 10,
    healthStatus: 'vaccinated',
    purpose: 'eggs',
    farmer: {
      id: 'f2',
      name: "Mama Lucy's Farm",
      verified: true,
      rating: 4.8,
      totalSales: 234,
      location: 'Tala Town',
      phone: '+254 723 456 789',
    },
    rating: 4.8,
    reviews: 34,
    available: true,
    tags: ['chickens', 'poultry', 'eggs', 'layers'],
    createdAt: '2026-03-09'
  },
  {
    id: 'l3',
    name: 'Boer Goat (Breeding Pair)',
    description: 'One male and one female Boer goat, excellent for breeding. Both are 2 years old, healthy, and have excellent conformation. Perfect for starting or improving your herd.',
    price: 28000,
    images: [
      'https://images.unsplash.com/photo-1524024973431-2ad916746081?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    ],
    category: 'goats',
    breed: 'Boer',
    age: '2 years',
    gender: 'pair',
    quantity: 2,
    healthStatus: 'vaccinated',
    purpose: 'breeding',
    farmer: {
      id: 'f3',
      name: 'Mutua Farm',
      verified: true,
      rating: 4.7,
      totalSales: 67,
      location: 'Matuu',
      phone: '+254 734 567 890',
    },
    rating: 4.7,
    reviews: 8,
    available: true,
    tags: ['goats', 'boer', 'breeding', 'pair'],
    createdAt: '2026-03-08'
  },
  {
    id: 'l4',
    name: 'Large White Pig (Pregnant)',
    description: 'Large White sow, 2 years old, confirmed pregnant. Expected to farrow in 3 weeks. Excellent genetics, good mothering ability.',
    price: 45000,
    images: [
      'https://images.unsplash.com/photo-1604848698035-2a1e3e94d9ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    ],
    category: 'pigs',
    breed: 'Large White',
    age: '2 years',
    gender: 'female',
    quantity: 1,
    healthStatus: 'vaccinated',
    purpose: 'breeding',
    farmer: {
      id: 'f4',
      name: 'Nzomo Farm',
      verified: true,
      rating: 4.6,
      totalSales: 89,
      location: 'Kangundo',
      phone: '+254 745 678 901',
    },
    rating: 4.6,
    reviews: 15,
    available: true,
    tags: ['pig', 'sow', 'pregnant', 'breeding'],
    createdAt: '2026-03-07'
  },
  {
    id: 'l5',
    name: 'Sahiwal Bull',
    description: 'Pure Sahiwal bull, 4 years old, excellent for breeding. Known for heat tolerance and disease resistance. Proven sire with healthy offspring.',
    price: 65000,
    images: [
      'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    ],
    category: 'cattle',
    breed: 'Sahiwal',
    age: '4 years',
    gender: 'male',
    quantity: 1,
    healthStatus: 'vaccinated',
    purpose: 'breeding',
    farmer: {
      id: 'f5',
      name: 'Mutisya Ranch',
      verified: false,
      rating: 4.5,
      totalSales: 23,
      location: 'Masii',
      phone: '+254 756 789 012',
    },
    rating: 4.5,
    reviews: 6,
    available: true,
    tags: ['bull', 'sahiwal', 'breeding'],
    createdAt: '2026-03-06'
  },
  {
    id: 'l6',
    name: 'German Shepherd Puppies',
    description: 'Purebred German Shepherd puppies, 8 weeks old, first shots given. Both parents on site. Excellent for security and family companionship.',
    price: 15000,
    images: [
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    ],
    category: 'pets',
    breed: 'German Shepherd',
    age: '8 weeks',
    gender: 'mixed',
    quantity: 6,
    healthStatus: 'vaccinated',
    purpose: 'pet',
    farmer: {
      id: 'f6',
      name: 'Mwende Kennels',
      verified: false,
      rating: 4.8,
      totalSales: 34,
      location: 'Tala Town',
      phone: '+254 767 890 123',
    },
    rating: 4.8,
    reviews: 18,
    available: true,
    featured: true,
    tags: ['dogs', 'puppies', 'german-shepherd', 'pets'],
    createdAt: '2026-03-05'
  },
  {
    id: 'l7',
    name: 'Dairy Goats (3 females)',
    description: 'Three dairy goats (Toggenburg cross), excellent milkers. Currently producing 2-3L per day each. Great for family milk production.',
    price: 18000,
    images: [
      'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    ],
    category: 'goats',
    breed: 'Toggenburg Cross',
    age: '2-3 years',
    gender: 'female',
    quantity: 3,
    healthStatus: 'dewormed',
    purpose: 'dairy',
    farmer: {
      id: 'f7',
      name: 'Kavuli Farm',
      verified: false,
      rating: 4.4,
      totalSales: 12,
      location: 'Kangundo',
      phone: '+254 778 901 234',
    },
    rating: 4.4,
    reviews: 5,
    available: true,
    tags: ['goats', 'dairy', 'milking'],
    createdAt: '2026-03-04'
  },
  {
    id: 'l8',
    name: 'Kenya White Rabbits (Pair)',
    description: 'Breeding pair of Kenya White rabbits. Docile, fast-growing, excellent for meat or as pets. Ready to breed.',
    price: 3500,
    images: [
      'https://images.unsplash.com/photo-1535241749838-299277b6305f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    ],
    category: 'pets',
    breed: 'Kenya White',
    age: '5 months',
    gender: 'pair',
    quantity: 2,
    healthStatus: 'vaccinated',
    purpose: 'pet',
    farmer: {
      id: 'f8',
      name: 'Wambua Farm',
      verified: false,
      rating: 4.3,
      totalSales: 28,
      location: 'Matuu',
      phone: '+254 789 012 345',
    },
    rating: 4.3,
    reviews: 9,
    available: true,
    tags: ['rabbits', 'pets', 'breeding'],
    createdAt: '2026-03-03'
  }
];

export const livestockCategories = [
  { id: 'cattle', name: 'Cattle', icon: Tractor, count: 12 },
  { id: 'goats', name: 'Goats', icon: PawPrint, count: 18 },
  { id: 'sheep', name: 'Sheep', icon: PawPrint, count: 7 },
  { id: 'pigs', name: 'Pigs', icon: PawPrint, count: 9 },
  { id: 'poultry', name: 'Poultry', icon: Bird, count: 24 },
  { id: 'pets', name: 'Pets', icon: Cat, count: 15 },
  { id: 'other', name: 'Other', icon: Egg, count: 5 },
];