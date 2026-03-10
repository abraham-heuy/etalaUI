// components/Footer.tsx
import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Section - Full width on mobile */}
        <div className="mb-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">E-TALA</h3>
              <p className="text-sm text-white/60 max-w-md mx-auto sm:mx-0">
                Tala's first digital marketplace connecting you to local shops, farmers, and services.
              </p>
            </div>
            
            {/* Social Icons - Centered on mobile */}
            <div className="flex justify-center sm:justify-start space-x-4 mt-4 sm:mt-0">
              <a href="#" className="bg-white/10 hover:bg-redbull-blue p-2 rounded-full transition-colors group">
                <Facebook className="w-4 h-4 text-white/60 group-hover:text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-redbull-blue p-2 rounded-full transition-colors group">
                <Twitter className="w-4 h-4 text-white/60 group-hover:text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-redbull-blue p-2 rounded-full transition-colors group">
                <Instagram className="w-4 h-4 text-white/60 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Layout for Quick Links, Categories, Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-medium mb-3 flex items-center justify-center sm:justify-start gap-2">
              <span className="w-1 h-4 bg-redbull-blue rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'About Us', href: '#about' },
                { name: 'How It Works', href: '#how-it-works' },
                { name: 'For Sellers', href: '#for-sellers' },
                { name: 'For Buyers', href: '#for-buyers' },
                { name: 'Blog', href: '#blog' },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm text-white/60 hover:text-redbull-blue transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-medium mb-3 flex items-center justify-center sm:justify-start gap-2">
              <span className="w-1 h-4 bg-redbull-blue rounded-full"></span>
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Marketplace', href: '#marketplace' },
                { name: 'Farmers Market', href: '#farmers' },
                { name: 'Boda Rides', href: '#boda' },
                { name: 'Services', href: '#services' },
                { name: 'Food & Restaurants', href: '#food' },
                { name: 'Accommodation', href: '#accommodation' },
              ].map((cat) => (
                <li key={cat.name}>
                  <a 
                    href={cat.href} 
                    className="text-sm text-white/60 hover:text-redbull-blue transition-colors inline-flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-medium mb-3 flex items-center justify-center sm:justify-start gap-2">
              <span className="w-1 h-4 bg-redbull-blue rounded-full"></span>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center sm:justify-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-redbull-blue flex-shrink-0" />
                <span>Tala Town, Machakos County</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-redbull-blue flex-shrink-0" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-redbull-blue flex-shrink-0" />
                <span>hello@etala.co.ke</span>
              </li>
            </ul>
            
            {/* Business Hours - Optional */}
            <div className="mt-4 pt-4 border-t border-white/10 text-center sm:text-left">
              <p className="text-xs text-white/40">
                Support hours: Mon-Fri, 8am - 6pm
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/40 order-2 sm:order-1">
              © {currentYear} E-TALA. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-white/40 order-1 sm:order-2">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;