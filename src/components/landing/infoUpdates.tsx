// components/landing/InfoUpdates.tsx
import React from 'react';
import { 
  Newspaper, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Store, 
  Tag,
  Users,
  Phone,
  Mail,
  MessageCircle,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const InfoUpdates: React.FC = () => {
  // Sample top offer from daily updates
  const topOffer = {
    id: 1,
    title: 'Fresh Farm Harvest',
    description: '50% off on all vegetables from local farmers',
    discount: 50,
    seller: 'Mama Lucy\'s Farm',
    location: 'Tala Town',
    endsIn: '2 days left',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    rating: 4.9
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-soft-white to-warm-gray">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Daily Updates Preview */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-charcoal">
                  Daily Updates
                </h2>
                <p className="text-sm text-slate-text">
                  Fresh news, offers, and community stories
                </p>
              </div>
            </div>

            {/* Top Offer Card */}
            <div className="bg-white rounded-2xl shadow-md border border-sky-100 overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative h-48">
                <img 
                  src={topOffer.image} 
                  alt={topOffer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-sky-500 text-white text-xs px-2 py-1 rounded-full">
                  {topOffer.discount}% OFF
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-text text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {topOffer.endsIn}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-2">
                  {topOffer.title}
                </h3>
                
                <p className="text-sm text-slate-text mb-3 line-clamp-2">
                  {topOffer.description}
                </p>
                
                <div className="flex items-center gap-3 text-xs text-slate-text/70 mb-4">
                  <span className="flex items-center gap-1">
                    <Store className="w-3 h-3" />
                    {topOffer.seller}
                  </span>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <MapPin className="w-3 h-3" />
                  <span>{topOffer.location}</span>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    {topOffer.rating}
                  </span>
                </div>
                
                <Link 
                  to="/daily-updates" 
                  className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium text-sm group"
                >
                  <span>See all daily updates</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Daily Posts', value: '8+', icon: Newspaper },
                { label: 'Active Offers', value: '24', icon: Tag },
                { label: 'Community', value: '1.2k', icon: Users },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white rounded-xl p-3 text-center border border-sky-100">
                    <Icon className="w-4 h-4 text-sky-500 mx-auto mb-1" />
                    <div className="text-sm font-bold text-charcoal">{stat.value}</div>
                    <div className="text-[10px] text-slate-text">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Links in Dropcap Style */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-charcoal">
                  More Information
                </h2>
                <p className="text-sm text-slate-text">
                  Quick links to learn more about us
                </p>
              </div>
            </div>

            {/* Dropcap-style Links */}
            <div className="space-y-4">
              {/* About Us Link */}
              <Link 
                to="/about-us" 
                className="group flex items-start gap-4 p-4 bg-white rounded-xl border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-xl font-display font-bold text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-sky-600 transition-colors">
                      About E-TALA
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-text group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-text mt-1">
                    Our story, mission, and the team behind Tala's first digital marketplace
                  </p>
                </div>
              </Link>

              

              {/* Contact Us Link */}
              <Link 
                to="/contact" 
                className="group flex items-start gap-4 p-4 bg-white rounded-xl border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-xl font-display font-bold text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  C
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-sky-600 transition-colors">
                      Contact Us
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-text group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-text mt-1">
                    Get in touch with our team for support, partnerships, or feedback
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-text/70">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      +254 700 000 000
                    </span>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      hello@etala.co.ke
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* View All Link */}
            <div className="text-right">
              <Link 
                to="/more-info" 
                className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 transition-colors group"
              >
                <span>View all resources</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoUpdates;