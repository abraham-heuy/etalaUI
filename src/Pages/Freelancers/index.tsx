// pages/services/index.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronRight,
  Star,
  Award,
  Sparkles,
  Users,
  Briefcase,
  Calendar,
  BookOpen,
  ThumbsUp,
  MessageCircle,
  Eye
} from 'lucide-react';
import { serviceCategories, topRatedProviders, servicesSlideshowItems } from '../../data/services';
import ServiceCategoryCard from '../../components/services/ServiceCategoryCard';
import ServiceProviderCard from '../../components/services/ServiceProviderCard';
import CategoryNavbar from '../../common/CategoryNavbar';
import GuestSlideshow from '../../components/marketplace/guestSlideShow';
import { WishlistProvider } from '../../contexts/commerce/wishlist.context';
import { CartProvider } from '../../contexts/commerce/cart.context';
import { tokenStore } from '../../services/Auth/auth.service';

const ServicesHome: React.FC = () => {
  const [selectedCategory] = useState<string>('all');
  
  const featuredProviders = topRatedProviders.slice(0, 4);

  // Check if user is logged in via token
  const isLoggedIn = !!tokenStore.get();

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Choosing the Right Plumber',
      excerpt: 'Learn how to find a reliable plumber who won\'t overcharge and will do the job right the first time.',
      author: 'John Mwende',
      date: 'Mar 10, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      category: 'Plumbing',
      likes: 45,
      comments: 12,
      views: 1234
    },
    {
      id: 2,
      title: 'Salon Services: What to Expect & How to Prepare',
      excerpt: 'A complete guide to getting the best experience at your next salon visit.',
      author: 'Sarah Kamau',
      date: 'Mar 8, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      category: 'Salons',
      likes: 67,
      comments: 23,
      views: 2345
    },
    {
      id: 3,
      title: 'Electrical Safety Tips Every Homeowner Should Know',
      excerpt: 'Essential safety guidelines to prevent electrical hazards in your home.',
      author: 'Peter Mwangi',
      date: 'Mar 5, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      category: 'Electrical',
      likes: 89,
      comments: 31,
      views: 3456
    },
    {
      id: 4,
      title: 'How Much Does a Cleaner Cost in Tala?',
      excerpt: 'A breakdown of cleaning service prices and what affects the cost.',
      author: 'Grace Wanjiku',
      date: 'Mar 3, 2026',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      category: 'Cleaning',
      likes: 56,
      comments: 14,
      views: 1876
    }
  ];

  return (
    <WishlistProvider>
      <CartProvider category="services">
        <div className="min-h-screen bg-soft-white">
          <CategoryNavbar categoryName="Services" showBackButton={false} />

          {/* Header Section */}
          <div className="bg-gradient-to-b from-purple-50 to-white border-b border-purple-100 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-2">
                    Professional Services
                  </h1>
                  <p className="text-slate-text">
                    Find trusted experts for all your needs
                  </p>
                </div>
                
                {/* Search Bar */}
                <div className="w-full md:w-96">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/40" />
                    <input
                      type="text"
                      placeholder="Search for services..."
                      className="w-full pl-10 pr-4 py-3 bg-white border border-purple-200 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex overflow-x-auto gap-2 mt-6 pb-2 scrollbar-hide">
                <Link
                  to="/services"
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white border border-purple-200 text-slate-text hover:border-purple-400'
                  }`}
                >
                  All Categories
                </Link>
                {serviceCategories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/services/category/${cat.id}`}
                    className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-white border border-purple-200 text-slate-text hover:border-purple-400 flex items-center gap-1"
                  >
                    <cat.icon className="w-4 h-4 text-purple-600" />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Guest Slideshow - only for non-logged-in users */}
          {!isLoggedIn && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
              <GuestSlideshow items={servicesSlideshowItems} />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
            
            {/* Featured Categories */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-charcoal">
                    Popular Categories
                  </h2>
                  <p className="text-sm text-slate-text mt-1">
                    Most requested services in Tala
                  </p>
                </div>
                <Link 
                  to="/services/categories"
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  View all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {serviceCategories.slice(0, 6).map((category) => (
                  <ServiceCategoryCard key={category.id} category={category} />
                ))}
              </div>
            </section>

            {/* Top Rated Providers */}
            <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-semibold text-charcoal">
                    Top Rated Professionals
                  </h2>
                  <p className="text-sm text-slate-text">
                    Highly recommended by your neighbors
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredProviders.map((provider) => (
                  <ServiceProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            </section>

            {/* How It Works */}
            <section className="bg-white rounded-2xl p-6 border border-purple-100">
              <h2 className="text-2xl font-display font-semibold text-charcoal mb-6 text-center">
                How It Works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: Search,
                    title: 'Find a Pro',
                    description: 'Browse categories or search for specific services',
                    color: 'text-purple-600',
                    bg: 'bg-purple-100',
                  },
                  {
                    icon: Briefcase,
                    title: 'View Profiles',
                    description: 'Check ratings, reviews, and past work',
                    color: 'text-indigo-600',
                    bg: 'bg-indigo-100',
                  },
                  {
                    icon: Calendar,
                    title: 'Book & Pay',
                    description: 'Schedule and pay securely through the app',
                    color: 'text-pink-600',
                    bg: 'bg-pink-100',
                  },
                ].map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="text-center">
                      <div className={`w-16 h-16 ${step.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <h3 className="text-lg font-display font-semibold text-charcoal mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-text">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* All Categories Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-semibold text-charcoal">
                  All Services
                </h2>
                <span className="text-sm text-slate-text">
                  {serviceCategories.length} categories
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {serviceCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/services/category/${category.id}`}
                    className="group bg-white rounded-xl p-4 border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <category.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-sm font-medium text-charcoal">{category.name}</h3>
                    <p className="text-xs text-slate-text mt-1">{category.count} pros</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { label: 'Service Providers', value: '200+', icon: Users },
                  { label: 'Jobs Completed', value: '5,000+', icon: Briefcase },
                  { label: 'Happy Clients', value: '4,500+', icon: Star },
                  { label: 'Categories', value: '25+', icon: Sparkles },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx}>
                      <Icon className="w-8 h-8 mx-auto mb-2 text-white/80" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Blog Section */}
            <section className="bg-white rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-charcoal">
                      Service Tips & Guides
                    </h2>
                    <p className="text-sm text-slate-text">
                      Helpful articles from our experts
                    </p>
                  </div>
                </div>
                <Link
                  to="/services/blog"
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  View all articles
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {blogPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/services/blog/${post.id}`}
                    className="group bg-white rounded-xl border border-purple-100 overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-text/60">{post.readTime}</span>
                      </div>
                      <h3 className="text-base font-display font-semibold text-charcoal mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-text line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-text/70">
                        <span>By {post.author}</span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-6">
                <Link
                  to="/services/blog"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Read More Articles
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
};

export default ServicesHome;