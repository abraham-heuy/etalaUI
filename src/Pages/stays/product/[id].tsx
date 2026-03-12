// pages/stays/property/[id].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Share2,
  Heart,
  Users,
  Award,
  Gift,
  Bed,
  Bath,
  Home,
  Shield,
  Check,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { stayProperties } from '../../../data/stays';
import CategoryNavbar from '../../../common/CategoryNavbar';
import LoginModal from '../../../common/loginPrompt';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
//   const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'reviews'>('overview');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionType, setActionType] = useState<'cart' | 'buy' | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
//   const [showBookingForm, setShowBookingForm] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');

  const property = stayProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Property Not Found" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Property Not Found
            </h2>
            <Link to="/stays" className="text-blue-600 hover:underline">
              Back to Stays
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();
  const totalPrice = property.pricePerNight ? nights * property.pricePerNight : 0;

  const handleBooking = () => {
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    if (!isLoggedIn) {
      setActionType('buy');
      setShowLoginModal(true);
      return;
    }

    if (property.isRental) {
      // For rentals, send inquiry
      console.log('Rental inquiry:', {
        property: property.id,
        message: inquiryMessage,
        guests
      });
      alert('Inquiry sent! The property manager will contact you soon.');
    } else {
      // For short-term stays, process booking
      console.log('Booking:', {
        property: property.id,
        checkIn,
        checkOut,
        guests,
        nights,
        total: totalPrice
      });
      alert('Booking confirmed! Check your email for details.');
    }
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName={property.name} />

      {/* Image Gallery */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <img 
          src={property.images[selectedImage]} 
          alt={property.name}
          className="w-full h-full object-cover"
        />
        
        {/* Image navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage(prev => (prev > 0 ? prev - 1 : property.images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedImage(prev => (prev < property.images.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {property.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === selectedImage ? 'w-6 bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Property Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">
                {property.name}
              </h1>
              {property.badges?.includes('Top Rated') && (
                <Award className="w-6 h-6 text-yellow-500 fill-current" />
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-text/70">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{property.location}</span>
              </div>
              <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>{property.rating} · {property.reviews} reviews</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-2 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-xl border border-blue-100 p-6">
              <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
                Quick Info
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-sm font-medium text-charcoal">{property.maxGuests} Guests</div>
                </div>
                <div className="text-center">
                  <Bed className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-sm font-medium text-charcoal">{property.bedrooms} Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-sm font-medium text-charcoal">{property.bathrooms} Bathrooms</div>
                </div>
                <div className="text-center">
                  <Home className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-sm font-medium text-charcoal">{property.propertyType || 'Property'}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-blue-100 p-6">
              <h2 className="text-lg font-display font-semibold text-charcoal mb-2">
                About this place
              </h2>
              <p className="text-slate-text leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl border border-blue-100 p-6">
              <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-text">
                    <Check className="w-4 h-4 text-green-600" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            {property.houseRules && (
              <div className="bg-white rounded-xl border border-blue-100 p-6">
                <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
                  House Rules
                </h2>
                <div className="space-y-2">
                  {property.houseRules.map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-text">
                      <X className="w-4 h-4 text-red-600" />
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {property.reviewsList && property.reviewsList.length > 0 && (
              <div className="bg-white rounded-xl border border-blue-100 p-6">
                <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
                  Reviews
                </h2>
                <div className="space-y-4">
                  {property.reviewsList.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b border-blue-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
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
                      </div>
                      <p className="text-sm text-slate-text">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="space-y-4">
            {/* Price Card */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 sticky top-24">
              <div className="mb-4">
                {property.pricePerNight ? (
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      KSh {property.pricePerNight}
                    </span>
                    <span className="text-sm text-slate-text"> / night</span>
                  </div>
                ) : property.pricePerMonth ? (
                  <div>
                    <span className="text-2xl font-bold text-green-600">
                      KSh {property.pricePerMonth.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-text"> / month</span>
                  </div>
                ) : null}
              </div>

              {/* Short-term stay booking */}
              {!property.isRental && (
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-xs font-medium text-slate-text mb-1 block">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-text mb-1 block">Check-out</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-text mb-1 block">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                    >
                      {[...Array(property.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'guest' : 'guests'}</option>
                      ))}
                    </select>
                  </div>

                  {nights > 0 && (
                    <div className="border-t border-blue-100 pt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>KSh {property.pricePerNight} x {nights} nights</span>
                        <span>KSh {totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-2">
                        <span>Total</span>
                        <span className="text-blue-600">KSh {totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Long-term rental inquiry */}
              {property.isRental && (
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-xs font-medium text-slate-text mb-1 block">Your Message</label>
                    <textarea
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Tell us about yourself and when you'd like to move in..."
                      rows={4}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:border-green-400"
                    />
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-green-800 font-medium">Property Management Included</p>
                        <p className="text-xs text-green-700 mt-1">
                          We'll handle tenant screening, rent collection, and maintenance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={!property.isRental ? (!checkIn || !checkOut) : (!inquiryMessage)}
                className={`w-full text-white py-3 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${
                  property.isRental 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {property.isRental ? 'Send Inquiry' : nights > 0 ? `Book • KSh ${totalPrice.toLocaleString()}` : 'Check Availability'}
              </button>

              {!property.isRental && (
                <p className="text-xs text-center text-slate-text/70 mt-3">
                  You won't be charged yet
                </p>
              )}
            </div>

            {/* Host Info */}
            {property.host && (
              <div className="bg-white rounded-xl border border-blue-100 p-6">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Hosted by</h3>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={property.host.image}
                    alt={property.host.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-charcoal">{property.host.name}</h4>
                    <p className="text-xs text-slate-text/70">Joined {new Date(property.host.joinDate).toLocaleDateString()}</p>
                  </div>
                  {property.host.isSuperhost && (
                    <span className="ml-auto bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
                      Superhost
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-text/70">
                  <span>Response rate: {property.host.responseRate}%</span>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <span>Response time: {property.host.responseTime}</span>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-blue-100 p-6">
              <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Contact</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${property.phone}`}
                  className="flex items-center gap-3 text-sm text-slate-text hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  {property.phone}
                </a>
                <a
                  href={`mailto:${property.email}`}
                  className="flex items-center gap-3 text-sm text-slate-text hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  {property.email}
                </a>
                {property.website && (
                  <a
                    href={`https://${property.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-slate-text hover:text-blue-600 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-blue-600" />
                    {property.website}
                  </a>
                )}
              </div>
            </div>

            {/* Check-in/out times */}
            <div className="bg-white rounded-xl border border-blue-100 p-6">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-xs text-slate-text/70">Check-in</span>
                  <p className="text-sm font-medium text-charcoal">{property.checkInTime}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-text/70">Check-out</span>
                  <p className="text-sm font-medium text-charcoal">{property.checkOutTime}</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl border border-blue-100 p-6">
              <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Location</h3>
              <p className="text-sm text-slate-text mb-3">{property.address}</p>
              {property.nearbyAttractions && (
                <div className="space-y-2">
                  {property.nearbyAttractions.map((attraction, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span>{attraction.name}</span>
                      <span className="text-slate-text/70">{attraction.distance}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Offers */}
            {property.offers && property.offers.length > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-red-600" />
                  Special Offers
                </h3>
                <div className="space-y-3">
                  {property.offers.map((offer, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-charcoal">{offer.title}</h4>
                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">
                          {offer.discount}% OFF
                        </span>
                      </div>
                      <p className="text-xs text-slate-text mb-2">{offer.description}</p>
                      {offer.code && (
                        <div className="bg-orange-50 rounded px-2 py-1 inline-block">
                          <code className="text-xs font-mono text-orange-600">{offer.code}</code>
                        </div>
                      )}
                      {offer.minNights && (
                        <p className="text-xs text-slate-text/70 mt-1">Min {offer.minNights} nights</p>
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

export default PropertyDetailPage;