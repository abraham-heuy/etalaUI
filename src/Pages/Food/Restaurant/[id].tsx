// pages/food/restaurant/[id].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Share2,
  Heart,
  Users,
  Calendar,
  DollarSign,
  Award,
  ThumbsUp,
  Gift,
  Cake,
  ShoppingCart,
  Plus,
  X
} from 'lucide-react';
import { restaurants } from '../../../data/food';
import CategoryNavbar from '../../../common/CategoryNavbar';
import LoginModal from '../../../common/loginPrompt';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'menu' | 'events' | 'reviews'>('menu');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionType, setActionType] = useState<'cart' | 'buy' | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedEventSpace, setSelectedEventSpace] = useState<string>('');
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartSummary, setShowCartSummary] = useState(false);

  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Restaurant Not Found" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Restaurant Not Found
            </h2>
            <Link to="/food" className="text-orange-600 hover:underline">
              Back to Food
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Cart functions
  const addToCart = (item: any) => {
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    if (!isLoggedIn) {
      setActionType('cart');
      setShowLoginModal(true);
      return;
    }

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        quantity: 1 
      }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === itemId) {
        const newQuantity = i.quantity + delta;
        return newQuantity > 0 ? { ...i, quantity: newQuantity } : i;
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleTableBooking = () => {
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    if (!isLoggedIn) {
      setActionType('buy');
      setShowLoginModal(true);
    } else {
      console.log('Booking table:', { 
        restaurant: restaurant.id, 
        date: bookingDate, 
        time: bookingTime, 
        guests: guestCount 
      });
    }
  };

  const handleEventBooking = () => {
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    if (!isLoggedIn) {
      setActionType('buy');
      setShowLoginModal(true);
    } else {
      console.log('Booking event space:', { 
        restaurant: restaurant.id, 
        space: selectedEventSpace, 
        date: bookingDate, 
        guests: guestCount 
      });
    }
  };

  const priceSymbol = '$'.repeat(restaurant.priceLevel);

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName={restaurant.name} />

      {/* Cart Icon in Navbar (appears when logged in) */}
      {localStorage.getItem('user') && cartItemCount > 0 && (
        <div className="fixed top-20 right-4 z-40">
          <button
            onClick={() => setShowCartSummary(!showCartSummary)}
            className="bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          </button>
        </div>
      )}

      {/* Cart Summary Popup */}
      {showCartSummary && (
        <div className="fixed top-28 right-4 z-40 w-80 bg-white rounded-xl shadow-xl border border-orange-100 p-4 animate-slide-down">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-charcoal">Your Order</h3>
            <button onClick={() => setShowCartSummary(false)}>
              <X className="w-4 h-4 text-slate-text" />
            </button>
          </div>
          
          {cart.length === 0 ? (
            <p className="text-sm text-slate-text text-center py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-2 max-h-60 overflow-y-auto mb-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex-1">
                      <span className="text-charcoal">{item.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-xs bg-orange-100 w-5 h-5 rounded-full flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-xs bg-orange-100 w-5 h-5 rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <span className="font-medium">KSh {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-orange-100 pt-2 mb-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-orange-600">KSh {cartTotal}</span>
                </div>
              </div>
              
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700">
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      )}

      {/* Cover Image */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <img 
          src={restaurant.coverImage || restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-orange-100 p-6 shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Logo/Avatar */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg -mt-12 sm:-mt-0">
              <img 
                src={restaurant.logo || restaurant.image} 
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
                      {restaurant.name}
                    </h1>
                    {restaurant.badges?.includes('Top Rated') && (
                      <Award className="w-6 h-6 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <p className="text-orange-600 font-medium mb-2">{restaurant.cuisine}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-text/70">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.location}</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{priceSymbol}</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {restaurant.eventCapacity || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="p-2 border border-orange-200 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 border border-orange-200 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Rating & Stats */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-lg font-bold text-charcoal">{restaurant.rating}</span>
                  <span className="text-sm text-slate-text">({restaurant.reviews} reviews)</span>
                </div>
                {restaurant.delivery && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    Delivery Available
                  </span>
                )}
                {restaurant.catering && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    Catering
                  </span>
                )}
              </div>

              {/* Badges */}
              {restaurant.badges && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {restaurant.badges.map((badge, idx) => (
                    <span key={idx} className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tabs Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl border border-orange-100 p-1 flex overflow-x-auto">
              {[
                { id: 'menu', label: 'Menu' },
                { id: 'events', label: 'Event Spaces' },
                { id: 'reviews', label: `Reviews (${restaurant.reviewsList?.length || 0})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-text hover:bg-orange-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Menu Tab */}
            {activeTab === 'menu' && (
              <div className="bg-white rounded-xl border border-orange-100 p-6 space-y-6">
                {restaurant.menu.map((category) => (
                  <div key={category.id}>
                    <h3 className="text-lg font-display font-semibold text-charcoal mb-3">
                      {category.name}
                    </h3>
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start p-3 bg-orange-50/30 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-charcoal">{item.name}</h4>
                              {item.popular && (
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                              {item.spicy && <span className="text-red-500">🌶️</span>}
                              {item.vegetarian && <span className="text-green-600">🥬</span>}
                            </div>
                            <p className="text-sm text-slate-text">{item.description}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-orange-600 block mb-2">
                              KSh {item.price}
                            </span>
                            {/* Add to Cart Button */}
                            {localStorage.getItem('user') ? (
                              <button
                                onClick={() => addToCart(item)}
                                className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-orange-700 transition-colors flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                Add
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setActionType('cart');
                                  setShowLoginModal(true);
                                }}
                                className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-xs hover:bg-orange-200 transition-colors"
                              >
                                Login to Order
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="bg-white rounded-xl border border-orange-100 p-6">
                {restaurant.eventSpaces && restaurant.eventSpaces.length > 0 ? (
                  <div className="space-y-4">
                    {restaurant.eventSpaces.map((space) => (
                      <div
                        key={space.id}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${
                          selectedEventSpace === space.id
                            ? 'border-orange-600 bg-orange-50'
                            : 'border-orange-100 hover:border-orange-300'
                        }`}
                        onClick={() => setSelectedEventSpace(space.id)}
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          <img
                            src={space.image}
                            alt={space.name}
                            className="w-full sm:w-32 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-display font-semibold text-charcoal mb-1">
                              {space.name}
                            </h4>
                            <p className="text-sm text-slate-text mb-2">{space.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                Capacity: {space.capacity}
                              </span>
                              {space.price && (
                                <span className="text-orange-600 font-medium">
                                  KSh {space.price.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-text py-8">No event spaces available</p>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-xl border border-orange-100 p-6">
                {restaurant.reviewsList && restaurant.reviewsList.length > 0 ? (
                  <div className="space-y-4">
                    {restaurant.reviewsList.map((review) => (
                      <div key={review.id} className="border-b border-orange-100 last:border-0 pb-4 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-orange-600">
                                {review.user.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-charcoal">{review.user}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < review.rating
                                          ? 'text-yellow-500 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-slate-text">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <button className="text-xs text-slate-text hover:text-orange-600 flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {review.helpful}
                          </button>
                        </div>
                        <p className="text-sm text-slate-text">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-text py-8">No reviews yet</p>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Booking Cards */}
          <div className="space-y-4">
            {/* Table Booking Card */}
            <div className="bg-white rounded-xl border border-orange-100 p-6">
              <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Book a Table</h3>
              
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-xs font-medium text-slate-text mb-1 block">Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-text mb-1 block">Time</label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-text mb-1 block">Guests</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleTableBooking}
                disabled={!bookingDate || !bookingTime}
                className="w-full bg-orange-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Table
              </button>
            </div>

            {/* Event Booking Card (if event spaces exist) */}
            {restaurant.eventSpaces && restaurant.eventSpaces.length > 0 && (
              <div className="bg-white rounded-xl border border-orange-100 p-6">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Book Event Space</h3>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-xs font-medium text-slate-text mb-1 block">Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-text mb-1 block">Guests</label>
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      min={1}
                      max={restaurant.eventCapacity}
                      className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:outline-none focus:border-orange-400"
                    />
                  </div>
                </div>

                <button
                  onClick={handleEventBooking}
                  disabled={!bookingDate || !selectedEventSpace}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Inquire About Event
                </button>
              </div>
            )}

            {/* Contact Card */}
            <div className="bg-white rounded-xl border border-orange-100 p-6">
              <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Contact</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${restaurant.phone}`}
                  className="flex items-center gap-3 text-sm text-slate-text hover:text-orange-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-orange-600" />
                  {restaurant.phone}
                </a>
                <a
                  href={`mailto:${restaurant.email}`}
                  className="flex items-center gap-3 text-sm text-slate-text hover:text-orange-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-orange-600" />
                  {restaurant.email}
                </a>
                {restaurant.website && (
                  <a
                    href={`https://${restaurant.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-text hover:text-orange-600 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-orange-600" />
                    {restaurant.website}
                  </a>
                )}
              </div>
            </div>

            {/* Location & Hours */}
            <div className="bg-white rounded-xl border border-orange-100 p-6">
              <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Location & Hours</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-text">{restaurant.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    {Object.entries(restaurant.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-xs mb-1">
                        <span className="capitalize text-slate-text">{day}:</span>
                        <span className="text-charcoal font-medium">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            {restaurant.features && (
              <div className="bg-white rounded-xl border border-orange-100 p-6">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.features.map((feature, idx) => (
                    <span key={idx} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Offers */}
            {restaurant.offers && restaurant.offers.length > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-red-600" />
                  Special Offers
                </h3>
                <div className="space-y-3">
                  {restaurant.offers.map((offer, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        {offer.type === 'birthday' && <Cake className="w-4 h-4 text-pink-600" />}
                        {offer.type === 'event' && <Calendar className="w-4 h-4 text-blue-600" />}
                        {offer.type === 'happy-hour' && <Clock className="w-4 h-4 text-green-600" />}
                        <h4 className="text-sm font-medium text-charcoal">{offer.title}</h4>
                      </div>
                      <p className="text-xs text-slate-text mb-2">{offer.description}</p>
                      {offer.code && (
                        <div className="bg-orange-50 rounded px-2 py-1 inline-block">
                          <code className="text-xs font-mono text-orange-600">{offer.code}</code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        actionType={actionType}
      />
    </div>
  );
};

export default RestaurantDetailPage;