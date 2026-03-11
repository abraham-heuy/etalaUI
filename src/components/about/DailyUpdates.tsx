// pages/DailyUpdates.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  Newspaper,
  Calendar,
  Tag,
  Users,
  Store,
  Wheat,
  Bike,
  Wrench,
  Coffee,
  Hotel,
  Briefcase,
  Star,
  Eye,
  ThumbsUp,
  MessageCircle,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  SlidersHorizontal,
  X,
  TrendingUp,
  Award,
  ArrowRight,
  BookOpen,
  Grid2X2,
  List,
} from "lucide-react";
import BackArrow from "./backArrow";

// Define types
interface UpdatePost {
  id: number;
  title: string;
  content: string;
  time: string;
  category: string;
  categoryIcon: any;
  author: string;
  authorAvatar?: string;
  views: number;
  likes: number;
  comments: number;
  image?: string;
  isFeatured?: boolean;
  offer?: {
    discount: number;
    code?: string;
    expires: string;
  };
  rating?: number;
  location?: string;
  seller?: string;
}

interface SlideOffer {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  discount: number;
  seller: string;
  location: string;
  endsIn: string;
  rating: number;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  category: "seller" | "buyer" | "general";
  likes: number;
  comments: number;
}

const DailyUpdates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [blogCategory, setBlogCategory] = useState<"all" | "seller" | "buyer">(
    "all"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedBlogs, setSavedBlogs] = useState<number[]>([]);
  const [likedBlogs, setLikedBlogs] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [updatesViewMode, setUpdatesViewMode] = useState<"grid" | "list">(
    "list"
  );
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Categories for filtering
  const categories = [
    {
      id: "all",
      name: "All Updates",
      icon: Newspaper,
      color: "from-sky-400 to-blue-400",
    },
    {
      id: "marketplace",
      name: "Marketplace",
      icon: Store,
      color: "from-sky-400 to-blue-400",
    },
    {
      id: "farmers",
      name: "Farmers",
      icon: Wheat,
      color: "from-green-400 to-emerald-400",
    },
    {
      id: "transport",
      name: "Transport",
      icon: Bike,
      color: "from-amber-400 to-orange-400",
    },
    {
      id: "services",
      name: "Services",
      icon: Wrench,
      color: "from-purple-400 to-indigo-400",
    },
    {
      id: "food",
      name: "Food",
      icon: Coffee,
      color: "from-red-400 to-pink-400",
    },
    {
      id: "stays",
      name: "Stays",
      icon: Hotel,
      color: "from-teal-400 to-cyan-400",
    },
    {
      id: "freelancers",
      name: "Freelancers",
      icon: Briefcase,
      color: "from-slate-400 to-gray-500",
    },
    {
      id: "offers",
      name: "Offers",
      icon: Tag,
      color: "from-sky-400 to-blue-400",
    },
    {
      id: "community",
      name: "Community",
      icon: Users,
      color: "from-sky-400 to-blue-400",
    },
  ];

  // Slideshow offers (top carousel)
  const slideOffers: SlideOffer[] = [
    {
      id: 1,
      title: "Fresh Farm Harvest",
      description: "50% off on all vegetables from local farmers",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      category: "Farmers",
      discount: 50,
      seller: "Mama Lucy's Farm",
      location: "Tala Town",
      endsIn: "2 days left",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Electronics Mega Sale",
      description: "Up to 40% off on smartphones and accessories",
      image:
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
      category: "Marketplace",
      discount: 40,
      seller: "Tala Electronics",
      location: "Kwa Ndege",
      endsIn: "5 days left",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Boda Ride Pass",
      description: "Buy 10 rides, get 3 free. Limited time offer!",
      image:
        "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      category: "Transport",
      discount: 30,
      seller: "E-TALA Riders",
      location: "All Tala",
      endsIn: "3 days left",
      rating: 4.8,
    },
    {
      id: 4,
      title: "Weekend Getaway",
      description: "30% off stays at Tala View Hotel",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "Stays",
      discount: 30,
      seller: "Tala View Hotel",
      location: "Matungulu",
      endsIn: "Book by Sunday",
      rating: 4.5,
    },
    {
      id: 5,
      title: "Salon Day Special",
      description: "25% off on all beauty services",
      image:
        "https://images.unsplash.com/photo-1560066984-13812e35c06d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      category: "Services",
      discount: 25,
      seller: "Mama Joy Salon",
      location: "Kwa Ndege",
      endsIn: "Today only",
      rating: 4.6,
    },
  ];

  // Daily Updates Posts - matching blog design
  const dailyUpdates: UpdatePost[] = [
    {
      id: 1,
      title: "Fresh Produce Arrival",
      content:
        "Truckload of fresh tomatoes, sukuma, and onions just arrived at Kwa Ndege market. Farmers from Kyumbi delivering now. Early bird gets the freshest picks!",
      time: "30 minutes ago",
      category: "Market Update",
      categoryIcon: Wheat,
      author: "Market Committee",
      views: 234,
      likes: 45,
      comments: 12,
      image:
        "https://images.unsplash.com/photo-1488459716781-31db52582cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      isFeatured: true,
      location: "Kwa Ndege Market",
      seller: "Various Farmers",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Flash Sale: Electronics",
      content:
        "Tala Electronics just dropped 30% off on all smartphones for the next 6 hours. 15 units remaining! Includes 3-month warranty.",
      time: "2 hours ago",
      category: "Flash Sale",
      categoryIcon: Store,
      author: "Tala Electronics",
      views: 567,
      likes: 89,
      comments: 23,
      image:
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
      offer: {
        discount: 30,
        code: "FLASH30",
        expires: "6 hours left",
      },
      location: "Tala Town",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Community Spotlight: Sarah Kamau",
      content:
        "Meet Sarah Kamau, our Community Lead. She's helped 50+ farmers join E-TALA this month. Drop a thank you message!",
      time: "5 hours ago",
      category: "Community",
      categoryIcon: Users,
      author: "E-TALA Team",
      views: 890,
      likes: 156,
      comments: 34,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
      rating: 5.0,
    },
    {
      id: 4,
      title: "Game Winner Announcement",
      content:
        "Congratulations to Mary K. who won 70% off verification in yesterday's riddle game! New game starts at 3 PM today with even bigger prizes.",
      time: "12 hours ago",
      category: "Winner",
      categoryIcon: Award,
      author: "Games Master",
      views: 432,
      likes: 78,
      comments: 19,
      image:
        "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      offer: {
        discount: 70,
        expires: "Game starts at 3 PM",
      },
    },
    {
      id: 5,
      title: "New Rider Registration",
      content:
        "20 new boda riders joined our platform this week. Shorter wait times for deliveries starting Monday! Welcome our new partners.",
      time: "1 day ago",
      category: "Service Update",
      categoryIcon: Bike,
      author: "Operations Team",
      views: 345,
      likes: 67,
      comments: 8,
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      location: "All Tala",
      rating: 4.9,
    },
    {
      id: 6,
      title: "Weekend Market Days",
      content:
        "Special weekend market at Tala Town this Saturday. 50+ sellers, live music, and kids activities. Free entry! Farmers market, crafts, and food stalls.",
      time: "1 day ago",
      category: "Event",
      categoryIcon: Calendar,
      author: "Events Team",
      views: 678,
      likes: 123,
      comments: 31,
      image:
        "https://images.unsplash.com/photo-1533907650686-70576141c071?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      location: "Tala Town",
      rating: 4.6,
    },
  ];

  // Blog Posts for Sellers & Buyers
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "10 Tips for New Sellers on E-TALA",
      excerpt:
        "Learn how to optimize your listings, get verified, and start making sales within your first week on the platform.",
      author: "Abraham Kioko",
      authorRole: "Founder",
      date: "Mar 10, 2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "seller",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      title: "How to Find the Best Deals in Tala",
      excerpt:
        "A buyer's guide to navigating flash sales, using filters, and saving money on your daily purchases.",
      author: "Sarah Kamau",
      authorRole: "Community Lead",
      date: "Mar 8, 2026",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "buyer",
      likes: 67,
      comments: 23,
    },
    {
      id: 3,
      title: "Why Verification Matters for Your Business",
      excerpt:
        "Building trust with customers through verification badges and how it increases your sales by up to 40%.",
      author: "David Mutua",
      authorRole: "Tech Lead",
      date: "Mar 5, 2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      category: "seller",
      likes: 34,
      comments: 8,
    },
    {
      id: 4,
      title: "A Guide to E-TALA Rides: Save Time & Money",
      excerpt:
        "Everything you need to know about booking boda rides, delivery options, and how to become a rider.",
      author: "Grace Wanjiku",
      authorRole: "Operations Manager",
      date: "Mar 3, 2026",
      readTime: "3 min read",
      image:
        "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
      category: "buyer",
      likes: 56,
      comments: 14,
    },
    {
      id: 5,
      title: "From Farm to Table: How Farmers Benefit",
      excerpt:
        "Local farmers share their success stories selling directly to customers through E-TALA.",
      author: "Mama Lucy",
      authorRole: "Featured Farmer",
      date: "Feb 28, 2026",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1500595046743-fd4d19457b4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "seller",
      likes: 89,
      comments: 31,
    },
    {
      id: 6,
      title: "Top 5 Services You Didn't Know You Could Book",
      excerpt:
        "From plumbing to graphic design, discover the variety of services available in Tala.",
      author: "E-TALA Team",
      authorRole: "Editorial",
      date: "Feb 25, 2026",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
      category: "general",
      likes: 42,
      comments: 7,
    },
  ];

  // Filter posts by category
  const filteredPosts =
    selectedCategory === "all"
      ? dailyUpdates
      : selectedCategory === "offers"
      ? dailyUpdates.filter((post) => post.offer)
      : dailyUpdates.filter(
          (post) =>
            post.category.toLowerCase().includes(selectedCategory) ||
            (selectedCategory === "community" && post.category === "Community")
        );

  // Filter blog posts
  const filteredBlogs =
    blogCategory === "all"
      ? blogPosts
      : blogPosts.filter((blog) => blog.category === blogCategory);

  // Featured posts (for highlighting)
  const featuredPosts = dailyUpdates.filter((post) => post.isFeatured);

  // Slideshow navigation - arrows moved slightly above descriptions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideOffers.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slideOffers.length) % slideOffers.length
    );
  };

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle save post
  const toggleSave = (postId: number) => {
    setSavedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  // Handle like post
  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  // Handle save blog
  const toggleSaveBlog = (blogId: number) => {
    setSavedBlogs((prev) =>
      prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId]
    );
  };

  // Handle like blog
  const toggleLikeBlog = (blogId: number) => {
    setLikedBlogs((prev) =>
      prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId]
    );
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Header with Back Arrow */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <BackArrow />
              <h1 className="text-xl font-display font-semibold text-charcoal flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-sky-500" />
                Daily Updates
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors relative"
                aria-label="Filter updates"
              >
                <SlidersHorizontal className="w-5 h-5" />
                {selectedCategory !== "all" && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    1
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar - Collapsible */}
      {showFilters && (
        <div className="bg-white border-b border-sky-100 animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-charcoal">
                Filter by category
              </h2>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setShowFilters(false);
                }}
                className="text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                Clear all
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setShowFilters(false);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? `bg-gradient-to-r ${cat.color} text-white shadow-sm`
                        : "bg-sky-50 text-sky-700 hover:bg-sky-100"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
        {/* Slideshow Section - Arrows adjusted */}
        <section className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-sky-100">
          <div
            className="relative h-80 sm:h-96 md:h-[450px]"
            ref={slideshowRef}
          >
            {/* Slide Images */}
            {slideOffers.map((offer, index) => (
              <div
                key={offer.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-sky-500 text-white text-xs px-2 py-1 rounded-full">
                      {offer.discount}% OFF
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {offer.category}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {offer.endsIn}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-2">
                    {offer.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/90 mb-3 max-w-2xl">
                    {offer.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-white/80 mb-4">
                    <span className="flex items-center gap-1">
                      <Store className="w-3 h-3" />
                      {offer.seller}
                    </span>
                    <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                    <MapPin className="w-3 h-3" />
                    <span>{offer.location}</span>
                    <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-300 fill-current" />
                      {offer.rating}
                    </span>
                  </div>

                  <button className="bg-white text-sky-600 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-sky-50 transition-colors inline-flex items-center gap-2 shadow-lg">
                    Claim Offer
                    <Tag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Navigation Arrows - Responsive positioning */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/4 sm:top-1/3 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-black/50 transition-colors z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/4 sm:top-1/3 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-black/50 transition-colors z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slideOffers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-white"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post (if any) */}
        {featuredPosts.length > 0 && (
          <section className="bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl p-5 text-white shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                  <span className="text-xs text-white/80">
                    {featuredPosts[0].time}
                  </span>
                </div>
                <h3 className="text-base font-display font-semibold mb-1">
                  {featuredPosts[0].title}
                </h3>
                <p className="text-sm text-white/90 line-clamp-2 mb-2">
                  {featuredPosts[0].content}
                </p>
                <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors inline-flex items-center gap-1">
                  Read more
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Daily Updates Feed - Now matching blog design */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-500" />
              Latest Updates
              {selectedCategory !== "all" && (
                <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-text">
                {filteredPosts.length} posts
              </span>

              {/* Updates View Mode Toggle */}
              <div className="flex bg-sky-50 rounded-full p-1">
                <button
                  onClick={() => setUpdatesViewMode("grid")}
                  className={`p-1.5 rounded-full transition-all ${
                    updatesViewMode === "grid"
                      ? "bg-white text-sky-700 shadow-sm"
                      : "text-sky-600 hover:text-sky-700"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setUpdatesViewMode("list")}
                  className={`p-1.5 rounded-full transition-all ${
                    updatesViewMode === "list"
                      ? "bg-white text-sky-700 shadow-sm"
                      : "text-sky-600 hover:text-sky-700"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Updates Grid/List - Matching blog design */}
          <div
            className={
              updatesViewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }
          >
            {filteredPosts.map((post) => {
              const isSaved = savedPosts.includes(post.id);
              const isLiked = likedPosts.includes(post.id);

              return (
                <article
                  key={post.id}
                  className={`bg-white rounded-xl border border-sky-100 overflow-hidden hover:shadow-md transition-shadow ${
                    updatesViewMode === "list"
                      ? "flex flex-col sm:flex-row"
                      : ""
                  }`}
                >
                  {/* Image */}
                  {post.image && (
                    <div
                      className={
                        updatesViewMode === "list"
                          ? "sm:w-48 h-48 sm:h-auto"
                          : "h-48"
                      }
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-slate-text/60">
                            {post.time}
                          </span>
                        </div>
                        <h3 className="text-sm font-display font-semibold text-charcoal">
                          {post.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => toggleSave(post.id)}
                        className={`p-1.5 rounded-full transition-colors ${
                          isSaved
                            ? "text-sky-600"
                            : "text-slate-text hover:text-sky-600"
                        }`}
                        aria-label={isSaved ? "Unsave post" : "Save post"}
                      >
                        <Bookmark
                          className="w-4 h-4"
                          fill={isSaved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    {/* Location & Seller (if available) */}
                    {(post.location || post.seller || post.rating) && (
                      <div className="flex items-center gap-2 text-[10px] text-slate-text/70 mb-2 flex-wrap">
                        {post.seller && (
                          <>
                            <Store className="w-3 h-3" />
                            <span>{post.seller}</span>
                          </>
                        )}
                        {post.seller && post.location && (
                          <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        )}
                        {post.location && (
                          <>
                            <MapPin className="w-3 h-3" />
                            <span>{post.location}</span>
                          </>
                        )}
                        {post.rating && (
                          <>
                            <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span>{post.rating}</span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Content - truncated */}
                    <p className="text-xs text-slate-text mb-3 line-clamp-2">
                      {post.content}
                    </p>

                    {/* Offer Badge (if applicable) */}
                    {post.offer && (
                      <div className="bg-sky-50 rounded-lg p-2 mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Tag className="w-4 h-4 text-sky-600" />
                          <span className="text-xs font-medium text-sky-700">
                            {post.offer.discount}% OFF
                          </span>
                          {post.offer.code && (
                            <code className="text-xs bg-white px-1.5 py-0.5 rounded text-sky-600 border border-sky-200">
                              {post.offer.code}
                            </code>
                          )}
                        </div>
                        <span className="text-[10px] text-sky-600/70">
                          {post.offer.expires}
                        </span>
                      </div>
                    )}

                    {/* Footer - Author & Stats */}
                    <div className="flex items-center justify-between pt-2 border-t border-sky-100">
                      <div className="flex items-center gap-2 text-[10px] text-slate-text/70">
                        <span>By {post.author}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1 text-xs transition-colors ${
                            isLiked
                              ? "text-sky-600"
                              : "text-slate-text hover:text-sky-600"
                          }`}
                          aria-label={isLiked ? "Unlike" : "Like"}
                        >
                          <ThumbsUp
                            className="w-3.5 h-3.5"
                            fill={isLiked ? "currentColor" : "none"}
                          />
                          <span>{post.likes + (isLiked ? 1 : 0)}</span>
                        </button>

                        <button className="flex items-center gap-1 text-xs text-slate-text hover:text-sky-600 transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{post.comments}</span>
                        </button>

                        <button className="flex items-center gap-1 text-xs text-slate-text hover:text-sky-600 transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{post.views}</span>
                        </button>

                        <button className="text-slate-text hover:text-sky-600 transition-colors">
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-sky-100 col-span-full">
                <Newspaper className="w-12 h-12 text-slate-text/30 mx-auto mb-3" />
                <p className="text-sm text-slate-text">
                  No updates in this category
                </p>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="mt-2 text-sky-600 text-sm hover:underline"
                >
                  View all updates
                </button>
              </div>
            )}
          </div>
        </section>

        

        {/* Blog Section for Sellers & Buyers */}
        <section className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-500" />
              Articles & Guides
            </h2>
            <div className="flex items-center gap-2">
              {/* Blog Category Toggle */}
              <div className="flex bg-sky-50 rounded-full p-1">
                <button
                  onClick={() => setBlogCategory("all")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                    blogCategory === "all"
                      ? "bg-white text-sky-700 shadow-sm"
                      : "text-sky-600 hover:text-sky-700"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setBlogCategory("seller")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1 ${
                    blogCategory === "seller"
                      ? "bg-white text-sky-700 shadow-sm"
                      : "text-sky-600 hover:text-sky-700"
                  }`}
                >
                  <Store className="w-3 h-3" />
                  Sellers
                </button>
                <button
                  onClick={() => setBlogCategory("buyer")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1 ${
                    blogCategory === "buyer"
                      ? "bg-white text-sky-700 shadow-sm"
                      : "text-sky-600 hover:text-sky-700"
                  }`}
                >
                  <Users className="w-3 h-3" />
                  Buyers
                </button>
              </div>

              {/* Blog View Mode Toggle */}
              <div className="flex bg-sky-50 rounded-full p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-full transition-all ${
                    viewMode === "grid"
                      ? "bg-white text-sky-700 shadow-sm"
                      : "text-sky-600 hover:text-sky-700"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-full transition-all ${
                    viewMode === "list"
                      ? "bg-white text-sky-700 shadow-sm"
                      : "text-sky-600 hover:text-sky-700"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }
          >
            {filteredBlogs.map((blog) => {
              const isSaved = savedBlogs.includes(blog.id);
              const isLiked = likedBlogs.includes(blog.id);

              return (
                <article
                  key={blog.id}
                  className={`bg-white rounded-xl border border-sky-100 overflow-hidden hover:shadow-md transition-shadow ${
                    viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={
                      viewMode === "list" ? "sm:w-48 h-48 sm:h-auto" : "h-48"
                    }
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              blog.category === "seller"
                                ? "bg-sky-100 text-sky-700"
                                : blog.category === "buyer"
                                ? "bg-green-100 text-green-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {blog.category === "seller"
                              ? "For Sellers"
                              : blog.category === "buyer"
                              ? "For Buyers"
                              : "General"}
                          </span>
                          <span className="text-[10px] text-slate-text/60">
                            {blog.readTime}
                          </span>
                        </div>
                        <h3 className="text-sm font-display font-semibold text-charcoal">
                          {blog.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => toggleSaveBlog(blog.id)}
                        className={`p-1.5 rounded-full transition-colors ${
                          isSaved
                            ? "text-sky-600"
                            : "text-slate-text hover:text-sky-600"
                        }`}
                      >
                        <Bookmark
                          className="w-4 h-4"
                          fill={isSaved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <p className="text-xs text-slate-text mb-3 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-sky-100">
                      <div className="flex items-center gap-2 text-[10px] text-slate-text/70">
                        <span>{blog.author}</span>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span>{blog.authorRole}</span>
                        <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                        <span>{blog.date}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLikeBlog(blog.id)}
                          className={`flex items-center gap-1 text-xs transition-colors ${
                            isLiked
                              ? "text-sky-600"
                              : "text-slate-text hover:text-sky-600"
                          }`}
                        >
                          <ThumbsUp
                            className="w-3.5 h-3.5"
                            fill={isLiked ? "currentColor" : "none"}
                          />
                          <span>{blog.likes + (isLiked ? 1 : 0)}</span>
                        </button>

                        <button className="flex items-center gap-1 text-xs text-slate-text hover:text-sky-600 transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{blog.comments}</span>
                        </button>

                        <button className="text-slate-text hover:text-sky-600 transition-colors">
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-sky-100">
              <BookOpen className="w-12 h-12 text-slate-text/30 mx-auto mb-3" />
              <p className="text-sm text-slate-text">
                No articles in this category
              </p>
            </div>
          )}
        </section>

        {/* Load More Button */}
        {(filteredPosts.length > 0 || filteredBlogs.length > 0) && (
          <div className="text-center pt-4">
            <button className="bg-white border border-sky-200 text-sky-700 px-6 py-3 rounded-full text-sm font-medium hover:bg-sky-50 transition-colors inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyUpdates;
