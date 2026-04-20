// components/marketplace/CategoryCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon?: React.ComponentType<{ className?: string }>; // ✅ fixed type
    count?: number;
    subcategories?: string[];
    image?: string;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const Icon = category.icon;
  return (
    <Link to={`/marketplace/category/${category.id}`} className="group">
      <div className="bg-white rounded-xl border border-sky-100 p-4 text-center hover:shadow-md transition-all hover:border-sky-300">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-100 transition-colors">
          {Icon ? <Icon className="w-6 h-6" /> : category.image ? <img src={category.image} alt={category.name} className="w-8 h-8 rounded-full object-cover" /> : null}
        </div>
        <h3 className="text-sm font-semibold text-charcoal mb-1">{category.name}</h3>
        {category.count !== undefined && (
          <p className="text-xs text-slate-text">{category.count} products</p>
        )}
        {category.subcategories && category.subcategories.length > 0 && (
          <p className="text-xs text-sky-500 mt-1">{category.subcategories.length} subcategories</p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;