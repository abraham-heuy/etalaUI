// pages/services/provider/[id].tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star,
  MapPin,
  Clock,
  Award,
  Briefcase,
  Phone,
  Mail,
  CheckCircle,
  MessageCircle,
  Share2,
  Heart,
  ThumbsUp,
  Shield,
  Users,
} from 'lucide-react';
import { serviceProviders } from '../../../data/services';
import CategoryNavbar from '../../../common/CategoryNavbar';
import LoginModal from '../../../common/loginPrompt';

const ServiceProviderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews'>('about');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [actionType, setActionType] = useState<'cart' | 'buy' | null>(null);

  const provider = serviceProviders.find(p => p.id === id);

  if (!provider) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Provider Not Found" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Professional Not Found
            </h2>
            <Link to="/services" className="text-purple-600 hover:underline">
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    if (!isLoggedIn) {
      setActionType('buy'); // Set action type to 'buy' for booking
      setShowLoginModal(true);
    } else {
      // Proceed with booking
      console.log('Booking:', { provider: provider.id, date: bookingDate, time: bookingTime });
      // You would typically navigate to a confirmation page or process the booking
    }
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName={provider.name} />

      {/* Cover Image */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img 
          src={provider.coverImage || provider.image} 
          alt={provider.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg -mt-12 sm:-mt-0">
              <img 
                src={provider.image} 
                alt={provider.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-display font-bold text-charcoal">
                      {provider.name}
                    </h1>
                    {provider.verified && (
                      <CheckCircle className="w-5 h-5 text-purple-600 fill-current" />
                    )}
                  </div>
                  <p className="text-purple-600 font-medium mb-2">{provider.profession}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-text/70">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{provider.location}</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{provider.experience} years exp.</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{provider.completedJobs} jobs</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="p-2 border border-purple-200 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 border border-purple-200 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Rating & Stats */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-lg font-bold text-charcoal">{provider.rating}</span>
                  <span className="text-sm text-slate-text">({provider.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-text">
                  <Clock className="w-4 h-4" />
                  <span>Responds {provider.responseTime}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  provider.availability === 'available' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {provider.availability === 'available' ? 'Available Now' : 'Currently Busy'}
                </div>
              </div>

              {/* Badges */}
              {provider.badges && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {provider.badges.map((badge, idx) => (
                    <span key={idx} className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
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
            <div className="bg-white rounded-xl border border-purple-100 p-1 flex">
              {[
                { id: 'about', label: 'About' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'reviews', label: `Reviews (${provider.reviewsList?.length || 0})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-text hover:bg-purple-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-xl border border-purple-100 p-6 space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-lg font-display font-semibold text-charcoal mb-2">About</h3>
                  <p className="text-slate-text leading-relaxed">{provider.bio}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-display font-semibold text-charcoal mb-2">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.skills.map((skill, idx) => (
                      <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-lg font-display font-semibold text-charcoal mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages.map((lang, idx) => (
                      <span key={idx} className="bg-gray-100 text-slate-text px-3 py-1 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Working Hours */}
                {provider.workingHours && (
                  <div>
                    <h3 className="text-lg font-display font-semibold text-charcoal mb-2">Working Hours</h3>
                    <div className="space-y-1">
                      {Object.entries(provider.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between text-sm">
                          <span className="capitalize text-slate-text">{day}:</span>
                          <span className="text-charcoal font-medium">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="bg-white rounded-xl border border-purple-100 p-6">
                {provider.portfolio && provider.portfolio.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {provider.portfolio.map((item) => (
                      <div key={item.id} className="group cursor-pointer">
                        <div className="rounded-xl overflow-hidden mb-2">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-medium text-charcoal">{item.title}</h4>
                        <p className="text-xs text-slate-text">{item.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-text py-8">No portfolio items yet</p>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-xl border border-purple-100 p-6">
                {provider.reviewsList && provider.reviewsList.length > 0 ? (
                  <div className="space-y-4">
                    {provider.reviewsList.map((review) => (
                      <div key={review.id} className="border-b border-purple-100 last:border-0 pb-4 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-purple-600">
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
                          <button className="text-xs text-slate-text hover:text-purple-600 flex items-center gap-1">
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

          {/* Right Column - Booking Card */}
          <div className="space-y-4">
            {/* Price Card */}
            <div className="bg-white rounded-xl border border-purple-100 p-6">
              <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Pricing</h3>
              <div className="mb-4">
                {provider.hourlyRate ? (
                  <div>
                    <span className="text-3xl font-bold text-purple-600">KSh {provider.hourlyRate}</span>
                    <span className="text-sm text-slate-text"> /hour</span>
                  </div>
                ) : provider.fixedPrice ? (
                  <div>
                    <span className="text-3xl font-bold text-purple-600">KSh {provider.fixedPrice}</span>
                    <span className="text-sm text-slate-text"> /{provider.priceUnit}</span>
                  </div>
                ) : null}
                <p className="text-xs text-slate-text/70 mt-1">Price may vary based on requirements</p>
              </div>

              {/* Booking Form */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-text mb-1 block">Select Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-text mb-1 block">Select Time</label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!bookingDate || !bookingTime}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl border border-purple-100 p-6">
              <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Contact</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${provider.phone}`}
                  className="flex items-center gap-3 text-sm text-slate-text hover:text-purple-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-purple-600" />
                  {provider.phone}
                </a>
                <a
                  href={`mailto:${provider.email}`}
                  className="flex items-center gap-3 text-sm text-slate-text hover:text-purple-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-purple-600" />
                  {provider.email}
                </a>
                <button className="w-full mt-2 border border-purple-200 text-purple-600 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-xl border border-purple-100 p-6">
              <h3 className="text-lg font-display font-semibold text-charcoal mb-4">Location</h3>
              <div className="flex items-center gap-2 text-sm text-slate-text mb-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span>{provider.location}</span>
              </div>
              <p className="text-xs text-slate-text/70">
                Service available {provider.location.includes('Remote') ? 'nationwide' : 'in this area'}
              </p>
            </div>

            {/* Quick Info */}
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-charcoal mb-1">Secure Booking</h4>
                  <p className="text-xs text-slate-text">
                    Your payment is held securely until you confirm the job is complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal - Now with proper actionType */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        actionType={actionType}
      />
    </div>
  );
};

export default ServiceProviderPage;