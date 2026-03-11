// components/food/EventOfferCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Gift,
  Cake,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface EventOfferCardProps {
  offer: {
    title: string;
    description: string;
    discount: number;
    code?: string;
    restaurant: string;
    restaurantId: string;
    type: string;
  };
}

const EventOfferCard: React.FC<EventOfferCardProps> = ({ offer }) => {
  const getIcon = () => {
    switch (offer.type) {
      case 'birthday':
        return <Cake className="w-5 h-5 text-pink-600" />;
      case 'event':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      default:
        return <Gift className="w-5 h-5 text-purple-600" />;
    }
  };

  const getBgColor = () => {
    switch (offer.type) {
      case 'birthday':
        return 'bg-pink-100';
      case 'event':
        return 'bg-blue-100';
      default:
        return 'bg-purple-100';
    }
  };

  return (
    <Link
      to={`/food/restaurant/${offer.restaurantId}`}
      className="group flex items-center justify-between p-3 bg-white rounded-lg border border-orange-100 hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${getBgColor()} rounded-full flex items-center justify-center`}>
          {getIcon()}
        </div>
        <div>
          <h4 className="text-sm font-medium text-charcoal">{offer.title}</h4>
          <p className="text-xs text-slate-text">{offer.restaurant}</p>
          {offer.discount > 0 && (
            <p className="text-xs font-medium text-green-600 mt-1">{offer.discount}% off</p>
          )}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-text group-hover:text-orange-600 transition-colors" />
    </Link>
  );
};

export default EventOfferCard;