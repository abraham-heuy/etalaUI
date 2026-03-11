// components/food/OfferCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Tag, 
  Clock, 
  Percent,
  ArrowRight
} from 'lucide-react';

interface OfferCardProps {
  offer: {
    title: string;
    description: string;
    discount: number;
    code?: string;
    validUntil: string;
    restaurant: string;
    restaurantId: string;
    type: string;
  };
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <Link
      to={`/food/restaurant/${offer.restaurantId}`}
      className="group bg-white rounded-xl border border-orange-100 overflow-hidden hover:shadow-md transition-all"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Percent className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-base font-display font-semibold text-charcoal">
                {offer.discount > 0 ? `${offer.discount}% OFF` : 'Special Offer'}
              </h3>
              <p className="text-xs text-orange-600">{offer.restaurant}</p>
            </div>
          </div>
          <Tag className="w-4 h-4 text-red-600" />
        </div>

        <h4 className="text-sm font-medium text-charcoal mb-1">{offer.title}</h4>
        <p className="text-xs text-slate-text mb-3">{offer.description}</p>

        {offer.code && (
          <div className="bg-orange-50 rounded-lg p-2 mb-2">
            <code className="text-sm font-mono text-orange-600">{offer.code}</code>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-slate-text/70">
            <Clock className="w-3 h-3" />
            <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;