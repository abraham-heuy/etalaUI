// components/about/FAQsContent.tsx
import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle } from 'lucide-react';

const FAQsContent: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I start selling on E-TALA?',
      answer: 'Simply click "Get Started" in the navigation bar, select "I want to sell", and follow the registration process. You\'ll need to provide your business details and verify your phone number.',
      category: 'sellers'
    },
    {
      question: 'Is it free to list my products?',
      answer: 'Yes! Basic listings are completely free. We offer premium features like verified badges and featured listings for a small fee to help you stand out.',
      category: 'sellers'
    },
    {
      question: 'How do I place an order?',
      answer: 'Browse products, add items to your cart, and checkout. You can pay via M-PESA or choose cash on delivery. The seller will confirm your order within minutes.',
      category: 'buyers'
    },
    {
      question: 'How does delivery work?',
      answer: 'After ordering, you can either arrange pickup with the seller or book a boda rider through our platform for quick delivery anywhere in Tala.',
      category: 'buyers'
    },
    {
      question: 'Are sellers verified?',
      answer: 'Yes! We verify all sellers through physical visits or business permit checks. Verified sellers have a blue badge on their profile.',
      category: 'trust'
    },
    {
      question: 'What if I have a problem with my order?',
      answer: 'Contact our support team through the app or email. We mediate disputes and ensure fair resolutions for both buyers and sellers.',
      category: 'support'
    },
    {
      question: 'How do I become a boda rider?',
      answer: 'Sign up as a rider in the app, provide your license and bike details, and attend a brief orientation. Start earning immediately!',
      category: 'riders'
    },
    {
      question: 'What areas do you serve?',
      answer: 'Currently serving Tala Town, Kangundo, Matuu, and surrounding areas. We\'re expanding to more locations soon!',
      category: 'general'
    },
  ];

  const categories = [
    { id: 'all', label: 'All', count: faqs.length },
    { id: 'buyers', label: 'Buyers', count: faqs.filter(f => f.category === 'buyers').length },
    { id: 'sellers', label: 'Sellers', count: faqs.filter(f => f.category === 'sellers').length },
    { id: 'riders', label: 'Riders', count: faqs.filter(f => f.category === 'riders').length },
    { id: 'trust', label: 'Trust & Safety', count: faqs.filter(f => f.category === 'trust').length },
    { id: 'general', label: 'General', count: faqs.filter(f => f.category === 'general').length },
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-text/40 w-5 h-5" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-cool-gray rounded-xl focus:outline-none focus:border-redbull-blue focus:ring-4 focus:ring-redbull-blue/10 transition-all text-slate-text"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-redbull-blue text-white'
                : 'bg-white border border-cool-gray text-slate-text hover:border-redbull-blue'
            }`}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-cool-gray overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-warm-gray/50 transition-colors"
            >
              <span className="font-medium text-charcoal text-sm pr-4">{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 text-slate-text flex-shrink-0 transition-transform duration-300 ${
                  openFaq === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {/* Answer with animation */}
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 pt-0 text-sm text-slate-text border-t border-cool-gray bg-warm-gray/30">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Still have questions? */}
      <div className="bg-redbull-blue-light rounded-xl p-6 text-center mt-8">
        <MessageCircle className="w-8 h-8 text-redbull-blue mx-auto mb-3" />
        <h3 className="text-lg font-display font-semibold text-charcoal mb-2">Still have questions?</h3>
        <p className="text-sm text-slate-text mb-4">We're here to help 24/7</p>
        <button className="bg-redbull-blue text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-redbull-blue/90 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQsContent;