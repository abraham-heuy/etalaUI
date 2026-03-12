// pages/stays/index.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronRight,
  Star,
  Award,
  Users,
  BookOpen,
  Flame,
  Hotel,
  Tent,
  Key,
  MapPin} from 'lucide-react';
import { 
  stayCategories, 
  topRatedProperties, 
  flashOffers, 
  studentOffers, 
  staysSlideshowItems, 
  stayProperties,
  rentals
} from '../../data/stays';
import StayCategoryCard from '../../components/stays/StayCategoryCard';
import PropertyCard from '../../components/stays/PropertyCard';
import OfferCard from '../../components/stays/OfferCard';
import RentalCard from '../../components/stays/RentalCard';
import CategoryNavbar from '../../common/CategoryNavbar';
import GuestSlideshow from '../../components/marketplace/guestSlideShow';

const StaysHome: React.FC = () => {
  const [selectedCategory] = useState<string>('all');
  
  const featuredProperties = topRatedProperties.slice(0, 4);
  const featuredOffers = flashOffers.slice(0, 3);
  const studentDeals = studentOffers.slice(0, 2);
  const featuredRentals = rentals.slice(0, 3);

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for First-Time Renters',
      excerpt: 'Everything you need to know before signing your first lease.',
      author: 'Properties Team',
      date: 'Mar 12, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      category: 'Rentals',
      likes: 67,
      comments: 23
    },
    {
      id: 2,
      title: 'Best Camping Spots Near Tala',
      excerpt: 'Discover the most beautiful campsites for your next adventure.',
      author: 'Adventure Team',
      date: 'Mar 10, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      category: 'Camping',
      likes: 89,
      comments: 34
    },
    {
      id: 3,
      title: 'How to Choose the Perfect Airbnb',
      excerpt: 'A guide to finding the right home away from home.',
      author: 'Travel Team',
      date: 'Mar 8, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      category: 'Airbnbs',
      likes: 45,
      comments: 12
    },
    {
      id: 4,
      title: 'Understanding Property Management',
      excerpt: 'How our management system makes renting easier for landlords and tenants.',
      author: 'Management Team',
      date: 'Mar 5, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80',
      category: 'Management',
      likes: 112,
      comments: 45
    }
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Category Navbar */}
      <CategoryNavbar categoryName="Stays & Accommodation" showBackButton={false} />

      {/* Header Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white border-b border-blue-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-2">
                Stays & Accommodation
              </h1>
              <p className="text-slate-text">
                Find your perfect place to stay in and around Tala
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/40" />
                <input
                  type="text"
                  placeholder="Search for properties..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex overflow-x-auto gap-2 mt-6 pb-2 scrollbar-hide">
            <Link
              to="/stays"
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-blue-200 text-slate-text hover:border-blue-400'
              }`}
            >
              All Categories
            </Link>
            {stayCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/stays/category/${cat.id}`}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-white border border-blue-200 text-slate-text hover:border-blue-400 flex items-center gap-1"
              >
                <cat.icon className="w-4 h-4 text-blue-600" />
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Guest Slideshow Section */}
      {!localStorage.getItem('user') && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <GuestSlideshow items={staysSlideshowItems} />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        
        {/* Flash Offers Section */}
        <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-semibold text-charcoal">
                  Flash Offers & Deals
                </h2>
                <p className="text-sm text-slate-text">
                  Limited time discounts on stays
                </p>
              </div>
            </div>
            <Link
              to="/stays/offers"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all deals
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredOffers.map((offer, idx) => (
              <OfferCard key={idx} offer={offer} />
            ))}
          </div>
        </section>

        {/* Student & Special Offers */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Offers */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-charcoal">
                  Student Discounts
                </h3>
                <p className="text-sm text-slate-text">
                  Special rates for students
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {studentDeals.map((offer, idx) => (
                <div key={idx} className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-charcoal">{offer.title}</h4>
                    <p className="text-xs text-slate-text">{offer.propertyName}</p>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold">
                    {offer.discount}% OFF
                  </span>
                </div>
              ))}
            </div>
            <Link
              to="/stays/offers?type=student"
              className="mt-4 inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
            >
              View all student deals
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Long-term Rentals Spotlight */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Key className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-charcoal">
                  Long-term Rentals
                </h3>
                <p className="text-sm text-slate-text">
                  With property management included
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {featuredRentals.slice(0, 2).map((rental) => (
                <div key={rental.id} className="bg-white rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-charcoal">{rental.name}</h4>
                      <p className="text-xs text-slate-text flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {rental.location}
                      </p>
                    </div>
                    <span className="text-green-600 font-bold">
                      KSh {rental.pricePerMonth?.toLocaleString()}/mo
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Management Included
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      {rental.bedrooms} beds
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/stays/category/rentals"
              className="mt-4 inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
            >
              Browse all rentals
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Popular Categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-semibold text-charcoal">
                Browse by Category
              </h2>
              <p className="text-sm text-slate-text mt-1">
                Find the perfect type of accommodation
              </p>
            </div>
            <Link 
              to="/stays/categories"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {stayCategories.map((category) => (
              <StayCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Top Rated Properties */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-semibold text-charcoal">
                Top Rated Properties
              </h2>
              <p className="text-sm text-slate-text">
                Guest favorites in Tala
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* Featured Rentals with Management */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-semibold text-charcoal">
                Long-term Rentals
              </h2>
              <p className="text-sm text-slate-text mt-1">
                With free property management included
              </p>
            </div>
            <Link 
              to="/stays/rentals"
              className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              View all rentals
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredRentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        </section>

        {/* How It Works - Branching Paths */}
        <section className="bg-white rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl font-display font-semibold text-charcoal mb-8 text-center">
            Choose Your Stay Experience
          </h2>
          
          {/* Main branching diagram */}
          <div className="relative">
            {/* Central starting point */}
            <div className="flex justify-center mb-12">
              <div className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg">
                I want to...
              </div>
            </div>

            {/* Branch lines (hidden on mobile) */}
            <div className="hidden lg:block absolute top-20 left-0 right-0">
              <svg className="w-full h-32" preserveAspectRatio="none">
                <line x1="50%" y1="0" x2="20%" y2="100%" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="0" x2="80%" y2="100%" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Three main branches */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 relative">
              
              {/* Branch 1: Short-term Stays */}
              <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 border border-blue-200 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                  Option 1
                </div>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Hotel className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-charcoal">Short-term Stays</h3>
                  <p className="text-sm text-slate-text">Hotels, Airbnbs & Guest Houses</p>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">1</div>
                    <span>Browse properties & check availability</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">2</div>
                    <span>Select check-in & check-out dates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">3</div>
                    <span>View real-time pricing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">4</div>
                    <span>Book instantly</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-blue-100 text-center">
                  <Link to="/stays" className="text-blue-600 text-sm font-medium hover:underline">
                    Browse stays →
                  </Link>
                </div>
              </div>

              {/* Branch 2: Long-term Rentals */}
              <div className="bg-gradient-to-b from-green-50 to-white rounded-xl p-6 border border-green-200 relative lg:mt-0 mt-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  Option 2
                </div>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Key className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-charcoal">Long-term Rentals</h3>
                  <p className="text-sm text-slate-text">With property management included</p>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600">1</div>
                    <span>Browse available rentals</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600">2</div>
                    <span>Check lease terms & pricing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600">3</div>
                    <span>Submit inquiry</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600">4</div>
                    <span>We handle tenant management</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-green-100 text-center">
                  <Link to="/stays/category/rentals" className="text-green-600 text-sm font-medium hover:underline">
                    Explore rentals →
                  </Link>
                </div>
              </div>

              {/* Branch 3: Campsites & Adventure */}
              <div className="bg-gradient-to-b from-amber-50 to-white rounded-xl p-6 border border-amber-200 relative lg:mt-0 mt-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                  Option 3
                </div>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Tent className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-charcoal">Campsites & Adventure</h3>
                  <p className="text-sm text-slate-text">Connect with nature</p>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold text-amber-600">1</div>
                    <span>Discover campsites</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold text-amber-600">2</div>
                    <span>Check availability</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold text-amber-600">3</div>
                    <span>Book your spot</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold text-amber-600">4</div>
                    <span>Enjoy student discounts</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-amber-100 text-center">
                  <Link to="/stays/category/campsites" className="text-amber-600 text-sm font-medium hover:underline">
                    Find campsites →
                  </Link>
                </div>
              </div>
            </div>

            {/* Connector dots for mobile */}
            <div className="flex justify-center gap-2 mt-6 lg:hidden">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-text">
              <span className="font-medium">Need help?</span> All long-term rentals include our property management system
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-3">
              <Link to="/stays/offers" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors">
                View All Deals
              </Link>
              <Link to="/stays/rentals" className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-medium hover:bg-green-200 transition-colors">
                Rentals with Management
              </Link>
            </div>
          </div>
        </section>

        {/* All Properties */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold text-charcoal">
              All Properties
            </h2>
            <span className="text-sm text-slate-text">
              {stayProperties.length} places
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stayProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Properties', value: '60+', icon: Hotel },
              { label: 'Happy Guests', value: '2,500+', icon: Users },
              { label: 'Rentals Managed', value: '22', icon: Key },
              { label: '5-Star Reviews', value: '450+', icon: Star },
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
        <section className="bg-white rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-semibold text-charcoal">
                  Stays & Rentals Blog
                </h2>
                <p className="text-sm text-slate-text">
                  Tips, guides, and inspiration
                </p>
              </div>
            </div>
            <Link
              to="/stays/blog"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/stays/blog/${post.id}`}
                className="group bg-white rounded-xl border border-blue-100 overflow-hidden hover:shadow-md transition-all"
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
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-text/60">{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-charcoal mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-text line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-text/70">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StaysHome;