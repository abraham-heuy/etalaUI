// pages/NotFound.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Compass, 
  MapPin,
  Frown,
  AlertCircle,
  Bike,
  Coffee,
  Hotel,
  Store,
  Wheat,
  Wrench
} from 'lucide-react';

const NotFound: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-white to-warm-gray flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-redbull-blue/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-redbull-blue/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-redbull-blue/20 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-redbull-blue/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-redbull-blue/10 rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-lg w-full">
        {/* Main content card */}
        <div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-redbull-blue/10 p-8 md:p-10 transform transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
          }}
        >
          {/* 404 Number with animation */}
          <div className="relative mb-8">
            <h1 className="text-8xl md:text-9xl font-display font-bold text-center relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-redbull-blue to-redbull-blue/50">
                404
              </span>
            </h1>
            
            {/* Animated circles behind number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-redbull-blue/5 rounded-full blur-xl animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-redbull-blue/5 rounded-full blur-2xl animate-pulse"></div>
          </div>

          {/* Icon and message */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Compass className="w-16 h-16 text-redbull-blue/30" />
                <Frown className="w-8 h-8 text-redbull-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-3">
              Oops! You've wandered off
            </h2>
            
            <p className="text-slate-text text-sm md:text-base max-w-sm mx-auto">
              The page you're looking for doesn't exist or has been moved to a new location.
            </p>
          </div>

          {/* Search suggestion */}
          <div className="bg-redbull-blue-light/30 rounded-xl p-4 mb-6 border border-redbull-blue/10">
            <div className="flex items-center gap-2 text-sm text-slate-text mb-2">
              <AlertCircle className="w-4 h-4 text-redbull-blue" />
              <span className="font-medium">Looking for something?</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-text/70">
              <MapPin className="w-3 h-3 text-redbull-blue" />
              <span>Try checking the URL or use the navigation below</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Home button */}
            <Link
              to="/"
              className="flex-1 bg-redbull-blue text-white py-3 px-4 rounded-full text-sm font-medium hover:bg-redbull-blue/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Home className={`w-4 h-4 transition-transform duration-300 ${isHovering ? 'rotate-12' : ''}`} />
              Go Back Home
            </Link>

            {/* Back button */}
            <button
              onClick={() => window.history.back()}
              className="flex-1 bg-white border-2 border-redbull-blue text-redbull-blue py-3 px-4 rounded-full text-sm font-medium hover:bg-redbull-blue-light transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Page
            </button>
          </div>

          {/* Search suggestion links */}
          <div className="mt-6 pt-4 border-t border-redbull-blue/10">
            <p className="text-xs text-center text-slate-text/60 mb-3">
              Popular destinations:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { name: 'Marketplace', href: '/marketplace', icon: Store },
                { name: 'Farmers', href: '/farmers', icon: Wheat },
                { name: 'Boda', href: '/boda', icon: Bike },
                { name: 'Services', href: '/services', icon: Wrench },
                { name: 'Food', href: '/food', icon: Coffee },
                { name: 'Stays', href: '/stays', icon: Hotel },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    to={item.href}
                    className="group flex items-center gap-1 px-3 py-1.5 bg-warm-gray rounded-full text-xs text-slate-text hover:bg-redbull-blue-light hover:text-redbull-blue transition-colors"
                  >
                    <Icon className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Fun fact */}
          <div className="mt-6 text-center">
            <p className="text-[10px] text-slate-text/40">
              ⚡ Fun fact: This page has been visited {Math.floor(Math.random() * 1000)} times by lost travelers
            </p>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-redbull-blue/20 rounded-tl-2xl"></div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-redbull-blue/20 rounded-br-2xl"></div>
      </div>
    </div>
  );
};

export default NotFound;