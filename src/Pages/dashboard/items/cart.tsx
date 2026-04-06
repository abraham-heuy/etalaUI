// pages/dashboard/cart.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { type Cart, CommerceService } from '../../../services/commerce/commerce.service';

type CartCategory = 'marketplace' | 'farmers' | 'food' | 'services' | 'stays' | 'boda';

const CartPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CartCategory>('marketplace');
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const categories: { id: CartCategory; label: string }[] = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'farmers', label: 'Farmers Market' },
    { id: 'food', label: 'Food & Dining' },
    { id: 'services', label: 'Services' },
    { id: 'stays', label: 'Stays' },
    { id: 'boda', label: 'Boda Rides' },
  ];

  const fetchCart = async (category: CartCategory) => {
    setIsLoading(true);
    setError(null);
    try {
      const cartData = await CommerceService.getCart(category);
      setCart(cartData);
    } catch (err: any) {
      setError(err.message || 'Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: CartCategory) => {
    setSelectedCategory(category);
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdatingId(itemId);
    try {
      const updatedCart = await CommerceService.updateCartItemQuantity(selectedCategory, itemId, newQuantity);
      setCart(updatedCart);
    } catch (err) {
      console.error('Failed to update quantity', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (itemId: string) => {
    setUpdatingId(itemId);
    try {
      const updatedCart = await CommerceService.removeCartItem(selectedCategory, itemId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Failed to remove item', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await CommerceService.clearCart(selectedCategory);
        setCart(null);
      } catch (err) {
        console.error('Failed to clear cart', err);
      }
    }
  };

  const cartItems = cart?.items || [];
  const totalAmount = cart?.totalAmount || 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">My Cart</h1>
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-sky-100 p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading cart: {error}</p>
        <button onClick={() => fetchCart(selectedCategory)} className="mt-4 text-sky-600 flex items-center gap-1 mx-auto">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="w-16 h-16 text-slate-text/30 mx-auto mb-4" />
        <h3 className="text-lg font-display font-medium text-charcoal mb-2">
          Your {categories.find(c => c.id === selectedCategory)?.label} cart is empty
        </h3>
        <p className="text-sm text-slate-text mb-4">
          Add items from this category to your cart
        </p>
        <Link
          to={`/${selectedCategory}`}
          className="inline-flex items-center gap-2 bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90"
        >
          Browse {categories.find(c => c.id === selectedCategory)?.label}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">My Cart</h1>
          <p className="text-slate-text mt-1">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value as CartCategory)}
            className="px-4 py-2 border border-sky-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-redbull-blue"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          <button
            onClick={handleClearCart}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cart
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.productId} className="bg-white rounded-xl border border-sky-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <img 
                src={item.image || 'https://via.placeholder.com/100x100?text=No+Image'} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Link to={`/${selectedCategory}/product/${item.productId}`}>
                      <h3 className="text-base font-display font-semibold text-charcoal hover:text-redbull-blue transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-text mt-1">Seller: {item.sellerName || item.sellerId}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    disabled={updatingId === item.productId}
                    className="text-slate-text/50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-redbull-blue">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      disabled={updatingId === item.productId}
                      className="w-8 h-8 rounded-full border border-sky-200 flex items-center justify-center hover:bg-sky-50 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      disabled={updatingId === item.productId}
                      className="w-8 h-8 rounded-full border border-sky-200 flex items-center justify-center hover:bg-sky-50 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-sky-100 p-4 sticky bottom-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-medium text-charcoal">Subtotal</span>
          <span className="text-xl font-bold text-redbull-blue">KSh {totalAmount.toLocaleString()}</span>
        </div>
        <Link
          to={`/checkout?category=${selectedCategory}`}
          className="w-full bg-redbull-blue text-white py-3 rounded-xl text-sm font-medium hover:bg-redbull-blue/90 transition-colors flex items-center justify-center gap-2"
        >
          Proceed to Checkout
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default CartPage;