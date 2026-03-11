// components/farmers/SeasonalCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface SeasonalCardProps {
  item: {
    id: string;
    name: string;
    season: string;
    image: string;
  };
}

const SeasonalCard: React.FC<SeasonalCardProps> = ({ item }) => {
  return (
    <Link
      to={`/farmers/search?seasonal=${item.id}`}
      className="group relative rounded-xl overflow-hidden"
    >
      <div className="aspect-square">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <h3 className="text-sm font-display font-semibold mb-1">{item.name}</h3>
        <div className="flex items-center gap-1 text-xs text-white/80">
          <Calendar className="w-3 h-3" />
          <span>{item.season}</span>
        </div>
      </div>
    </Link>
  );
};

export default SeasonalCard;