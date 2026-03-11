// components/farmers/LivestockCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  BadgeCheck, 
  Heart,
  Eye,
  Tractor,
  PawPrint,
  Bird,
  Cat,
  Dog,
  Rabbit,
  Egg,
  ShoppingBag
} from 'lucide-react';
import type { LivestockItem } from '../../data/livestock';

interface LivestockCardProps {
  item: LivestockItem;
  viewMode?: 'grid' | 'list';
}

const LivestockCard: React.FC<LivestockCardProps> = ({ item, viewMode = 'grid' }) => {
  
  const getCategoryIcon = () => {
    switch(item.category) {
      case 'cattle': return Tractor;
      case 'goats': return PawPrint;
      case 'sheep': return PawPrint;
      case 'pigs': return PawPrint;
      case 'poultry': return Bird;
      case 'pets': 
        if (item.breed.toLowerCase().includes('dog')) return Dog;
        if (item.breed.toLowerCase().includes('cat')) return Cat;
        if (item.breed.toLowerCase().includes('rabbit')) return Rabbit;
        return Cat;
      default: return Egg;
    }
  };

  const Icon = getCategoryIcon();

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-amber-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 h-48">
            <img 
              src={item.images[0]} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Link to={`/farmers/livestock/${item.id}`}>
                  <h3 className="text-base font-display font-semibold text-charcoal hover:text-amber-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-charcoal">{item.rating}</span>
                    <span className="text-xs text-slate-text">({item.reviews})</span>
                  </div>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <span className="text-xs text-amber-600">{item.breed}</span>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <span className="text-xs capitalize">{item.age}</span>
                </div>
              </div>
              <button className="p-1.5 text-slate-text hover:text-amber-600 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-text mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-text/70 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{item.farmer.location}</span>
              </div>
              {item.farmer.verified && (
                <>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <BadgeCheck className="w-3 h-3 text-amber-600" />
                  <span>Verified</span>
                </>
              )}
              <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
              <span className="capitalize">Purpose: {item.purpose}</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-amber-600">
                  KSh {item.price.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/farmers/livestock/inquire/${item.id}`}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Inquire
                </Link>
                <Link
                  to={`/farmers/livestock/${item.id}`}
                  className="p-2 border border-amber-200 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="group bg-white rounded-xl border border-amber-100 overflow-hidden hover:shadow-lg transition-all relative">
      {/* Image */}
      <Link to={`/farmers/livestock/${item.id}`} className="block relative h-48 overflow-hidden">
        <img 
          src={item.images[0]} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.featured && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Eye className="w-3 h-3" />
            Featured
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
          {item.quantity} available
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Farmer & Location */}
        <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{item.farmer.location}</span>
          {item.farmer.verified && (
            <BadgeCheck className="w-3 h-3 text-amber-600" />
          )}
        </div>

        {/* Title & Category Icon */}
        <div className="flex items-start justify-between mb-1">
          <Link to={`/farmers/livestock/${item.id}`}>
            <h3 className="text-sm font-display font-semibold text-charcoal hover:text-amber-600 transition-colors line-clamp-2">
              {item.name}
            </h3>
          </Link>
          <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
            <Icon className="w-3 h-3 text-amber-600" />
          </div>
        </div>

        {/* Details */}
        <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-2">
          <span className="capitalize">{item.breed}</span>
          <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
          <span>{item.age}</span>
          <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
          <span className="capitalize">{item.gender}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-charcoal">{item.rating}</span>
          <span className="text-xs text-slate-text">({item.reviews})</span>
        </div>

        {/* Purpose Badge */}
        <div className="mb-3">
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full capitalize">
            {item.purpose}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-600">
            KSh {item.price.toLocaleString()}
          </span>
          <Link
            to={`/farmers/livestock/inquire/${item.id}`}
            className="px-3 py-1.5 bg-amber-500 text-white rounded-full text-xs font-medium hover:bg-amber-600 transition-colors flex items-center gap-1"
          >
            <ShoppingBag className="w-3 h-3" />
            Inquire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LivestockCard;