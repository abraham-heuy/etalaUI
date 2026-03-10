// components/HowItWorks.tsx
import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Search, 
  ShoppingCart, 
  Truck, 
  Store, 
  Users, 
  Package, 
  CreditCard, 
  Phone,
  CheckCircle,
  ChevronDown,
  Hand
} from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activePath, setActivePath] = useState<'buyer' | 'seller' | null>(null);
  const [isWaving, setIsWaving] = useState(false);
  const [characterDirection, setCharacterDirection] = useState<'left' | 'right' | 'center'>('center');

  // Update character direction based on active path
  useEffect(() => {
    if (activePath === 'buyer') {
      setCharacterDirection('left');
    } else if (activePath === 'seller') {
      setCharacterDirection('right');
    } else {
      setCharacterDirection('center');
    }
  }, [activePath]);

  // Wave animation trigger
  useEffect(() => {
    // Wave when path changes or periodically to attract attention
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1000);
    }, 5000);

    return () => clearInterval(waveInterval);
  }, []);

  // Wave when user hovers over either path
  const handlePathHover = (_path: 'buyer' | 'seller') => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1000);
  };

  const steps = {
    start: {
      title: 'Sign In',
      icon: UserPlus,
      description: 'Create account or login with your phone number',
      color: 'from-redbull-blue to-blue-500'
    },
    buyer: {
      title: 'I want to buy',
      icon: Users,
      description: 'Shop for products and services',
      color: 'from-green-400 to-teal-500',
      steps: [
        { icon: Search, title: 'Browse or Search', description: 'Find what you need from local sellers' },
        { icon: ShoppingCart, title: 'Place Order', description: 'Add to cart or contact seller directly' },
        { icon: CreditCard, title: 'Pay Securely', description: 'M-PESA or cash on delivery' },
        { icon: Truck, title: 'Get Delivery', description: 'Boda rider brings it to your doorstep' },
      ]
    },
    seller: {
      title: 'I want to sell',
      icon: Store,
      description: 'List your products or services',
      color: 'from-purple-400 to-indigo-500',
      steps: [
        { icon: Package, title: 'List Your Items', description: 'Add products with photos and prices' },
        { icon: Phone, title: 'Receive Orders', description: 'Get notified when customers order' },
        { icon: CheckCircle, title: 'Confirm & Prepare', description: 'Accept order and pack items' },
        { icon: Truck, title: 'Arrange Delivery', description: 'Connect with boda rider or customer pickup' },
      ]
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-soft-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-4">
            How <span className="text-redbull-blue">E-Tala</span> works
          </h2>
          <p className="text-slate-text text-lg">Choose your path — buyer or seller</p>
        </div>

        {/* Flowchart Container */}
        <div className="relative">
          {/* SVG Connectors - Hidden on mobile, shown on desktop */}
          <svg className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none" style={{ minHeight: '600px' }}>
            {/* Main vertical line from Start to split */}
            <line 
              x1="50%" 
              y1="120" 
              x2="50%" 
              y2="220" 
              stroke="#004F9E" 
              strokeWidth="2" 
              strokeDasharray="6 6"
              className="opacity-30"
            />
            
            {/* Split into two branches */}
            {/* Left branch to Buyer */}
            <path 
              d="M 50% 220 L 35% 280 L 35% 380" 
              stroke="#10B981" 
              strokeWidth="3" 
              fill="none"
              strokeDasharray="8 4"
              className="opacity-60"
            />
            {/* Right branch to Seller */}
            <path 
              d="M 50% 220 L 65% 280 L 65% 380" 
              stroke="#8B5CF6" 
              strokeWidth="3" 
              fill="none"
              strokeDasharray="8 4"
              className="opacity-60"
            />
            
            {/* Buyer path connectors */}
            {activePath === 'buyer' && steps.buyer.steps.map((_, index) => {
              if (index < steps.buyer.steps.length - 1) {
                const yPos = 460 + (index * 120);
                return (
                  <line
                    key={`buyer-connector-${index}`}
                    x1="35%"
                    y1={yPos}
                    x2="35%"
                    y2={yPos + 80}
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                );
              }
              return null;
            })}

            {/* Seller path connectors */}
            {activePath === 'seller' && steps.seller.steps.map((_, index) => {
              if (index < steps.seller.steps.length - 1) {
                const yPos = 460 + (index * 120);
                return (
                  <line
                    key={`seller-connector-${index}`}
                    x1="65%"
                    y1={yPos}
                    x2="65%"
                    y2={yPos + 80}
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                );
              }
              return null;
            })}
          </svg>

          {/* Start Node - Centered */}
          <div className="flex justify-center mb-12">
            <div className="relative group">
              {/* Pulse effect */}
              <div className="absolute inset-0 bg-redbull-blue rounded-full animate-ping opacity-20"></div>
              
              {/* Main start card */}
              <div className={`relative bg-gradient-to-r ${steps.start.color} text-white rounded-2xl p-6 shadow-xl w-64 text-center transform hover:scale-105 transition-transform`}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-1">{steps.start.title}</h3>
                <p className="text-sm text-white/80">{steps.start.description}</p>
                
                {/* Step indicator */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 text-xs font-bold text-redbull-blue shadow-lg">
                  Step 1
                </div>
              </div>
            </div>
          </div>

          {/* Branch Selection - Mobile (visible on small screens) */}
          <div className="lg:hidden space-y-4 my-8">
            <p className="text-center text-sm text-slate-text mb-2">Choose your path:</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setActivePath(activePath === 'buyer' ? null : 'buyer')}
                onMouseEnter={() => handlePathHover('buyer')}
                className={`flex-1 max-w-xs bg-gradient-to-r ${steps.buyer.color} text-white rounded-xl p-4 text-center transition-all ${
                  activePath === 'buyer' ? 'ring-4 ring-green-300 scale-105' : 'opacity-80'
                }`}
              >
                <Users className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-bold">I want to buy</h4>
                <p className="text-xs text-white/80 mt-1">Shop for products</p>
              </button>
              
              <button
                onClick={() => setActivePath(activePath === 'seller' ? null : 'seller')}
                onMouseEnter={() => handlePathHover('seller')}
                className={`flex-1 max-w-xs bg-gradient-to-r ${steps.seller.color} text-white rounded-xl p-4 text-center transition-all ${
                  activePath === 'seller' ? 'ring-4 ring-purple-300 scale-105' : 'opacity-80'
                }`}
              >
                <Store className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-bold">I want to sell</h4>
                <p className="text-xs text-white/80 mt-1">List your business</p>
              </button>
            </div>
          </div>

          {/* Desktop Branch Selection - Hidden on mobile */}
          <div className="hidden lg:flex justify-between items-start mt-8 relative">
            {/* Character in the middle space */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div 
                className={`relative transition-all duration-500 transform ${
                  characterDirection === 'left' ? '-translate-x-16' : 
                  characterDirection === 'right' ? 'translate-x-16' : 
                  'translate-x-0'
                }`}
              >
                {/* Character container */}
                <div className="bg-white rounded-3xl shadow-xl border border-cool-gray p-4 w-40 text-center">
                  {/* Face */}
                  <div className="relative mb-2">
                    {/* Eyes - looking in the right direction */}
                    <div className="flex justify-center gap-4 mb-1">
                      <div className={`w-3 h-3 rounded-full bg-charcoal transition-transform ${
                        characterDirection === 'left' ? 'transform -translate-x-0.5' :
                        characterDirection === 'right' ? 'transform translate-x-0.5' : ''
                      }`}></div>
                      <div className={`w-3 h-3 rounded-full bg-charcoal transition-transform ${
                        characterDirection === 'left' ? 'transform -translate-x-0.5' :
                        characterDirection === 'right' ? 'transform translate-x-0.5' : ''
                      }`}></div>
                    </div>
                    
                    {/* Smile */}
                    <div className="w-8 h-4 mx-auto border-b-4 border-redbull-blue rounded-full"></div>
                  </div>
                  
                  {/* Waving hand */}
                  <div className={`absolute -top-2 -right-2 transition-transform duration-300 ${
                    isWaving ? 'animate-wave' : ''
                  }`}>
                    <Hand className="w-6 h-6 text-redbull-blue" />
                  </div>
                  
                  {/* Speech bubble */}
                  <div className="relative mt-2 text-xs font-medium text-charcoal bg-redbull-blue-light rounded-lg p-2">
                    {activePath === 'buyer' ? "👈 Great choice! Start shopping!" :
                     activePath === 'seller' ? "Start selling! 👉" :
                     "Which path will you choose? 👋"}
                    {/* Speech bubble tail */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-redbull-blue-light transform rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Branch */}
            <div className="w-[35%] text-center">
              <div 
                className={`relative bg-gradient-to-r ${steps.buyer.color} text-white rounded-xl p-6 shadow-xl cursor-pointer transform hover:scale-105 transition-all ${
                  activePath === 'buyer' ? 'ring-4 ring-green-300' : ''
                }`}
                onClick={() => setActivePath('buyer')}
                onMouseEnter={() => handlePathHover('buyer')}
              >
                <Users className="w-12 h-12 mx-auto mb-3 text-white" />
                <h3 className="text-xl font-display font-bold mb-1">{steps.buyer.title}</h3>
                <p className="text-sm text-white/80">{steps.buyer.description}</p>
                
                {/* Step indicator */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 text-xs font-bold text-green-600 shadow-lg">
                  Step 2
                </div>
              </div>

              {/* Buyer Steps - Animated visibility */}
              <div className={`mt-8 space-y-6 transition-all duration-500 ${
                activePath === 'buyer' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
              }`}>
                {steps.buyer.steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="relative bg-white rounded-xl p-5 shadow-md border border-cool-gray group hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-display font-semibold text-charcoal mb-1">{step.title}</h4>
                          <p className="text-xs text-slate-text">{step.description}</p>
                        </div>
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600">
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Connector arrow (except last) */}
                      {index < steps.buyer.steps.length - 1 && (
                        <ChevronDown className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-5 h-5 text-green-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Seller Branch */}
            <div className="w-[35%] text-center">
              <div 
                className={`relative bg-gradient-to-r ${steps.seller.color} text-white rounded-xl p-6 shadow-xl cursor-pointer transform hover:scale-105 transition-all ${
                  activePath === 'seller' ? 'ring-4 ring-purple-300' : ''
                }`}
                onClick={() => setActivePath('seller')}
                onMouseEnter={() => handlePathHover('seller')}
              >
                <Store className="w-12 h-12 mx-auto mb-3 text-white" />
                <h3 className="text-xl font-display font-bold mb-1">{steps.seller.title}</h3>
                <p className="text-sm text-white/80">{steps.seller.description}</p>
                
                {/* Step indicator */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 text-xs font-bold text-purple-600 shadow-lg">
                  Step 2
                </div>
              </div>

              {/* Seller Steps - Animated visibility */}
              <div className={`mt-8 space-y-6 transition-all duration-500 ${
                activePath === 'seller' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
              }`}>
                {steps.seller.steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="relative bg-white rounded-xl p-5 shadow-md border border-cool-gray group hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-display font-semibold text-charcoal mb-1">{step.title}</h4>
                          <p className="text-xs text-slate-text">{step.description}</p>
                        </div>
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Connector arrow (except last) */}
                      {index < steps.seller.steps.length - 1 && (
                        <ChevronDown className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-5 h-5 text-purple-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Steps - Show when path selected */}
          <div className="lg:hidden mt-8">
            {activePath === 'buyer' && (
              <div className="space-y-4 animate-slide-down">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Buyer Steps:
                </h3>
                {steps.buyer.steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-cool-gray flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-charcoal text-sm">{step.title}</h4>
                        <p className="text-xs text-slate-text">{step.description}</p>
                      </div>
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activePath === 'seller' && (
              <div className="space-y-4 animate-slide-down">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <Store className="w-5 h-5 text-purple-600" />
                  Seller Steps:
                </h3>
                {steps.seller.steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-cool-gray flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-charcoal text-sm">{step.title}</h4>
                        <p className="text-xs text-slate-text">{step.description}</p>
                      </div>
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Reset/Clear selection (mobile) */}
          {activePath && (
            <div className="text-center mt-8 lg:hidden">
              <button
                onClick={() => setActivePath(null)}
                className="text-sm text-slate-text hover:text-redbull-blue transition-colors"
              >
                ← Show both paths
              </button>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="text-center mt-16 text-sm text-slate-text">
          <p>Both buyers and sellers are verified for a safe, trusted experience</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;