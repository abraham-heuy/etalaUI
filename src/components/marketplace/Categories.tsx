// pages/marketplace/categories.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Loader2, Package } from 'lucide-react';
import CategoryNavbar from '../../common/CategoryNavbar';
import { MarketplaceService } from '../../services/Marketplace/marketplace.service';

// Static category configuration (same as homepage, but we'll enrich with data)
const categoryList = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'household', name: 'Household' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'sports', name: 'Sports' },
  { id: 'kids', name: 'kids' },
];

interface CategoryDetail {
  id: string;
  name: string;
  productCount: number;
  subcategories: string[];
  loading: boolean;
  expanded: boolean;
}

const CategoriesPage: React.FC = () => {
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
      // Fetch details for each category in parallel
      const categoryDetails = await Promise.all(
        categoryList.map(async (cat) => {
          try {
            const products = await MarketplaceService.getCategory(cat.id);
            const productArray = Array.isArray(products) ? products : [];
            const subcategories = [...new Set(productArray.map(p => p.subcategory).filter(Boolean))] as string[];
            return {
              id: cat.id,
              name: cat.name,
              productCount: productArray.length,
              subcategories,
              loading: false,
              expanded: false,
            };
          } catch (err) {
            console.error(`Failed to load category ${cat.id}:`, err);
            return {
              id: cat.id,
              name: cat.name,
              productCount: 0,
              subcategories: [],
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
        <CategoryNavbar categoryName="Categories" />
        <div className="max-w-7xl mx-auto px-4 py-8 pt-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Categories" />
        <div className="max-w-7xl mx-auto px-4 py-8 pt-20 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchAllCategories} className="text-sky-600">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="All Categories" />

      <div className="max-w-3xl mx-auto px-4 py-6 pt-20">
        <h1 className="text-2xl font-display font-bold text-charcoal mb-6">Shop by Category</h1>

        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl border border-sky-100 overflow-hidden shadow-sm"
            >
              {/* Category header (always visible) */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-sky-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-charcoal">{category.name}</h2>
                    <span className="text-xs text-slate-text bg-sky-50 px-2 py-1 rounded-full">
                      {category.productCount} products
                    </span>
                  </div>
                  {category.subcategories.length > 0 && (
                    <p className="text-xs text-slate-text mt-1">
                      {category.subcategories.length} subcategories
                    </p>
                  )}
                </div>
                <div className="ml-4 text-sky-500">
                  {category.expanded ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Expandable subcategories */}
              {category.expanded && (
                <div className="border-t border-sky-100 bg-sky-50/30 p-3">
                  {category.subcategories.length === 0 ? (
                    <p className="text-sm text-slate-text text-center py-4">
                      No subcategories available
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          to={`/marketplace/category/${category.id}?subcategory=${encodeURIComponent(sub)}`}
                          className="flex items-center gap-2 p-2 rounded-lg text-sm text-slate-text hover:bg-white hover:text-sky-600 transition-colors"
                        >
                          <ChevronRight className="w-3 h-3" />
                          <span className="capitalize">{sub}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 pt-2 text-center">
                    <Link
                      to={`/marketplace/category/${category.id}`}
                      className="inline-flex items-center gap-1 text-xs text-sky-500 hover:text-sky-700"
                    >
                      View all {category.productCount} products
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional note for more categories */}
        <div className="mt-8 text-center text-sm text-slate-text">
          <Package className="w-8 h-8 mx-auto text-slate-300 mb-2" />
          <p>Can't find what you're looking for?</p>
          <Link to="/marketplace" className="text-sky-600 hover:underline">Browse all products</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;