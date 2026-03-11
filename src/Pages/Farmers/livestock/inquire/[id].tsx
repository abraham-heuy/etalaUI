// pages/farmers/livestock/inquire/[id].tsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Star,
  MapPin,
  BadgeCheck,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Send,
  User,
  FileText} from 'lucide-react';
import { livestockItems } from '../../../../data/livestock';
import CategoryNavbar from '../../../../common/CategoryNavbar';
import LoginModal from '../../../../common/loginPrompt';

const LivestockInquirePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interestedIn: 'purchase',
    preferredContact: 'phone'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const item = livestockItems.find(i => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-soft-white">
        <CategoryNavbar categoryName="Not Found" />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Animal Not Found
            </h2>
            <Link to="/farmers/livestock" className="text-amber-600 hover:underline">
              Back to Livestock
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('user') ? true : false;
    
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="Inquire" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-text hover:text-amber-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Item Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-amber-100 p-6 sticky top-24">
                <div className="aspect-square rounded-xl overflow-hidden mb-4">
                  <img 
                    src={item.images[0]} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h2 className="text-xl font-display font-semibold text-charcoal mb-2">
                  {item.name}
                </h2>
                
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-xs text-slate-text">({item.reviews} reviews)</span>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <BadgeCheck className="w-4 h-4 text-amber-600" />
                  <span className="text-xs">Verified Farmer</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>{item.farmer.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>{item.age} • {item.breed}</span>
                  </div>
                </div>
                
                <div className="border-t border-amber-100 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-text">Price:</span>
                    <span className="text-2xl font-bold text-amber-600">
                      KSh {item.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-text/70">
                    This is the farmer's listed price. Final price can be discussed.
                  </p>
                </div>

                <div className="mt-4 bg-amber-50 rounded-xl p-3">
                  <p className="text-xs text-amber-800">
                    <span className="font-semibold">Note:</span> E-TALA connects you with the farmer. 
                    All transactions, viewings, and deliveries are arranged directly between you and the seller.
                  </p>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-amber-100 p-6">
                <h2 className="text-2xl font-display font-semibold text-charcoal mb-2">
                  Contact Farmer
                </h2>
                <p className="text-sm text-slate-text mb-6">
                  Fill out the form below to express your interest. The farmer will get back to you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1 block">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1 block">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1 block">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                        placeholder="07XX XXX XXX"
                      />
                    </div>
                  </div>

                  {/* Interested In */}
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1 block">
                      I'm interested in *
                    </label>
                    <select
                      name="interestedIn"
                      value={formData.interestedIn}
                      onChange={handleChange}
                      className="w-full p-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                    >
                      <option value="purchase">Purchasing this animal</option>
                      <option value="viewing">Arranging a viewing</option>
                      <option value="information">More information</option>
                      <option value="breeding">Breeding inquiry</option>
                    </select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-2 block">
                      Preferred contact method *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={handleChange}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm">Phone</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={handleChange}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm">Email</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="preferredContact"
                          value="whatsapp"
                          checked={formData.preferredContact === 'whatsapp'}
                          onChange={handleChange}
                          className="text-amber-500 focus:ring-amber-500"
                        />
                        <span className="text-sm">WhatsApp</span>
                      </label>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1 block">
                      Your Message *
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-text/40" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                        placeholder="Tell the farmer about your interest, ask questions, or suggest a meeting..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Inquiry to Farmer
                      </>
                    )}
                  </button>
                </form>

                {/* Farmer Contact Alternative */}
                <div className="mt-6 pt-6 border-t border-amber-100">
                  <h3 className="text-sm font-medium text-charcoal mb-3">
                    Or contact farmer directly:
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-amber-600" />
                      <a href={`tel:${item.farmer.phone}`} className="text-slate-text hover:text-amber-600">
                        {item.farmer.phone}
                      </a>
                    </div>
                    {item.farmer.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-amber-600" />
                        <a href={`mailto:${item.farmer.email}`} className="text-slate-text hover:text-amber-600">
                          {item.farmer.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Success Message
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-charcoal mb-2">
              Inquiry Sent!
            </h2>
            <p className="text-slate-text mb-6">
              Your message has been sent to {item.farmer.name}. They will contact you soon via your preferred method.
            </p>
            <div className="bg-amber-50 rounded-xl p-4 mb-6 text-left">
              <h3 className="text-sm font-medium text-charcoal mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-slate-text">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>The farmer will review your inquiry</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>They'll contact you within 24-48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Arrange viewing, purchase, and delivery directly</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-3 justify-center">
              <Link
                to="/farmers/livestock"
                className="px-6 py-2 bg-amber-500 text-white rounded-full text-sm font-medium hover:bg-amber-600 transition-colors"
              >
                Browse More Animals
              </Link>
              <Link
                to="/farmers"
                className="px-6 py-2 border border-amber-200 text-amber-600 rounded-full text-sm font-medium hover:bg-amber-50 transition-colors"
              >
                Back to Farmers Market
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        actionType="buy"
      />
    </div>
  );
};

export default LivestockInquirePage;