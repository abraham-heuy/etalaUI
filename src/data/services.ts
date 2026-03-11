// data/services.ts
import { 
    Scissors,
    Laptop,
    Droplets,
    Hammer,
    Home,
    Wrench,
    Camera,
    PenTool,
    ChefHat,
    Dumbbell,
    Stethoscope,
    BookOpen  } from 'lucide-react';
  
  export interface ServiceProvider {
    id: string;
    name: string;
    profession: string;
    category: string;
    subcategory?: string;
    image: string;
    coverImage?: string;
    rating: number;
    reviews: number;
    verified: boolean;
    location: string;
    experience: number; // years
    hourlyRate?: number;
    fixedPrice?: number;
    priceUnit?: 'hour' | 'day' | 'project' | 'visit';
    phone: string;
    email: string;
    bio: string;
    skills: string[];
    languages: string[];
    availability: 'available' | 'busy' | 'booked';
    responseTime: string;
    completedJobs: number;
    portfolio?: PortfolioItem[];
    reviewsList?: Review[];
    workingHours?: WorkingHours;
    badges?: string[];
  }
  
  export interface PortfolioItem {
    id: string;
    title: string;
    image: string;
    description: string;
    date: string;
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
  
  export interface WorkingHours {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  }
  
  export interface ServiceCategory {
    id: string;
    name: string;
    icon: any;
    image: string;
    description: string;
    count: number;
    color: string;
  }
  
  // Service Categories
  export const serviceCategories: ServiceCategory[] = [
    {
      id: 'salons',
      name: 'Salons & Barbers',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1560066984-13812e35c06d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Professional hair, nails, and grooming services',
      count: 45,
      color: 'from-pink-400 to-rose-500',
    },
    {
      id: 'cyber',
      name: 'Cyber Cafes',
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Printing, scanning, typing, and computer services',
      count: 28,
      color: 'from-blue-400 to-indigo-500',
    },
    {
      id: 'plumbing',
      name: 'Plumbing',
      icon: Droplets,
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      description: 'Expert plumbers for repairs and installations',
      count: 32,
      color: 'from-cyan-400 to-blue-500',
    },
    {
      id: 'electrical',
      name: 'Electrical',
      icon: Hammer,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      description: 'Licensed electricians for all your electrical needs',
      count: 24,
      color: 'from-yellow-400 to-amber-500',
    },
    {
      id: 'cleaning',
      name: 'Cleaning',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Professional home and office cleaning services',
      count: 37,
      color: 'from-green-400 to-emerald-500',
    },
    {
      id: 'repairs',
      name: 'Repairs',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Electronics, appliance, and general repairs',
      count: 29,
      color: 'from-orange-400 to-red-500',
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Professional photography for events and portraits',
      count: 18,
      color: 'from-purple-400 to-violet-500',
    },
    {
      id: 'graphic-design',
      name: 'Graphic Design',
      icon: PenTool,
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
      description: 'Logos, branding, and creative design services',
      count: 22,
      color: 'from-fuchsia-400 to-pink-500',
    },
    {
      id: 'catering',
      name: 'Catering',
      icon: ChefHat,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Delicious food catering for events and parties',
      count: 31,
      color: 'from-red-400 to-orange-500',
    },
    {
      id: 'fitness',
      name: 'Fitness & Training',
      icon: Dumbbell,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Personal trainers and fitness instructors',
      count: 15,
      color: 'from-lime-400 to-green-500',
    },
    {
      id: 'health',
      name: 'Health & Wellness',
      icon: Stethoscope,
      image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1191&q=80',
      description: 'Massage therapy, nutritionists, and wellness coaches',
      count: 20,
      color: 'from-teal-400 to-cyan-500',
    },
    {
      id: 'tutoring',
      name: 'Tutoring',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1122&q=80',
      description: 'Private tutors for all subjects and levels',
      count: 26,
      color: 'from-indigo-400 to-purple-500',
    },
  ];
  
  // Service Providers
  export const serviceProviders: ServiceProvider[] = [
    // Salons & Barbers
    {
      id: 'mama-joy',
      name: 'Mama Joy Salon',
      profession: 'Professional Hair Stylist & Braider',
      category: 'salons',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      coverImage: 'https://images.unsplash.com/photo-1560066984-13812e35c06d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.9,
      reviews: 234,
      verified: true,
      location: 'Kwa Ndege, Tala',
      experience: 12,
      fixedPrice: 800,
      priceUnit: 'visit',
      phone: '+254 712 345 678',
      email: 'mamajoy@example.com',
      bio: 'With over 12 years of experience, I specialize in all types of braiding, weaving, and natural hair care. I take pride in making my clients feel beautiful and confident.',
      skills: ['Braiding', 'Weaving', 'Natural Hair Care', 'Coloring', 'Styling'],
      languages: ['English', 'Swahili', 'Kamba'],
      availability: 'available',
      responseTime: '< 1 hour',
      completedJobs: 1250,
      badges: ['Top Rated', 'Verified', '5+ Years'],
      workingHours: {
        monday: '8:00 - 18:00',
        tuesday: '8:00 - 18:00',
        wednesday: '8:00 - 18:00',
        thursday: '8:00 - 18:00',
        friday: '8:00 - 20:00',
        saturday: '9:00 - 18:00',
        sunday: 'Closed',
      },
      portfolio: [
        {
          id: 'p1',
          title: 'Box Braids',
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          description: 'Beautiful box braids with colored extensions',
          date: '2026-02-15',
        },
        {
          id: 'p2',
          title: 'Wedding Updo',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
          description: 'Elegant updo for a bride',
          date: '2026-02-10',
        },
        {
          id: 'p3',
          title: 'Natural Hair Styling',
          image: 'https://images.unsplash.com/photo-1487412724859-aa4c1b233bb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          description: 'Natural hair twist out style',
          date: '2026-02-05',
        },
      ],
      reviewsList: [
        {
          id: 'r1',
          user: 'Mary K.',
          rating: 5,
          comment: 'Mama Joy is amazing! My braids lasted for 2 months and looked perfect the whole time.',
          date: '2026-03-01',
          helpful: 12,
        },
        {
          id: 'r2',
          user: 'Jane M.',
          rating: 5,
          comment: 'Very professional and clean salon. My new go-to place for hair.',
          date: '2026-02-25',
          helpful: 8,
        },
        {
          id: 'r3',
          user: 'Sarah W.',
          rating: 4,
          comment: 'Great service, reasonably priced. Will definitely come back.',
          date: '2026-02-18',
          helpful: 5,
        },
      ],
    },
    {
      id: 'john-barber',
      name: 'John\'s Barber Shop',
      profession: 'Master Barber',
      category: 'salons',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      coverImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80',
      rating: 4.8,
      reviews: 156,
      verified: true,
      location: 'Tala Town',
      experience: 8,
      fixedPrice: 400,
      priceUnit: 'visit',
      phone: '+254 723 456 789',
      email: 'johnsbarber@example.com',
      bio: 'Professional barber with 8 years of experience. Specializing in modern cuts, fades, and beard grooming.',
      skills: ['Fade Cuts', 'Beard Grooming', 'Hair Styling', 'Shaving'],
      languages: ['English', 'Swahili'],
      availability: 'available',
      responseTime: '< 30 mins',
      completedJobs: 3200,
      badges: ['Top Rated', 'Verified'],
    },
  
    // Cyber Cafes
    {
      id: 'tala-cyber',
      name: 'Tala Cyber Cafe',
      profession: 'Computer Services & Printing',
      category: 'cyber',
      image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      rating: 4.7,
      reviews: 89,
      verified: true,
      location: 'Tala Town',
      experience: 5,
      fixedPrice: 50,
      priceUnit: 'hour',
      phone: '+254 734 567 890',
      email: 'talacyber@example.com',
      bio: 'Full-service cyber cafe offering printing, scanning, typing, and computer access. Fast internet and friendly service.',
      skills: ['Printing', 'Scanning', 'Typing', 'Document Processing', 'Internet Access'],
      languages: ['English', 'Swahili'],
      availability: 'available',
      responseTime: '< 15 mins',
      completedJobs: 4500,
      workingHours: {
        monday: '7:00 - 21:00',
        tuesday: '7:00 - 21:00',
        wednesday: '7:00 - 21:00',
        thursday: '7:00 - 21:00',
        friday: '7:00 - 22:00',
        saturday: '8:00 - 20:00',
        sunday: '10:00 - 18:00',
      },
    },
  
    // Plumbing
    {
      id: 'john-plumbing',
      name: 'John\'s Plumbing Services',
      profession: 'Licensed Plumber',
      category: 'plumbing',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      rating: 4.9,
      reviews: 312,
      verified: true,
      location: 'Tala Town',
      experience: 15,
      hourlyRate: 800,
      priceUnit: 'hour',
      phone: '+254 745 678 901',
      email: 'johnplumbing@example.com',
      bio: 'Licensed plumber with 15 years of experience. Specializing in repairs, installations, and maintenance. Fast, reliable, and affordable.',
      skills: ['Pipe Repairs', 'Fixture Installation', 'Drain Cleaning', 'Water Heaters', 'Leak Detection'],
      languages: ['English', 'Swahili', 'Kamba'],
      availability: 'available',
      responseTime: '< 2 hours',
      completedJobs: 2800,
      badges: ['Top Rated', 'Verified', '15+ Years'],
    },
  
    // Electrical
    {
      id: 'peter-electrical',
      name: 'Peter Electrical Services',
      profession: 'Master Electrician',
      category: 'electrical',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      rating: 4.8,
      reviews: 178,
      verified: true,
      location: 'Kangundo',
      experience: 10,
      hourlyRate: 700,
      priceUnit: 'hour',
      phone: '+254 756 789 012',
      email: 'peterelectrical@example.com',
      bio: 'Master electrician specializing in residential and commercial electrical work. Safety and quality guaranteed.',
      skills: ['Wiring', 'Lighting Installation', 'Circuit Breakers', 'Electrical Repairs', 'Safety Inspections'],
      languages: ['English', 'Swahili'],
      availability: 'available',
      responseTime: '< 1 hour',
      completedJobs: 1850,
      badges: ['Top Rated', 'Verified', 'Licensed'],
    },
  
    // Cleaning
    {
      id: 'clean-team',
      name: 'Clean Team Services',
      profession: 'Professional Cleaners',
      category: 'cleaning',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.7,
      reviews: 245,
      verified: true,
      location: 'Tala Town',
      experience: 6,
      hourlyRate: 500,
      priceUnit: 'hour',
      phone: '+254 767 890 123',
      email: 'cleanteam@example.com',
      bio: 'Professional cleaning team for homes and offices. Eco-friendly products and thorough service.',
      skills: ['House Cleaning', 'Office Cleaning', 'Deep Cleaning', 'Move-out Cleaning', 'Window Cleaning'],
      languages: ['English', 'Swahili'],
      availability: 'available',
      responseTime: '< 3 hours',
      completedJobs: 3200,
      badges: ['Top Rated', 'Verified'],
    },
  
    // Repairs
    {
      id: 'tech-repairs',
      name: 'Tala Tech Repairs',
      profession: 'Electronics Repair Specialist',
      category: 'repairs',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.6,
      reviews: 134,
      verified: true,
      location: 'Kwa Ndege',
      experience: 4,
      fixedPrice: 1000,
      priceUnit: 'visit',
      phone: '+254 778 901 234',
      email: 'techrepairs@example.com',
      bio: 'Expert in phone, laptop, and electronics repairs. Fast turnaround and quality parts.',
      skills: ['Phone Repair', 'Laptop Repair', 'Screen Replacement', 'Battery Replacement', 'Software Issues'],
      languages: ['English', 'Swahili'],
      availability: 'available',
      responseTime: '< 2 hours',
      completedJobs: 890,
      portfolio: [
        {
          id: 'p4',
          title: 'iPhone Screen Replacement',
          image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          description: 'Replaced cracked screen on iPhone 12',
          date: '2026-02-20',
        },
        {
          id: 'p5',
          title: 'Laptop Battery Replacement',
          image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          description: 'Replaced dead battery on Dell laptop',
          date: '2026-02-18',
        },
      ],
    },
  
    // Photography
    {
      id: 'joe-photo',
      name: 'Joe Photography',
      profession: 'Professional Photographer',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.9,
      reviews: 87,
      verified: true,
      location: 'Tala Town',
      experience: 7,
      fixedPrice: 5000,
      priceUnit: 'project',
      phone: '+254 789 012 345',
      email: 'joephoto@example.com',
      bio: 'Professional photographer specializing in events, portraits, and commercial photography.',
      skills: ['Event Photography', 'Portraits', 'Weddings', 'Product Photography', 'Photo Editing'],
      languages: ['English', 'Swahili'],
      availability: 'available',
      responseTime: '< 1 hour',
      completedJobs: 560,
      badges: ['Top Rated', 'Verified'],
    },
  
    // Graphic Design
    {
      id: 'sarah-designs',
      name: 'Sarah Creative Designs',
      profession: 'Graphic Designer',
      category: 'graphic-design',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.8,
      reviews: 56,
      verified: true,
      location: 'Remote',
      experience: 5,
      fixedPrice: 2000,
      priceUnit: 'project',
      phone: '+254 790 123 456',
      email: 'sarahdesigns@example.com',
      bio: 'Creative graphic designer specializing in logos, branding, and social media content.',
      skills: ['Logo Design', 'Branding', 'Social Media Graphics', 'Flyers', 'Business Cards'],
      languages: ['English', 'Swahili'],
      availability: 'available',
      responseTime: '< 2 hours',
      completedJobs: 320,
      portfolio: [
        {
          id: 'p6',
          title: 'Restaurant Branding',
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
          description: 'Complete branding package for local restaurant',
          date: '2026-02-10',
        },
      ],
    },
  ];
  
  // Top Rated Providers
  export const topRatedProviders = serviceProviders
    .filter(p => p.rating >= 4.8)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
  
  // Slideshow items for guests
  export const servicesSlideshowItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      title: 'Professional Services',
      description: 'Find trusted experts for all your needs',
      link: '/services/category/salons'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      title: 'Home Repairs',
      description: 'Licensed plumbers, electricians, and more',
      link: '/services/category/plumbing'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      title: 'Beauty & Wellness',
      description: 'Salons, barbers, and wellness experts',
      link: '/services/category/salons'
    }
  ];