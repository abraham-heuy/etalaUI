// pages/contact.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  ArrowRight
} from 'lucide-react';
import BackArrow from '../components/about/backArrow';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Contact form:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-soft-white">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl border border-green-100 p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-charcoal mb-2">
              Message Sent!
            </h1>
            <p className="text-sm text-slate-text mb-4">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90"
            >
              Return to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16">
            <BackArrow />
            <h1 className="ml-4 text-lg font-display font-semibold text-charcoal">
              Contact Us
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-xl border border-sky-100 p-6">
            <h2 className="text-xl font-display font-semibold text-charcoal mb-4">
              Send us a Message
            </h2>
            <p className="text-sm text-slate-text mb-6">
              Have a question or feedback? We'd love to hear from you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What is this about?"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.subject
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-600 mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal mb-1 block">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  placeholder="Write your message here..."
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-redbull-blue text-white py-3 rounded-lg hover:bg-redbull-blue/90 transition-colors flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Contact Details */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-xl border border-sky-100 p-6">
              <h2 className="text-xl font-display font-semibold text-charcoal mb-4">
                Get in Touch
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-redbull-blue-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-redbull-blue" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-charcoal">Email</h3>
                    <a href="mailto:support@etala.co.ke" className="text-sm text-redbull-blue hover:underline">
                      support@etala.co.ke
                    </a>
                    <p className="text-xs text-slate-text mt-1">For general inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-redbull-blue-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-redbull-blue" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-charcoal">Phone</h3>
                    <a href="tel:+254712345678" className="text-sm text-redbull-blue hover:underline">
                      +254 712 345 678
                    </a>
                    <p className="text-xs text-slate-text mt-1">Mon-Fri, 8am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-redbull-blue-light rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-redbull-blue" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-charcoal">Visit Us</h3>
                    <p className="text-sm text-slate-text">Tala Town, Machakos County</p>
                    <p className="text-xs text-slate-text mt-1">Next to Kwa Ndege Stage</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-redbull-blue-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-redbull-blue" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-charcoal">Business Hours</h3>
                    <p className="text-sm text-slate-text">Monday - Friday: 8:00 - 18:00</p>
                    <p className="text-sm text-slate-text">Saturday: 9:00 - 15:00</p>
                    <p className="text-sm text-slate-text">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl border border-sky-100 p-6">
              <h2 className="text-lg font-display font-semibold text-charcoal mb-3">
                Our Location
              </h2>
              <div className="bg-sky-50 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-redbull-blue mx-auto mb-2" />
                  <p className="text-sm text-slate-text">Tala Town, Machakos</p>
                  <p className="text-xs text-slate-text/70 mt-1">Interactive map coming soon</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl border border-sky-100 p-6">
              <h2 className="text-lg font-display font-semibold text-charcoal mb-3">
                Follow Us
              </h2>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gradient-to-r from-redbull-blue-light to-white rounded-xl p-6 border border-redbull-blue/20">
              <h2 className="text-lg font-display font-semibold text-charcoal mb-2">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-sm text-slate-text mb-3">
                    Find quick answers to common questions in our FAQ section.
                  </p>
                  <Link
                    to="/about-us"
                    className="inline-flex items-center gap-2 text-redbull-blue hover:text-redbull-blue/80 font-medium text-sm"
                  >
                    View FAQs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    );

  };

export default ContactPage;