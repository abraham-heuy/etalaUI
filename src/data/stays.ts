// data/stays.ts
import { 
    Hotel,
    Home,
    Bed,
    Tent,
    Key  } from 'lucide-react';
  
  export interface StayProperty {
    id: string;
    name: string;
    type: 'hotel' | 'airbnb' | 'guesthouse' | 'campsite' | 'rental';
    category: string;
    description: string;
    shortDescription: string;
    images: string[];
    coverImage: string;
    logo?: string;
    rating: number;
    reviews: number;
    pricePerNight?: number;
    pricePerMonth?: number; // For rentals
    currency: string;
    location: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    phone: string;
    email: string;
    website?: string;
    amenities: string[];
    houseRules?: string[];
    checkInTime: string;
    checkOutTime: string;
    minStay?: number;
    maxGuests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    squareMeters?: number;
    propertySize?: string;
    yearBuilt?: number;
    lastRenovated?: number;
    parking: boolean;
    wifi: boolean;
    petFriendly: boolean;
    smoking: boolean;
    eventsAllowed: boolean;
    suitableFor: string[];
    nearbyAttractions?: NearbyAttraction[];
    calendar?: AvailabilityCalendar[];
    reviewsList?: Review[];
    badges?: string[];
    offers?: Offer[];
    host?: Host;
    // For rentals
    isRental?: boolean;
    leaseTerms?: string;
    deposit?: number;
    utilities?: string[];
    tenantManagement?: boolean; // Management system included
    availableFrom?: string;
    minimumLease?: number; // in months
    furnished?: boolean;
    propertyType?: 'apartment' | 'house' | 'studio' | 'room' | 'villa';
  }
  
  export interface NearbyAttraction {
    name: string;
    distance: string;
    icon?: any;
  }
  
  export interface AvailabilityCalendar {
    date: string;
    available: boolean;
    price?: number;
    minimumStay?: number;
  }
  
  export interface Review {
    id: string;
    user: string;
    avatar?: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
  }
  
  export interface Offer {
    id: string;
    title: string;
    description: string;
    discount: number;
    code?: string;
    validUntil: string;
    type: 'seasonal' | 'student' | 'early-bird' | 'last-minute' | 'long-stay' | 'referral';
    minNights?: number;
  }
  
  export interface Host {
    id: string;
    name: string;
    image: string;
    joinDate: string;
    responseRate: number;
    responseTime: string;
    isSuperhost: boolean;
    languages: string[];
    verified: boolean;
  }
  
  export interface StayCategory {
    id: string;
    name: string;
    icon: any;
    image: string;
    description: string;
    count: number;
    color: string;
    types: string[];
  }
  
  // Stay Categories
  export const stayCategories: StayCategory[] = [
    {
      id: 'hotels',
      name: 'Hotels',
      icon: Hotel,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Full-service hotels with restaurants, pools, and amenities',
      count: 15,
      color: 'from-blue-400 to-indigo-500',
      types: ['hotel']
    },
    {
      id: 'airbnbs',
      name: 'Airbnbs',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Unique homes and apartments for short stays',
      count: 28,
      color: 'from-pink-400 to-rose-500',
      types: ['airbnb', 'guesthouse']
    },
    {
      id: 'guest-houses',
      name: 'Guest Houses',
      icon: Bed,
      image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Cozy, family-run accommodations',
      count: 12,
      color: 'from-green-400 to-emerald-500',
      types: ['guesthouse']
    },
    {
      id: 'campsites',
      name: 'Campsites',
      icon: Tent,
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Nature spots for camping and glamping',
      count: 8,
      color: 'from-amber-400 to-orange-500',
      types: ['campsite']
    },
    {
      id: 'rentals',
      name: 'Long-term Rentals',
      icon: Key,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Apartments and houses for monthly rentals',
      count: 22,
      color: 'from-purple-400 to-violet-500',
      types: ['rental']
    },
  ];
  
  // Sample Properties
  export const stayProperties: StayProperty[] = [
    // Hotel
    {
      id: 'tala-view-hotel',
      name: 'Tala View Hotel',
      type: 'hotel',
      category: 'hotels',
      description: 'Experience luxury in the heart of Tala. Our hotel offers stunning views, premium amenities, and exceptional service for both business and leisure travelers.',
      shortDescription: 'Luxury hotel with panoramic views',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      rating: 4.8,
      reviews: 234,
      pricePerNight: 8500,
      currency: 'KSh',
      location: 'Tala Town',
      address: 'Hilltop Road, Tala',
      phone: '+254 712 345 678',
      email: 'info@talaview.co.ke',
      website: 'www.talaview.co.ke',
      amenities: ['Free WiFi', 'Swimming Pool', 'Restaurant', 'Bar', 'Room Service', 'Spa', 'Gym', 'Conference Room', 'Free Parking'],
      checkInTime: '14:00',
      checkOutTime: '11:00',
      maxGuests: 4,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1,
      parking: true,
      wifi: true,
      petFriendly: false,
      smoking: false,
      eventsAllowed: true,
      suitableFor: ['Couples', 'Business', 'Families'],
      nearbyAttractions: [
        { name: 'Tala Market', distance: '1.2 km' },
        { name: 'Kwa Ndege Stage', distance: '2.5 km' },
        { name: 'Kangundo Hills', distance: '8 km' },
      ],
      badges: ['Top Rated', 'Luxury', 'Free Breakfast'],
      offers: [
        {
          id: 'o1',
          title: 'Early Bird Special',
          description: 'Book 14 days in advance and get 15% off',
          discount: 15,
          code: 'EARLY15',
          validUntil: '2026-12-31',
          type: 'early-bird',
          minNights: 2,
        },
        {
          id: 'o2',
          title: 'Student Discount',
          description: '10% off with valid student ID',
          discount: 10,
          code: 'STUDENT10',
          validUntil: '2026-12-31',
          type: 'student',
        },
      ],
      host: {
        id: 'h1',
        name: 'Tala View Hotels',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        joinDate: '2024-01-15',
        responseRate: 98,
        responseTime: '< 1 hour',
        isSuperhost: true,
        languages: ['English', 'Swahili'],
        verified: true,
      },
    },
  
    // Airbnb
    {
      id: 'green-haven',
      name: 'Green Haven Retreat',
      type: 'airbnb',
      category: 'airbnbs',
      description: 'A peaceful getaway surrounded by nature. This modern home offers privacy, comfort, and all amenities for a perfect stay.',
      shortDescription: 'Modern home with garden views',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      ],
      coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.9,
      reviews: 87,
      pricePerNight: 4500,
      currency: 'KSh',
      location: 'Kangundo',
      address: 'Green Valley, Kangundo',
      phone: '+254 723 456 789',
      email: 'greenhaven@example.com',
      amenities: ['Free WiFi', 'Kitchen', 'Washer', 'Free Parking', 'Garden', 'BBQ Grill', 'Smart TV', 'Workspace'],
      checkInTime: '15:00',
      checkOutTime: '11:00',
      minStay: 2,
      maxGuests: 6,
      bedrooms: 3,
      beds: 4,
      bathrooms: 2,
      squareMeters: 120,
      parking: true,
      wifi: true,
      petFriendly: true,
      smoking: false,
      eventsAllowed: true,
      suitableFor: ['Families', 'Groups', 'Nature Lovers'],
      nearbyAttractions: [
        { name: 'Kangundo Forest', distance: '1.5 km' },
        { name: 'Local Market', distance: '3 km' },
      ],
      badges: ['Superhost', 'Pet Friendly', 'Family Friendly'],
      offers: [
        {
          id: 'o3',
          title: 'Long Stay Discount',
          description: '20% off for stays of 7+ nights',
          discount: 20,
          code: 'LONG20',
          validUntil: '2026-12-31',
          type: 'long-stay',
          minNights: 7,
        },
      ],
      host: {
        id: 'h2',
        name: 'Mary & John',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        joinDate: '2024-03-10',
        responseRate: 100,
        responseTime: '< 30 min',
        isSuperhost: true,
        languages: ['English', 'Swahili', 'Kamba'],
        verified: true,
      },
    },
  
    // Guest House
    {
      id: 'riverside-guest',
      name: 'Riverside Guest House',
      type: 'guesthouse',
      category: 'guest-houses',
      description: 'Charming guest house by the river. Enjoy peaceful surroundings, home-cooked meals, and warm hospitality.',
      shortDescription: 'Cozy riverside retreat',
      images: [
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      ],
      coverImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.7,
      reviews: 56,
      pricePerNight: 3500,
      currency: 'KSh',
      location: 'Matuu',
      address: 'Riverside Road, Matuu',
      phone: '+254 734 567 890',
      email: 'riverside@example.com',
      amenities: ['Breakfast Included', 'Free WiFi', 'Garden', 'Parking', 'Airport Transfer', 'Laundry'],
      checkInTime: '13:00',
      checkOutTime: '10:00',
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
      parking: true,
      wifi: true,
      petFriendly: false,
      smoking: false,
      eventsAllowed: false,
      suitableFor: ['Couples', 'Solo Travelers'],
      badges: ['Home-cooked Meals', 'Peaceful'],
    },
  
    // Campsite
    {
      id: 'kyumbi-campsite',
      name: 'Kyumbi Wilderness Camp',
      type: 'campsite',
      category: 'campsites',
      description: 'Experience the great outdoors at our wilderness camp. Tents, campfires, and stunning views of the hills.',
      shortDescription: 'Nature camping experience',
      images: [
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1537905569824-fc2d0c6a8c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      ],
      coverImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.6,
      reviews: 34,
      pricePerNight: 1500,
      currency: 'KSh',
      location: 'Kyumbi',
      address: 'Kyumbi Hills, Kyumbi',
      phone: '+254 745 678 901',
      email: 'kyumbicamp@example.com',
      amenities: ['Campfire', 'Tents Provided', 'Shared Bathroom', 'Drinking Water', 'Parking', 'Hiking Trails'],
      checkInTime: '14:00',
      checkOutTime: '11:00',
      maxGuests: 6,
      bedrooms: 0,
      beds: 3,
      bathrooms: 1,
      parking: true,
      wifi: false,
      petFriendly: true,
      smoking: true,
      eventsAllowed: true,
      suitableFor: ['Adventure Seekers', 'Groups', 'Nature Lovers'],
      badges: ['Adventure', 'Budget Friendly'],
      offers: [
        {
          id: 'o4',
          title: 'Group Discount',
          description: '15% off for groups of 4+',
          discount: 15,
          code: 'GROUP15',
          validUntil: '2026-12-31',
          type: 'seasonal',
        },
        {
          id: 'o5',
          title: 'Student Camping',
          description: '20% off with student ID',
          discount: 20,
          code: 'CAMP20',
          validUntil: '2026-12-31',
          type: 'student',
        },
      ],
    },
  
    // Long-term Rental with Management System
    {
      id: 'sunrise-apartments',
      name: 'Sunrise Apartments',
      type: 'rental',
      category: 'rentals',
      propertyType: 'apartment',
      description: 'Modern 2-bedroom apartment in a quiet neighborhood. Available for long-term rental with full property management included.',
      shortDescription: '2-bed apartment with management',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      coverImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.5,
      reviews: 18,
      pricePerMonth: 25000,
      currency: 'KSh',
      location: 'Tala Town',
      address: 'Sunrise Estate, Tala',
      phone: '+254 756 789 012',
      email: 'sunrise@example.com',
      amenities: ['Water Included', 'Security', 'Parking', 'Backup Generator', 'Managed Property'],
      checkInTime: '10:00',
      checkOutTime: '12:00',
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1,
      squareMeters: 85,
      parking: true,
      wifi: true,
      petFriendly: false,
      smoking: false,
      eventsAllowed: false,
      suitableFor: ['Families', 'Professionals'],
      
      // Rental-specific fields
      isRental: true,
      leaseTerms: '12-month lease required',
      deposit: 50000,
      utilities: ['Water included', 'Electricity billed separately'],
      tenantManagement: true, // Management system included
      availableFrom: '2026-05-01',
      minimumLease: 12,
      furnished: true,
      
      badges: ['Management Included', 'New', 'Secure'],
      offers: [
        {
          id: 'o6',
          title: 'Refer a Friend',
          description: 'Get one month free when you refer a new tenant',
          discount: 100,
          code: 'REFER1',
          validUntil: '2026-12-31',
          type: 'referral',
        },
      ],
      host: {
        id: 'h3',
        name: 'Sunrise Properties',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        joinDate: '2024-02-20',
        responseRate: 95,
        responseTime: '< 2 hours',
        isSuperhost: false,
        languages: ['English', 'Swahili'],
        verified: true,
      },
    },
  
    // Another Rental
    {
      id: 'greenfield-house',
      name: 'Greenfield Family House',
      type: 'rental',
      category: 'rentals',
      propertyType: 'house',
      description: 'Spacious 3-bedroom house with garden. Perfect for families. Full property management available.',
      shortDescription: '3-bed house with garden',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
      ],
      coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.7,
      reviews: 12,
      pricePerMonth: 35000,
      currency: 'KSh',
      location: 'Kangundo',
      address: 'Greenfield Estate, Kangundo',
      phone: '+254 767 890 123',
      email: 'greenfield@example.com',
      amenities: ['Garden', 'Parking', 'Security', 'Water Tank', 'Managed'],
      checkInTime: '09:00',
      checkOutTime: '17:00',
      maxGuests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 2,
      squareMeters: 150,
      parking: true,
      wifi: true,
      petFriendly: true,
      smoking: false,
      eventsAllowed: true,
      suitableFor: ['Families', 'Pet Owners'],
      
      isRental: true,
      leaseTerms: '6 or 12 months available',
      deposit: 70000,
      utilities: ['Water billed', 'Electricity billed'],
      tenantManagement: true,
      availableFrom: '2026-04-15',
      minimumLease: 6,
      furnished: false,
      
      badges: ['Pet Friendly', 'Garden', 'Family'],
    },
  ];
  
  // Flash Offers
  export const flashOffers = stayProperties
    .flatMap(p => p.offers?.map(o => ({ 
      ...o, 
      propertyName: p.name, 
      propertyId: p.id,
      propertyType: p.type,
      image: p.coverImage 
    })) || [])
    .filter(o => o.type === 'early-bird' || o.type === 'last-minute' || o.type === 'seasonal')
    .slice(0, 4);
  
  // Student Offers
  export const studentOffers = stayProperties
    .flatMap(p => p.offers?.map(o => ({ 
      ...o, 
      propertyName: p.name, 
      propertyId: p.id,
      propertyType: p.type,
      image: p.coverImage 
    })) || [])
    .filter(o => o.type === 'student');
  
  // Slideshow items for guests
  export const staysSlideshowItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Luxury Hotels',
      description: 'Comfort and elegance in Tala',
      link: '/stays/category/hotels'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Cozy Airbnbs',
      description: 'Home away from home',
      link: '/stays/category/airbnbs'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Camping Adventures',
      description: 'Connect with nature',
      link: '/stays/category/campsites'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Long-term Rentals',
      description: 'Find your new home',
      link: '/stays/category/rentals'
    }
  ];
  
  // Top Rated Properties
  export const topRatedProperties = stayProperties
    .filter(p => p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);
  
  // Rentals (with management)
  export const rentals = stayProperties.filter(p => p.isRental);