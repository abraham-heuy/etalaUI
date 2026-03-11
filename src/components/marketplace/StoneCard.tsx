// components/marketplace/StoreCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BadgeCheck, Package } from 'lucide-react';

interface StoreCardProps {
  store: {
    id: string;
    name: string;
    image: string;
    rating: number;
    products: number;
    verified: boolean;
  };
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <Link
      to={`/marketplace/store/${store.id}`}
      className="bg-white rounded-xl border border-sky-100 overflow-hidden hover:shadow-md transition-all group"
    >
      <div className="flex items-center gap-4 p-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sky-200">
          <img 
            src={store.image} 
            alt={store.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <h3 className="text-base font-display font-semibold text-charcoal group-hover:text-sky-600 transition-colors">
              {store.name}
            </h3>
            {store.verified && (
              <BadgeCheck className="w-4 h-4 text-sky-600" />
            )}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-slate-text/70">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>{store.rating}</span>
            </div>
            <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
            <div className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              <span>{store.products} items</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;