// pages/dashboard/wishlist.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  Star,
  MapPin
} from 'lucide-react';

const WishlistPage: React.FC = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'iPhone 13 Pro Max',
      price: 145000,
      seller: 'Tala Electronics',
      location: 'Tala Town',
      rating: 4.8,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1632661674596-df8be6a1c9e1?w=150&h=150&fit=crop',
    },
    {
      id: 2,
      name: 'Men\'s Leather Jacket',
      price: 6500,
      seller: 'Fashion House',
      location: 'Kwa Ndege',
      rating: 4.5,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop',
    },
    {
      id: 3,
      name: 'Fresh Farm Eggs (Tray)',
      price: 450,
      seller: 'Mama Lucy\'s Farm',
      location: 'Kyumbi',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=150&h=150&fit=crop',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
            My Wishlist
          </h1>
          <p className="text-slate-text mt-1">
            {wishlistItems.length} saved items
          </p>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-sky-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-40">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-red-50">
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              </button>
            </div>
            
            <div className="p-4">
              <Link to={`/marketplace/product/${item.id}`}>
                <h3 className="text-base font-display font-semibold text-charcoal hover:text-redbull-blue transition-colors mb-1">
                  {item.name}
                </h3>
              </Link>
              
              <div className="flex items-center gap-2 text-xs text-slate-text/70 mb-2">
                <MapPin className="w-3 h-3" />
                <span>{item.location}</span>
              </div>

              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-charcoal">{item.rating}</span>
                <span className="text-xs text-slate-text">({item.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-redbull-blue">
                  KSh {item.price.toLocaleString()}
                </span>
                <button className="bg-redbull-blue text-white p-2 rounded-lg hover:bg-redbull-blue/90 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
          <h3 className="text-lg font-display font-medium text-charcoal mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-sm text-slate-text mb-4">
            Save items you love to your wishlist
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90"
          >
            Browse Marketplace
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;