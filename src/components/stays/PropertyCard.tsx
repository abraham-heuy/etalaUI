// components/stays/PropertyCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Users, 
  Bed,
  Bath,
  Heart,
  Award,
  Home,
  Hotel,
  Tent,
  Key
} from 'lucide-react';
import type { StayProperty } from '../../data/stays';

interface PropertyCardProps {
  property: StayProperty;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const getTypeIcon = () => {
    switch (property.type) {
      case 'hotel': return <Hotel className="w-4 h-4" />;
      case 'airbnb': return <Home className="w-4 h-4" />;
      case 'guesthouse': return <Home className="w-4 h-4" />;
      case 'campsite': return <Tent className="w-4 h-4" />;
      case 'rental': return <Key className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  return (
    <Link
      to={`/stays/property/${property.id}`}
      className="group block bg-white rounded-xl border border-blue-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.coverImage} 
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {property.badges?.includes('Top Rated') && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded-full">
            <Award className="w-4 h-4" />
          </div>
        )}
        {property.pricePerNight && (
          <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
            KSh {property.pricePerNight}/night
          </div>
        )}
        {property.pricePerMonth && (
          <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
            KSh {property.pricePerMonth}/month
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-1">
            <div className="text-blue-600">
              {getTypeIcon()}
            </div>
            <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-blue-600 transition-colors">
              {property.name}
            </h3>
          </div>
          <button className="p-1 text-slate-text hover:text-blue-600 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-charcoal">{property.rating}</span>
          <span className="text-xs text-slate-text">({property.reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-text/70 mb-2">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {property.maxGuests} guests
          </span>
          <span className="flex items-center gap-1">
            <Bed className="w-3 h-3" />
            {property.bedrooms} beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3 h-3" />
            {property.bathrooms} bath
          </span>
        </div>

        {/* Amenities preview */}
        {property.amenities && (
          <div className="flex flex-wrap gap-1 mt-2">
            {property.amenities.slice(0, 2).map((amenity, idx) => (
              <span key={idx} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 2 && (
              <span className="text-[10px] text-slate-text/50">
                +{property.amenities.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Rental badge */}
        {property.isRental && property.tenantManagement && (
          <div className="mt-2">
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              ✓ Management Included
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PropertyCard;