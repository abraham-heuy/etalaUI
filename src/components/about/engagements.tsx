// components/about/EngagementsContent.tsx
import React, { useState } from 'react';
import { 
  Star, 
  Users, 
  Calendar, 
  Tag, 
  Sparkles,
  Heart,
  Cake,
  Plane,
  Award,
  Gamepad2,
  Puzzle,
  Trophy,
  Bell,
  Newspaper,
  ExternalLink,
  Percent,
  Shield,
  CheckCircle,
  ArrowRight,
  Store,
  Wheat,
  Bike,
  Wrench,
  Coffee,
  Hotel,
  Briefcase,
  BadgeCheck,
  Timer,
  AlertCircle,
  MapPin,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Eye
} from 'lucide-react';

const EngagementsContent: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Offers', icon: Sparkles },
    { id: 'marketplace', name: 'Marketplace', icon: Store },
    { id: 'farmers', name: 'Farmers', icon: Wheat },
    { id: 'transport', name: 'Transport', icon: Bike },
    { id: 'services', name: 'Services', icon: Wrench },
    { id: 'food', name: 'Food', icon: Coffee },
    { id: 'stays', name: 'Stays', icon: Hotel },
    { id: 'freelancers', name: 'Freelancers', icon: Briefcase },
  ];

  // Flash Sales Data - Expanded with all categories
  const flashSales = [
    {
      id: 1,
      title: 'Farm Fresh Bundle',
      seller: 'Mama Lucy\'s Farm',
      sellerVerified: true,
      category: 'farmers',
      originalPrice: 1200,
      salePrice: 899,
      discount: 25,
      endsIn: '2h 15m',
      claimed: 128,
      limit: 200,
      location: 'Tala Town',
      rating: 4.9,
      reviews: 128,
      badge: 'Flash Sale',
      description: 'Fresh sukuma wiki, tomatoes, onions, and Irish potatoes - harvested today'
    },
    {
      id: 2,
      title: 'Electronics Clearance',
      seller: 'Tala Electronics',
      sellerVerified: true,
      category: 'marketplace',
      originalPrice: 3500,
      salePrice: 2499,
      discount: 28,
      endsIn: '5h 30m',
      claimed: 56,
      limit: 100,
      location: 'Tala Town',
      rating: 4.7,
      reviews: 89,
      badge: 'Limited Stock',
      description: 'Gently used smartphones and accessories with 3-month warranty'
    },
    {
      id: 3,
      title: 'Boda Ride Pass',
      seller: 'E-TALA Riders',
      sellerVerified: true,
      category: 'transport',
      originalPrice: 1000,
      salePrice: 750,
      discount: 25,
      endsIn: '1d 3h',
      claimed: 203,
      limit: 300,
      location: 'All Areas',
      rating: 4.8,
      reviews: 312,
      badge: 'Weekly Special',
      description: '10 rides for the price of 7. Valid anywhere in Tala'
    },
    {
      id: 4,
      title: 'Salon Package',
      seller: 'Mama Joy Salon',
      sellerVerified: true,
      category: 'services',
      originalPrice: 800,
      salePrice: 599,
      discount: 25,
      endsIn: '12h 45m',
      claimed: 42,
      limit: 150,
      location: 'Kwa Ndege',
      rating: 4.6,
      reviews: 67,
      badge: 'New',
      description: 'Haircut, styling, and manicure combo - all in one package'
    },
    {
      id: 5,
      title: 'Weekend Getaway',
      seller: 'Tala View Hotel',
      sellerVerified: true,
      category: 'stays',
      originalPrice: 4500,
      salePrice: 3299,
      discount: 27,
      endsIn: '2d 5h',
      claimed: 34,
      limit: 50,
      location: 'Matungulu',
      rating: 4.5,
      reviews: 42,
      badge: 'Weekend Special',
      description: 'One night stay for two with breakfast included'
    },
    {
      id: 6,
      title: 'Graphic Design Package',
      seller: 'Tala Designs',
      sellerVerified: false,
      category: 'freelancers',
      originalPrice: 3000,
      salePrice: 1999,
      discount: 33,
      endsIn: '3d 2h',
      claimed: 18,
      limit: 30,
      location: 'Remote',
      rating: 4.4,
      reviews: 23,
      badge: 'Freelancer Deal',
      description: 'Logo + business card design for your business'
    },
    {
      id: 7,
      title: 'Lunch Special',
      seller: 'Kwa Ndege Eatery',
      sellerVerified: true,
      category: 'food',
      originalPrice: 500,
      salePrice: 350,
      discount: 30,
      endsIn: '4h 20m',
      claimed: 87,
      limit: 120,
      location: 'Kwa Ndege',
      rating: 4.3,
      reviews: 156,
      badge: 'Lunch Deal',
      description: 'Nyama choma + ugali + kachumbari + soda'
    },
    {
      id: 8,
      title: 'Plumbing Service',
      seller: 'John\'s Plumbing',
      sellerVerified: true,
      category: 'services',
      originalPrice: 1500,
      salePrice: 999,
      discount: 33,
      endsIn: '6d 1h',
      claimed: 23,
      limit: 40,
      location: 'All Tala',
      rating: 4.7,
      reviews: 78,
      badge: 'Service Deal',
      description: 'Fix leaky pipes or install new fixtures - parts not included'
    },
  ];

  // Filter flash sales by category
  const filteredSales = activeCategory === 'all' 
    ? flashSales 
    : flashSales.filter(sale => sale.category === activeCategory);

  // Special Occasion Offers
  const occasionOffers = [
    {
      id: 1,
      title: 'Birthday Special',
      description: 'Get 30% off your first purchase during your birthday month',
      icon: Cake,
      color: 'from-pink-400 to-red-500',
      code: 'BDAY30',
      expires: 'Valid within 30 days of birthday',
      applicableTo: 'All categories',
      verifiedOnly: false
    },
    {
      id: 2,
      title: 'Honeymoon Package',
      description: 'Special discounts for newlyweds on home essentials and stays',
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      code: 'LOVE25',
      expires: 'Valid for 60 days after wedding',
      applicableTo: 'Marketplace, Stays',
      verifiedOnly: true
    },
    {
      id: 3,
      title: 'Vacation Mode',
      description: 'Book accommodations and get 20% off local experiences',
      icon: Plane,
      color: 'from-blue-400 to-cyan-500',
      code: 'TRIP20',
      expires: 'Book 14+ days in advance',
      applicableTo: 'Stays, Transport',
      verifiedOnly: false
    },
    {
      id: 4,
      title: 'New Business Launch',
      description: 'First-time sellers get 50% off verification and featured listing',
      icon: Store,
      color: 'from-green-400 to-emerald-500',
      code: 'WELCOME50',
      expires: 'Valid for first 30 days',
      applicableTo: 'Sellers only',
      verifiedOnly: false
    },
    {
      id: 5,
      title: 'Referral Rewards',
      description: 'Refer a friend and you both get KSh 200 off your next purchase',
      icon: Users,
      color: 'from-purple-400 to-indigo-500',
      code: 'FRIEND200',
      expires: 'Ongoing',
      applicableTo: 'All users',
      verifiedOnly: false
    },
    {
      id: 6,
      title: 'Loyalty Discount',
      description: '5th purchase free for verified customers',
      icon: Award,
      color: 'from-yellow-400 to-amber-500',
      code: 'LOYAL5',
      expires: 'Auto-applied',
      applicableTo: 'Verified buyers only',
      verifiedOnly: true
    },
  ];

  // Verification Games
  const verificationGames = [
    {
      id: 'riddle',
      title: 'Riddle Me This',
      description: 'Solve 3 Tala-themed riddles and get 60% off verification',
      longDescription: 'Answer questions about local landmarks, market days, and community history. Perfect score unlocks 80% off!',
      icon: Puzzle,
      color: 'from-purple-400 to-indigo-500',
      difficulty: 'Medium',
      participants: 234,
      successRate: '45%',
      timeToComplete: '5-10 minutes',
      prize: '60-80% off verification'
    },
    {
      id: 'trivia',
      title: 'Tala Trivia Challenge',
      description: 'Test your knowledge about Tala. Win up to 80% off!',
      longDescription: 'Multiple choice questions about local businesses, prices, and community facts.',
      icon: Trophy,
      color: 'from-yellow-400 to-amber-500',
      difficulty: 'Easy',
      participants: 567,
      successRate: '72%',
      timeToComplete: '3-5 minutes',
      prize: '40-80% off verification'
    },
    {
      id: 'memory',
      title: 'Market Memory Game',
      description: 'Match local products and earn verification discounts',
      longDescription: 'Flip cards to match products with their prices. Faster matches = bigger discounts.',
      icon: Gamepad2,
      color: 'from-green-400 to-emerald-500',
      difficulty: 'Hard',
      participants: 189,
      successRate: '28%',
      timeToComplete: '2-8 minutes',
      prize: '50-90% off verification'
    },
    {
      id: 'photo',
      title: 'Spot the Shop',
      description: 'Identify local businesses from photos',
      longDescription: 'Look at photos of storefronts and guess the business name and location.',
      icon: Eye,
      color: 'from-blue-400 to-cyan-500',
      difficulty: 'Medium',
      participants: 145,
      successRate: '52%',
      timeToComplete: '4-6 minutes',
      prize: '50-75% off verification'
    },
  ];

  // Daily Updates (formerly Notice Board)
  const dailyUpdates = [
    {
      id: 1,
      title: 'Fresh Produce Arrival',
      content: 'Truckload of fresh tomatoes, sukuma, and onions just arrived at Kwa Ndege market. Farmers from Kyumbi delivering now.',
      time: '30 minutes ago',
      category: 'Market Update',
      icon: Wheat,
      author: 'Market Committee',
      views: 234,
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: 'Flash Sale: Electronics',
      content: 'Tala Electronics just dropped 30% off on all smartphones for the next 6 hours. 15 units remaining!',
      time: '2 hours ago',
      category: 'Flash Sale',
      icon: Store,
      author: 'Tala Electronics',
      views: 567,
      likes: 89,
      comments: 23
    },
    {
      id: 3,
      title: 'Community Spotlight',
      content: 'Meet Sarah Kamau, our Community Lead. She\'s helped 50+ farmers join E-TALA this month. Drop a thank you message!',
      time: '5 hours ago',
      category: 'Community',
      icon: Users,
      author: 'E-TALA Team',
      views: 890,
      likes: 156,
      comments: 34
    },
    {
      id: 4,
      title: 'Game Winner Announcement',
      content: 'Congratulations to Mary K. who won 70% off verification in yesterday\'s riddle game! New game starts at 3 PM today.',
      time: '12 hours ago',
      category: 'Winner',
      icon: Trophy,
      author: 'Games Master',
      views: 432,
      likes: 78,
      comments: 19
    },
    {
      id: 5,
      title: 'New Rider Registration',
      content: '20 new boda riders joined our platform this week. Shorter wait times for deliveries starting Monday!',
      time: '1 day ago',
      category: 'Service Update',
      icon: Bike,
      author: 'Operations Team',
      views: 345,
      likes: 67,
      comments: 8
    },
    {
      id: 6,
      title: 'Weekend Market Days',
      content: 'Special weekend market at Tala Town this Saturday. 50+ sellers, live music, and kids activities. Free entry!',
      time: '1 day ago',
      category: 'Event',
      icon: Calendar,
      author: 'Events Team',
      views: 678,
      likes: 123,
      comments: 31
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header with Daily Updates Link */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-charcoal flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-redbull-blue" />
            Offers & Community
          </h2>
          <p className="text-sm text-slate-text mt-1">
            Exclusive deals, fun games, and daily updates from e-tala
          </p>
        </div>
        <a 
          href="/daily-updates" 
          className="group flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-cool-gray hover:border-redbull-blue transition-colors"
        >
          <Newspaper className="w-4 h-4 text-redbull-blue" />
          <span className="text-sm font-medium text-charcoal">Daily Updates</span>
          <ExternalLink className="w-3 h-3 text-slate-text group-hover:text-redbull-blue transition-colors" />
        </a>
      </div>

      {/* Category Filter */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-redbull-blue text-white shadow-md' 
                  : 'bg-white border border-cool-gray text-slate-text hover:border-redbull-blue hover:text-redbull-blue'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Flash Sales Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-cool-gray">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <Tag className="w-5 h-5 text-redbull-blue" />
              Active Flash Sales
            </h3>
            <p className="text-xs text-slate-text mt-1">
              {filteredSales.length} deals available • Updated in real-time
            </p>
          </div>
          <span className="text-xs bg-redbull-blue-light text-redbull-blue px-2 py-1 rounded-full">
            {filteredSales.length} active
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredSales.map((sale) => (
            <div key={sale.id} className="group relative bg-white rounded-xl p-4 border border-cool-gray hover:border-redbull-blue transition-all hover:shadow-md">
              {/* Timer Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-redbull-blue text-xs px-2 py-1 rounded-full border border-cool-gray flex items-center gap-1">
                <Timer className="w-3 h-3" />
                {sale.endsIn}
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-warm-gray text-charcoal text-xs px-2 py-1 rounded-full border border-cool-gray">
                {categories.find(c => c.id === sale.category)?.name}
              </div>

              <div className="flex gap-3 mt-12">
                <div className="w-16 h-16 bg-redbull-blue-light rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-redbull-blue" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display font-semibold text-charcoal">{sale.title}</h4>
                    {sale.sellerVerified && (
                      <span className="relative group" title="Verified Seller">
                        <BadgeCheck className="w-4 h-4 text-redbull-blue" />
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-text mb-1">
                    <span>{sale.seller}</span>
                    <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                    <MapPin className="w-3 h-3" />
                    <span>{sale.location}</span>
                  </div>

                  <p className="text-xs text-slate-text/70 mb-2 line-clamp-2">
                    {sale.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium text-charcoal">{sale.rating}</span>
                    <span className="text-xs text-slate-text">({sale.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm text-slate-text line-through">KSh {sale.originalPrice}</span>
                    <span className="text-xl font-bold text-redbull-blue">KSh {sale.salePrice}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                      -{sale.discount}%
                    </span>
                  </div>

                  {/* Claim Progress */}
                  <div className="flex items-center gap-2 text-xs text-slate-text">
                    <div className="flex-1 h-1.5 bg-warm-gray rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-redbull-blue rounded-full"
                        style={{ width: `${(sale.claimed / sale.limit) * 100}%` }}
                      ></div>
                    </div>
                    <span>{sale.claimed}/{sale.limit} claimed</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-redbull-blue text-white py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90 transition-colors">
                  Claim Deal
                </button>
                <button className="w-10 h-10 border border-cool-gray rounded-full flex items-center justify-center hover:border-redbull-blue hover:text-redbull-blue transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSales.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-slate-text/30 mx-auto mb-3" />
            <p className="text-sm text-slate-text">No active flash sales in this category</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="mt-2 text-redbull-blue text-sm hover:underline"
            >
              View all deals
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <a href="/all-deals" className="text-sm text-redbull-blue hover:text-redbull-blue/80 transition-colors inline-flex items-center gap-1">
            Browse all {filteredSales.length} deals
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Special Occasion Offers - Grid with all 6 */}
      <section className="bg-gradient-to-br from-redbull-blue-light to-white rounded-2xl p-6 border border-redbull-blue/20">
        <h3 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-redbull-blue" />
          Special Occasion Offers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {occasionOffers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div key={offer.id} className="bg-white rounded-xl p-4 border border-cool-gray hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${offer.color} p-2`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  {offer.verifiedOnly && (
                    <span className="relative group" title="Verified only">
                      <BadgeCheck className="w-5 h-5 text-redbull-blue" />
                    </span>
                  )}
                </div>
                
                <h4 className="font-display font-semibold text-charcoal mb-1">{offer.title}</h4>
                <p className="text-xs text-slate-text mb-2">{offer.description}</p>
                
                <div className="bg-redbull-blue-light rounded-lg p-2 mb-2">
                  <code className="text-sm font-mono text-redbull-blue">{offer.code}</code>
                </div>
                
                <div className="flex items-center gap-1 text-[10px] text-slate-text/70 mb-1">
                  <Tag className="w-3 h-3" />
                  <span>{offer.applicableTo}</span>
                </div>
                
                <p className="text-[10px] text-slate-text/70">{offer.expires}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Verification Games Section - Expanded */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-cool-gray">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-redbull-blue" />
              Play & Save on Verification
            </h3>
            <p className="text-xs text-slate-text mt-1">
              Play games, earn discounts on your seller verification badge
            </p>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Up to 90% off
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {verificationGames.map((game) => {
            const Icon = game.icon;
            const isActive = activeGame === game.id;
            
            return (
              <div 
                key={game.id}
                className={`relative rounded-xl p-4 border-2 transition-all cursor-pointer ${
                  isActive 
                    ? 'border-redbull-blue bg-redbull-blue/5' 
                    : 'border-cool-gray bg-white hover:border-redbull-blue/30'
                }`}
                onClick={() => setActiveGame(isActive ? null : game.id)}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} p-2.5 mb-3`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                
                <h4 className="font-display font-semibold text-charcoal mb-1">{game.title}</h4>
                <p className="text-xs text-slate-text mb-2">{game.description}</p>
                
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {game.difficulty}
                  </span>
                  <span className="text-xs text-slate-text">{game.participants} played</span>
                  <span className="text-xs text-slate-text">{game.timeToComplete}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 font-medium">{game.successRate} win rate</span>
                  {isActive && (
                    <span className="text-xs bg-redbull-blue text-white px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                {isActive && (
                  <div className="mt-3 pt-3 border-t border-cool-gray">
                    <p className="text-xs text-slate-text mb-2">{game.longDescription}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-charcoal">Prize:</span>
                      <span className="text-xs text-redbull-blue font-medium">{game.prize}</span>
                    </div>
                    <button className="w-full bg-redbull-blue text-white py-2 rounded-full text-xs font-medium hover:bg-redbull-blue/90 transition-colors">
                      Play Now
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 bg-redbull-blue-light rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-redbull-blue flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-charcoal mb-1">How verification games work</h4>
              <p className="text-xs text-slate-text">
                Play fun games and quizzes to earn discounts on your seller verification badge. 
                The better you perform, the bigger your discount — up to 90% off! Games reset weekly.
              </p>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  Free to play
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  Instant discount
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  No limit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Updates Section (formerly Notice Board) */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-cool-gray">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-display font-semibold text-charcoal flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-redbull-blue" />
              Daily Updates
            </h3>
            <p className="text-xs text-slate-text mt-1">
              Latest news, announcements, and community highlights
            </p>
          </div>
          <a 
            href="/daily-updates" 
            className="text-sm text-redbull-blue hover:text-redbull-blue/80 transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="space-y-3">
          {dailyUpdates.slice(0, 4).map((post) => {
            const Icon = post.icon;
            return (
              <div key={post.id} className="group flex items-start gap-3 p-3 bg-warm-gray/30 rounded-xl hover:bg-warm-gray/50 transition-all cursor-pointer">
                <div className="w-8 h-8 bg-redbull-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-redbull-blue" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-redbull-blue">{post.category}</span>
                    <span className="text-[10px] text-slate-text/60">{post.time}</span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-charcoal mb-1 group-hover:text-redbull-blue transition-colors">
                    {post.title}
                  </h4>
                  
                  <p className="text-xs text-slate-text line-clamp-2 mb-2">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center gap-4 text-[10px] text-slate-text/60">
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
                    <span>By {post.author}</span>
                  </div>
                </div>

                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-slate-text hover:text-redbull-blue" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <a 
            href="/daily-updates/subscribe" 
            className="inline-flex items-center gap-2 text-xs bg-redbull-blue-light text-redbull-blue px-4 py-2 rounded-full hover:bg-redbull-blue hover:text-white transition-colors"
          >
            <Bell className="w-3 h-3" />
            Subscribe to Daily Updates
          </a>
        </div>
      </section>

      {/* Community Stats & Call to Action */}
      <section className="bg-gradient-to-r from-redbull-blue to-blue-600 rounded-2xl p-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Active Deals', value: '24', icon: Tag },
            { label: 'Games Played', value: '1,234', icon: Gamepad2 },
            { label: 'Savings Shared', value: 'KSh 45k+', icon: Percent },
            { label: 'Daily Readers', value: '567', icon: Users },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <h4 className="text-lg font-display font-semibold mb-2">Want to feature your deal?</h4>
          <p className="text-sm text-white/80 mb-4 max-w-lg mx-auto">
            Sellers can submit flash sales and special offers — free for verified businesses. 
            Get featured in our Daily Updates and reach thousands of customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-redbull-blue px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors inline-flex items-center gap-2">
              Submit Your Offer
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-white/30 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
              Learn About Verification
            </button>
          </div>
        </div>
      </section>

      {/* Daily Updates Footer Link */}
      <div className="text-center pt-4">
        <a 
          href="/daily-updates" 
          className="inline-flex items-center gap-2 text-sm text-slate-text hover:text-redbull-blue transition-colors"
        >
          <Newspaper className="w-4 h-4" />
          Visit our Daily Updates page for latest news, announcements, and community stories
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default EngagementsContent;