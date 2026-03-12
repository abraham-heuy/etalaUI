// components/Categories.tsx
import React, { useState, useEffect } from 'react';
import { 
  Store, 
  Wheat, 
  Bike, 
  Coffee, 
  Wrench, 
  Hotel, 
  ChevronRight,
  Menu,
  X,
  Home,
  Leaf,
  Beef,
  Milk,
  Egg,
  Shirt,
  Smartphone,
  Scissors,
  Laptop,
  Package,
  Truck,
  Hammer,
  Droplets,
  UtensilsCrossed,
  Cake,
  Bed,
  Tent,
  Lightbulb,
  Bath,
  Apple,
  Car
} from 'lucide-react';

const Categories: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('marketplace');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      // Close sidebar when switching to desktop
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Main categories (from your Q4)
  const mainCategories = [
    { 
      id: 'marketplace',
      name: 'Marketplace', 
      icon: Store, 
      count: '200+ shops',
      description: 'Browse and buy products from local shops',
      color: 'from-blue-400 to-redbull-blue'
    },
    { 
      id: 'farmers',
      name: 'Farmers Market', 
      icon: Wheat, 
      count: '56 farmers',
      description: 'Order fresh produce directly from farmers',
      color: 'from-green-400 to-teal-500'
    },
    { 
      id: 'boda',
      name: 'Boda Rides', 
      icon: Bike, 
      count: '50+ riders',
      description: 'Book a boda boda or taxi for rides or delivery',
      color: 'from-yellow-400 to-orange-500'
    },
    { 
      id: 'food',
      name: 'Food & Restaurants', 
      icon: Coffee, 
      count: '25+ eateries',
      description: 'Order food from local restaurants',
      color: 'from-red-400 to-pink-500'
    },
    { 
      id: 'services',
      name: 'Services', 
      icon: Wrench, 
      count: '30+ fundis',
      description: 'Find and book salons, cyber cafes, plumbing, and more',
      color: 'from-purple-400 to-indigo-500'
    },
    { 
      id: 'accommodation',
      name: 'Stays & Accommodation', 
      icon: Hotel, 
      count: '15+ places',
      description: 'Find and book stays and accommodations',
      color: 'from-pink-400 to-rose-500'
    },
  ];

  // Subcategories for each main category
  const subCategories = {
    marketplace: [
      { name: 'Electronics', icon: Smartphone, count: '32 shops' },
      { name: 'Fashion', icon: Shirt, count: '45 shops' },
      { name: 'Household', icon: Home, count: '28 shops' },
      { name: 'Hardware', icon: Hammer, count: '19 shops' },
      { name: 'Pharmacy', icon: Package, count: '12 shops' },
      { name: 'Baby & Kids', icon: Egg, count: '8 shops' },
    ],
    farmers: [
      { name: 'Fresh Produce', icon: Leaf, count: '28 farmers' },
      { name: 'Meat & Fish', icon: Beef, count: '15 farmers' },
      { name: 'Dairy & Eggs', icon: Milk, count: '18 farmers' },
      { name: 'Fruits', icon: Apple, count: '22 farmers' },
      { name: 'Grains & Cereals', icon: Wheat, count: '14 farmers' },
      { name: 'Honey & More', icon: Droplets, count: '7 farmers' },
    ],
    boda: [
      { name: 'Boda Rides', icon: Bike, count: '32 riders' },
      { name: 'Taxi', icon: Car, count: '12 cars' },
      { name: 'Delivery', icon: Package, count: '25 riders' },
      { name: 'Cargo/Tuk Tuk', icon: Truck, count: '8 vehicles' },
      { name: 'Long Distance', icon: Car, count: '6 cars' },
    ],
    food: [
      { name: 'Local Cuisine', icon: UtensilsCrossed, count: '12 restaurants' },
      { name: 'Fast Food', icon: Coffee, count: '8 spots' },
      { name: 'Cafes', icon: Coffee, count: '5 cafes' },
      { name: 'Hotels', icon: Hotel, count: '4 hotels' },
      { name: 'Catering', icon: Cake, count: '6 caterers' },
    ],
    services: [
      { name: 'Salons & Barbers', icon: Scissors, count: '15 salons' },
      { name: 'Cyber Cafes', icon: Laptop, count: '8 cybers' },
      { name: 'Plumbing', icon: Droplets, count: '12 plumbers' },
      { name: 'Electrical', icon: Lightbulb, count: '10 electricians' },
      { name: 'Cleaning', icon: Bath, count: '7 cleaners' },
      { name: 'Repairs', icon: Hammer, count: '9 technicians' },
    ],
    accommodation: [
      { name: 'Hotels', icon: Hotel, count: '6 hotels' },
      { name: 'Airbnbs', icon: Home, count: '4 listings' },
      { name: 'Guest Houses', icon: Bed, count: '3 guest houses' },
      { name: 'Campsites', icon: Tent, count: '2 sites' },
    ],
  };

  // Get current subcategories
  const currentSubCategories = subCategories[selectedCategory as keyof typeof subCategories] || [];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-gray relative min-h-[600px]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Mobile Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-2">
              Browse by <span className="text-redbull-blue">category</span>
            </h2>
            <p className="text-slate-text">Find exactly what you need, fast</p>
          </div>
          
          {/* Mobile Sidebar Toggle - Only shows when sidebar is closed */}
          {isMobile && !isSidebarOpen && (
            <button
              id="sidebar-toggle"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden bg-redbull-blue text-white p-3 rounded-full shadow-lg hover:bg-redbull-blue/90 transition-colors"
              aria-label="Open categories"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Close Button - Only shows when sidebar is open */}
          {isMobile && isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden bg-redbull-blue text-white p-3 rounded-full shadow-lg hover:bg-redbull-blue/90 transition-colors"
              aria-label="Close categories"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Desktop Layout - Sidebar + Content */}
        <div className="flex gap-6 relative">
          {/* Sidebar - Desktop (always visible) */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-cool-gray sticky top-24 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-redbull-blue-light to-white border-b border-cool-gray">
                <h3 className="font-display font-semibold text-charcoal">All Services</h3>
                <p className="text-xs text-slate-text mt-1">Select a category</p>
              </div>
              <div className="p-3">
                {mainCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-1 ${
                        isSelected 
                          ? `bg-gradient-to-r ${category.color} text-white shadow-md` 
                          : 'hover:bg-redbull-blue-light text-slate-text'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-white/20' : 'bg-redbull-blue-light'
                      }`}>
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-redbull-blue'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">{category.name}</div>
                        <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-text'}`}>
                          {category.count}
                        </div>
                      </div>
                      {isSelected && <ChevronRight className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Layout - Sidebar shows/hides within section */}
          {isMobile && (
            <div className="w-full">
              {/* Sidebar - Mobile (collapsible within section) */}
              {isSidebarOpen ? (
                <div className="bg-white rounded-2xl shadow-lg border border-cool-gray mb-6 overflow-hidden animate-slide-down">
                  <div className="p-4 bg-gradient-to-r from-redbull-blue-light to-white border-b border-cool-gray">
                    <h3 className="font-display font-semibold text-charcoal">All Services</h3>
                    <p className="text-xs text-slate-text mt-1">Select a category</p>
                  </div>
                  <div className="p-3 max-h-96 overflow-y-auto">
                    {mainCategories.map((category) => {
                      const Icon = category.icon;
                      const isSelected = selectedCategory === category.id;
                      return (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setIsSidebarOpen(false); // Auto-close after selection on mobile
                          }}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-1 ${
                            isSelected 
                              ? `bg-gradient-to-r ${category.color} text-white shadow-md` 
                              : 'hover:bg-redbull-blue-light text-slate-text'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-white/20' : 'bg-redbull-blue-light'
                          }`}>
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-redbull-blue'}`} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium">{category.name}</div>
                            <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-text'}`}>
                              {category.count}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Main Content - Always visible */}
              <div>
                {/* Selected Category Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    {mainCategories.find(c => c.id === selectedCategory) && (
                      <>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${
                          mainCategories.find(c => c.id === selectedCategory)?.color
                        } flex items-center justify-center`}>
                          {(() => {
                            const Icon = mainCategories.find(c => c.id === selectedCategory)?.icon;
                            return Icon && <Icon className="w-5 h-5 text-white" />;
                          })()}
                        </div>
                        <div>
                          <h3 className="text-xl font-display font-semibold text-charcoal">
                            {mainCategories.find(c => c.id === selectedCategory)?.name}
                          </h3>
                          <p className="text-sm text-slate-text">
                            {mainCategories.find(c => c.id === selectedCategory)?.description}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Subcategories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {currentSubCategories.map((sub, index) => {
                    const Icon = sub.icon;
                    return (
                      <div
                        key={index}
                        className="group bg-white rounded-xl p-4 text-center border border-cool-gray hover:border-redbull-blue cursor-pointer transition-all hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-redbull-blue-light rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-redbull-blue" />
                        </div>
                        <h3 className="font-medium text-charcoal text-sm">{sub.name}</h3>
                        <p className="text-xs text-slate-text mt-1">{sub.count}</p>
                      </div>
                    );
                  })}
                </div>

                {/* View All Link */}
                <div className="mt-8 text-center">
                  <a 
                    href={`/${selectedCategory}`} 
                    className="inline-flex items-center gap-2 text-redbull-blue hover:text-redbull-blue/80 font-medium group"
                  >
                    View all in {mainCategories.find(c => c.id === selectedCategory)?.name}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Content - Only visible on desktop */}
          {!isMobile && (
            <div className="flex-1">
              {/* Selected Category Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  {mainCategories.find(c => c.id === selectedCategory) && (
                    <>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${
                        mainCategories.find(c => c.id === selectedCategory)?.color
                      } flex items-center justify-center`}>
                        {(() => {
                          const Icon = mainCategories.find(c => c.id === selectedCategory)?.icon;
                          return Icon && <Icon className="w-5 h-5 text-white" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-semibold text-charcoal">
                          {mainCategories.find(c => c.id === selectedCategory)?.name}
                        </h3>
                        <p className="text-sm text-slate-text">
                          {mainCategories.find(c => c.id === selectedCategory)?.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Subcategories Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                {currentSubCategories.map((sub, index) => {
                  const Icon = sub.icon;
                  return (
                    <div
                      key={index}
                      className="group bg-white rounded-xl p-4 text-center border border-cool-gray hover:border-redbull-blue cursor-pointer transition-all hover:shadow-md"
                    >
                      <div className="w-12 h-12 bg-redbull-blue-light rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-redbull-blue" />
                      </div>
                      <h3 className="font-medium text-charcoal text-sm">{sub.name}</h3>
                      <p className="text-xs text-slate-text mt-1">{sub.count}</p>
                    </div>
                  );
                })}
              </div>

              {/* View All Link */}
              <div className="mt-8 text-center">
                <a 
                  href={`/${selectedCategory}`} 
                  className="inline-flex items-center gap-2 text-redbull-blue hover:text-redbull-blue/80 font-medium group"
                >
                  View all in {mainCategories.find(c => c.id === selectedCategory)?.name}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;