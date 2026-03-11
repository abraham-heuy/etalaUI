// components/boda/RiderProfileModal.tsx
import React from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Bike, 
  Phone, 
  Award,
  Shield,
  Calendar,
  ChevronRight,
  ThumbsUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface RiderProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  rider: any;
}

const RiderProfileModal: React.FC<RiderProfileModalProps> = ({ isOpen, onClose, rider }) => {
  if (!isOpen || !rider) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-redbull-blue to-redbull-blue/80 p-6 text-white sticky top-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={rider.image} 
                alt={rider.name}
                className="w-20 h-20 rounded-full border-4 border-white/30"
              />
              <div>
                <h2 className="text-2xl font-display font-bold">{rider.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                    <Star className="w-3 h-3 text-yellow-300 fill-current" />
                    <span>{rider.rating} • {rider.totalRides} rides</span>
                  </div>
                  {rider.verified && (
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                      <Shield className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Online Status & Location */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${rider.online ? 'bg-green-500 animate-pulse' : 'bg-slate-text/30'}`} />
              <span className="text-sm font-medium">{rider.online ? 'Online Now' : 'Offline'}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-text">
              <MapPin className="w-4 h-4" />
              <span>{rider.location}</span>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-redbull-blue-light rounded-xl p-4">
            <h3 className="text-sm font-medium text-charcoal mb-3">Vehicle Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-text/70">Model</p>
                <p className="text-sm font-medium">{rider.vehicle.model}</p>
              </div>
              <div>
                <p className="text-xs text-slate-text/70">Capacity</p>
                <p className="text-sm font-medium">{rider.vehicle.capacity}</p>
              </div>
              <div>
                <p className="text-xs text-slate-text/70">License Plate</p>
                <p className="text-sm font-medium">{rider.vehicle.licensePlate}</p>
              </div>
              <div>
                <p className="text-xs text-slate-text/70">Vehicle Type</p>
                <p className="text-sm font-medium capitalize">{rider.type}</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border border-cool-gray rounded-xl p-4">
            <h3 className="text-sm font-medium text-charcoal mb-3">Pricing</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-text">Base fare</span>
                <span className="font-medium">KSh {rider.price.base}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-text">Per kilometer</span>
                <span className="font-medium">KSh {rider.price.perKm}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-text">Minimum fare</span>
                <span className="font-medium">KSh {rider.price.minimum}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Award, label: 'Rating', value: rider.rating },
              { icon: Calendar, label: 'Member since', value: '2026' },
              { icon: ThumbsUp, label: 'Completion', value: '98%' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-warm-gray rounded-xl p-3 text-center">
                  <Icon className="w-4 h-4 text-redbull-blue mx-auto mb-1" />
                  <div className="text-xs font-medium text-charcoal">{stat.value}</div>
                  <div className="text-[10px] text-slate-text">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Reviews Preview */}
          <div>
            <h3 className="text-sm font-medium text-charcoal mb-3">Recent Reviews</h3>
            <div className="space-y-3">
              {[
                { user: 'John M.', rating: 5, comment: 'Very safe rider, knew all the shortcuts!', date: '2 days ago' },
                { user: 'Mary K.', rating: 5, comment: 'Friendly and professional. Will ride again.', date: '5 days ago' },
              ].map((review, idx) => (
                <div key={idx} className="border-b border-cool-gray last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-charcoal">{review.user}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-text mb-1">{review.comment}</p>
                  <span className="text-[10px] text-slate-text/60">{review.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              to={`/boda/booking?rider=${rider.id}`}
              className="flex-1 bg-redbull-blue text-white py-3 rounded-xl text-sm font-medium hover:bg-redbull-blue/90 transition-colors flex items-center justify-center gap-2"
              onClick={onClose}
            >
              <Bike className="w-4 h-4" />
              Book This Rider
            </Link>
            <button
              className="flex-1 bg-white border border-cool-gray text-charcoal py-3 rounded-xl text-sm font-medium hover:bg-warm-gray transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Contact
            </button>
          </div>

          {/* View All Reviews Link */}
          <div className="text-center">
            <Link
              to={`/boda/rider/${rider.id}/reviews`}
              className="text-xs text-redbull-blue hover:text-redbull-blue/80 inline-flex items-center gap-1"
              onClick={onClose}
            >
              View all reviews
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderProfileModal;