// data/food.ts
import { 
    Coffee,
    UtensilsCrossed,
    Hotel,
    Package  } from 'lucide-react';
  
  export interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    category: string;
    description: string;
    image: string;
    coverImage?: string;
    logo?: string;
    rating: number;
    reviews: number;
    priceLevel: 1 | 2 | 3 | 4; // 1=$, 2=$$, 3=$$$, 4=$$$$
    location: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    openingHours: OpeningHours;
    features: string[];
    dietary: string[];
    popularDishes: string[];
    delivery: boolean;
    pickup: boolean;
    catering: boolean;
    eventCapacity?: number;
    eventSpaces?: EventSpace[];
    photos: string[];
    menu: MenuCategory[];
    reviewsList?: Review[];
    badges?: string[];
    offers?: Offer[];
  }
  
  export interface OpeningHours {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  }
  
  export interface EventSpace {
    id: string;
    name: string;
    capacity: number;
    description: string;
    image: string;
    price?: number;
  }
  
  export interface MenuCategory {
    id: string;
    name: string;
    items: MenuItem[];
  }
  
  export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    popular?: boolean;
    spicy?: boolean;
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
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
    image?: string;
    type: 'deal' | 'birthday' | 'party' | 'event' | 'happy-hour';
  }
  
  export interface FoodCategory {
    id: string;
    name: string;
    icon: any;
    image: string;
    description: string;
    count: number;
    color: string;
  }
  
  // Food Categories
  export const foodCategories: FoodCategory[] = [
    {
      id: 'local',
      name: 'Local Cuisine',
      icon: UtensilsCrossed,
      image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Traditional Kenyan dishes and local favorites',
      count: 24,
      color: 'from-orange-400 to-red-500',
    },
    {
      id: 'fast-food',
      name: 'Fast Food',
      icon: Coffee,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=1065&q=80',
      description: 'Quick bites, burgers, fries, and more',
      count: 18,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      id: 'cafes',
      name: 'Cafes',
      icon: Coffee,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1147&q=80',
      description: 'Coffee shops, bakeries, and light meals',
      count: 15,
      color: 'from-brown-400 to-amber-600',
    },
    {
      id: 'hotels',
      name: 'Hotels',
      icon: Hotel,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Full-service hotels with restaurants and event spaces',
      count: 12,
      color: 'from-blue-400 to-indigo-500',
    },
    {
      id: 'catering',
      name: 'Catering',
      icon: Package,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Professional catering for events and parties',
      count: 21,
      color: 'from-green-400 to-emerald-500',
    },
  ];
  
  // Restaurants
  export const restaurants: Restaurant[] = [
    // Tala Kitchen
    {
      id: 'tala-kitchen',
      name: 'Tala Kitchen',
      cuisine: 'Local & International',
      category: 'local',
      description: 'A cozy restaurant serving authentic Kenyan cuisine with a modern twist. Perfect for family dinners and special occasions.',
      image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      logo: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      rating: 4.8,
      reviews: 342,
      priceLevel: 2,
      location: 'Tala Town',
      address: 'Main Street, Tala Town',
      phone: '+254 712 345 678',
      email: 'info@talakitchen.co.ke',
      website: 'www.talakitchen.co.ke',
      openingHours: {
        monday: '8:00 - 22:00',
        tuesday: '8:00 - 22:00',
        wednesday: '8:00 - 22:00',
        thursday: '8:00 - 22:00',
        friday: '8:00 - 23:00',
        saturday: '9:00 - 23:00',
        sunday: '9:00 - 21:00',
      },
      features: ['Outdoor Seating', 'Free WiFi', 'Parking', 'Family Friendly', 'Live Music Weekends'],
      dietary: ['Vegetarian Options', 'Gluten-Free Options'],
      popularDishes: ['Nyama Choma', 'Ugali & Sukuma', 'Pilau', 'Fish Fry'],
      delivery: true,
      pickup: true,
      catering: true,
      eventCapacity: 80,
      eventSpaces: [
        {
          id: 'es1',
          name: 'Garden Patio',
          capacity: 40,
          description: 'Beautiful outdoor space perfect for birthday parties and small gatherings',
          image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          price: 5000,
        },
        {
          id: 'es2',
          name: 'Main Hall',
          capacity: 80,
          description: 'Indoor space with stage, ideal for weddings and corporate events',
          image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          price: 10000,
        },
      ],
      photos: [
        'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      menu: [
        {
          id: 'menu1',
          name: 'Main Dishes',
          items: [
            {
              id: 'm1',
              name: 'Nyama Choma',
              description: 'Grilled meat served with kachumbari and ugali',
              price: 800,
              image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
              popular: true,
            },
            {
              id: 'm2',
              name: 'Pilau',
              description: 'Spiced rice with beef or chicken',
              price: 450,
              popular: true,
            },
            {
              id: 'm3',
              name: 'Fish Fry',
              description: 'Whole fried fish with ugali and vegetables',
              price: 650,
            },
          ],
        },
        {
          id: 'menu2',
          name: 'Sides',
          items: [
            {
              id: 's1',
              name: 'Ugali',
              description: 'Cornmeal staple',
              price: 100,
            },
            {
              id: 's2',
              name: 'Sukuma Wiki',
              description: 'Sautéed collard greens',
              price: 150,
              vegetarian: true,
            },
          ],
        },
      ],
      reviewsList: [
        {
          id: 'r1',
          user: 'John M.',
          rating: 5,
          comment: 'Best nyama choma in Tala! Great atmosphere and friendly staff.',
          date: '2026-03-05',
          helpful: 23,
        },
        {
          id: 'r2',
          user: 'Sarah K.',
          rating: 4,
          comment: 'Lovely place for family dinners. The pilau is amazing.',
          date: '2026-02-28',
          helpful: 12,
        },
      ],
      badges: ['Top Rated', 'Family Friendly', 'Catering Available'],
      offers: [
        {
          id: 'o1',
          title: 'Birthday Special',
          description: 'Free dessert for birthday celebrants with group of 4+',
          discount: 15,
          code: 'BDAY15',
          validUntil: '2026-12-31',
          type: 'birthday',
        },
        {
          id: 'o2',
          title: 'Happy Hour',
          description: '20% off all drinks, 5-7 PM weekdays',
          discount: 20,
          validUntil: '2026-12-31',
          type: 'happy-hour',
        },
      ],
    },
  
    // Kwa Ndege Eatery
    {
      id: 'kwa-ndege',
      name: 'Kwa Ndege Eatery',
      cuisine: 'Local Fast Food',
      category: 'fast-food',
      description: 'Popular spot for quick, delicious meals. Known for our famous chips masala and burgers.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=1065&q=80',
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      rating: 4.6,
      reviews: 567,
      priceLevel: 1,
      location: 'Kwa Ndege',
      address: 'Kwa Ndege Stage, Tala',
      phone: '+254 723 456 789',
      email: 'kwandege@example.com',
      openingHours: {
        monday: '7:00 - 22:00',
        tuesday: '7:00 - 22:00',
        wednesday: '7:00 - 22:00',
        thursday: '7:00 - 22:00',
        friday: '7:00 - 23:00',
        saturday: '8:00 - 23:00',
        sunday: '8:00 - 21:00',
      },
      features: ['Takeaway', 'Delivery', 'Outdoor Seating'],
      dietary: [],
      popularDishes: ['Chips Masala', 'Chicken Burger', 'Samosas', 'Mandaazi'],
      delivery: true,
      pickup: true,
      catering: false,
      photos: [
        'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=1065&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      ],
      menu: [
        {
          id: 'menu1',
          name: 'Fast Food',
          items: [
            {
              id: 'm1',
              name: 'Chips Masala',
              description: 'French fries tossed in spicy masala seasoning',
              price: 250,
              popular: true,
              spicy: true,
            },
            {
              id: 'm2',
              name: 'Chicken Burger',
              description: 'Grilled chicken patty with lettuce, tomato, and sauce',
              price: 350,
              popular: true,
            },
            {
              id: 'm3',
              name: 'Samosas (3 pcs)',
              description: 'Fried pastries filled with spiced meat or vegetables',
              price: 150,
              vegetarian: true,
            },
          ],
        },
      ],
      badges: ['Popular', 'Quick Service'],
      offers: [
        {
          id: 'o3',
          title: 'Student Special',
          description: '15% off with student ID, Monday-Thursday',
          discount: 15,
          code: 'STUDENT15',
          validUntil: '2026-12-31',
          type: 'deal',
        },
      ],
    },
  
    // Mama Pima Hotel
    {
      id: 'mama-pima',
      name: 'Mama Pima Hotel',
      cuisine: 'Local & International',
      category: 'hotels',
      description: 'Full-service hotel with restaurant, bar, and event spaces. Perfect for weddings, parties, and corporate events.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      coverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.7,
      reviews: 234,
      priceLevel: 3,
      location: 'Tala Town',
      address: 'Kangundo Road, Tala',
      phone: '+254 734 567 890',
      email: 'info@mamapima.co.ke',
      website: 'www.mamapima.co.ke',
      openingHours: {
        monday: '24 hours',
        tuesday: '24 hours',
        wednesday: '24 hours',
        thursday: '24 hours',
        friday: '24 hours',
        saturday: '24 hours',
        sunday: '24 hours',
      },
      features: ['Restaurant', 'Bar', 'Event Hall', 'Accommodation', 'Pool', 'Free WiFi', 'Parking'],
      dietary: ['Vegetarian Options', 'Halal Options'],
      popularDishes: ['Buffet', 'Nyama Choma', 'Seafood Platter'],
      delivery: false,
      pickup: true,
      catering: true,
      eventCapacity: 300,
      eventSpaces: [
        {
          id: 'es1',
          name: 'Grand Ballroom',
          capacity: 300,
          description: 'Luxurious indoor space for weddings, galas, and large parties',
          image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          price: 25000,
        },
        {
          id: 'es2',
          name: 'Garden Pavilion',
          capacity: 150,
          description: 'Outdoor garden space perfect for ceremonies and cocktail parties',
          image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          price: 15000,
        },
        {
          id: 'es3',
          name: 'Conference Room',
          capacity: 50,
          description: 'Professional space for meetings and small gatherings',
          image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
          price: 8000,
        },
      ],
      photos: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      menu: [
        {
          id: 'menu1',
          name: 'Restaurant Menu',
          items: [
            {
              id: 'm1',
              name: 'Breakfast Buffet',
              description: 'Full breakfast spread with hot and cold options',
              price: 800,
            },
            {
              id: 'm2',
              name: 'Lunch Buffet',
              description: 'Variety of local and international dishes',
              price: 1200,
            },
            {
              id: 'm3',
              name: 'Dinner Buffet',
              description: 'Evening buffet with live cooking stations',
              price: 1500,
            },
          ],
        },
      ],
      badges: ['Top Rated', 'Event Specialist', 'Luxury'],
      offers: [
        {
          id: 'o4',
          title: 'Wedding Package',
          description: 'Complete wedding package including venue, catering, and decor',
          discount: 20,
          validUntil: '2026-12-31',
          type: 'event',
        },
        {
          id: 'o5',
          title: 'Birthday Party Special',
          description: 'Free cake for birthday celebrant with group booking',
          discount: 10,
          code: 'BDAY10',
          validUntil: '2026-12-31',
          type: 'birthday',
        },
        {
          id: 'o6',
          title: 'Corporate Event Discount',
          description: '15% off for corporate bookings of 50+ guests',
          discount: 15,
          code: 'CORP15',
          validUntil: '2026-12-31',
          type: 'event',
        },
      ],
    },
  
    // Tala Coffee House
    {
      id: 'tala-coffee',
      name: 'Tala Coffee House',
      cuisine: 'Cafe & Bakery',
      category: 'cafes',
      description: 'Cozy cafe serving specialty coffee, fresh pastries, and light meals. Great for working or relaxing.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1147&q=80',
      coverImage: 'https://images.unsplash.com/photo-1559925393-8c0a3b4b8c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.5,
      reviews: 156,
      priceLevel: 2,
      location: 'Tala Town',
      address: 'Market Street, Tala',
      phone: '+254 745 678 901',
      email: 'hello@talacoffee.co.ke',
      openingHours: {
        monday: '7:00 - 20:00',
        tuesday: '7:00 - 20:00',
        wednesday: '7:00 - 20:00',
        thursday: '7:00 - 20:00',
        friday: '7:00 - 22:00',
        saturday: '8:00 - 22:00',
        sunday: '9:00 - 18:00',
      },
      features: ['Free WiFi', 'Outdoor Seating', 'Takeaway', 'Work-Friendly'],
      dietary: ['Vegetarian Options', 'Vegan Options', 'Gluten-Free Options'],
      popularDishes: ['Espresso', 'Croissants', 'Sandwiches', 'Cakes'],
      delivery: true,
      pickup: true,
      catering: false,
      photos: [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1147&q=80',
        'https://images.unsplash.com/photo-1559925393-8c0a3b4b8c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      menu: [
        {
          id: 'menu1',
          name: 'Coffee',
          items: [
            {
              id: 'c1',
              name: 'Espresso',
              description: 'Single shot of espresso',
              price: 120,
            },
            {
              id: 'c2',
              name: 'Cappuccino',
              description: 'Espresso with steamed milk and foam',
              price: 200,
              popular: true,
            },
            {
              id: 'c3',
              name: 'Latte',
              description: 'Espresso with steamed milk',
              price: 220,
            },
          ],
        },
        {
          id: 'menu2',
          name: 'Pastries',
          items: [
            {
              id: 'p1',
              name: 'Butter Croissant',
              description: 'Flaky, buttery croissant',
              price: 150,
              vegetarian: true,
            },
            {
              id: 'p2',
              name: 'Chocolate Cake',
              description: 'Rich chocolate layer cake',
              price: 250,
              popular: true,
            },
          ],
        },
      ],
      badges: ['Coffee Lovers', 'Cozy'],
    },
  
    // Mama Pima Catering
    {
      id: 'mama-pima-catering',
      name: 'Mama Pima Catering',
      cuisine: 'Local & International',
      category: 'catering',
      description: 'Professional catering services for weddings, parties, corporate events, and more.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      coverImage: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      rating: 4.9,
      reviews: 89,
      priceLevel: 3,
      location: 'Tala Town',
      address: 'Kangundo Road, Tala',
      phone: '+254 756 789 012',
      email: 'catering@mamapima.co.ke',
      openingHours: {
        monday: '8:00 - 18:00',
        tuesday: '8:00 - 18:00',
        wednesday: '8:00 - 18:00',
        thursday: '8:00 - 18:00',
        friday: '8:00 - 20:00',
        saturday: '9:00 - 18:00',
        sunday: 'By appointment',
      },
      features: ['Full Service', 'Custom Menus', 'Delivery', 'Setup & Cleanup'],
      dietary: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal'],
      popularDishes: ['Buffet Packages', 'Nyama Choma Platters', 'Finger Foods'],
      delivery: true,
      pickup: true,
      catering: true,
      eventCapacity: 500,
      photos: [
        'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      ],
      menu: [
        {
          id: 'menu1',
          name: 'Catering Packages',
          items: [
            {
              id: 'cp1',
              name: 'Basic Package (50 pax)',
              description: 'Rice, beef stew, vegetables, and soda',
              price: 25000,
            },
            {
              id: 'cp2',
              name: 'Premium Package (100 pax)',
              description: 'Nyama choma, pilau, chapati, salads, and soft drinks',
              price: 60000,
              popular: true,
            },
            {
              id: 'cp3',
              name: 'Wedding Package (200 pax)',
              description: 'Full buffet with multiple options, dessert, and service staff',
              price: 150000,
            },
          ],
        },
      ],
      badges: ['Top Rated', 'Event Specialist', 'Professional'],
      offers: [
        {
          id: 'o7',
          title: 'Wedding Catering',
          description: '10% off for weddings booked 3+ months in advance',
          discount: 10,
          code: 'WEDDING10',
          validUntil: '2026-12-31',
          type: 'event',
        },
        {
          id: 'o8',
          title: 'Birthday Party Special',
          description: 'Free birthday cake with catering order of 50+ pax',
          discount: 0,
          code: 'BDAYCAKE',
          validUntil: '2026-12-31',
          type: 'birthday',
        },
      ],
    },
  ];
  
  // Top Rated Restaurants
  export const topRatedRestaurants = restaurants
    .filter(r => r.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);
  
  // Flash Offers & Deals
  export const flashOffers = restaurants
    .flatMap(r => r.offers?.map(o => ({ ...o, restaurant: r.name, restaurantId: r.id })) || [])
    .filter(o => o.type === 'deal' || o.type === 'happy-hour')
    .slice(0, 4);
  
  // Event Offers (Birthday, Party, Wedding)
  export const eventOffers = restaurants
    .flatMap(r => r.offers?.map(o => ({ ...o, restaurant: r.name, restaurantId: r.id })) || [])
    .filter(o => o.type === 'birthday' || o.type === 'event' || o.type === 'party');
  
  // Slideshow items for guests
  export const foodSlideshowItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Local Cuisine',
      description: 'Authentic Kenyan dishes from local restaurants',
      link: '/food/cuisine/local'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Catering Services',
      description: 'Professional catering for your events',
      link: '/food/cuisine/catering'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Event Spaces',
      description: 'Book venues for weddings and parties',
      link: '/food/cuisine/hotels'
    }
  ];