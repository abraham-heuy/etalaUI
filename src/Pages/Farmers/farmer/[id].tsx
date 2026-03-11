// pages/farmers/farmer/[id].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star,
  MapPin,
  BadgeCheck,
  Package,
  Calendar,
  Phone,
  Mail,
  Share2,
  Grid2X2,
  List,
  Users,
  Award,
  Shield,
  Heart,
  Sprout,
  Tractor
} from 'lucide-react';
import { topFarmers, farmerProducts } from '../../../data/farmers';
import FarmerProductCard from '../../../components/farmers/FarmerProductCard';
import CategoryNavbar from '../../../common/CategoryNavbar';

const FarmerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high'>('popular');

  // Find farmer from topFarmers
  const farmer = topFarmers.find(f => f.id === id);
  
  // Get farmer's products
  const farmerProductsList = farmerProducts.filter(p => p.farmer.id === id);

  if (!farmer) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Farmer Not Found" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Farmer Not Found
            </h2>
            <Link to="/farmers" className="text-green-600 hover:underline">
              Back to Farmers Market
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Sort products
  const sortedProducts = [...farmerProductsList].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime();
      case 'popular':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Calculate stats
  const totalSales = farmerProductsList.reduce((sum, p) => sum + p.farmer.totalSales, 0);
  const averageRating = farmerProductsList.length > 0 
    ? farmerProductsList.reduce((sum, p) => sum + p.rating, 0) / farmerProductsList.length 
    : 0;
  const categories = [...new Set(farmerProductsList.map(p => p.category))];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Category Navbar */}
      <CategoryNavbar categoryName={farmer.name} />

      {/* Farmer Header/Cover */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img 
          src={farmer.coverImage || farmer.image} 
          alt={farmer.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        {/* Farmer Profile Card */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Farmer Avatar */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white -mt-12 sm:-mt-0">
              <img 
                src={farmer.image} 
                alt={farmer.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Farmer Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
                      {farmer.name}
                    </h1>
                    {farmer.verified && (
                      <BadgeCheck className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-text/70">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{farmer.location}</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      <span>{farmerProductsList.length} products</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{totalSales} sales</span>
                    </div>
                    {farmer.organic && (
                      <>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <div className="flex items-center gap-1 text-green-600">
                          <Sprout className="w-4 h-4" />
                          <span>Certified Organic</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="p-2 border border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 border border-green-200 rounded-lg text-green-600 hover:bg-green-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Farmer Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-charcoal">{averageRating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-slate-text">Avg Rating</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                    <Tractor className="w-4 h-4" />
                    <span className="font-bold text-charcoal">{farmer.yearsFarming}</span>
                  </div>
                  <p className="text-xs text-slate-text">Years Farming</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="font-bold text-charcoal">{categories.length}</span>
                  </div>
                  <p className="text-xs text-slate-text">Categories</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                    <Sprout className="w-4 h-4" />
                    <span className="font-bold text-charcoal">{farmer.organic ? 'Yes' : 'No'}</span>
                  </div>
                  <p className="text-xs text-slate-text">Organic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl border border-green-100 p-6 mb-8">
          <h3 className="text-lg font-display font-semibold text-charcoal mb-3">
            About {farmer.name}
          </h3>
          <p className="text-sm text-slate-text leading-relaxed mb-4">
            {farmer.description}
          </p>
          
          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {farmer.specialties.map((specialty, idx) => (
              <span key={idx} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Products Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-display font-semibold text-charcoal">
              Products from {farmer.name}
            </h2>
            <p className="text-sm text-slate-text mt-1">
              {farmerProductsList.length} items available
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-green-200 rounded-lg text-sm text-slate-text focus:outline-none focus:border-green-400"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Freshest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-green-100 text-green-600' 
                    : 'text-slate-text hover:bg-green-50'
                }`}
              >
                <Grid2X2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-green-100 text-green-600' 
                    : 'text-slate-text hover:bg-green-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {farmerProductsList.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8' 
              : 'space-y-3 mb-8'
          }>
            {sortedProducts.map((product) => (
              <FarmerProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-green-100 mb-8">
            <Package className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
            <h3 className="text-lg font-display font-medium text-charcoal mb-2">
              No Products Yet
            </h3>
            <p className="text-sm text-slate-text">
              This farmer hasn't listed any products yet
            </p>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-white rounded-xl border border-green-100 p-6 mb-8">
          <h3 className="text-lg font-display font-semibold text-charcoal mb-4">
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-text">
                <Phone className="w-5 h-5 text-green-600" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-text">
                <Mail className="w-5 h-5 text-green-600" />
                <span>contact@{farmer.name.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {farmer.verified ? 'Verified Farmer' : 'Unverified'}
              </span>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <Award className="w-3 h-3" />
                {farmer.rating >= 4.5 ? 'Top Rated' : 'Good Standing'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetailPage;