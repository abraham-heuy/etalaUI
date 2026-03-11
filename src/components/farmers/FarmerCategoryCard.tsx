// components/farmers/FarmerCategoryCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { FarmerCategory } from '../../data/farmers';

interface FarmerCategoryCardProps {
  category: FarmerCategory;
}

const FarmerCategoryCard: React.FC<FarmerCategoryCardProps> = ({ category }) => {
  const Icon = category.icon;

  return (
    <Link
      to={`/farmers/category/${category.id}`}
      className="group relative bg-white rounded-xl border border-green-100 overflow-hidden hover:shadow-md transition-all"
    >
      <div className="h-32 overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Icon className="w-4 h-4" />
              <h3 className="text-sm font-display font-semibold">{category.name}</h3>
            </div>
            <p className="text-xs text-white/80">{category.subcategories.length} types</p>
          </div>
          <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default FarmerCategoryCard;