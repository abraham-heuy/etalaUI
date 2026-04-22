// pages/farmers/categories.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Loader2, Package, Sprout, Leaf, Egg, Tractor, Sparkles } from 'lucide-react';
import CategoryNavbar from '../../common/CategoryNavbar';
import { farmersService } from '../../services/farmers/farmer.service';

// List of farmer categories (subcategories) - these match the backend subcategory values
const farmerCategories = [
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'dairy', name: 'Dairy & Eggs' },
  { id: 'meat', name: 'Meat' },
  { id: 'grains', name: 'Grains & Cereals' },
  { id: 'honey', name: 'Honey' },
  { id: 'herbs', name: 'Herbs & Spices' },
  { id: 'other', name: 'Other Produce' },
];

interface CategoryDetail {
  id: string;
  name: string;
  productCount: number;
  loading: boolean;
  expanded: boolean;
}

// Helper to get icon for category
const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'vegetables': return <Sprout className="w-5 h-5 text-green-600" />;
    case 'fruits': return <Leaf className="w-5 h-5 text-green-600" />;
    case 'dairy': return <Egg className="w-5 h-5 text-green-600" />;
    case 'meat': return <Tractor className="w-5 h-5 text-green-600" />;
    case 'grains': return <Package className="w-5 h-5 text-green-600" />;
    case 'honey': return <Sparkles className="w-5 h-5 text-green-600" />;
    default: return <Sprout className="w-5 h-5 text-green-600" />;
  }
};

const FarmersCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch product counts for each category using search with subcategory filter
      const categoryDetails = await Promise.all(
        farmerCategories.map(async (cat) => {
          try {
            // Search for products in this subcategory (empty query, subcategory filter)
            const result = await farmersService.search('', 1, 1, cat.id);
            const productCount = result.total || 0;
            return {
              id: cat.id,
              name: cat.name,
              productCount,
              loading: false,
              expanded: false,
            };
          } catch (err) {
            console.error(`Failed to load category ${cat.id}:`, err);
            return {
              id: cat.id,
              name: cat.name,
              productCount: 0,
              loading: false,
              expanded: false,
            };
          }
        })
      );
      setCategories(categoryDetails);
    } catch (err: any) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (id: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, expanded: !cat.expanded } : cat
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Farmers Categories" />
        <div className="max-w-7xl mx-auto px-4 py-8 pt-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Farmers Categories" />
        <div className="max-w-7xl mx-auto px-4 py-8 pt-20 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchAllCategories} className="text-green-600">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="Farmers Categories" />

      <div className="max-w-3xl mx-auto px-4 py-6 pt-20">
        <h1 className="text-2xl font-display font-bold text-charcoal mb-6">Shop by Category</h1>
        <p className="text-sm text-slate-text mb-6">Fresh from local farms – browse by produce type</p>

        <div className="space-y-3">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <div
                key={category.id}
                className="bg-white rounded-xl border border-green-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      {Icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-charcoal">{category.name}</h2>
                        <span className="text-xs text-slate-text bg-green-50 px-2 py-1 rounded-full">
                          {category.productCount} products
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-green-500">
                    {category.expanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Expandable section – for farmers, we can show a note or link to browse products */}
                {category.expanded && (
                  <div className="border-t border-green-100 bg-green-50/30 p-4">
                    <p className="text-sm text-slate-text mb-3">
                      Browse fresh {category.name.toLowerCase()} from local farmers.
                    </p>
                    <div className="flex justify-center">
                      <Link
                        to={`/farmers/category/${category.id}`}
                        className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
                      >
                        View all {category.productCount} products
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional note */}
        <div className="mt-8 text-center text-sm text-slate-text">
          <Sprout className="w-8 h-8 mx-auto text-green-300 mb-2" />
          <p>Support local farmers – get fresh produce delivered to your doorstep.</p>
          <Link to="/farmers" className="text-green-600 hover:underline mt-2 inline-block">Browse all products</Link>
        </div>
      </div>
    </div>
  );
};

export default FarmersCategoriesPage;