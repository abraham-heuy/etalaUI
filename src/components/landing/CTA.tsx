// components/CTA.tsx
import React from 'react';
import { Store, Users, ShoppingBag, ArrowRight, Package } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-soft-white">
      <div className="max-w-5xl mx-auto">
        {/* Main CTA Card - Smaller, cleaner */}
        <div className="bg-white rounded-2xl shadow-xl border border-cool-gray overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Value Proposition */}
            <div className="p-8 md:p-10 bg-gradient-to-br from-redbull-blue-light to-white">
              <div className="inline-flex items-center bg-redbull-blue/10 text-redbull-blue px-3 py-1 rounded-full text-xs font-medium mb-4">
                <span className="w-1.5 h-1.5 bg-redbull-blue rounded-full mr-1.5"></span>
                Join 500+ local businesses
              </div>
              
              <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-3">
                Grow with <span className="text-redbull-blue">E-Tala</span>
              </h2>
              
              <p className="text-slate-text text-sm mb-6 leading-relaxed">
                Whether you're buying or selling, connect with your community and boost your daily hustle.
              </p>
              
              {/* Offers/Stats in chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs border border-cool-gray flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-redbull-blue" />
                  <span>200+ sellers</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs border border-cool-gray flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-redbull-blue" />
                  <span>5k+ buyers</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs border border-cool-gray flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-redbull-blue" />
                  <span>Free listings</span>
                </div>
              </div>
              
              {/* Action Buttons - Smaller, rounded */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-redbull-blue text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-redbull-blue/90 transition-colors shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2">
                  List Your Business
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="bg-white text-redbull-blue px-5 py-2.5 rounded-full text-sm font-medium border border-redbull-blue hover:bg-redbull-blue-light transition-colors inline-flex items-center justify-center gap-2">
                  Start Searching
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Right Side - Benefits for Buyers & Sellers */}
            <div className="p-8 md:p-10 bg-white">
              <h3 className="text-lg font-display font-semibold text-charcoal mb-4">
                What you'll get
              </h3>
              
              <div className="space-y-4">
                {/* For Sellers */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-redbull-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Store className="w-4 h-4 text-redbull-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal text-sm">For Sellers</h4>
                    <p className="text-xs text-slate-text mt-0.5">
                      List products for free • Reach more customers • No commission fees
                    </p>
                  </div>
                </div>
                
                {/* For Buyers */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-redbull-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-4 h-4 text-redbull-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal text-sm">For Buyers</h4>
                    <p className="text-xs text-slate-text mt-0.5">
                      Fresh local goods • Best prices • Support local businesses
                    </p>
                  </div>
                </div>
                
                {/* For Everyone */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-redbull-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-redbull-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-charcoal text-sm">For Everyone</h4>
                    <p className="text-xs text-slate-text mt-0.5">
                      Trusted community • Verified profiles • Fast delivery options
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Trust badge */}
              <div className="mt-6 pt-4 border-t border-cool-gray">
                <p className="text-xs text-slate-text/70 flex items-center gap-1">
                  <span className="text-redbull-blue">✓</span> No hidden fees • 
                  <span className="text-redbull-blue">✓</span> Free to join • 
                  <span className="text-redbull-blue">✓</span> Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Micro-CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-text">
          <span className="flex items-center gap-1">List your business in 10 minutes</span>
          <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
          <span className="flex items-center gap-1">Find anything in this marketplace</span>
          <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
          <span className="flex items-center gap-1">Join 500+ local businesses</span>
        </div>
      </div>
    </section>
  );
};

export default CTA;