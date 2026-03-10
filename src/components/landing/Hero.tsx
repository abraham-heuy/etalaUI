// components/Hero.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Store,
  Users,
  Bike,
  Briefcase,
  ArrowRight,
  Package,
  Wrench,
} from "lucide-react";
import heroBg from "../../assets/tala-market-b.jfif";

const Hero: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click outside to close tooltip on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    if (isMobile && showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, showTooltip]);

  // Handle hover for desktop
  const handleMouseEnter = () => {
    if (!isMobile) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowTooltip(false);
    }
  };

  // Handle tap for mobile
  const handleTap = () => {
    if (isMobile) {
      setShowTooltip(!showTooltip);
    }
  };

  return (
    <section className="relative h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image with Sophisticated Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Tala Market Scene"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        {/* Gradient overlay - darker at edges, lighter in center for focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60"></div>
        {/* Subtle pattern overlay for texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center animate-slide-up">
          {/* Premium Badge - with learn more below */}
          <div className="mb-6">
            <a
              href="/about-us"
              className="group inline-flex flex-col items-center cursor-pointer"
            >
              {/* Main badge - exactly as before */}
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-2xl hover:bg-white/20 transition-all duration-300">
                <span className="w-2 h-2 bg-redbull-blue rounded-full mr-2 animate-pulse"></span>
                <span className="tracking-wide">
                  TALA'S FIRST DIGITAL MARKETPLACE
                </span>
              </div>

              {/* Learn more text - now below */}
              <span className="flex items-center gap-1 text-xs text-white/60 hover:text-white mt-2 transition-colors">
                Click to learn more about us
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white max-w-5xl leading-tight">
            Find{" "}
            <span 
              ref={triggerRef}
              className="relative inline-block cursor-help"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleTap}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500 relative z-10">
                anything
              </span>
              
              {/* Tooltip */}
              {showTooltip && (
                <div 
                  ref={tooltipRef}
                  className={`absolute ${isMobile ? 'top-full mt-2' : 'bottom-full mb-2'} left-1/2 -translate-x-1/2 z-20 min-w-[180px]`}
                >
                  {/* Tooltip content */}
                  <div className="bg-white/95 backdrop-blur-sm text-charcoal rounded-xl shadow-2xl border border-white/30 p-3">
                    <div className="flex items-center gap-2 mb-2 border-b border-cool-gray pb-2">
                      <Package className="w-4 h-4 text-redbull-blue" />
                      <span className="text-xs font-semibold text-charcoal">Products</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-redbull-blue" />
                      <span className="text-xs font-semibold text-charcoal">Services</span>
                    </div>
                    
                    {/* Mobile hint */}
                    {isMobile && (
                      <p className="text-[10px] text-slate-text/60 mt-2 pt-2 border-t border-cool-gray">
                        Tap again to close
                      </p>
                    )}
                    
                    {/* Tooltip arrow */}
                    <div 
                      className={`absolute ${
                        isMobile ? '-top-2' : '-bottom-2'
                      } left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 transform rotate-45 border border-white/30`}
                      style={{
                        borderTop: isMobile ? 'none' : '1px solid rgba(255,255,255,0.3)',
                        borderLeft: '1px solid rgba(255,255,255,0.3)',
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </span>{" "}
            without leaving your home
          </h1>

          {/* Supporting text */}
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mt-4 font-light">
            Fresh farm produce • Local shops • Quick boda rides • Professional
            services
          </p>

          {/* Value Proposition */}
          <p className="text-sm text-gray-300 max-w-2xl mt-2 italic">
            "One app. Everything Tala. Delivered to your doorstep."
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mt-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for fresh tomatoes, a plumber, or boda ride..."
                className="w-full pl-12 pr-36 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full focus:outline-none focus:border-redbull-blue focus:ring-4 focus:ring-redbull-blue/20 transition-all text-white placeholder-gray-300 text-sm sm:text-base"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90 transition-colors shadow-lg hover:shadow-xl hidden sm:block">
                Search
              </button>
            </div>
          </div>

          {/* Location Badge - Chip sized */}
          <div className="flex items-center gap-2 text-gray-300 mt-4 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs sm:text-sm">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-redbull-blue" />
            <span>Serving Tala, Kangundo, Matuu</span>
          </div>

          {/* Stats - Compact chip design */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {[
              {
                icon: Store,
                value: "200+",
                label: "Sellers",
                color: "from-blue-400 to-redbull-blue",
              },
              {
                icon: Users,
                value: "5k+",
                label: "Customers",
                color: "from-purple-400 to-blue-500",
              },
              {
                icon: Bike,
                value: "50+",
                label: "Riders",
                color: "from-green-400 to-teal-500",
              },
              {
                icon: Briefcase,
                value: "30+",
                label: "Services",
                color: "from-orange-400 to-red-500",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full py-1.5 pl-1.5 pr-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  {/* Icon - Small circular chip */}
                  <div
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${stat.color} p-1.5 shadow-lg`}
                  >
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Value and Label */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="text-xs text-white/70">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust badges - Minimal */}
          <div className="flex items-center justify-center gap-3 mt-6 text-xs text-white/50">
            <span>✓ Verified</span>
            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
            <span>🔒 Secure</span>
            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
            <span>🚚 Fast</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;