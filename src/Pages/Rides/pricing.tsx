// pages/boda/pricing.tsx
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  Star,
  BadgeCheck,
  Calendar,
  ArrowLeft,
  Package,
  AlertCircle
} from 'lucide-react';
import { riders, movers, popularRoutes } from '../../data/boda';
import CategoryNavbar from '../../common/CategoryNavbar';
import LoginModal from '../../common/loginPrompt';

const PricingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRider, setSelectedRider] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'cart' | 'buy' | 'book' | 'contact'>('book');
  
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const type = searchParams.get('type') || 'boda';
  const schedule = searchParams.get('time') || 'now';

  // Calculate price based on route
  const calculatePrice = () => {
    const route = popularRoutes.find(r => 
      r.from.toLowerCase().includes(from.toLowerCase()) || 
      r.to.toLowerCase().includes(to.toLowerCase())
    );
    
    if (route) {
      if (type === 'boda') return route.basePrice;
      if (type === 'taxi') return route.basePrice * 2.5;
      if (type === 'movers') return 3000; // Minimum for movers
    }
    
    // Default calculation
    if (type === 'boda') return 150;
    if (type === 'taxi') return 350;
    if (type === 'movers') return 3000;
    return 0;
  };

  const price = calculatePrice();

  // Filter available riders/movers
  const availableRiders = type === 'movers' 
    ? movers.filter(m => m.available)
    : riders.filter(r => r.type === type && r.availableNow);

  const handleContinue = () => {
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    
    if (!isLoggedIn) {
      // Set the correct action type based on the ride type
      if (type === 'movers') {
        setActionType('contact');
      } else {
        setActionType('book');
      }
      setShowLoginModal(true);
    } else {
      // Proceed to booking
      if (type === 'movers') {
        navigate('/boda/booking/movers');
      } else {
        navigate('/boda/booking/confirm');
      }
    }
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName={
        type === 'boda' ? 'Boda Rides' : 
        type === 'taxi' ? 'Taxi' : 
        'Moving Services'
      } />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-text hover:text-sky-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Trip Summary */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 mb-8">
          <h2 className="text-xl font-display font-semibold text-charcoal mb-4">
            Your Trip
          </h2>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sky-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-charcoal">From</p>
                <p className="text-sm text-slate-text">{from || 'Tala Town'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-charcoal">To</p>
                <p className="text-sm text-slate-text">{to || 'Kwa Ndege'}</p>
              </div>
            </div>
          </div>

          {/* Price Estimate */}
          <div className="bg-sky-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-text">Estimated price</span>
              <span className="text-2xl font-bold text-sky-600">
                KSh {price.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-slate-text/70">
              Final price may vary based on exact distance and time
            </p>
          </div>

          {schedule === 'later' && (
            <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span className="text-xs text-amber-800">
                Scheduled ride - we'll match you with available riders
              </span>
            </div>
          )}
        </div>

        {/* Available Riders/Movers */}
        <h2 className="text-xl font-display font-semibold text-charcoal mb-4">
          {type === 'movers' ? 'Available Moving Companies' : 'Available Riders'}
        </h2>

        <div className="space-y-3 mb-8">
          {availableRiders.map((item: any) => {
            if (type === 'movers') {
              // Mover card
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border p-4 transition-all cursor-pointer ${
                    selectedRider === item.id
                      ? 'border-sky-500 shadow-md'
                      : 'border-sky-100 hover:border-sky-200'
                  }`}
                  onClick={() => setSelectedRider(item.id)}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.logo}
                      alt={item.companyName}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-charcoal">
                          {item.companyName}
                        </h3>
                        {item.verified && (
                          <BadgeCheck className="w-4 h-4 text-sky-600" />
                        )}
                      </div>
                      <p className="text-xs text-slate-text mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-text/70">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          {item.rating}
                        </span>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          {item.completedJobs} jobs
                        </span>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span className="flex items-center gap-1">
                          <Truck className="w-3 h-3" />
                          {item.fleet.length} vehicles
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm font-semibold text-sky-600">
                          From KSh {item.price.hourly}/hr
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              // Rider card (boda/taxi)
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border p-4 transition-all cursor-pointer ${
                    selectedRider === item.id
                      ? 'border-sky-500 shadow-md'
                      : 'border-sky-100 hover:border-sky-200'
                  }`}
                  onClick={() => setSelectedRider(item.id)}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-charcoal">
                          {item.name}
                        </h3>
                        {item.verified && (
                          <BadgeCheck className="w-4 h-4 text-sky-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-text/70 mb-2">
                        <span>{item.vehicle.model}</span>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span>{item.vehicle.capacity}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-text/70">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          {item.rating}
                        </span>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span className="flex items-center gap-1 text-green-600">
                          {item.online ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm font-semibold text-sky-600">
                          KSh {item.price.base} base + {item.price.perKm}/km
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleContinue}
            disabled={!selectedRider}
            className="flex-1 bg-sky-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {type === 'movers' ? 'Contact Mover' : 'Book Ride'}
          </button>
          <button
            onClick={() => setSelectedRider(null)}
            className="flex-1 bg-white border border-sky-200 text-sky-600 py-3 rounded-xl text-sm font-medium hover:bg-sky-50 transition-colors"
          >
            Choose Later
          </button>
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-amber-50 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
          <p className="text-xs text-amber-800">
            {type === 'movers' 
              ? 'Contact the mover directly to arrange pricing, timing, and services. Payment is handled between you and the mover.'
              : 'After booking, you will see the rider\'s contact information to coordinate pickup.'}
          </p>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        actionType={actionType}
      />
    </div>
  );
};

export default PricingPage;