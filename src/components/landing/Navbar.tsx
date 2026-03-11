// components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Truck,
  LogIn,
  UserPlus,
  Shield,
  ArrowRight,
  Cat,
  Tractor,
} from "lucide-react";
import logo from "../../assets/etala-logo.jfif";

// Define types for dropdown items
interface DropdownItem {
  name: string;
  href: string;
  icon?: any;
  highlight?: boolean;
  description?: string;
}

interface DropdownSection {
  title: string;
  items: DropdownItem[];
}

interface NavItem {
  name: string;
  href: string;
  icon: any;
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
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setActiveDropdown(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleMouseEnter = (category: string) => {
    if (timeoutId) clearTimeout(timeoutId);
    setActiveDropdown(category);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
    setTimeoutId(id);
  };

  const toggleMobileItem = (itemName: string) => {
    setExpandedMobileItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const navItems: NavItem[] = [
    {
      name: "Marketplace",
      href: "/marketplace",
      icon: Store,
      dropdown: {
        sections: [
          {
            title: "Shop by Category",
            items: [
              { name: "Electronics", icon: Smartphone, href: "/marketplace/category/electronics", highlight: false },
              { name: "Fashion", icon: Shirt, href: "/marketplace/category/fashion", highlight: false },
              { name: "Household", icon: Home, href: "/marketplace/category/household", highlight: false },
              { name: "Hardware", icon: Hammer, href: "/marketplace/category/hardware", highlight: false },
              { name: "Pharmacy", icon: Package, href: "/marketplace/category/pharmacy", highlight: false },
              { name: "Baby & Kids", icon: Egg, href: "/marketplace/category/baby-kids", highlight: false },
            ],
          },
          {
            title: "Popular Stores",
            items: [
              { name: "Electronics Hub", href: "/marketplace/store/s1", highlight: false },
              { name: "Fashion House", href: "/marketplace/store/s2", highlight: false },
              { name: "Home Essentials", href: "/marketplace/store/s8", highlight: false },
              { name: "View All →", href: "/marketplace/stores", highlight: true },
            ],
          },
        ],
      },
    },
    {
      name: "Farmers",
      href: "/farmers",
      icon: Wheat,
      dropdown: {
        sections: [
          {
            title: "Fresh Produce",
            items: [
              { name: "Vegetables", icon: Leaf, href: "/farmers/category/vegetables", highlight: false },
              { name: "Fruits", icon: Apple, href: "/farmers/category/fruits", highlight: false },
              { name: "Dairy & Eggs", icon: Milk, href: "/farmers/category/dairy", highlight: false },
              { name: "Meat & Fish", icon: Beef, href: "/farmers/category/meat", highlight: false },
              { name: "Grains", icon: Wheat, href: "/farmers/category/grains", highlight: false },
              { name: "Honey", icon: Droplets, href: "/farmers/category/honey", highlight: false },
            ],
          },
          {
            title: "Livestock & Pets",
            items: [
              { name: "Cattle", icon: Tractor, href: "/farmers/livestock?category=cattle", highlight: false },
              { name: "Pets", icon: Cat, href: "/farmers/livestock?category=pets", highlight: false },
              { name: "View All Livestock →", href: "/farmers/livestock", highlight: true },
            ],
          },
          {
            title: "Top Farmers",
            items: [
              { name: "Mama Lucy's Farm", href: "/farmers/farmer/mama-lucy", highlight: false },
              { name: "Kilonzo's Produce", href: "/farmers/farmer/kilonzo", highlight: false },
              { name: "Mutua's Orchard", href: "/farmers/farmer/mutua", highlight: false },
              { name: "View All Farmers →", href: "/farmers/all", highlight: true },
            ],
          },
        ],
      },
    },
    {
      name: "Boda",
      href: "/boda",
      icon: Bike,
      dropdown: {
        sections: [
          {
            title: "Ride Options",
            items: [
              { name: "Boda Rides", icon: Bike, href: "/boda?type=boda", highlight: false },
              { name: "Taxi", icon: Car, href: "/boda?type=taxi", highlight: false },
              { name: "Movers", icon: Truck, href: "/boda?type=movers", highlight: false },
            ],
          },
          {
            title: "Popular Routes",
            items: [
              { name: "Tala Town - Kwa Ndege", href: "/boda/pricing?from=Tala%20Town&to=Kwa%20Ndege", highlight: false },
              { name: "Tala - Kangundo", href: "/boda/pricing?from=Tala%20Town&to=Kangundo", highlight: false },
              { name: "Tala - Machakos", href: "/boda/pricing?from=Tala%20Town&to=Machakos", highlight: false },
              { name: "Schedule a Ride →", href: "/boda", highlight: true },
            ],
          },
        ],
      },
    },
    {
      name: "Services",
      href: "/services",
      icon: Wrench,
      dropdown: {
        sections: [
          {
            title: "Professional Services",
            items: [
              { name: "Salons & Barbers", icon: Scissors, href: "/services/category/salons", highlight: false },
              { name: "Cyber Cafes", icon: Laptop, href: "/services/category/cyber", highlight: false },
              { name: "Plumbing", icon: Droplets, href: "/services/category/plumbing", highlight: false },
              { name: "Electrical", icon: Hammer, href: "/services/category/electrical", highlight: false },
              { name: "Cleaning", icon: Home, href: "/services/category/cleaning", highlight: false },
              { name: "Repairs", icon: Wrench, href: "/services/category/repairs", highlight: false },
            ],
          },
          {
            title: "Top Rated",
            items: [
              { name: "John's Plumbing", href: "/services/provider/john", highlight: false },
              { name: "Mama Joy Salon", href: "/services/provider/mama-joy", highlight: false },
              { name: "Tala Cyber", href: "/services/provider/tala-cyber", highlight: false },
              { name: "Find a Freelancer →", href: "/services/all", highlight: true },
            ],
          },
        ],
      },
    },
    {
      name: "Food",
      href: "/food",
      icon: Coffee,
      dropdown: {
        sections: [
          {
            title: "Cuisines",
            items: [
              { name: "Local Cuisine", icon: UtensilsCrossed, href: "/food/cuisine/local", highlight: false },
              { name: "Fast Food", icon: Coffee, href: "/food/cuisine/fast-food", highlight: false },
              { name: "Cafes", icon: Coffee, href: "/food/cuisine/cafes", highlight: false },
              { name: "Hotels", icon: Hotel, href: "/food/cuisine/hotels", highlight: false },
              { name: "Catering", icon: Package, href: "/food/cuisine/catering", highlight: false },
            ],
          },
          {
            title: "Popular Places",
            items: [
              { name: "Tala Kitchen", href: "/food/restaurant/tala-kitchen", highlight: false },
              { name: "Kwa Ndege Eatery", href: "/food/restaurant/kwa-ndege", highlight: false },
              { name: "Mama Pima Hotel", href: "/food/restaurant/mama-pima", highlight: false },
              { name: "Order Food →", href: "/food/checkout", highlight: true },
            ],
          },
        ],
      },
    },
    {
      name: "Stays",
      href: "/stays",
      icon: Hotel,
      dropdown: {
        sections: [
          {
            title: "Accommodation",
            items: [
              { name: "Hotels", icon: Hotel, href: "/stays/category/hotels", highlight: false },
              { name: "Airbnbs", icon: Home, href: "/stays/category/airbnbs", highlight: false },
              { name: "Guest Houses", icon: Bed, href: "/stays/category/guest-houses", highlight: false },
              { name: "Campsites", icon: Tent, href: "/stays/category/campsites", highlight: false },
            ],
          },
          {
            title: "Nearby",
            items: [
              { name: "Tala Town", href: "/stays/location/tala-town", highlight: false },
              { name: "Kangundo", href: "/stays/location/kangundo", highlight: false },
              { name: "Machakos", href: "/stays/location/machakos", highlight: false },
              { name: "Book Now →", href: "/stays/booking/new", highlight: true },
            ],
          },
        ],
      },
    },
  ];

  const getStartedItems = {
    sections: [
      {
        title: "Welcome Back",
        items: [
          { name: "Sign In", href: "/sign-in", icon: LogIn, description: "Access your account", highlight: false },
        ],
      },
      {
        title: "New Here?",
        items: [
          { name: "Create Account", href: "/sign-up", icon: UserPlus, description: "Join as a buyer, seller, or rider", highlight: true },
        ],
      },
      {
        title: "More Options",
        items: [
          { name: "Become a Seller", href: "/become-seller", icon: Store, description: "Start selling your products", highlight: false },
          { name: "Become a Rider", href: "/become-rider", icon: Bike, description: "Earn with every delivery", highlight: false },
          { name: "Partner with Us", href: "/partner", icon: Shield, description: "For businesses and organizations", highlight: false },
        ],
      },
    ],
  };

  const textColor = scrolled ? "text-slate-text" : "text-white/90";
  const bgColor = scrolled ? "bg-soft-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent";
  const buttonBg = scrolled ? "bg-redbull-blue" : "bg-white/20 backdrop-blur-sm border border-white/30";
  const buttonText = scrolled ? "text-white" : "text-white";
  const mobileMenuBg = scrolled ? "bg-soft-white/95" : "bg-charcoal/95 backdrop-blur-sm";
  const mobileLinkText = scrolled ? "text-slate-text" : "text-white";
  const dropdownBg = scrolled ? "bg-soft-white" : "bg-charcoal/95 backdrop-blur-sm";

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${bgColor}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="View logo information"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 hover:border-redbull-blue transition-colors">
                <img src={logo} alt="E-TALA Logo" className="w-full h-full object-cover" />
              </div>
              <span className={`text-2xl font-bold ${scrolled ? "text-redbull-blue" : "text-white"}`}>
                E-TALA
              </span>
            </button>

            <span className={`text-xs font-medium px-2 py-1 rounded-full md:ml-2 ${
              scrolled ? "text-slate-text bg-warm-gray" : "text-white bg-white/20 backdrop-blur-sm border border-white/30"
            }`}>
              Beta
            </span>

            <div className="hidden md:flex items-center space-x-6 ml-auto">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${textColor} hover:text-redbull-blue`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === item.name ? "rotate-180" : ""
                    }`} />
                  </Link>

                  {activeDropdown === item.name && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 mt-2 w-[500px] ${dropdownBg} rounded-2xl shadow-2xl border ${
                        scrolled ? "border-cool-gray" : "border-white/20"
                      } overflow-hidden animate-slide-down`}
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                          {item.dropdown.sections.map((section, idx) => (
                            <div key={idx}>
                              <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                                scrolled ? "text-slate-text" : "text-white/60"
                              }`}>
                                {section.title}
                              </h4>
                              <ul className="space-y-2">
                                {section.items.map((link, linkIdx) => (
                                  <li key={linkIdx}>
                                    <Link
                                      to={link.href}
                                      className={`flex items-center gap-2 text-sm transition-colors ${
                                        scrolled ? "text-slate-text hover:text-redbull-blue" : "text-white/80 hover:text-white"
                                      } ${link.highlight ? "text-redbull-blue font-medium" : ""}`}
                                    >
                                      {link.icon && <link.icon className="w-4 h-4" />}
                                      {link.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className={`mt-4 pt-4 border-t ${scrolled ? "border-cool-gray" : "border-white/20"}`}>
                          <Link
                            to={`/${item.name.toLowerCase()}`}
                            className={`flex items-center justify-between text-sm font-medium ${
                              scrolled ? "text-redbull-blue" : "text-white"
                            } hover:opacity-80 transition-opacity`}
                          >
                            <span>Browse all in {item.name}</span>
                            <ChevronDown className="w-4 h-4 -rotate-90" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("get-started")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`${buttonBg} ${buttonText} px-6 py-2.5 rounded-full text-sm font-medium hover:bg-redbull-blue transition-colors shadow-sm hover:shadow-md flex items-center gap-2`}
                >
                  Get Started
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                    activeDropdown === "get-started" ? "rotate-180" : ""
                  }`} />
                </button>

                {activeDropdown === "get-started" && (
                  <div
                    className={`absolute right-0 mt-2 w-80 ${dropdownBg} rounded-2xl shadow-2xl border ${
                      scrolled ? "border-cool-gray" : "border-white/20"
                    } overflow-hidden animate-slide-down`}
                    onMouseEnter={() => handleMouseEnter("get-started")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="p-4">
                      {getStartedItems.sections.map((section, idx) => (
                        <div key={idx} className={idx < getStartedItems.sections.length - 1 ? "mb-4 pb-4 border-b border-cool-gray/20" : ""}>
                          <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                            scrolled ? "text-slate-text" : "text-white/60"
                          }`}>
                            {section.title}
                          </h4>
                          <div className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <Link
                                key={itemIdx}
                                to={item.href}
                                className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                                  scrolled ? "hover:bg-redbull-blue/10" : "hover:bg-white/10"
                                } group`}
                              >
                                <div className={`w-10 h-10 rounded-full ${
                                  scrolled ? "bg-redbull-blue-light" : "bg-white/20"
                                } flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                  <item.icon className={`w-5 h-5 ${
                                    scrolled ? "text-redbull-blue" : "text-white"
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-1">
                                    <span className={`text-sm font-medium ${
                                      scrolled ? "text-charcoal" : "text-white"
                                    }`}>
                                      {item.name}
                                    </span>
                                    {item.highlight && (
                                      <span className="text-[10px] bg-redbull-blue text-white px-1.5 py-0.5 rounded-full">
                                        New
                                      </span>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p className={`text-xs ${
                                      scrolled ? "text-slate-text/70" : "text-white/60"
                                    }`}>
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                                <ArrowRight className={`w-4 h-4 ${
                                  scrolled ? "text-slate-text" : "text-white/60"
                                } group-hover:translate-x-1 transition-transform`} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-full transition-colors touch-friendly ${
                scrolled ? "text-slate-text hover:bg-warm-gray" : "text-white hover:bg-white/20"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - FIXED WITH SCROLLABLE DROPDOWNS */}
        {isOpen && (
          <div
            className={`md:hidden ${mobileMenuBg} border-t ${
              scrolled ? "border-cool-gray" : "border-white/20"
            } animate-fade-in max-h-[85vh] overflow-y-auto`}
          >
            <div className="px-4 py-4">
              {navItems.map((item) => {
                const isExpanded = expandedMobileItems.includes(item.name);
                return (
                  <div key={item.name} className="mb-2">
                    <button
                      onClick={() => toggleMobileItem(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors ${
                        isExpanded ? "bg-redbull-blue/10 text-redbull-blue" : mobileLinkText
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${isExpanded ? "text-redbull-blue" : ""}`} />
                        <span className="font-medium">{item.name}</span>
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`} />
                    </button>

                    {/* Scrollable subcategories section */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-[60vh] opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-11 pr-3 space-y-3 overflow-y-auto max-h-[50vh] custom-scrollbar">
                        {item.dropdown.sections.map((section, idx) => (
                          <div key={idx} className="space-y-2">
                            <h4 className={`text-xs font-medium uppercase tracking-wider ${
                              scrolled ? "text-slate-text/60" : "text-white/60"
                            }`}>
                              {section.title}
                            </h4>
                            <div className="space-y-1">
                              {section.items.map((link, linkIdx) => (
                                <Link
                                  key={linkIdx}
                                  to={link.href}
                                  className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg transition-colors ${
                                    scrolled
                                      ? "text-slate-text hover:bg-redbull-blue/10 hover:text-redbull-blue"
                                      : "text-white/80 hover:bg-white/10 hover:text-white"
                                  } ${link.highlight ? "text-redbull-blue font-medium" : ""}`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {link.icon && <link.icon className="w-3.5 h-3.5" />}
                                  {link.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}

                        {/* Sticky "View All" link at bottom */}
                        <Link
                          to={`/${item.name.toLowerCase()}`}
                          className={`flex items-center gap-1 text-sm py-2 px-2 rounded-lg ${
                            scrolled ? "text-redbull-blue" : "text-white"
                          } font-medium hover:opacity-80 transition-opacity sticky bottom-0 bg-inherit border-t border-cool-gray/20 pt-3 mt-2`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span>Browse all {item.name}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Mobile Get Started Section */}
              <div className="mt-6 pt-4 border-t border-cool-gray/20">
                <h4 className={`text-xs font-medium uppercase tracking-wider mb-3 ${
                  scrolled ? "text-slate-text/60" : "text-white/60"
                }`}>
                  Get Started
                </h4>

                <div className="space-y-2">
                  <Link
                    to="/sign-in"
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      scrolled ? "text-slate-text hover:bg-redbull-blue/10" : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-full ${scrolled ? "bg-redbull-blue-light" : "bg-white/20"} flex items-center justify-center`}>
                      <LogIn className={`w-5 h-5 ${scrolled ? "text-redbull-blue" : "text-white"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Sign In</div>
                      <div className="text-xs opacity-70">Access your account</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/sign-up"
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      scrolled ? "text-slate-text hover:bg-redbull-blue/10" : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-full ${scrolled ? "bg-redbull-blue-light" : "bg-white/20"} flex items-center justify-center`}>
                      <UserPlus className={`w-5 h-5 ${scrolled ? "text-redbull-blue" : "text-white"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">Create Account</span>
                        <span className="text-[10px] bg-redbull-blue text-white px-1.5 py-0.5 rounded-full">New</span>
                      </div>
                      <div className="text-xs opacity-70">Join as buyer, seller, or rider</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/become-seller"
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      scrolled ? "text-slate-text hover:bg-redbull-blue/10" : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-full ${scrolled ? "bg-redbull-blue-light" : "bg-white/20"} flex items-center justify-center`}>
                      <Store className={`w-5 h-5 ${scrolled ? "text-redbull-blue" : "text-white"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Become a Seller</div>
                      <div className="text-xs opacity-70">Start selling your products</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/become-rider"
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      scrolled ? "text-slate-text hover:bg-redbull-blue/10" : "text-white hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-full ${scrolled ? "bg-redbull-blue-light" : "bg-white/20"} flex items-center justify-center`}>
                      <Bike className={`w-5 h-5 ${scrolled ? "text-redbull-blue" : "text-white"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Become a Rider</div>
                      <div className="text-xs opacity-70">Earn with every delivery</div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Logo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade-in"></div>
          <div
            className="relative bg-soft-white/95 backdrop-blur-sm rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-white/20 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-redbull-blue/20 mb-4">
                <img src={logo} alt="E-TALA Logo" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-display font-bold text-charcoal mb-2">E-TALA</h2>
              <span className="inline-block bg-redbull-blue-light text-redbull-blue px-3 py-1 rounded-full text-xs font-medium mb-4">
                Beta Version
              </span>
              <div className="space-y-3 text-slate-text">
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold text-charcoal">E-TALA</span> is Tala's first digital marketplace, connecting you to local shops, farmers, boda riders, drivers, restaurants, and services - All in one place.
                </p>
                <div className="border-t border-cool-gray my-4"></div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-redbull-blue-light/50 p-3 rounded-xl"><div className="font-semibold text-charcoal">Launched</div><div className="text-slate-text">2026</div></div>
                  <div className="bg-redbull-blue-light/50 p-3 rounded-xl"><div className="font-semibold text-charcoal">Sellers</div><div className="text-slate-text">200+</div></div>
                  <div className="bg-redbull-blue-light/50 p-3 rounded-xl"><div className="font-semibold text-charcoal">Riders</div><div className="text-slate-text">50+</div></div>
                  <div className="bg-redbull-blue-light/50 p-3 rounded-xl"><div className="font-semibold text-charcoal">Towns</div><div className="text-slate-text">Tala, Kangundo</div></div>
                </div>
                <p className="text-xs text-slate-text/70 italic mt-2">"We gatchu, Don't worry."</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="mt-6 w-full bg-redbull-blue text-white px-4 py-3 rounded-full text-sm font-medium hover:bg-redbull-blue/90 transition-colors">
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