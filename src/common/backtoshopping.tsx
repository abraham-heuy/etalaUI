// pages/dashboard/BackToShopping.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Sprout, 
  UtensilsCrossed, 
  Hotel, 
  CarTaxiFront, 
  Briefcase,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Search,
  ChevronRight,
  Zap,
  Star,
  Truck,
  Shield,
  Send,
} from 'lucide-react';

const categories = [
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Electronics, fashion, household, beauty, sports, books, and more.',
    icon: ShoppingBag,
    color: 'bg-sky-500',
    bgLight: 'bg-sky-50',
    textColor: 'text-sky-600',
    link: '/marketplace',
    examples: ['Smartphones', 'Clothing', 'Home Decor'],
    popular: true,
  },
  {
    id: 'farmers',
    name: 'Farmers',
    description: 'Fresh organic produce, farm-fresh eggs, vegetables, fruits, and crops.',
    icon: Sprout,
    color: 'bg-green-500',
    bgLight: 'bg-green-50',
    textColor: 'text-green-600',
    link: '/farmers',
    examples: ['Tomatoes', 'Kale', 'Avocados'],
    popular: true,
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Delicious meals, restaurant offerings, prepared foods, and catering.',
    icon: UtensilsCrossed,
    color: 'bg-amber-500',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-600',
    link: '/food',
    examples: ['Pizza', 'Ugali', 'Nyama Choma'],
    popular: true,
  },
  {
    id: 'stays',
    name: 'Stays',
    description: 'Accommodation, short-term rentals, lodges, and unique stays.',
    icon: Hotel,
    color: 'bg-purple-500',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-600',
    link: '/stays',
    examples: ['Tala Lodge', 'Farm Stay', 'Vacation Home'],
    popular: false,
  },
  {
    id: 'boda',
    name: 'Boda & Transport',
    description: 'Boda boda, taxi, tuk-tuk, and delivery services around Tala.',
    icon: CarTaxiFront,
    color: 'bg-orange-500',
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-600',
    link: '/boda',
    examples: ['Airport Transfer', 'Food Delivery', 'Courier'],
    popular: false,
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Professional services, consultations, home repairs, and bookings.',
    icon: Briefcase,
    color: 'bg-indigo-500',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    link: '/services',
    examples: ['Plumbing', 'Tutoring', 'Event Planning'],
    popular: false,
  },
];

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  options?: { text: string; action: () => void }[];
}

