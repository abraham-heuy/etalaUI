// components/farmers/FarmerProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  BadgeCheck, 
  Heart,
  ShoppingCart,
  Calendar,
  Sprout
} from 'lucide-react';
import type { FarmerProduct } from '../../data/farmers';

interface FarmerProductCardProps {
  product: FarmerProduct;
  viewMode?: 'grid' | 'list';
}

const FarmerProductCard: React.FC<FarmerProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-green-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="sm:w-48 h-48">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Link to={`/farmers/product/${product.id}`}>
                  <h3 className="text-base font-display font-semibold text-charcoal hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-charcoal">{product.rating}</span>
                    <span className="text-xs text-slate-text">({product.reviews})</span>
                  </div>
                  {product.farmer.organic && (
                    <>
                      <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                      <Sprout className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600">Organic</span>
                    </>
                  )}
                </div>
              </div>
              <button className="p-1.5 text-slate-text hover:text-green-600 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-text mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-text/70 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{product.farmer.location}</span>
              </div>
              {product.farmer.verified && (
                <>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <BadgeCheck className="w-3 h-3 text-green-600" />
                  <span>Verified</span>
                </>
              )}
              <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Harvested {new Date(product.harvestDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-green-600">
                    KSh {product.price} <span className="text-sm font-normal text-slate-text">/{product.unit}</span>
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-slate-text line-through">
                        KSh {product.originalPrice}
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                </button>
                <Link
                  to={`/farmers/product/${product.id}`}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  View
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
    <div className="group bg-white rounded-xl border border-green-100 overflow-hidden hover:shadow-lg transition-all relative">
      {/* Image */}
      <Link to={`/farmers/product/${product.id}`} className="block relative h-48 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.farmer.organic && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Sprout className="w-3 h-3" />
            Organic
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Farmer Info */}
        <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{product.farmer.location}</span>
          {product.farmer.verified && (
            <BadgeCheck className="w-3 h-3 text-green-600" />
          )}
        </div>

        {/* Title */}
        <Link to={`/farmers/product/${product.id}`}>
          <h3 className="text-sm font-display font-semibold text-charcoal mb-1 hover:text-green-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-charcoal">{product.rating}</span>
          <span className="text-xs text-slate-text">({product.reviews})</span>
        </div>

        {/* Harvest date */}
        <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-2">
          <Calendar className="w-3 h-3" />
          <span>Harvested {new Date(product.harvestDate).toLocaleDateString()}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">
            KSh {product.price}
          </span>
          <span className="text-xs text-slate-text">/{product.unit}</span>
          {product.originalPrice && (
            <span className="text-xs text-slate-text line-through">
              KSh {product.originalPrice}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          <button className="p-2 border border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerProductCard;