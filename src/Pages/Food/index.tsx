// pages/food/index.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Cake,
  Flame,
} from "lucide-react";
import {
  foodCategories,
  topRatedRestaurants,
  flashOffers,
  eventOffers,
  foodSlideshowItems,
  restaurants,
} from "../../data/food";
import FoodCategoryCard from "../../components/food/FoodCategoryGrid";
import RestaurantCard from "../../components/food/RestaurantCard";
import OfferCard from "../../components/food/OfferCard";
import EventOfferCard from "../../components/food/EventOfferCard";
import CategoryNavbar from "../../common/CategoryNavbar";
import GuestSlideshow from "../../components/marketplace/guestSlideShow";

const FoodHome: React.FC = () => {
  const [selectedCategory] = useState<string>("all");

  const featuredRestaurants = topRatedRestaurants.slice(0, 4);
  const featuredOffers = flashOffers.slice(0, 3);
  const birthdayOffers = eventOffers
    .filter((o) => o.type === "birthday")
    .slice(0, 2);
  const eventSpaceOffers = eventOffers
    .filter((o) => o.type === "event")
    .slice(0, 2);

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Planning the Perfect Birthday Party",
      excerpt:
        "Tips for food, decor, and entertainment to make your celebration unforgettable.",
      author: "Sarah Kamau",
      date: "Mar 12, 2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
      category: "Events",
      likes: 67,
      comments: 23,
    },
    {
      id: 2,
      title: "Top 10 Kenyan Dishes You Must Try",
      excerpt: "From nyama choma to pilau, explore the flavors of Kenya.",
      author: "Chef John Mwende",
      date: "Mar 10, 2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "Food",
      likes: 89,
      comments: 34,
    },
    {
      id: 3,
      title: "How to Choose the Right Caterer",
      excerpt:
        "A guide to finding the perfect catering service for your event.",
      author: "Grace Wanjiku",
      date: "Mar 8, 2026",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "Catering",
      likes: 45,
      comments: 12,
    },
    {
      id: 4,
      title: "Wedding Planning Guide",
      excerpt:
        "Everything you need to know about booking venues, catering, and more.",
      author: "Events Team",
      date: "Mar 5, 2026",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "Weddings",
      likes: 112,
      comments: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Category Navbar */}
      <CategoryNavbar categoryName="Food & Dining" showBackButton={false} />

      {/* Header Section */}
      <div className="bg-gradient-to-b from-orange-50 to-white border-b border-orange-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-2">
                Food & Dining
              </h1>
              <p className="text-slate-text">
                Discover restaurants, cafes, and catering services in Tala
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-text/40" />
                <input
                  type="text"
                  placeholder="Search for restaurants or dishes..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-orange-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex overflow-x-auto gap-2 mt-6 pb-2 scrollbar-hide">
            <Link
              to="/food"
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-white border border-orange-200 text-slate-text hover:border-orange-400"
              }`}
            >
              All Categories
            </Link>
            {foodCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/food/cuisine/${cat.id}`}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-white border border-orange-200 text-slate-text hover:border-orange-400 flex items-center gap-1"
              >
                <cat.icon className="w-4 h-4 text-orange-600" />
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Guest Slideshow Section */}
      {!localStorage.getItem("user") && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <GuestSlideshow items={foodSlideshowItems} />
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
                  Limited time discounts you don't want to miss
                </p>
              </div>
            </div>
            <Link
              to="/food/offers"
              className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
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

        {/* Birthday & Event Specials */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Birthday Specials */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <Cake className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-charcoal">
                  Birthday Specials
                </h3>
                <p className="text-sm text-slate-text">
                  Celebrate with free cakes and discounts
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {birthdayOffers.map((offer, idx) => (
                <EventOfferCard key={idx} offer={offer} />
              ))}
            </div>
            <Link
              to="/food/offers?type=birthday"
              className="mt-4 inline-flex items-center gap-1 text-sm text-pink-600 hover:text-pink-700"
            >
              View all birthday deals
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Event & Party Specials */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-charcoal">
                  Event & Party Packages
                </h3>
                <p className="text-sm text-slate-text">
                  Weddings, corporate events, and more
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {eventSpaceOffers.map((offer, idx) => (
                <EventOfferCard key={idx} offer={offer} />
              ))}
            </div>
            <Link
              to="/food/offers?type=event"
              className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              View all event packages
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Popular Categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-semibold text-charcoal">
                Popular Categories
              </h2>
              <p className="text-sm text-slate-text mt-1">
                Explore different types of dining experiences
              </p>
            </div>
            <Link
              to="/food/cuisines"
              className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {foodCategories.map((category) => (
              <FoodCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Top Rated Restaurants */}
        <section className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-semibold text-charcoal">
                Top Rated Restaurants
              </h2>
              <p className="text-sm text-slate-text">
                Highest rated dining spots in Tala
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>

        {/* How It Works - Branching Paths */}
        <section className="bg-white rounded-2xl p-8 border border-orange-100">
          <h2 className="text-2xl font-display font-semibold text-charcoal mb-8 text-center">
            Choose Your Experience
          </h2>

          {/* Main branching diagram */}
          <div className="relative">
            {/* Central starting point */}
            <div className="flex justify-center mb-12">
              <div className="bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg">
                I want to...
              </div>
            </div>

            {/* Branch lines (hidden on mobile) */}
            <div className="hidden lg:block absolute top-20 left-0 right-0">
              <svg className="w-full h-32" preserveAspectRatio="none">
                {/* Lines from center to each branch */}
                <line
                  x1="50%"
                  y1="0"
                  x2="25%"
                  y2="100%"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <line
                  x1="50%"
                  y1="0"
                  x2="75%"
                  y2="100%"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            {/* Three main branches */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 relative">
              {/* Branch 1: Food Delivery */}
              <div className="bg-gradient-to-b from-orange-50 to-white rounded-xl p-6 border border-orange-200 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                  Option 1
                </div>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-charcoal">
                    Food Delivery
                  </h3>
                  <p className="text-sm text-slate-text">
                    Quick bites to your doorstep
                  </p>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">
                      1
                    </div>
                    <span>Browse restaurants & menus</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">
                      2
                    </div>
                    <span>Add items to cart</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">
                      3
                    </div>
                    <span>Checkout & pay</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-bold text-orange-600">
                      4
                    </div>
                    <span>Track delivery in real-time</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-orange-100 text-center">
                  <Link
                    to="/food"
                    className="text-orange-600 text-sm font-medium hover:underline"
                  >
                    Order now →
                  </Link>
                </div>
              </div>

              {/* Branch 2: Dine-in & Events */}
              <div className="bg-gradient-to-b from-pink-50 to-white rounded-xl p-6 border border-pink-200 relative lg:mt-0 mt-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                  Option 2
                </div>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-charcoal">
                    Dine-in & Events
                  </h3>
                  <p className="text-sm text-slate-text">
                    Celebrate special moments
                  </p>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-bold text-pink-600">
                      1
                    </div>
                    <span>Find restaurants with event spaces</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-bold text-pink-600">
                      2
                    </div>
                    <span>Check availability & capacity</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-bold text-pink-600">
                      3
                    </div>
                    <span>Book tables or event spaces</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-xs font-bold text-pink-600">
                      4
                    </div>
                    <span>Customize with special offers</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-pink-100 text-center">
                  <Link
                    to="/food?type=events"
                    className="text-pink-600 text-sm font-medium hover:underline"
                  >
                    Explore venues →
                  </Link>
                </div>
              </div>

              {/* Branch 3: Chill & Relax */}
              <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 border border-blue-200 relative lg:mt-0 mt-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                  Option 3
                </div>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-charcoal">
                    Chill & Relax
                  </h3>
                  <p className="text-sm text-slate-text">
                    Serene spaces to unwind
                  </p>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      1
                    </div>
                    <span>Discover cafes & lounges</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      2
                    </div>
                    <span>Check ambiance & features</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      3
                    </div>
                    <span>Reserve cozy spots</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      4
                    </div>
                    <span>Enjoy happy hour specials</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-100 text-center">
                  <Link
                    to="/food/cuisine/cafes"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Find your spot →
                  </Link>
                </div>
              </div>
            </div>

            {/* Connector dots for mobile (visible on small screens) */}
            <div className="flex justify-center gap-2 mt-6 lg:hidden">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-text">
              <span className="font-medium">Not sure?</span> Browse all options
              or check our special offers
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-3">
              <Link
                to="/food/offers"
                className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-xs font-medium hover:bg-orange-200 transition-colors"
              >
                View All Deals
              </Link>
              <Link
                to="/food/cuisines"
                className="bg-gray-100 text-slate-text px-4 py-2 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </section>

        {/* All Categories Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold text-charcoal">
              All Restaurants
            </h2>
            <span className="text-sm text-slate-text">
              {restaurants.length} places
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Restaurants", value: "25+", icon: Users },
              { label: "Daily Orders", value: "500+", icon: Briefcase },
              { label: "Happy Customers", value: "10k+", icon: Star },
              { label: "Event Spaces", value: "15+", icon: Sparkles },
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
        <section className="bg-white rounded-2xl p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-semibold text-charcoal">
                  Food & Event Blog
                </h2>
                <p className="text-sm text-slate-text">
                  Tips, guides, and inspiration
                </p>
              </div>
            </div>
            <Link
              to="/food/blog"
              className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              View all articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/food/blog/${post.id}`}
                className="group bg-white rounded-xl border border-orange-100 overflow-hidden hover:shadow-md transition-all"
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
                    <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-text/60">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-charcoal mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-text line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-text/70">
                    <span>By {post.author}</span>
                    <div className="flex items-center gap-2">
                      <span>{post.date}</span>
                    </div>
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

export default FoodHome;
