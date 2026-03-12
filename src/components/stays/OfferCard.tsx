// components/stays/OfferCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
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
    propertyName: string;
    propertyId: string;
    image?: string;
    type: string;
    minNights?: number;
  };
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const getTypeColor = () => {
    switch (offer.type) {
      case 'early-bird': return 'from-blue-400 to-indigo-500';
      case 'last-minute': return 'from-red-400 to-pink-500';
      case 'seasonal': return 'from-green-400 to-emerald-500';
      case 'student': return 'from-purple-400 to-violet-500';
      case 'long-stay': return 'from-amber-400 to-orange-500';
      default: return 'from-blue-400 to-indigo-500';
    }
  };

  return (
    <Link
      to={`/stays/property/${offer.propertyId}`}
      className="group bg-white rounded-xl border border-blue-100 overflow-hidden hover:shadow-md transition-all"
    >
      <div className="relative h-32">
        <img 
          src={offer.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'} 
          alt={offer.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className={`absolute top-2 right-2 bg-gradient-to-r ${getTypeColor()} text-white text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
          <Percent className="w-3 h-3" />
          {offer.discount}% OFF
        </div>
      </div>

      <div className="p-3">
        <h4 className="text-sm font-medium text-charcoal mb-1 line-clamp-1">{offer.title}</h4>
        <p className="text-xs text-slate-text mb-2 line-clamp-2">{offer.description}</p>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-blue-600">{offer.propertyName}</span>
          {offer.minNights && (
            <span className="text-slate-text/70">Min {offer.minNights} nights</span>
          )}
        </div>

        {offer.code && (
          <div className="bg-blue-50 rounded px-2 py-1 mt-2 inline-block">
            <code className="text-xs font-mono text-blue-600">{offer.code}</code>
          </div>
        )}

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-100">
          <div className="flex items-center gap-1 text-[10px] text-slate-text/70">
            <Clock className="w-3 h-3" />
            <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
          </div>
          <ArrowRight className="w-3 h-3 text-blue-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;