// components/Features.tsx
import React from 'react';
import { ShoppingBag, Wheat, Bike, Wrench, Coffee, Building2, ChevronRight, ExternalLink } from 'lucide-react';
import productImage from '../../assets/etala-product.jpg'; // Add your product image

const Features: React.FC = () => {
  // Single product data
  const product = {
    name: "Family Harvest Basket",
    description: "Fresh farm produce directly from Tala farmers",
    longDescription: "A carefully curated selection of the freshest produce from local farms. Hand-picked and packed daily to bring the taste of Tala to your kitchen.",
    price: 650,
    originalPrice: 850,
    farmer: "Mama Lucy's Farm",
    location: "Tala, Machakos",
    rating: 4.9,
    reviews: 128,
    image: productImage,
    items: [
      "Sukuma wiki (2 bunches) - Fresh from the farm",
      "Tomatoes (1kg) - Vine-ripened",
      "Onions (500g) - Red variety",
      "Irish potatoes (3kg) - New harvest",
      "Carrots (500g) - Sweet and crunchy",
      "Free-range eggs (1 dozen)",
      "Fresh milk (2L) - From pasture-fed cows"
    ],
    benefits: [
      "Support local farmers directly",
      "30-40% cheaper than market prices",
      "Harvested within 24 hours",
      "Free delivery in Tala"
    ]
  };

  // Feature cards for the grid
  const features = [
    {
      icon: ShoppingBag,
      title: 'Marketplace',
      description: 'Electronics, clothes, household goods from local shops',
      stats: '200+ shops',
      href: '/marketplace'
    },
    {
      icon: Wheat,
      title: 'Farmers Market',
      description: 'Fresh produce directly from Tala farms',
      stats: '56 farmers',
      href: '/farmers'
    },
    {
      icon: Bike,
      title: 'Boda Rides',
      description: 'Quick delivery and rides around town',
      stats: '50+ riders',
      href: '/boda'
    },
    {
      icon: Wrench,
      title: 'Services',
      description: 'Find plumbers, electricians, salons',
      stats: '30+ fundis',
      href: '/services'
    },
    {
      icon: Coffee,
      title: 'Food & Restaurants',
      description: 'Order from your favorite local spots',
      stats: '25+ eateries',
      href: '/food'
    },
    {
      icon: Building2,
      title: 'Supplier Market',
      description: 'Coming soon',
      stats: 'N/A',
      href: '#supplier'
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-soft-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header with Explore More link */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-2">
              Today's{' '}
              <span className="text-redbull-blue">Farm Fresh</span> Special
            </h2>
            <p className="text-slate-text text-lg">
              Direct from Tala farmers — fresh, affordable, delivered
            </p>
          </div>
          
          {/* Explore More Link */}
          <a 
            href="#all-deals" 
            className="group flex items-center gap-2 text-redbull-blue hover:text-redbull-blue/80 font-medium transition-colors"
          >
            <span>Explore all farm deals</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Two-column product layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white rounded-3xl shadow-xl border border-cool-gray p-6 lg:p-8">
          {/* Left Column - Product Image */}
          <div className="lg:w-5/12">
            <div className="relative">
              {/* Product Image */}
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-redbull-blue-light to-white">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
              </div>
              
              {/* Farmer Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm shadow-lg">
                <span className="text-redbull-blue font-medium">{product.farmer}</span>
              </div>
              
              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm shadow-lg flex items-center gap-1">
                <span className="text-redbull-blue font-bold">{product.rating}</span>
                <span className="text-slate-text">★</span>
                <span className="text-slate-text/70">({product.reviews})</span>
              </div>
            </div>
          </div>

          {/* Right Column - Product Description */}
          <div className="lg:w-7/12">
            <div className="h-full flex flex-col">
              {/* Product Name & Location */}
              <div className="mb-4">
                <h3 className="text-3xl lg:text-4xl font-display font-bold text-charcoal mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 text-slate-text">
                  <span>{product.location}</span>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <span className="text-sm">Free delivery in Tala</span>
                </div>
              </div>

              {/* Long Description */}
              <p className="text-slate-text text-base leading-relaxed mb-6">
                {product.longDescription}
              </p>

              {/* What's in the basket */}
              <div className="mb-6">
                <h4 className="text-lg font-display font-semibold text-charcoal mb-3">
                  What's in the basket
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-redbull-blue mt-2"></div>
                      <span className="text-sm text-slate-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="bg-redbull-blue-light rounded-lg p-2 text-center">
                    <span className="text-xs text-redbull-blue font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-cool-gray">
                <div>
                  <div className="text-sm text-slate-text line-through">
                    KSh {product.originalPrice}
                  </div>
                  <div className="text-4xl font-display font-bold text-redbull-blue">
                    KSh {product.price}
                  </div>
                </div>
                <button className="bg-redbull-blue text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-redbull-blue/90 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                  Add to Cart
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-display font-bold text-charcoal">
              More  <span className="text-redbull-blue">Features To Explore</span>
            </h3>
            <a href="#all-services" className="text-sm text-redbull-blue hover:text-redbull-blue/80 flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <a
                  key={index}
                  href={feature.href}
                  className="group bg-white rounded-xl p-5 border border-cool-gray hover:border-redbull-blue/30 transition-all hover:shadow-md flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-redbull-blue-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-redbull-blue" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-base font-display font-semibold text-charcoal">
                        {feature.title}
                      </h4>
                      <span className="text-xs bg-redbull-blue-light text-redbull-blue px-1.5 py-0.5 rounded-full">
                        {feature.stats}
                      </span>
                    </div>
                    <p className="text-xs text-slate-text">
                      {feature.description}
                    </p>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-text group-hover:text-redbull-blue group-hover:translate-x-1 transition-all" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;