const BackToShopping: React.FC = () => {
  const navigate = useNavigate();
  const [showAssistant, setShowAssistant] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [, setAssistantState] = useState<'greeting' | 'category' | 'search' | 'help'>('greeting');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (showAssistant) setTimeout(() => inputRef.current?.focus(), 100);
  }, [showAssistant]);

  const addMessage = (text: string, sender: 'user' | 'assistant', options?: { text: string; action: () => void }[]) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      options,
    }]);
  };

  const assistantReply = (text: string, options?: { text: string; action: () => void }[]) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage(text, 'assistant', options);
      setIsTyping(false);
    }, 500 + Math.random() * 400);
  };

  const initAssistant = () => {
    if (messages.length === 0) {
      addMessage('Hello! I am your shopping assistant. How can I help you today?', 'assistant', [
        { text: 'Browse categories', action: () => handleCategoryIntent() },
        { text: 'Find a product', action: () => handleFindIntent() },
        { text: 'Get recommendations', action: () => handleRecommendIntent() },
        { text: 'Order help', action: () => handleHelpIntent() },
      ]);
    }
  };

  const handleCategoryIntent = (specificCategory?: string) => {
    if (specificCategory) {
      addMessage(`I want to browse ${specificCategory}`, 'user');
      const cat = categories.find(c => c.name.toLowerCase() === specificCategory.toLowerCase());
      if (cat) {
        assistantReply(`Great! Here are some popular items in ${cat.name}. Would you like to explore this category?`, [
          { text: `Go to ${cat.name}`, action: () => navigateToCategory(cat.link) },
          ...cat.examples.map(ex => ({
            text: `Search for ${ex}`,
            action: () => navigateToSearch(ex)
          }))
        ]);
      } else {
        assistantReply(`I couldn't find a category named "${specificCategory}". Here are all categories:`, 
          categories.map(c => ({ text: c.name, action: () => navigateToCategory(c.link) }))
        );
      }
    } else {
      addMessage('Browse categories', 'user');
      assistantReply('Here are all our shopping categories. Which one interests you?', 
        categories.map(cat => ({ text: cat.name, action: () => navigateToCategory(cat.link) }))
      );
    }
    setAssistantState('category');
  };

  const handleFindIntent = () => {
    addMessage('Find a product', 'user');
    assistantReply('What product are you looking for? You can type a name (e.g., "iphone", "tomatoes").');
    setAssistantState('search');
  };

  const handleRecommendIntent = () => {
    addMessage('Get recommendations', 'user');
    assistantReply('Based on popular items, here are some suggestions:', [
      { text: 'Electronics deals', action: () => navigateToCategory('/marketplace?deal=true') },
      { text: 'Fresh farm produce', action: () => navigateToCategory('/farmers') },
      { text: 'Best local restaurants', action: () => navigateToCategory('/food') },
      { text: 'Weekend staycation', action: () => navigateToCategory('/stays') },
    ]);
  };

  const handleHelpIntent = () => {
    addMessage('Order help', 'user');
    assistantReply('I can help with orders, payments, or deliveries. What seems to be the problem?', [
      { text: 'Order status', action: () => navigateToOrders() },
      { text: 'Payment issue', action: () => navigateToPayments() },
      { text: 'Delivery problem', action: () => navigateToSupport() },
      { text: 'Return an item', action: () => navigateToReturns() },
    ]);
  };

  const navigateToCategory = (link: string) => {
    addMessage(`Go to ${link}`, 'user');
    assistantReply(`Taking you to the ${link.split('/')[1]} section.`, []);
    setTimeout(() => navigate(link), 800);
  };

  const navigateToOrders = () => {
    addMessage('Check my order status', 'user');
    assistantReply('Redirecting to your orders...', []);
    setTimeout(() => navigate('/dashboard/orders'), 800);
  };

  const navigateToPayments = () => {
    addMessage('Payment issue', 'user');
    assistantReply('Please visit your payment settings or contact support.', []);
    setTimeout(() => navigate('/dashboard/payments'), 800);
  };

  const navigateToSupport = () => {
    addMessage('Delivery problem', 'user');
    assistantReply('You can reach our support team at support@etala.com or call 0700-000-000.', []);
  };

  const navigateToReturns = () => {
    addMessage('Return an item', 'user');
    assistantReply('Go to your orders, select the order, and click "Return Items".', []);
  };

  const navigateToSearch = (query: string) => {
    addMessage(`Search for "${query}"`, 'user');
    assistantReply(`Searching marketplace for "${query}"...`, []);
    setTimeout(() => navigate(`/marketplace/search?q=${encodeURIComponent(query)}`), 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue.trim();
    addMessage(userMsg, 'user');
    setInputValue('');

    // Detect if user typed a category name
    const matchedCategory = categories.find(cat => cat.name.toLowerCase() === userMsg.toLowerCase());
    if (matchedCategory) {
      handleCategoryIntent(matchedCategory.name);
      return;
    }

    // Check for intent keywords
    const lowerMsg = userMsg.toLowerCase();
    if (lowerMsg.includes('category') || lowerMsg.includes('browse')) {
      handleCategoryIntent();
    } else if (lowerMsg.includes('recommend') || lowerMsg.includes('suggest')) {
      handleRecommendIntent();
    } else if (lowerMsg.includes('help') || lowerMsg.includes('issue') || lowerMsg.includes('problem') ||
               lowerMsg.includes('order') || lowerMsg.includes('payment') || lowerMsg.includes('delivery')) {
      handleHelpIntent();
    } else {
      // Treat as product search
      assistantReply(`Searching for "${userMsg}"... Here are some results.`, [
        { text: `See all results for "${userMsg}"`, action: () => navigateToSearch(userMsg) }
      ]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleToggleAssistant = () => {
    setShowAssistant(!showAssistant);
    if (!showAssistant && messages.length === 0) {
      initAssistant();
    }
  };

  return (
    <div className="min-h-screen bg-soft-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal">Back to Shopping</h1>
            <p className="text-slate-text mt-1">Explore all our services and find what you need.</p>
          </div>
          <button
            onClick={handleToggleAssistant}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors self-start"
          >
            <MessageCircle className="w-4 h-4" />
            {showAssistant ? 'Hide Assistant' : 'Shopping Assistant'}
          </button>
        </div>

        {/* Assistant Chat Panel */}
        {showAssistant && (
          <div className="bg-white rounded-2xl border border-sky-100 shadow-md mb-8 overflow-hidden flex flex-col h-[500px] sm:h-[600px]">
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-3 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Shopping Assistant</span>
              </div>
              <button onClick={() => setShowAssistant(false)} className="text-white/80 hover:text-white">
                <ChevronRight className="w-5 h-5 rotate-90" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user' 
                      ? 'bg-sky-500 text-white rounded-br-none' 
                      : 'bg-white border border-sky-100 text-charcoal rounded-bl-none shadow-sm'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    {msg.options && msg.options.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={opt.action}
                            className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors"
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="text-[10px] opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-sky-100 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-sky-100 bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-sky-200 rounded-xl focus:outline-none focus:border-sky-400 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-text mt-2 text-center">
                Try: "marketplace", "find shoes", "recommendations", "order help"
              </p>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearchSubmit} className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all categories..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-sky-200 rounded-xl focus:outline-none focus:border-sky-400"
            />
          </form>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={cat.link}
                className={`group ${cat.bgLight} rounded-2xl border border-sky-100 overflow-hidden hover:shadow-lg transition-all duration-300`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-white shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {cat.popular && (
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Popular
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl font-display font-semibold ${cat.textColor} mb-2`}>{cat.name}</h3>
                  <p className="text-sm text-slate-text leading-relaxed mb-3">{cat.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {cat.examples.map((ex, idx) => (
                      <span key={idx} className="text-xs bg-white/60 px-2 py-1 rounded-full text-slate-text">{ex}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-text/70 mb-3">
                    <Truck className="w-3 h-3" />
                    <span>Free delivery on orders over KSh 5,000</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs text-slate-text/70">
                      <Shield className="w-3 h-3" />
                      <span>Verified sellers</span>
                    </div>
                    <div className="flex items-center text-xs font-medium text-sky-500 group-hover:underline">
                      Shop now <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Trust & Safety Banner */}
        <div className="mt-10 bg-white rounded-xl border border-sky-100 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">Secure Shopping Guarantee</p>
              <p className="text-xs text-slate-text">Your payments are protected and your data is encrypted.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">Fast Delivery</p>
              <p className="text-xs text-slate-text">Same-day delivery in Tala and surrounding areas.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">Quality Guarantee</p>
              <p className="text-xs text-slate-text">100% authentic products from trusted sellers.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-text">
            Need help deciding? <button onClick={() => setShowAssistant(true)} className="text-sky-600 hover:underline">Ask the assistant</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackToShopping;