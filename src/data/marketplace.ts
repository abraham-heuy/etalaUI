// data/marketplace.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: string[];
    category: string;
    subcategory: string;
    seller: {
      id: string;
      name: string;
      verified: boolean;
      rating: number;
      totalSales: number;
      location: string;
    };
    rating: number;
    reviews: number;
    inStock: boolean;
    condition?: 'new' | 'like-new' | 'good' | 'fair';
    isMtush?: boolean; // Think Twice / Pre-owned
    tags: string[];
    createdAt: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    icon: string;
    subcategories: Subcategory[];
    image: string;
  }
  
  export interface Subcategory {
    id: string;
    name: string;
    count: number;
  }
  
  // Categories from navbar
  export const categories: Category[] = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '📱',
      image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80',
      subcategories: [
        { id: 'phones', name: 'Phones & Tablets', count: 45 },
        { id: 'laptops', name: 'Laptops & Computers', count: 32 },
        { id: 'audio', name: 'Audio & Headphones', count: 28 },
        { id: 'accessories', name: 'Accessories', count: 56 },
      ]
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: '👕',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
      subcategories: [
        { id: 'mens', name: "Men's Fashion", count: 67 },
        { id: 'womens', name: "Women's Fashion", count: 89 },
        { id: 'kids', name: "Kids' Fashion", count: 34 },
        { id: 'shoes', name: 'Shoes', count: 42 },
      ]
    },
    {
      id: 'household',
      name: 'Household',
      icon: '🏠',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1168&q=80',
      subcategories: [
        { id: 'furniture', name: 'Furniture', count: 23 },
        { id: 'kitchen', name: 'Kitchen & Dining', count: 38 },
        { id: 'decor', name: 'Home Decor', count: 29 },
        { id: 'appliances', name: 'Appliances', count: 17 },
      ]
    },
    {
      id: 'hardware',
      name: 'Hardware',
      icon: '🔧',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      subcategories: [
        { id: 'tools', name: 'Tools', count: 41 },
        { id: 'building', name: 'Building Materials', count: 27 },
        { id: 'electrical', name: 'Electrical', count: 19 },
        { id: 'plumbing', name: 'Plumbing', count: 15 },
      ]
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy',
      icon: '💊',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      subcategories: [
        { id: 'medicines', name: 'Medicines', count: 52 },
        { id: 'personal-care', name: 'Personal Care', count: 38 },
        { id: 'wellness', name: 'Wellness', count: 24 },
        { id: 'first-aid', name: 'First Aid', count: 16 },
      ]
    },
    {
      id: 'baby-kids',
      name: 'Baby & Kids',
      icon: '🍼',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1175&q=80',
      subcategories: [
        { id: 'baby-gear', name: 'Baby Gear', count: 22 },
        { id: 'toys', name: 'Toys', count: 43 },
        { id: 'clothing', name: 'Kids Clothing', count: 31 },
        { id: 'nursery', name: 'Nursery', count: 14 },
      ]
    },
  ];
  
  // Mock products
  export const products: Product[] = [
    // New Products
    {
      id: '1',
      name: 'iPhone 13 Pro Max',
      description: 'Latest iPhone with amazing camera, 256GB storage, brand new in box',
      price: 145000,
      images: [
        'https://images.unsplash.com/photo-1632661674596-df8be6a1c9e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1160&q=80',
        'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80',
      ],
      category: 'electronics',
      subcategory: 'phones',
      seller: {
        id: 's1',
        name: 'Tala Electronics',
        verified: true,
        rating: 4.8,
        totalSales: 345,
        location: 'Tala Town',
      },
      rating: 4.9,
      reviews: 128,
      inStock: true,
      condition: 'new',
      isMtush: false,
      tags: ['iphone', 'apple', 'smartphone'],
      createdAt: '2026-03-01',
    },
    {
      id: '2',
      name: 'Samsung 4K Smart TV 55"',
      description: 'Ultra HD Smart TV with HDR, perfect for your living room',
      price: 85000,
      originalPrice: 95000,
      images: [
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      category: 'electronics',
      subcategory: 'electronics',
      seller: {
        id: 's1',
        name: 'Tala Electronics',
        verified: true,
        rating: 4.8,
        totalSales: 345,
        location: 'Tala Town',
      },
      rating: 4.7,
      reviews: 89,
      inStock: true,
      condition: 'new',
      isMtush: false,
      tags: ['tv', 'samsung', '4k'],
      createdAt: '2026-02-28',
    },
    {
      id: '3',
      name: 'Men\'s Classic Leather Jacket',
      description: 'Genuine leather jacket, perfect for all seasons',
      price: 6500,
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      category: 'fashion',
      subcategory: 'mens',
      seller: {
        id: 's2',
        name: 'Fashion House',
        verified: true,
        rating: 4.6,
        totalSales: 567,
        location: 'Kwa Ndege',
      },
      rating: 4.5,
      reviews: 67,
      inStock: true,
      condition: 'new',
      isMtush: false,
      tags: ['jacket', 'leather', 'men'],
      createdAt: '2026-03-02',
    },
    
    // Think Twice (Mtush) - Pre-owned Items
    {
      id: '4',
      name: 'iPhone XR - Like New',
      description: 'Gently used iPhone XR, 64GB, battery health 92%. Comes with charger and case.',
      price: 45000,
      originalPrice: 65000,
      images: [
        'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      category: 'electronics',
      subcategory: 'phones',
      seller: {
        id: 's3',
        name: 'John Mwende',
        verified: false,
        rating: 4.3,
        totalSales: 23,
        location: 'Tala Town',
      },
      rating: 4.4,
      reviews: 12,
      inStock: true,
      condition: 'like-new',
      isMtush: true,
      tags: ['iphone', 'apple', 'used', 'mtush'],
      createdAt: '2026-02-25',
    },
    {
      id: '5',
      name: 'Sofa Set - Good Condition',
      description: '6-seater sofa set, used for 1 year, still in great condition. Free delivery within Tala.',
      price: 18000,
      originalPrice: 35000,
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      category: 'household',
      subcategory: 'furniture',
      seller: {
        id: 's4',
        name: 'Mary Kamau',
        verified: false,
        rating: 4.7,
        totalSales: 8,
        location: 'Kangundo',
      },
      rating: 4.6,
      reviews: 5,
      inStock: true,
      condition: 'good',
      isMtush: true,
      tags: ['sofa', 'furniture', 'mtush'],
      createdAt: '2026-02-20',
    },
    {
      id: '6',
      name: 'Dell XPS 13 Laptop - Refurbished',
      description: 'Professionally refurbished Dell XPS 13, 16GB RAM, 512GB SSD. 6 months warranty.',
      price: 65000,
      originalPrice: 120000,
      images: [
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1032&q=80',
      ],
      category: 'electronics',
      subcategory: 'laptops',
      seller: {
        id: 's5',
        name: 'Tech Refurb',
        verified: true,
        rating: 4.9,
        totalSales: 156,
        location: 'Tala Town',
      },
      rating: 4.8,
      reviews: 34,
      inStock: true,
      condition: 'like-new',
      isMtush: true,
      tags: ['laptop', 'dell', 'refurbished', 'mtush'],
      createdAt: '2026-02-28',
    },
    {
      id: '7',
      name: 'Baby Stroller - Like New',
      description: 'Hardly used baby stroller, bought for my baby but used only 3 times. Perfect condition.',
      price: 4500,
      originalPrice: 12000,
      images: [
        'https://images.unsplash.com/photo-1592388384830-1a2b55c5f7a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      ],
      category: 'baby-kids',
      subcategory: 'baby-gear',
      seller: {
        id: 's6',
        name: 'Grace Wanjiku',
        verified: false,
        rating: 4.5,
        totalSales: 3,
        location: 'Matuu',
      },
      rating: 5.0,
      reviews: 2,
      inStock: true,
      condition: 'like-new',
      isMtush: true,
      tags: ['baby', 'stroller', 'mtush'],
      createdAt: '2026-02-15',
    },
    {
      id: '8',
      name: 'Power Tools Set - Fair Condition',
      description: 'Set of 5 power tools: drill, sander, jigsaw. Used but working perfectly.',
      price: 8500,
      originalPrice: 25000,
      images: [
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
      ],
      category: 'hardware',
      subcategory: 'tools',
      seller: {
        id: 's7',
        name: 'Peter Muthoka',
        verified: false,
        rating: 4.2,
        totalSales: 12,
        location: 'Kangundo',
      },
      rating: 4.3,
      reviews: 7,
      inStock: true,
      condition: 'fair',
      isMtush: true,
      tags: ['tools', 'hardware', 'mtush'],
      createdAt: '2026-02-10',
    },
  ];
  
  // Popular stores (from navbar)
  export const popularStores = [
    {
      id: 's1',
      name: 'Tala Electronics',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.8,
      products: 345,
      verified: true,
    },
    {
      id: 's2',
      name: 'Fashion House',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.6,
      products: 567,
      verified: true,
    },
    {
      id: 's8',
      name: 'Home Essentials',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      rating: 4.7,
      products: 234,
      verified: true,
    },
  ];