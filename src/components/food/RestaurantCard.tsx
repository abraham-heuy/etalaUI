// components/food/RestaurantCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Award,
  Heart,
  Utensils
} from 'lucide-react';
import type { Restaurant } from '../../data/food';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const priceSymbol = '$'.repeat(restaurant.priceLevel);

  return (
    <Link
      to={`/food/restaurant/${restaurant.id}`}
      className="group block bg-white rounded-xl border border-orange-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {restaurant.badges && restaurant.badges.includes('Top Rated') && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded-full">
            <Award className="w-4 h-4" />
          </div>
        )}
        {restaurant.offers && restaurant.offers.length > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Offer
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs">
          {restaurant.cuisine}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-orange-600 transition-colors">
            {restaurant.name}
          </h3>
          <button className="p-1 text-slate-text hover:text-orange-600 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-text/70 mb-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{restaurant.location}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-charcoal">{restaurant.rating}</span>
            <span className="text-xs text-slate-text">({restaurant.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-orange-600">{priceSymbol}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-2">
          <Clock className="w-3 h-3" />
          <span>Open now</span>
          {restaurant.delivery && (
            <>
              <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
              <span>Delivery</span>
            </>
          )}
          {restaurant.catering && (
            <>
              <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
              <span>Catering</span>
            </>
          )}
        </div>

        {/* Popular Dishes Preview */}
        {restaurant.popularDishes && restaurant.popularDishes.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-slate-text/70">
            <Utensils className="w-3 h-3" />
            <span className="truncate">{restaurant.popularDishes.slice(0, 2).join(' • ')}</span>
          </div>
        )}

        {/* Features */}
        {restaurant.features && restaurant.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {restaurant.features.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="text-[10px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">
                {feature}
              </span>
            ))}
            {restaurant.features.length > 2 && (
              <span className="text-[10px] text-slate-text/50">
                +{restaurant.features.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default RestaurantCard;