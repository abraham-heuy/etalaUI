// pages/AboutPage.tsx
import React, { useState } from 'react';
import { 
  BookOpen, 
  Gift, 
  HelpCircle, 
  ChevronRight
} from 'lucide-react';
import AboutContent from '../components/about/AboutContent';
import EngagementsContent from '../components/about/engagements';
import FAQsContent from '../components/about/Faqs';
import BackArrow from '../components/about/backArrow';

type TabType = 'about' | 'engagements' | 'faqs';

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('about');

  // Hero content based on active tab
  const heroContent = {
    about: {
      title: 'About E-TALA',
      subtitle: 'Tala\'s first digital marketplace',
      description: 'Connecting you to local shops, farmers, and services, all in one place.',
      badge: 'Our Story',
      icon: BookOpen
    },
    engagements: {
      title: 'Offers & Engagements',
      subtitle: 'Special deals and community initiatives',
      description: 'Exclusive offers, farmer spotlights, and ways to get involved in your community.',
      badge: 'Current Offers',
      icon: Gift
    },
    faqs: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know',
      description: 'Find answers to common questions about buying, selling, and using E-TALA.',
      badge: 'Help Center',
      icon: HelpCircle
    }
  };

  const currentHero = heroContent[activeTab];
  const IconComponent = currentHero.icon;

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Back Arrow - Fixed position */}
      <div className="fixed top-20 left-4 sm:left-6 z-10">
        <BackArrow />
      </div>

      {/* Hero Section - Dynamic based on active tab */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-redbull-blue-light to-soft-white">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with Icon */}
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm text-redbull-blue px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm border border-redbull-blue/20">
            <span className="w-2 h-2 bg-redbull-blue rounded-full mr-2 animate-pulse"></span>
            <IconComponent className="w-3.5 h-3.5 mr-1.5" />
            {currentHero.badge}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal mb-3">
            {currentHero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-redbull-blue font-medium mb-3">
            {currentHero.subtitle}
          </p>

          {/* Description */}
          <p className="text-slate-text max-w-2xl mx-auto">
            {currentHero.description}
          </p>

          {/* Decorative element */}
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-1 bg-redbull-blue/20 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Toggle Navigation */}
      <div className="sticky top-16 bg-white/80 backdrop-blur-md border-b border-cool-gray z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center space-x-8 sm:space-x-12">
            {[
              { id: 'about', label: 'About', icon: BookOpen },
              { id: 'engagements', label: 'Offers', icon: Gift },
              { id: 'faqs', label: 'FAQs', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className="relative py-4 px-2 text-sm sm:text-base font-medium transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-redbull-blue' : 'text-slate-text group-hover:text-redbull-blue'}`} />
                    <span className={isActive ? 'text-redbull-blue' : 'text-slate-text group-hover:text-redbull-blue'}>
                      {tab.label}
                    </span>
                  </span>
                  
                  {/* Active indicator line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-redbull-blue rounded-full animate-slide-in"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-fade-in">
          {activeTab === 'about' && <AboutContent />}
          {activeTab === 'engagements' && <EngagementsContent />}
          {activeTab === 'faqs' && <FAQsContent />}
        </div>
      </div>

      {/* Quick Navigation - Optional footer for mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button className="bg-redbull-blue text-white p-3 rounded-full shadow-lg hover:bg-redbull-blue/90 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AboutPage;