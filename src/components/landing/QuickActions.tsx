// components/QuickActions.tsx
import React from 'react';
import { 
  Store, 
  Wheat, 
  Hotel, 
  Coffee, 
  Bike, 
  Wrench,
  ArrowRight
} from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    { 
      name: 'Marketplace', 
      icon: Store, 
      color: 'from-blue-400 to-redbull-blue',
      href: '#marketplace',
      count: '200+ shops'
    },
    { 
      name: 'Farmers Market', 
      icon: Wheat, 
      color: 'from-green-400 to-teal-500',
      href: '#farmers',
      count: '56 farmers'
    },
    { 
      name: 'Accommodation', 
      icon: Hotel, 
      color: 'from-pink-400 to-rose-500',
      href: '#accommodation',
      count: '15+ places'
    },
    { 
      name: 'Food', 
      icon: Coffee, 
      color: 'from-red-400 to-orange-500',
      href: '#food',
      count: '25+ eateries'
    },
    { 
      name: 'Transport', 
      icon: Bike, 
      color: 'from-yellow-400 to-amber-500',
      href: '#boda',
      count: '50+ riders/Drivers'
    },
    { 
      name: 'Services', 
      icon: Wrench, 
      color: 'from-purple-400 to-indigo-500',
      href: '#services',
      count: '30+ freelancers'
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-soft-white to-warm-gray">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-charcoal">
              Quick Actions
            </h2>
            <p className="text-sm text-slate-text mt-1">
              Jump straight to what you need
            </p>
          </div>
          
          {/* View All Link - subtle */}
          <a 
            href="#all-services" 
            className="hidden sm:flex items-center gap-1 text-sm text-redbull-blue hover:text-redbull-blue/80 transition-colors group"
          >
            <span>All services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <a
                key={index}
                href={action.href}
                className="group relative bg-white rounded-2xl p-4 border border-cool-gray hover:border-transparent hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${action.color}`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} bg-opacity-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Text */}
                  <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-white transition-colors duration-300">
                    {action.name}
                  </h3>
                  
                  {/* Count - subtle */}
                  <p className="text-xs text-slate-text group-hover:text-white/80 transition-colors duration-300 mt-1">
                    {action.count}
                  </p>
                </div>

                {/* Decorative arrow on hover */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="sm:hidden text-center mt-4">
          <a 
            href="#all-services" 
            className="inline-flex items-center gap-1 text-sm text-redbull-blue hover:text-redbull-blue/80 transition-colors group"
          >
            <span>View all services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;