// components/farmers/TopFarmerCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  BadgeCheck, 
  Package,
  Sprout,
} from 'lucide-react';

interface TopFarmerCardProps {
  farmer: {
    id: string;
    name: string;
    location: string;
    rating: number;
    products: number;
    verified: boolean;
    organic: boolean;
    image?: string;
    specialties?: string[];
  };
}

// Helper to get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const TopFarmerCard: React.FC<TopFarmerCardProps> = ({ farmer }) => {
  const specialties = farmer.specialties || [];
  const hasImage = farmer.image && farmer.image !== 'https://images.unsplash.com/...' && !farmer.image.includes('unsplash');
  
  return (
    <Link
      to={`/farmers/farmer/${farmer.id}`}
      className="bg-white rounded-xl border border-green-100 overflow-hidden hover:shadow-md transition-all group"
    >
      <div className="flex items-center gap-4 p-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-200 bg-green-100 flex items-center justify-center flex-shrink-0">
          {hasImage ? (
            <img 
              src={farmer.image} 
              alt={farmer.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-green-700">
              {getInitials(farmer.name)}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-green-600 transition-colors">
              {farmer.name}
            </h3>
            {farmer.verified && (
              <BadgeCheck className="w-4 h-4 text-green-600" />
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-1">
            <MapPin className="w-3 h-3" />
            <span>{farmer.location}</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>{farmer.rating.toFixed(1)}</span>
            </div>
            <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
            <div className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              <span>{farmer.products} items</span>
            </div>
            {farmer.organic && (
              <>
                <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                <div className="flex items-center gap-1 text-green-600">
                  <Sprout className="w-3 h-3" />
                  <span>Organic</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Specialties */}
      {specialties.length > 0 && (
        <div className="px-4 pb-4 pt-0 flex flex-wrap gap-1">
          {specialties.slice(0, 2).map((specialty, idx) => (
            <span key={idx} className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full capitalize">
              {specialty}
            </span>
          ))}
          {specialties.length > 2 && (
            <span className="text-[10px] text-slate-text/50">
              +{specialties.length - 2}
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export default TopFarmerCard;