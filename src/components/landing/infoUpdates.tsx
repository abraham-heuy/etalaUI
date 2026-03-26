// components/landing/InfoUpdates.tsx
import React from "react";
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
  Star,
  Briefcase,
  Building2,
  Globe,
  Package,
  Truck,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const InfoUpdates: React.FC = () => {
  // Sample top offer from daily updates
  const topOffer = {
    id: 1,
    title: "Fresh Farm Harvest",
    description: "50% off on all vegetables from local farmers",
    discount: 50,
    seller: "Mama Lucy's Farm",
    location: "Tala Town",
    endsIn: "2 days left",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
    rating: 4.9,
  };

  // Links in alphabetical order
  const infoLinks = [
    {
      letter: "A",
      title: "About E-TALA",
      description: "Our story, mission, and the team behind Tala's first digital marketplace",
      to: "/about-us",
      color: "sky",
      icon: null
    },
    {
      letter: "C",
      title: "Contact Us",
      description: "Get in touch with our team for support, partnerships, or feedback",
      to: "/contact",
      color: "sky",
      icon: null,
      contactInfo: true
    },
    {
      letter: "D",
      title: "Become a Delivery Partner",
      description: "Join our delivery fleet. Flexible hours, competitive pay, and weekly payouts",
      to: "/delivery-program",
      color: "green",
      icon: Truck,
      features: [
        { icon: Truck, text: "Flexible Schedule" },
        { icon: Clock, text: "Weekly Payouts" },
        { icon: AlertCircle, text: "Limited slots available", highlight: true }
      ]
    },
    {
      letter: "P",
      title: "Partner with E-TALA",
      description: "Grow together • Suppliers • Investors • Corporates",
      to: "/partnership",
      color: "gradient",
      icon: null,
      badge: { text: "NEW", color: "yellow", animate: true },
      chips: [
        { icon: Package, text: "Suppliers" },
        { icon: Briefcase, text: "Investors" },
        { icon: Building2, text: "Corporate" },
        { icon: Users, text: "NGOs" },
        { icon: Globe, text: "Media" }
      ]
    }
  ];

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
                { label: "Daily Posts", value: "8+", icon: Newspaper },
                { label: "Active Offers", value: "24", icon: Tag },
                { label: "Community", value: "1.2k", icon: Users },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-3 text-center border border-sky-100"
                  >
                    <Icon className="w-4 h-4 text-sky-500 mx-auto mb-1" />
                    <div className="text-sm font-bold text-charcoal">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-slate-text">
                      {stat.label}
                    </div>
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

            {/* Links in Alphabetical Order */}
            <div className="space-y-4">
              {infoLinks.map((link, index) => {
                if (link.color === "gradient") {
                  // Partner with Us - Flashy CTA
                  return (
                    <Link
                      key={index}
                      to={link.to}
                      className="group relative flex items-start gap-4 p-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 delay-150"></div>

                      <div className="relative w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl font-display font-bold text-white border-2 border-white/30 shadow-lg group-hover:scale-110 transition-transform">
                        {link.letter}
                        {link.badge && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-[8px] text-purple-900 font-bold">+</span>
                          </div>
                        )}
                      </div>

                      <div className="relative flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2">
                              {link.title}
                              {link.badge && (
                                <span className={`bg-${link.badge.color}-400 text-purple-900 text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse`}>
                                  {link.badge.text}
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-white/90 mt-0.5">{link.description}</p>
                          </div>
                          <div className="bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition-colors">
                            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        {link.chips && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {link.chips.map((chip, idx) => {
                              const ChipIcon = chip.icon;
                              return (
                                <span key={idx} className="text-[10px] bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm border border-white/30 flex items-center gap-1">
                                  <ChipIcon className="w-3 h-3" />
                                  {chip.text}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>
                    </Link>
                  );
                }

                // Regular links (About, Contact, Delivery)
                const isDelivery = link.title === "Become a Delivery Partner";
                
                return (
                  <Link
                    key={index}
                    to={link.to}
                    className={`group relative flex items-start gap-4 p-4 bg-white rounded-xl border transition-all ${
                      isDelivery 
                        ? 'border-green-200 hover:border-green-400 hover:shadow-md' 
                        : 'border-sky-100 hover:border-sky-300 hover:shadow-md'
                    }`}
                  >
                    {/* Dropcap Letter */}
                    <div className={`w-12 h-12 ${
                      isDelivery ? 'bg-green-100' : 'bg-sky-100'
                    } rounded-xl flex items-center justify-center text-xl font-display font-bold ${
                      isDelivery ? 'text-green-600 group-hover:bg-green-600' : 'text-sky-600 group-hover:bg-sky-600'
                    } group-hover:text-white transition-all duration-300 flex-shrink-0 z-10`}>
                      {link.letter}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-base font-display font-semibold ${
                          isDelivery ? 'text-charcoal group-hover:text-green-600' : 'text-charcoal group-hover:text-sky-600'
                        } transition-colors`}>
                          {link.title}
                        </h3>
                        <ArrowRight className={`w-4 h-4 ${
                          isDelivery ? 'text-slate-text group-hover:text-green-600' : 'text-slate-text group-hover:text-sky-600'
                        } group-hover:translate-x-1 transition-all flex-shrink-0`} />
                      </div>
                      
                      <p className="text-xs text-slate-text mt-1">
                        {link.description}
                      </p>

                      {/* Contact Info (specific to Contact Us) */}
                      {link.contactInfo && (
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
                      )}

                      {/* Delivery Features - Now includes subtle badges at the bottom */}
                      {isDelivery && link.features && (
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          {link.features.map((feature, idx) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <span
                                key={idx}
                                className={`inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full ${
                                  feature.highlight
                                    ? 'bg-orange-100 text-orange-700'
                                    : 'bg-green-100 text-green-700'
                                }`}
                              >
                                <FeatureIcon className="w-3 h-3" />
                                {feature.text}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
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