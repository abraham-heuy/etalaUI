// components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Store, 
  Wheat, 
  Bike, 
  Wrench, 
  Coffee, 
  Hotel,
  ChevronDown,
  ChevronRight,
  Home,
  Smartphone,
  Shirt,
  Beef,
  Milk,
  Egg,
  Apple,
  Car,
  Package,
  Scissors,
  Laptop,
  Hammer,
  Droplets,
  UtensilsCrossed,
  Bed,
  Tent,
  Leaf,
  Truck
} from 'lucide-react';
import logo from '../../assets/etala-logo.jfif'; 

// Define types for dropdown items
interface DropdownItem {
  name: string;
  href: string;
  icon?: any; // Lucide icon component
  highlight?: boolean;
}

interface DropdownSection {
  title: string;
  items: DropdownItem[];
}

interface NavItem {
  name: string;
  href: string;
  icon: any; // Lucide icon component
  dropdown: {
    sections: DropdownSection[];
  };
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Close dropdowns on scroll
      setActiveDropdown(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Handle dropdown hover with delay
  const handleMouseEnter = (category: string) => {
    if (timeoutId) clearTimeout(timeoutId);
    setActiveDropdown(category);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // 200ms delay before closing
    setTimeoutId(id);
  };

  // Toggle mobile accordion item
  const toggleMobileItem = (itemName: string) => {
    setExpandedMobileItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  // Main navigation items with dropdown content
  const navItems: NavItem[] = [
    { 
      name: 'Marketplace', 
      href: '#marketplace',
      icon: Store,
      dropdown: {
        sections: [
          {
            title: 'Shop by Category',
            items: [
              { name: 'Electronics', icon: Smartphone, href: '#electronics' },
              { name: 'Fashion', icon: Shirt, href: '#fashion' },
              { name: 'Household', icon: Home, href: '#household' },
              { name: 'Hardware', icon: Hammer, href: '#hardware' },
              { name: 'Pharmacy', icon: Package, href: '#pharmacy' },
              { name: 'Baby & Kids', icon: Egg, href: '#baby' },
            ]
          },
          {
            title: 'Popular Stores',
            items: [
              { name: 'Electronics Hub', href: '#electronics-hub' },
              { name: 'Fashion House', href: '#fashion-house' },
              { name: 'Home Essentials', href: '#home-essentials' },
              { name: 'View All →', href: '#all-marketplace', highlight: true },
            ]
          }
        ]
      }
    },
    { 
      name: 'Farmers', 
      href: '#farmers',
      icon: Wheat,
      dropdown: {
        sections: [
          {
            title: 'Fresh Produce',
            items: [
              { name: 'Vegetables', icon: Leaf, href: '#vegetables' },
              { name: 'Fruits', icon: Apple, href: '#fruits' },
              { name: 'Dairy & Eggs', icon: Milk, href: '#dairy' },
              { name: 'Meat & Fish', icon: Beef, href: '#meat' },
              { name: 'Grains', icon: Wheat, href: '#grains' },
              { name: 'Honey', icon: Droplets, href: '#honey' },
            ]
          },
          {
            title: 'Top Farmers',
            items: [
              { name: 'Mama Lucy\'s Farm', href: '#mama-lucy' },
              { name: 'Kilonzo\'s Produce', href: '#kilonzo' },
              { name: 'Mutua\'s Orchard', href: '#mutua' },
              { name: 'View All Farmers →', href: '#all-farmers', highlight: true },
            ]
          }
        ]
      }
    },
    { 
      name: 'Boda', 
      href: '#boda',
      icon: Bike,
      dropdown: {
        sections: [
          {
            title: 'Ride Options',
            items: [
              { name: 'Boda Rides', icon: Bike, href: '#boda-rides' },
              { name: 'Taxi', icon: Car, href: '#taxi' },
              { name: 'Delivery', icon: Package, href: '#delivery' },
              { name: 'Cargo/Tuk Tuk', icon: Truck, href: '#cargo' },
            ]
          },
          {
            title: 'Popular Routes',
            items: [
              { name: 'Tala Town - Kwa Ndege', href: '#route1' },
              { name: 'Tala - Kangundo', href: '#route2' },
              { name: 'Tala - Machakos', href: '#route3' },
              { name: 'Book a Ride →', href: '#book-ride', highlight: true },
            ]
          }
        ]
      }
    },
    { 
      name: 'Services', 
      href: '#services',
      icon: Wrench,
      dropdown: {
        sections: [
          {
            title: 'Professional Services',
            items: [
              { name: 'Salons & Barbers', icon: Scissors, href: '#salons' },
              { name: 'Cyber Cafes', icon: Laptop, href: '#cyber' },
              { name: 'Plumbing', icon: Droplets, href: '#plumbing' },
              { name: 'Electrical', icon: Hammer, href: '#electrical' },
              { name: 'Cleaning', icon: Home, href: '#cleaning' },
              { name: 'Repairs', icon: Wrench, href: '#repairs' },
            ]
          },
          {
            title: 'Top Rated',
            items: [
              { name: 'John\'s Plumbing', href: '#john' },
              { name: 'Mama Joy Salon', href: '#mama-joy' },
              { name: 'Tala Cyber', href: '#tala-cyber' },
              { name: 'Find a Freelancer →', href: '#all-services', highlight: true },
            ]
          }
        ]
      }
    },
    { 
      name: 'Food', 
      href: '#food',
      icon: Coffee,
      dropdown: {
        sections: [
          {
            title: 'Cuisines',
            items: [
              { name: 'Local Cuisine', icon: UtensilsCrossed, href: '#local' },
              { name: 'Fast Food', icon: Coffee, href: '#fastfood' },
              { name: 'Cafes', icon: Coffee, href: '#cafes' },
              { name: 'Hotels', icon: Hotel, href: '#hotels' },
              { name: 'Catering', icon: Package, href: '#catering' },
            ]
          },
          {
            title: 'Popular Places',
            items: [
              { name: 'Tala Kitchen', href: '#tala-kitchen' },
              { name: 'Kwa Ndege Eatery', href: '#kwa-ndege' },
              { name: 'Mama Pima Hotel', href: '#mama-pima' },
              { name: 'Order Food →', href: '#order-food', highlight: true },
            ]
          }
        ]
      }
    },
    { 
      name: 'Stays', 
      href: '#accommodation',
      icon: Hotel,
      dropdown: {
        sections: [
          {
            title: 'Accommodation',
            items: [
              { name: 'Hotels', icon: Hotel, href: '#hotels' },
              { name: 'Airbnbs', icon: Home, href: '#airbnb' },
              { name: 'Guest Houses', icon: Bed, href: '#guesthouses' },
              { name: 'Campsites', icon: Tent, href: '#campsites' },
            ]
          },
          {
            title: 'Nearby',
            items: [
              { name: 'Tala Town', href: '#tala-town' },
              { name: 'Kangundo', href: '#kangundo' },
              { name: 'Machakos', href: '#machakos' },
              { name: 'Book Now →', href: '#book-stay', highlight: true },
            ]
          }
        ]
      }
    },
  ];

  // Dynamic text color based on scroll
  const textColor = scrolled ? 'text-slate-text' : 'text-white/90';
  const bgColor = scrolled ? 'bg-soft-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent';
  const buttonBg = scrolled ? 'bg-redbull-blue' : 'bg-white/20 backdrop-blur-sm border border-white/30';
  const buttonText = scrolled ? 'text-white' : 'text-white';
  const mobileMenuBg = scrolled ? 'bg-soft-white/95' : 'bg-charcoal/95 backdrop-blur-sm';
  const mobileLinkText = scrolled ? 'text-slate-text' : 'text-white';
  const dropdownBg = scrolled ? 'bg-soft-white' : 'bg-charcoal/95 backdrop-blur-sm';

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${bgColor}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Clickable to open modal */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="View logo information"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 hover:border-redbull-blue transition-colors">
                <img 
                  src={logo} 
                  alt="E-TALA Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`text-2xl font-bold ${scrolled ? 'text-redbull-blue' : 'text-white'}`}>
                E-TALA
              </span>
            </button>

            {/* Beta badge - Dynamic colors */}
            <span className={`text-xs font-medium px-2 py-1 rounded-full md:ml-2 ${
              scrolled 
                ? 'text-slate-text bg-warm-gray' 
                : 'text-white bg-white/20 backdrop-blur-sm border border-white/30'
            }`}>
              Beta
            </span>

            {/* Desktop Navigation with Dropdowns */}
            <div className="hidden md:flex items-center space-x-6 ml-auto">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${textColor} hover:text-redbull-blue`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </a>

                  {/* Mega Dropdown */}
                  {activeDropdown === item.name && (
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 mt-2 w-[500px] ${dropdownBg} rounded-2xl shadow-2xl border ${scrolled ? 'border-cool-gray' : 'border-white/20'} overflow-hidden animate-slide-down`}
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                          {item.dropdown.sections.map((section, idx) => (
                            <div key={idx}>
                              <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                                scrolled ? 'text-slate-text' : 'text-white/60'
                              }`}>
                                {section.title}
                              </h4>
                              <ul className="space-y-2">
                                {section.items.map((link, linkIdx) => (
                                  <li key={linkIdx}>
                                    <a
                                      href={link.href}
                                      className={`flex items-center gap-2 text-sm transition-colors ${
                                        scrolled 
                                          ? 'text-slate-text hover:text-redbull-blue' 
                                          : 'text-white/80 hover:text-white'
                                      } ${link.highlight ? 'text-redbull-blue font-medium' : ''}`}
                                    >
                                      {link.icon && <link.icon className="w-4 h-4" />}
                                      {link.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        
                        {/* Bottom CTA */}
                        <div className={`mt-4 pt-4 border-t ${scrolled ? 'border-cool-gray' : 'border-white/20'}`}>
                          <a 
                            href={`#all-${item.name.toLowerCase()}`}
                            className={`flex items-center justify-between text-sm font-medium ${
                              scrolled ? 'text-redbull-blue' : 'text-white'
                            } hover:opacity-80 transition-opacity`}
                          >
                            <span>Browse all in {item.name}</span>
                            <ChevronDown className="w-4 h-4 -rotate-90" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <button className={`${buttonBg} ${buttonText} px-6 py-2.5 rounded-full text-sm font-medium hover:bg-redbull-blue transition-colors shadow-sm hover:shadow-md`}>
                Get Started
              </button>
            </div>

            {/* Mobile menu button - Dynamic color */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-full transition-colors touch-friendly ${
                scrolled 
                  ? 'text-slate-text hover:bg-warm-gray' 
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Accordion Style */}
        {isOpen && (
          <div className={`md:hidden ${mobileMenuBg} border-t ${scrolled ? 'border-cool-gray' : 'border-white/20'} animate-fade-in max-h-[80vh] overflow-y-auto`}>
            <div className="px-4 py-4">
              {navItems.map((item) => {
                const isExpanded = expandedMobileItems.includes(item.name);
                return (
                  <div key={item.name} className="mb-2">
                    {/* Main category button - expand/collapse */}
                    <button
                      onClick={() => toggleMobileItem(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors ${
                        isExpanded 
                          ? 'bg-redbull-blue/10 text-redbull-blue' 
                          : mobileLinkText
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${isExpanded ? 'text-redbull-blue' : ''}`} />
                        <span className="font-medium">{item.name}</span>
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {/* Expandable subcategories */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-11 pr-3 space-y-3">
                        {item.dropdown.sections.map((section, idx) => (
                          <div key={idx} className="space-y-2">
                            <h4 className={`text-xs font-medium uppercase tracking-wider ${
                              scrolled ? 'text-slate-text/60' : 'text-white/60'
                            }`}>
                              {section.title}
                            </h4>
                            <div className="space-y-1">
                              {section.items.map((link, linkIdx) => (
                                <a
                                  key={linkIdx}
                                  href={link.href}
                                  className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors ${
                                    scrolled 
                                      ? 'text-slate-text hover:bg-redbull-blue/10 hover:text-redbull-blue' 
                                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                                  } ${link.highlight ? 'text-redbull-blue font-medium' : ''}`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {link.icon && <link.icon className="w-3.5 h-3.5" />}
                                  {link.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                        
                        {/* Quick "View All" link */}
                        <a
                          href={`#all-${item.name.toLowerCase()}`}
                          className={`flex items-center gap-1 text-sm py-1.5 px-2 rounded-lg ${
                            scrolled ? 'text-redbull-blue' : 'text-white'
                          } font-medium hover:opacity-80 transition-opacity`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span>Browse all {item.name}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Get Started button */}
              <div className="mt-6 pt-4 border-t border-cool-gray/20">
                <button 
                  className="w-full bg-redbull-blue text-white px-6 py-3.5 rounded-full text-base font-medium hover:bg-redbull-blue/90 transition-colors shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Logo Modal - Blurred transparent background */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade-in"></div>
          
          {/* Modal Content */}
          <div 
            className="relative bg-soft-white/95 backdrop-blur-sm rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-white/20 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              {/* Circular Logo */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-redbull-blue/20 mb-4">
                <img 
                  src={logo} 
                  alt="E-TALA Logo" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
                E-TALA
              </h2>

              {/* Beta Badge */}
              <span className="inline-block bg-redbull-blue-light text-redbull-blue px-3 py-1 rounded-full text-xs font-medium mb-4">
                Beta Version
              </span>

              {/* Description */}
              <div className="space-y-3 text-slate-text">
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold text-charcoal">E-TALA</span> is Tala's first digital marketplace, connecting you to local shops, farmers, boda riders, drivers,restaurants, and services - All in one place.
                </p>
                
                <div className="border-t border-cool-gray my-4"></div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-redbull-blue-light/50 p-3 rounded-xl">
                    <div className="font-semibold text-charcoal">Launched</div>
                    <div className="text-slate-text">2026</div>
                  </div>
                  <div className="bg-redbull-blue-light/50 p-3 rounded-xl">
                    <div className="font-semibold text-charcoal">Sellers</div>
                    <div className="text-slate-text">200+</div>
                  </div>
                  <div className="bg-redbull-blue-light/50 p-3 rounded-xl">
                    <div className="font-semibold text-charcoal">Riders</div>
                    <div className="text-slate-text">50+</div>
                  </div>
                  <div className="bg-redbull-blue-light/50 p-3 rounded-xl">
                    <div className="font-semibold text-charcoal">Towns</div>
                    <div className="text-slate-text">Tala, Kangundo</div>
                  </div>
                </div>

                <p className="text-xs text-slate-text/70 italic mt-2">
                  "We gatchu, Don't worry."
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-6 w-full bg-redbull-blue text-white px-4 py-3 rounded-full text-sm font-medium hover:bg-redbull-blue/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;