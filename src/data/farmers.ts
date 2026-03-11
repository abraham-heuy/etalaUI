// data/farmers.ts
import { 
    Apple,
    Leaf,
    Milk,
    Beef,
    Wheat,
    Droplets,
    Egg,
    Carrot,
    Citrus  } from 'lucide-react';
  
  export interface FarmerProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    unit: string;
    originalPrice?: number;
    images: string[];
    category: string;
    subcategory: string;
    farmer: {
      id: string;
      name: string;
      verified: boolean;
      rating: number;
      totalSales: number;
      location: string;
      farmSize?: string;
      yearsFarming?: number;
      organic?: boolean;
    };
    rating: number;
    reviews: number;
    inStock: boolean;
    seasonal: boolean;
    harvestDate: string;
    expiresIn?: string;
    tags: string[];
    createdAt: string;
  }
  
  export interface FarmerCategory {
    id: string;
    name: string;
    icon: any;
    image: string;
    description: string;
    subcategories: FarmerSubcategory[];
  }
  
  export interface FarmerSubcategory {
    id: string;
    name: string;
    icon: any;
    count: number;
  }
  
  export interface TopFarmer {
    id: string;
    name: string;
    image: string;
    coverImage?: string;
    rating: number;
    products: number;
    verified: boolean;
    location: string;
    yearsFarming: number;
    organic: boolean;
    specialties: string[];
    description: string;
  }
  
  // Categories from navbar
  export const farmerCategories: FarmerCategory[] = [
    {
      id: 'vegetables',
      name: 'Vegetables',
      icon: Leaf,
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa68c5b41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1032&q=80',
      description: 'Fresh, locally grown vegetables harvested daily',
      subcategories: [
        { id: 'leafy-greens', name: 'Leafy Greens', icon: Leaf, count: 23 },
        { id: 'root-vegetables', name: 'Root Vegetables', icon: Carrot, count: 18 },
        { id: 'cruciferous', name: 'Cruciferous', icon: Leaf, count: 12 },
        { id: 'nightshades', name: 'Nightshades', icon: Apple, count: 15 },
      ]
    },
    {
      id: 'fruits',
      name: 'Fruits',
      icon: Apple,
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Sweet, ripe fruits from local orchards',
      subcategories: [
        { id: 'citrus', name: 'Citrus', icon: Citrus, count: 14 },
        { id: 'tropical', name: 'Tropical', icon: Apple, count: 19 },
        { id: 'berries', name: 'Berries', icon: Apple, count: 8 },
        { id: 'stone-fruits', name: 'Stone Fruits', icon: Apple, count: 11 },
      ]
    },
    {
      id: 'dairy-eggs',
      name: 'Dairy & Eggs',
      icon: Milk,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      description: 'Farm-fresh dairy products and free-range eggs',
      subcategories: [
        { id: 'milk', name: 'Fresh Milk', icon: Milk, count: 12 },
        { id: 'cheese', name: 'Cheese', icon: Milk, count: 9 },
        { id: 'yogurt', name: 'Yogurt', icon: Milk, count: 7 },
        { id: 'eggs', name: 'Eggs', icon: Egg, count: 21 },
      ]
    },
    {
      id: 'meat-fish',
      name: 'Meat & Fish',
      icon: Beef,
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Fresh cuts of meat and sustainably sourced fish',
      subcategories: [
        { id: 'beef', name: 'Beef', icon: Beef, count: 16 },
        { id: 'poultry', name: 'Poultry', icon: Beef, count: 19 },
        { id: 'pork', name: 'Pork', icon: Beef, count: 11 },
        { id: 'fish', name: 'Fresh Fish', icon: Beef, count: 14 },
      ]
    },
    {
      id: 'grains',
      name: 'Grains & Cereals',
      icon: Wheat,
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Locally grown grains and cereals',
      subcategories: [
        { id: 'maize', name: 'Maize', icon: Wheat, count: 24 },
        { id: 'beans', name: 'Beans', icon: Wheat, count: 18 },
        { id: 'rice', name: 'Rice', icon: Wheat, count: 9 },
        { id: 'millet', name: 'Millet & Sorghum', icon: Wheat, count: 7 },
      ]
    },
    {
      id: 'honey',
      name: 'Honey & More',
      icon: Droplets,
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e8914c9b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      description: 'Pure, raw honey and natural sweeteners',
      subcategories: [
        { id: 'raw-honey', name: 'Raw Honey', icon: Droplets, count: 8 },
        { id: 'flavored-honey', name: 'Flavored Honey', icon: Droplets, count: 5 },
        { id: 'bee-products', name: 'Bee Products', icon: Droplets, count: 6 },
        { id: 'syrups', name: 'Natural Syrups', icon: Droplets, count: 4 },
      ]
    },
  ];
  
  // Top Farmers
  export const topFarmers: TopFarmer[] = [
    {
      id: 'mama-lucy',
      name: "Mama Lucy's Farm",
      image: 'https://images.unsplash.com/photo-1500595046743-fd4d19457b4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      coverImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.9,
      products: 45,
      verified: true,
      location: 'Kyumbi',
      yearsFarming: 15,
      organic: true,
      specialties: ['Vegetables', 'Dairy', 'Free-range Eggs'],
      description: 'Family-owned farm providing fresh produce to Tala for over 15 years. All products are organically grown with traditional farming methods.',
    },
    {
      id: 'kilonzo-produce',
      name: "Kilonzo's Produce",
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.8,
      products: 38,
      verified: true,
      location: 'Kangundo',
      yearsFarming: 10,
      organic: true,
      specialties: ['Fruits', 'Vegetables', 'Herbs'],
      description: 'Specializing in exotic fruits and vegetables. Known for our sweet mangoes and fresh herbs.',
    },
    {
      id: 'mutua-orchard',
      name: "Mutua's Orchard",
      image: 'https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1032&q=80',
      coverImage: 'https://images.unsplash.com/photo-1528825871115-358b8ebc9bc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.7,
      products: 28,
      verified: true,
      location: 'Matuu',
      yearsFarming: 20,
      organic: false,
      specialties: ['Fruits', 'Honey', 'Nuts'],
      description: 'A family orchard with over 20 years of experience. Famous for our avocadoes and macadamia nuts.',
    },
    {
      id: 'nzomo-dairy',
      name: "Nzomo Dairy",
      image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      coverImage: 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.9,
      products: 22,
      verified: true,
      location: 'Tala Town',
      yearsFarming: 12,
      organic: true,
      specialties: ['Fresh Milk', 'Yogurt', 'Cheese'],
      description: 'Award-winning dairy products from pasture-fed cows. Our yogurt is a community favorite!',
    },
    {
      id: 'mutisya-fish',
      name: "Mutisya Fish Farm",
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.6,
      products: 15,
      verified: false,
      location: 'Kyumbi',
      yearsFarming: 5,
      organic: true,
      specialties: ['Fresh Fish', 'Tilapia', 'Catfish'],
      description: 'Sustainable fish farming with fresh harvests every week. No antibiotics or chemicals used.',
    },
  ];
  
  // Farmer Products
  export const farmerProducts: FarmerProduct[] = [
    // Mama Lucy's Farm Products
    {
      id: 'f1',
      name: 'Fresh Sukuma Wiki (Kale)',
      description: 'Bunches of fresh, green sukuma wiki harvested this morning. Perfect for your daily meals.',
      price: 50,
      unit: 'per bunch',
      images: [
        'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1032&q=80',
      ],
      category: 'vegetables',
      subcategory: 'leafy-greens',
      farmer: {
        id: 'mama-lucy',
        name: "Mama Lucy's Farm",
        verified: true,
        rating: 4.9,
        totalSales: 1245,
        location: 'Kyumbi',
        farmSize: '5 acres',
        yearsFarming: 15,
        organic: true,
      },
      rating: 4.9,
      reviews: 234,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-11',
      tags: ['organic', 'fresh', 'vegetables'],
      createdAt: '2026-03-11',
    },
    {
      id: 'f2',
      name: 'Farm Fresh Eggs (Tray)',
      description: 'Free-range eggs from happy chickens. One tray contains 30 eggs.',
      price: 450,
      unit: 'per tray',
      originalPrice: 500,
      images: [
        'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      category: 'dairy-eggs',
      subcategory: 'eggs',
      farmer: {
        id: 'mama-lucy',
        name: "Mama Lucy's Farm",
        verified: true,
        rating: 4.9,
        totalSales: 1245,
        location: 'Kyumbi',
        organic: true,
      },
      rating: 4.8,
      reviews: 156,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-10',
      tags: ['free-range', 'eggs', 'organic'],
      createdAt: '2026-03-10',
    },
    {
      id: 'f3',
      name: 'Fresh Milk (1L)',
      description: 'Fresh, unpasteurized milk from grass-fed cows. Delivered chilled.',
      price: 80,
      unit: 'per litre',
      images: [
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      ],
      category: 'dairy-eggs',
      subcategory: 'milk',
      farmer: {
        id: 'mama-lucy',
        name: "Mama Lucy's Farm",
        verified: true,
        rating: 4.9,
        totalSales: 1245,
        location: 'Kyumbi',
        organic: true,
      },
      rating: 4.9,
      reviews: 312,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-11',
      expiresIn: '3 days',
      tags: ['fresh', 'milk', 'dairy'],
      createdAt: '2026-03-11',
    },
  
    // Kilonzo's Produce
    {
      id: 'f4',
      name: 'Sweet Mangoes',
      description: 'Ripe, sweet mangoes from our orchard. Perfect for eating fresh or making juice.',
      price: 200,
      unit: 'per kg',
      images: [
        'https://images.unsplash.com/photo-1553279768-86564c8d4a3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      ],
      category: 'fruits',
      subcategory: 'tropical',
      farmer: {
        id: 'kilonzo-produce',
        name: "Kilonzo's Produce",
        verified: true,
        rating: 4.8,
        totalSales: 876,
        location: 'Kangundo',
        organic: true,
      },
      rating: 4.9,
      reviews: 178,
      inStock: true,
      seasonal: true,
      harvestDate: '2026-03-09',
      tags: ['mangoes', 'fruits', 'seasonal'],
      createdAt: '2026-03-09',
    },
    {
      id: 'f5',
      name: 'Fresh Avocados',
      description: 'Creamy, ripe avocados. Great for guacamole or salads.',
      price: 150,
      unit: 'per kg',
      images: [
        'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&auto=format&fit=crop&w=1075&q=80',
      ],
      category: 'fruits',
      subcategory: 'tropical',
      farmer: {
        id: 'kilonzo-produce',
        name: "Kilonzo's Produce",
        verified: true,
        rating: 4.8,
        totalSales: 876,
        location: 'Kangundo',
        organic: true,
      },
      rating: 4.7,
      reviews: 98,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-10',
      tags: ['avocados', 'fruits', 'organic'],
      createdAt: '2026-03-10',
    },
  
    // Mutua's Orchard
    {
      id: 'f6',
      name: 'Fresh Oranges',
      description: 'Juicy, sweet oranges from our orchard. Perfect for juicing.',
      price: 120,
      unit: 'per kg',
      images: [
        'https://images.unsplash.com/photo-1547514701-42782101795c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      ],
      category: 'fruits',
      subcategory: 'citrus',
      farmer: {
        id: 'mutua-orchard',
        name: "Mutua's Orchard",
        verified: true,
        rating: 4.7,
        totalSales: 654,
        location: 'Matuu',
        organic: false,
      },
      rating: 4.6,
      reviews: 87,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-08',
      tags: ['oranges', 'citrus', 'fruits'],
      createdAt: '2026-03-08',
    },
    {
      id: 'f7',
      name: 'Raw Honey (500g)',
      description: 'Pure, raw honey from our beehives. Unfiltered and unprocessed.',
      price: 350,
      unit: 'per jar',
      originalPrice: 400,
      images: [
        'https://images.unsplash.com/photo-1587049352851-8d4e8914c9b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      category: 'honey',
      subcategory: 'raw-honey',
      farmer: {
        id: 'mutua-orchard',
        name: "Mutua's Orchard",
        verified: true,
        rating: 4.7,
        totalSales: 654,
        location: 'Matuu',
        organic: false,
      },
      rating: 4.9,
      reviews: 134,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-01',
      tags: ['honey', 'raw', 'natural'],
      createdAt: '2026-03-01',
    },
  
    // Nzomo Dairy
    {
      id: 'f8',
      name: 'Traditional Yogurt (500ml)',
      description: 'Creamy, homemade yogurt. Perfect for breakfast or snacks.',
      price: 120,
      unit: 'per cup',
      images: [
        'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1127&q=80',
      ],
      category: 'dairy-eggs',
      subcategory: 'yogurt',
      farmer: {
        id: 'nzomo-dairy',
        name: "Nzomo Dairy",
        verified: true,
        rating: 4.9,
        totalSales: 892,
        location: 'Tala Town',
        organic: true,
      },
      rating: 4.9,
      reviews: 245,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-10',
      expiresIn: '5 days',
      tags: ['yogurt', 'dairy', 'traditional'],
      createdAt: '2026-03-10',
    },
    {
      id: 'f9',
      name: 'Farmers Cheese (250g)',
      description: 'Fresh, soft cheese made from our own milk. Perfect for salads or spreading.',
      price: 180,
      unit: 'per pack',
      images: [
        'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80',
      ],
      category: 'dairy-eggs',
      subcategory: 'cheese',
      farmer: {
        id: 'nzomo-dairy',
        name: "Nzomo Dairy",
        verified: true,
        rating: 4.9,
        totalSales: 892,
        location: 'Tala Town',
        organic: true,
      },
      rating: 4.8,
      reviews: 112,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-09',
      expiresIn: '7 days',
      tags: ['cheese', 'dairy', 'fresh'],
      createdAt: '2026-03-09',
    },
  
    // Vegetables
    {
      id: 'f10',
      name: 'Irish Potatoes',
      description: 'Freshly harvested Irish potatoes. Great for stews, chips, or roasting.',
      price: 120,
      unit: 'per kg',
      images: [
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      category: 'vegetables',
      subcategory: 'root-vegetables',
      farmer: {
        id: 'mama-lucy',
        name: "Mama Lucy's Farm",
        verified: true,
        rating: 4.9,
        totalSales: 1245,
        location: 'Kyumbi',
        organic: true,
      },
      rating: 4.7,
      reviews: 156,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-07',
      tags: ['potatoes', 'vegetables', 'root'],
      createdAt: '2026-03-07',
    },
    {
      id: 'f11',
      name: 'Fresh Tomatoes',
      description: 'Vine-ripened tomatoes, sweet and juicy. Perfect for salads and cooking.',
      price: 80,
      unit: 'per kg',
      images: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      ],
      category: 'vegetables',
      subcategory: 'nightshades',
      farmer: {
        id: 'kilonzo-produce',
        name: "Kilonzo's Produce",
        verified: true,
        rating: 4.8,
        totalSales: 876,
        location: 'Kangundo',
        organic: true,
      },
      rating: 4.8,
      reviews: 203,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-11',
      tags: ['tomatoes', 'vegetables', 'fresh'],
      createdAt: '2026-03-11',
    },
  
    // Meat & Fish
    {
      id: 'f12',
      name: 'Fresh Tilapia',
      description: 'Whole fresh tilapia from our fish farm. Cleaned and ready to cook.',
      price: 350,
      unit: 'per kg',
      images: [
        'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      category: 'meat-fish',
      subcategory: 'fish',
      farmer: {
        id: 'mutisya-fish',
        name: "Mutisya Fish Farm",
        verified: false,
        rating: 4.6,
        totalSales: 234,
        location: 'Kyumbi',
        organic: true,
      },
      rating: 4.7,
      reviews: 67,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-10',
      tags: ['fish', 'tilapia', 'fresh'],
      createdAt: '2026-03-10',
    },
  
    // Grains
    {
      id: 'f13',
      name: 'Organic Maize Flour',
      description: 'Stone-ground maize flour from organically grown maize.',
      price: 150,
      unit: 'per kg',
      images: [
        'https://images.unsplash.com/photo-1585996746885-23c58f5e5b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80',
      ],
      category: 'grains',
      subcategory: 'maize',
      farmer: {
        id: 'mama-lucy',
        name: "Mama Lucy's Farm",
        verified: true,
        rating: 4.9,
        totalSales: 1245,
        location: 'Kyumbi',
        organic: true,
      },
      rating: 4.8,
      reviews: 89,
      inStock: true,
      seasonal: false,
      harvestDate: '2026-03-05',
      tags: ['maize', 'flour', 'organic'],
      createdAt: '2026-03-05',
    },
  ];
  
  // Seasonal produce
  export const seasonalProduce = [
    {
      id: 's1',
      name: 'Mangoes',
      season: 'March - June',
      icon: Apple,
      image: 'https://images.unsplash.com/photo-1553279768-86564c8d4a3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    },
    {
      id: 's2',
      name: 'Avocados',
      season: 'February - May',
      icon: Apple,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&auto=format&fit=crop&w=1075&q=80',
    },
    {
      id: 's3',
      name: 'Oranges',
      season: 'May - August',
      icon: Apple,
      image: 'https://images.unsplash.com/photo-1547514701-42782101795c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    },
    {
      id: 's4',
      name: 'Passion Fruit',
      season: 'Year Round',
      icon: Apple,
      image: 'https://images.unsplash.com/photo-1587377686493-237889c7a0d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    },
  ];