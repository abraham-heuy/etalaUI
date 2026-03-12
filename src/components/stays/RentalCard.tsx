// components/stays/RentalCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Bed,
  Bath,
  Home,
  Calendar,
  Shield,
  Heart
} from 'lucide-react';
import type { StayProperty } from '../../data/stays';

interface RentalCardProps {
  rental: StayProperty;
}

const RentalCard: React.FC<RentalCardProps> = ({ rental }) => {
  return (
    <Link
      to={`/stays/property/${rental.id}`}
      className="group block bg-white rounded-xl border border-green-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={rental.coverImage} 
          alt={rental.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          {rental.propertyType}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-green-600 transition-colors">
              {rental.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-text/70 mt-1">
              <MapPin className="w-3 h-3" />
              <span>{rental.location}</span>
            </div>
          </div>
          <button className="p-1 text-slate-text hover:text-green-600 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-text/70 mt-2">
          <span className="flex items-center gap-1">
            <Bed className="w-3 h-3" />
            {rental.bedrooms} beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3 h-3" />
            {rental.bathrooms} bath
          </span>
          <span className="flex items-center gap-1">
            <Home className="w-3 h-3" />
            {rental.squareMeters} m²
          </span>
        </div>

        {/* Management badge */}
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Management Included
          </span>
          {rental.furnished && (
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
              Furnished
            </span>
          )}
        </div>

        {/* Price and availability */}
        <div className="mt-3 pt-3 border-t border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-green-600">
                KSh {rental.pricePerMonth?.toLocaleString()}
              </span>
              <span className="text-xs text-slate-text">/month</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-text/70">
              <Calendar className="w-3 h-3" />
              <span>Available {new Date(rental.availableFrom || '').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
            </div>
          </div>
          <p className="text-xs text-slate-text/70 mt-1">
            {rental.minimumLease} month min • Deposit: KSh {rental.deposit?.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RentalCard;