// pages/boda/index.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bike, 
  Car, 
  Truck, 
  MapPin, 
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Users,
  Shield,
  CreditCard,
  Star,
  Navigation,
  Timer,
  Package,
  Briefcase,
  ChevronRight,
  Info,
  Phone,
  UserCheck,
  Award,
} from 'lucide-react';
import CategoryNavbar from '../../common/CategoryNavbar';
import { popularRoutes, riders, movers } from '../../data/boda';
import RiderProfileModal from '../Rides/RiderProfileModal';

const BodaHome: React.FC = () => {
  const [tripType, setTripType] = useState<'now' | 'later'>('now');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicleType, setVehicleType] = useState<'boda' | 'taxi' | 'movers'>('boda');
  const [showQuickEstimate, setShowQuickEstimate] = useState(false);
  const [selectedRider, setSelectedRider] = useState<any>(null);
  const [showRiderModal, setShowRiderModal] = useState(false);

  // Get online riders count
  const onlineRiders = riders.filter(r => r.online).length;
  const availableMovers = movers.filter(m => m.available).length;

  const handleCalculatePrice = () => {
    if (!from || !to) {
      setShowQuickEstimate(true);
      return;
    }
    // Navigate to pricing page with query params
    window.location.href = `/boda/pricing?from=${from}&to=${to}&type=${vehicleType}&time=${tripType}`;
  };

  // Quick price estimate for demo
  const getQuickEstimate = () => {
    if (vehicleType === 'boda') return 'KSh 100 - 250';
    if (vehicleType === 'taxi') return 'KSh 300 - 600';
    return 'KSh 1,500 - 5,000';
  };

  const handleViewRider = (rider: any) => {
    setSelectedRider(rider);
    setShowRiderModal(true);
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="Boda Rides" showBackButton={false} />

      {/* Hero Section with Booking Form - Subtle gradient with overlay */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Boda riders in Tala"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/80"></div>
          {/* Subtle red pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E6F0FA' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-white mb-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/20">
              <span className="w-2 h-2 bg-redbull-blue rounded-full mr-2 animate-pulse"></span>
              <span>Ride with E-TALA</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3 drop-shadow-lg">
              Go anywhere in <span className="text-redbull-blue-light">Tala</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow">
              Boda, taxi, or moving services - book your ride in seconds, pay as you go
            </p>
          </div>

          {/* Stats Bar - Subtle white */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6 text-white/90 text-sm bg-black/20 backdrop-blur-sm py-3 px-6 rounded-full max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{onlineRiders} riders online</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-redbull-blue-light" />
              <span>{availableMovers} movers available</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.8 avg rating</span>
            </div>
          </div>

          {/* Booking Card - Clean white card (same as before) */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-3xl mx-auto border border-cool-gray">
            {/* ... rest of the booking card remains the same ... */}
            {/* Trip Type Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTripType('now')}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                  tripType === 'now'
                    ? 'bg-redbull-blue text-white shadow-md'
                    : 'bg-warm-gray text-slate-text hover:bg-redbull-blue/10'
                }`}
              >
                <Clock className="w-4 h-4 inline mr-2" />
                Now
              </button>
              <button
                onClick={() => setTripType('later')}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                  tripType === 'later'
                    ? 'bg-redbull-blue text-white shadow-md'
                    : 'bg-warm-gray text-slate-text hover:bg-redbull-blue/10'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Schedule Later
              </button>
            </div>

            {/* From/To Inputs */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/40" />
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="From where?"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-cool-gray rounded-xl focus:outline-none focus:border-redbull-blue focus:ring-4 focus:ring-redbull-blue/10 transition-all text-charcoal placeholder-slate-text/40"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/40" />
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="To where?"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-cool-gray rounded-xl focus:outline-none focus:border-redbull-blue focus:ring-4 focus:ring-redbull-blue/10 transition-all text-charcoal placeholder-slate-text/40"
                />
              </div>
            </div>

            {/* Quick Estimate Hint */}
            {showQuickEstimate && (!from || !to) && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  Enter your pickup and drop-off locations for an exact price. 
                  Quick estimate: <span className="font-bold">{getQuickEstimate()}</span>
                </p>
              </div>
            )}

            {/* Date/Time for scheduled rides */}
            {tripType === 'later' && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-3 bg-white border border-cool-gray rounded-xl focus:outline-none focus:border-redbull-blue text-charcoal text-sm"
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="p-3 bg-white border border-cool-gray rounded-xl focus:outline-none focus:border-redbull-blue text-charcoal text-sm"
                />
              </div>
            )}

            {/* Vehicle Type */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => setVehicleType('boda')}
                className={`p-3 rounded-xl border transition-all ${
                  vehicleType === 'boda'
                    ? 'border-redbull-blue bg-redbull-blue/5'
                    : 'border-cool-gray hover:border-redbull-blue/30 bg-white'
                }`}
              >
                <Bike className={`w-6 h-6 mx-auto mb-1 ${
                  vehicleType === 'boda' ? 'text-redbull-blue' : 'text-slate-text'
                }`} />
                <span className={`text-xs font-medium ${
                  vehicleType === 'boda' ? 'text-redbull-blue' : 'text-slate-text'
                }`}>
                  Boda
                </span>
              </button>
              <button
                onClick={() => setVehicleType('taxi')}
                className={`p-3 rounded-xl border transition-all ${
                  vehicleType === 'taxi'
                    ? 'border-redbull-blue bg-redbull-blue/5'
                    : 'border-cool-gray hover:border-redbull-blue/30 bg-white'
                }`}
              >
                <Car className={`w-6 h-6 mx-auto mb-1 ${
                  vehicleType === 'taxi' ? 'text-redbull-blue' : 'text-slate-text'
                }`} />
                <span className={`text-xs font-medium ${
                  vehicleType === 'taxi' ? 'text-redbull-blue' : 'text-slate-text'
                }`}>
                  Taxi
                </span>
              </button>
              <button
                onClick={() => setVehicleType('movers')}
                className={`p-3 rounded-xl border transition-all ${
                  vehicleType === 'movers'
                    ? 'border-redbull-blue bg-redbull-blue/5'
                    : 'border-cool-gray hover:border-redbull-blue/30 bg-white'
                }`}
              >
                <Truck className={`w-6 h-6 mx-auto mb-1 ${
                  vehicleType === 'movers' ? 'text-redbull-blue' : 'text-slate-text'
                }`} />
                <span className={`text-xs font-medium ${
                  vehicleType === 'movers' ? 'text-redbull-blue' : 'text-slate-text'
                }`}>
                  Movers
                </span>
              </button>
            </div>

            {/* Vehicle Type Descriptions */}
            <div className="text-xs text-slate-text/70 mb-4 px-1">
              {vehicleType === 'boda' && 'Fast & affordable motorcycle rides around town'}
              {vehicleType === 'taxi' && 'Comfortable car rides for up to 4 passengers'}
              {vehicleType === 'movers' && 'Professional moving services for furniture & goods'}
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculatePrice}
              className="w-full bg-redbull-blue text-white py-3.5 rounded-xl text-sm font-medium hover:bg-redbull-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              <Search className="w-4 h-4" />
              {from && to ? 'Calculate Price & Find Riders' : 'Get Price Estimate'}
            </button>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-text/60">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Verified riders
              </span>
              <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
              <span className="flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                Cash or M-PESA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the sections remain the same until Top Rated Riders */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        
        {/* How It Works */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal mb-8 text-center">
            How it <span className="text-redbull-blue">works</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: '1. Enter details', desc: 'Tell us where you\'re going' },
              { icon: Bike, title: '2. Choose ride', desc: 'Pick boda, taxi, or movers' },
              { icon: CreditCard, title: '3. Pay & go', desc: 'Cash or M-PESA on arrival' },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-redbull-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-redbull-blue" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-charcoal mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-text">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Popular Routes */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold text-charcoal">
              Popular Routes
            </h2>
            <Link 
              to="/boda/routes"
              className="text-sm text-redbull-blue hover:text-redbull-blue/80 flex items-center gap-1"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route) => (
              <Link
                key={route.id}
                to={`/boda/pricing?from=${route.from}&to=${route.to}`}
                className="bg-white rounded-xl border border-cool-gray p-4 hover:border-redbull-blue hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-redbull-blue-light rounded-full flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-redbull-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">{route.from}</p>
                      <p className="text-xs text-slate-text">to {route.to}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-redbull-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="flex items-center gap-3 text-xs text-slate-text/70 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {route.distance} km
                  </span>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <span className="flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    {route.duration} min
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-text">Starting from</span>
                    <div className="text-lg font-bold text-redbull-blue">
                      KSh {route.basePrice}
                    </div>
                  </div>
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {route.popular ? 'Popular' : 'Available'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Rated Riders - Clickable cards */}
        <section className="bg-warm-gray rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-semibold text-charcoal">
                Top Rated Riders/Drivers <span className="text-sm font-normal text-slate-text ml-2">This Week</span>
              </h2>
              <p className="text-sm text-slate-text mt-1">
                Click on any rider to view their profile and stats
              </p>
            </div>
            <Link 
              to="/boda/riders"
              className="text-sm text-redbull-blue hover:text-redbull-blue/80 flex items-center gap-1"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {riders.filter(r => r.rating >= 4.8).slice(0, 4).map((rider) => (
              <button
                key={rider.id}
                onClick={() => handleViewRider(rider)}
                className="bg-white rounded-xl p-4 border border-cool-gray hover:border-redbull-blue hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={rider.image} 
                      alt={rider.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white group-hover:border-redbull-blue transition-colors"
                    />
                    {rider.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-redbull-blue transition-colors">
                      {rider.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        {rider.rating}
                      </span>
                      <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                      <span className="text-slate-text">{rider.totalRides} rides</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs">
                      <Bike className="w-3 h-3 text-redbull-blue" />
                      <span className="text-slate-text/70">{rider.vehicle.model}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-cool-gray flex items-center justify-between text-xs">
                  <span className="text-slate-text/70">📍 {rider.location}</span>
                  <span className="text-redbull-blue font-medium">View Profile →</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Service Comparison Table */}
        <section>
          <h2 className="text-2xl font-display font-semibold text-charcoal mb-6">
            Compare Services
          </h2>
          <div className="bg-white rounded-xl border border-cool-gray overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-redbull-blue-light p-4 text-xs font-medium text-redbull-blue">
              <div>Service</div>
              <div>Capacity</div>
              <div>Best for</div>
              <div>Starting at</div>
            </div>
            
            {/* Boda Row */}
            <div className="grid grid-cols-4 p-4 text-sm border-b border-cool-gray hover:bg-warm-gray/50 transition-colors">
              <div className="flex items-center gap-2">
                <Bike className="w-4 h-4 text-redbull-blue" />
                <span>Boda</span>
              </div>
              <div className="text-slate-text">1 passenger</div>
              <div className="text-slate-text">Quick trips</div>
              <div className="font-medium">KSh 100</div>
            </div>
            
            {/* Taxi Row */}
            <div className="grid grid-cols-4 p-4 text-sm border-b border-cool-gray hover:bg-warm-gray/50 transition-colors">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-redbull-blue" />
                <span>Taxi</span>
              </div>
              <div className="text-slate-text">4 passengers</div>
              <div className="text-slate-text">Family trips</div>
              <div className="font-medium">KSh 300</div>
            </div>
            
            {/* Movers Row */}
            <div className="grid grid-cols-4 p-4 text-sm hover:bg-warm-gray/50 transition-colors">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-redbull-blue" />
                <span>Movers</span>
              </div>
              <div className="text-slate-text">Furniture</div>
              <div className="text-slate-text">Moving house</div>
              <div className="font-medium">KSh 1,500</div>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-cool-gray hover:border-redbull-blue/30 transition-all">
            <div className="w-12 h-12 bg-redbull-blue-light rounded-full flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6 text-redbull-blue" />
            </div>
            <h3 className="text-lg font-display font-semibold text-charcoal mb-2">
              Verified Riders
            </h3>
            <p className="text-sm text-slate-text mb-3">
              All riders undergo background checks and are verified by our team.
            </p>
            <div className="flex items-center gap-1 text-xs text-redbull-blue">
              <Shield className="w-3 h-3" />
              <span>100% verified</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-cool-gray hover:border-redbull-blue/30 transition-all">
            <div className="w-12 h-12 bg-redbull-blue-light rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-redbull-blue" />
            </div>
            <h3 className="text-lg font-display font-semibold text-charcoal mb-2">
              Transparent Pricing
            </h3>
            <p className="text-sm text-slate-text mb-3">
              See the full price before you book. No hidden fees or surge pricing.
            </p>
            <div className="flex items-center gap-1 text-xs text-redbull-blue">
              <Info className="w-3 h-3" />
              <span>Pay cash or M-PESA</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-cool-gray hover:border-redbull-blue/30 transition-all">
            <div className="w-12 h-12 bg-redbull-blue-light rounded-full flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-redbull-blue" />
            </div>
            <h3 className="text-lg font-display font-semibold text-charcoal mb-2">
              Multiple Options
            </h3>
            <p className="text-sm text-slate-text mb-3">
              Choose from boda, taxi, or professional moving services.
            </p>
            <div className="flex items-center gap-1 text-xs text-redbull-blue">
              <Users className="w-3 h-3" />
              <span>50+ active riders</span>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="bg-warm-gray rounded-2xl p-6">
          <h2 className="text-2xl font-display font-semibold text-charcoal mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              { q: 'How do I pay for my ride?', a: 'Cash or M-PESA directly to the rider after the trip.' },
              { q: 'Can I schedule a ride for later?', a: 'Yes! Select "Schedule Later" and choose your date and time.' },
              { q: 'What if I have a lot of luggage?', a: 'For heavy items, choose "Movers" for proper transport.' },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-cool-gray">
                <h3 className="text-sm font-medium text-charcoal mb-1">{faq.q}</h3>
                <p className="text-xs text-slate-text">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link 
              to="/boda/faq"
              className="text-sm text-redbull-blue hover:text-redbull-blue/80 inline-flex items-center gap-1"
            >
              View all FAQs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* CTA Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For Riders */}
          <div className="bg-gradient-to-br from-redbull-blue to-redbull-blue/80 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bike className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold">Become a Rider</h3>
                <p className="text-white/80 text-sm">Earn on your own schedule</p>
              </div>
            </div>
            <ul className="space-y-2 mb-4 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span>Make up to KSh 500/day</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span>Flexible hours, work when you want</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span>Join 50+ active riders in Tala</span>
              </li>
            </ul>
            <Link
              to="/become-rider"
              className="inline-flex items-center gap-2 bg-white text-redbull-blue px-5 py-2.5 rounded-full text-sm font-medium hover:bg-redbull-blue-light transition-colors shadow-lg"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* For Movers */}
          <div className="bg-gradient-to-br from-charcoal to-slate-text rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold">List Your Moving Business</h3>
                <p className="text-white/80 text-sm">Reach more customers</p>
              </div>
            </div>
            <ul className="space-y-2 mb-4 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span>Free business listing</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span>Connect with customers directly</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span>Grow your moving business</span>
              </li>
            </ul>
            <Link
              to="/become-mover"
              className="inline-flex items-center gap-2 bg-white text-charcoal px-5 py-2.5 rounded-full text-sm font-medium hover:bg-warm-gray transition-colors shadow-lg"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm text-slate-text hover:text-redbull-blue transition-colors"
          >
            <Phone className="w-4 h-4" />
            Need help? Contact our support team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div> 
      </div>

      {/* Rider Profile Modal */}
      <RiderProfileModal 
        isOpen={showRiderModal}
        onClose={() => setShowRiderModal(false)}
        rider={selectedRider}
      />
    </div>
  );
};

export default BodaHome;