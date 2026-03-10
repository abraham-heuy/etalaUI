// components/about/AboutContent.tsx
import React from 'react';
import { 
  Store, 
  Users, 
  Bike, 
  Calendar, 
  Map, 
  Award, 
  Heart, 
  Shield,
  Target,
  Eye,
  HandHeart,
  TrendingUp,
  ArrowRight,
  Mail,
  Camera,
  Clock,
  MapPin,
  Star,
  User,
  DollarSign,
  Zap,
  Smartphone,
  CheckCircle,
  Globe
} from 'lucide-react';

const AboutContent: React.FC = () => {
  // Team members data with email and website
  const teamMembers = [
    {
      name: 'Abraham Kioko',
      role: 'Founder',
      bio: 'Building Tala\'s first digital marketplace',
      expertise: 'Product & Vision',
      email: 'abrahamkioko@gmail.com',
      website: 'https://abraham-kioko.vercel.app',
      social: { 
        linkedin: 'https://linkedin.com/in/abrahamkioko',
        email: 'abrahamkioko098@gmail.com'
      }
    },
  ];

  // Milestones data - Updated to January 2026
  const milestones = [
    { year: 'Jan 2026', event: 'Idea born in Tala Town', description: 'Recognized the need for a local digital marketplace' },
    { year: 'Feb 2026', event: 'MVP development begins', description: 'Built the first version with community feedback' },
    { year: 'Mar 2026', event: 'Beta launch', description: '50+ sellers joined in first week' },
    { year: 'Apr 2026', event: 'Expanded to Kangundo', description: 'Growing beyond Tala Town' },
    { year: 'Today', event: 'Serving upto 4 areas', description: '200+ sellers, 5,000+ customers' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Image Section - Full width image with overlay text */}
      <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden -mx-4 sm:mx-0 shadow-xl">
    
        <div className="absolute inset-0 bg-gradient-to-r from-redbull-blue/90 to-transparent flex items-center">
          <div className="p-8 sm:p-10 max-w-xl">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium mb-4 border border-white/30">
              <Clock className="w-3 h-3 mr-1" />
              <span>Since January 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
              More than an app
            </h2>
            <p className="text-white/90 text-base sm:text-lg max-w-md">
              We're building the digital future of our community — one connection at a time.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <CheckCircle className="w-3 h-3" />
                <span>MVP ready for testing</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <Users className="w-3 h-3" />
                <span>200+ sellers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision - Alternating Layout */}
      <div className="space-y-12">
        {/* Mission - Image Right */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cool-gray">
              <div className="inline-flex items-center bg-redbull-blue-light text-redbull-blue px-3 py-1 rounded-full text-xs font-medium mb-4">
                <Target className="w-3 h-3 mr-1" />
                Our Mission
              </div>
              <h3 className="text-2xl font-display font-bold text-charcoal mb-3">
                Connecting the community, one tap at a time
              </h3>
              <p className="text-slate-text leading-relaxed mb-4">
                To connect every person in Tala and its surrounding areas with the best local businesses, farmers, and service providers: creating a stronger, more connected community where everyone can thrive.
              </p>
              <div className="flex items-center gap-2 text-sm text-redbull-blue">
                <Heart className="w-4 h-4" />
                <span>Local first, always</span>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 w-full shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                alt="Tala Community - Local farmers and sellers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">Our Home</p>
                <p className="text-xs opacity-80">Heart of our community</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision - Image Left */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1">
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 w-full shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                alt="Digital Future - Community going digital"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">Digital space</p>
                <p className="text-xs opacity-80">Bringing the market online</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-cool-gray">
              <div className="inline-flex items-center bg-redbull-blue-light text-redbull-blue px-3 py-1 rounded-full text-xs font-medium mb-4">
                <Eye className="w-3 h-3 mr-1" />
                Our Vision
              </div>
              <h3 className="text-2xl font-display font-bold text-charcoal mb-3">
                A digitally empowered community
              </h3>
              <p className="text-slate-text leading-relaxed mb-4">
                To create a future where every Tala resident can access goods, services, and opportunities with a single tap, strengthening our local economy and community bonds.
              </p>
              <div className="flex items-center gap-2 text-sm text-redbull-blue">
                <TrendingUp className="w-4 h-4" />
                <span>Growing together</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-cool-gray">
        <h2 className="text-xl font-display font-semibold text-charcoal mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-redbull-blue" />
          Our Impact in Numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Active Sellers', value: '200+', icon: Store, color: 'from-blue-400 to-redbull-blue', change: '+25% this month' },
            { label: 'Customers', value: '5k+', icon: Users, color: 'from-purple-400 to-blue-500', change: '+40% growth' },
            { label: 'Boda Riders', value: '50+', icon: Bike, color: 'from-green-400 to-teal-500', change: '+15%' },
            { label: 'Communities', value: '4', icon: Map, color: 'from-orange-400 to-red-500', change: 'Expanding' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center p-4 rounded-xl bg-warm-gray/30 hover:bg-warm-gray/50 transition-colors">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${stat.color} p-2.5`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <div className="font-bold text-2xl text-charcoal">{stat.value}</div>
                <div className="text-xs text-slate-text mb-1">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Adopt E-TALA - Benefits Section */}
      <section className="bg-gradient-to-br from-redbull-blue-light to-white rounded-2xl p-8 shadow-sm border border-redbull-blue/20">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal mb-3">
            Why adopt <span className="text-redbull-blue">E-TALA</span>?
          </h2>
          <p className="text-slate-text max-w-2xl mx-auto">
            Benefits for everyone in our community — buyers, sellers, and riders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* For Buyers */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-cool-gray hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-redbull-blue-light rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-redbull-blue" />
            </div>
            <h3 className="text-lg font-display font-semibold text-charcoal mb-3">For Buyers</h3>
            <ul className="space-y-3">
              {[
                'Find anything in Tala without walking around',
                'Fresh produce directly from local farmers',
                'Compare prices from multiple sellers',
                'Book boda rides for quick delivery',
                'Support local businesses with every purchase'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-text">
                  <CheckCircle className="w-4 h-4 text-redbull-blue flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Sellers */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-cool-gray hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-redbull-blue-light rounded-full flex items-center justify-center mb-4">
              <Store className="w-6 h-6 text-redbull-blue" />
            </div>
            <h3 className="text-lg font-display font-semibold text-charcoal mb-3">For Sellers</h3>
            <ul className="space-y-3">
              {[
                'Reach more customers without leaving your shop',
                'Free basic listings with no commission',
                'Get discovered by customers searching for you',
                'Build reputation through reviews',
                'Verified badge to stand out and build trust'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-text">
                  <CheckCircle className="w-4 h-4 text-redbull-blue flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Riders & Service Providers */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-cool-gray hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-redbull-blue-light rounded-full flex items-center justify-center mb-4">
              <Bike className="w-6 h-6 text-redbull-blue" />
            </div>
            <h3 className="text-lg font-display font-semibold text-charcoal mb-3">For Riders & Freelancers</h3>
            <ul className="space-y-3">
              {[
                'Get delivery requests without waiting at the stage',
                'More trips = more income',
                'Service providers get booked directly',
                'Build a customer base and reputation',
                'Flexible work on your own schedule'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-text">
                  <CheckCircle className="w-4 h-4 text-redbull-blue flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Benefits - Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { icon: DollarSign, text: 'No commission on basic listings' },
            { icon: Zap, text: 'Same-day delivery available' },
            { icon: Smartphone, text: 'Works on any phone' },
            { icon: Shield, text: 'Verified sellers only' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-center border border-cool-gray">
                <Icon className="w-4 h-4 text-redbull-blue mx-auto mb-1" />
                <p className="text-xs text-slate-text">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-cool-gray">
        <h2 className="text-xl font-display font-semibold text-charcoal mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-redbull-blue" />
          Our Journey
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-redbull-blue-light"></div>
          
          <div className="space-y-6 relative">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-4 pl-10 relative">
                {/* Timeline dot */}
                <div className="absolute left-0 w-8 h-8 bg-redbull-blue rounded-full flex items-center justify-center text-white">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-redbull-blue">{milestone.year}</span>
                  <p className="text-sm font-medium text-charcoal">{milestone.event}</p>
                  <p className="text-xs text-slate-text mt-1">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-text mt-4 text-center">
          From idea to MVP in 4 months • Currently testing with early users
        </p>
      </section>

      {/* Values with Images */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { 
            title: 'Local First', 
            desc: 'Supporting Tala businesses and farmers, keeping money in our community',
            icon: Heart,
            image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
            color: 'from-pink-400 to-red-500'
          },
          { 
            title: 'Trust & Safety', 
            desc: 'Verified sellers, secure transactions, and community accountability',
            icon: Shield,
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            color: 'from-blue-400 to-indigo-500'
          },
        ].map((value, idx) => {
          const Icon = value.icon;
          return (
            <div key={idx} className="group relative rounded-2xl overflow-hidden h-64 shadow-md">
              <img 
                src={value.image} 
                alt={value.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${value.color} p-1.5`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-white">{value.title}</h3>
                </div>
                <p className="text-xs text-white/80">{value.desc}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Coverage Areas - WITHOUT image (just clean list) */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-cool-gray">
        <h2 className="text-xl font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
          <Map className="w-5 h-5 text-redbull-blue" />
          Where We Serve
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { name: 'Tala Town', active: true },
            { name: 'Kangundo', active: true },
            { name: 'Matungulu', active: true },
            { name: 'Nguluni', active: true },
            { name: 'Kathiani', active: false },
            { name: 'Kinyui', active: false },
            { name: 'Masii', active: false },
            { name: 'Kyumbi', active: false },
          ].map((area, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-xl text-center border ${
                area.active 
                  ? 'bg-redbull-blue-light border-redbull-blue/30' 
                  : 'bg-warm-gray/30 border-cool-gray opacity-60'
              }`}
            >
              <MapPin className={`w-4 h-4 mx-auto mb-1 ${area.active ? 'text-redbull-blue' : 'text-slate-text'}`} />
              <div className="text-xs font-medium text-charcoal">{area.name}</div>
              {!area.active && <div className="text-[10px] text-slate-text mt-1">Coming soon</div>}
            </div>
          ))}
        </div>
        
        <div className="bg-redbull-blue-light/50 rounded-xl p-4 text-center">
          <p className="text-sm text-charcoal font-medium">Currently serving 4 communities</p>
          <p className="text-xs text-slate-text mt-1">Expanding to more locations soon — bear with us!</p>
        </div>
      </section>

      {/* Team Section - With Founder Contact Info */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-cool-gray">
        <h2 className="text-xl font-display font-semibold text-charcoal mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-redbull-blue" />
          Meet the Team
        </h2>
        <p className="text-sm text-slate-text mb-6">
          Passionate locals building for locals
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="text-center group col-span-2 sm:col-span-4 md:col-span-2 lg:col-span-1">
              <div className="relative mb-3">
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-gradient-to-br from-redbull-blue-light to-redbull-blue/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <User className="w-10 h-10 text-redbull-blue" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-redbull-blue/0 group-hover:border-redbull-blue/50 transition-all"></div>
              </div>
              <h3 className="font-display font-semibold text-charcoal text-base">{member.name}</h3>
              <p className="text-sm text-redbull-blue mb-1">{member.role}</p>
              <p className="text-xs text-slate-text/70 mb-1">{member.bio}</p>
              <p className="text-xs text-slate-text/50 mb-3">{member.expertise}</p>
              
              {/* Contact Information */}
              <div className="space-y-2 mb-3">
                <a 
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center gap-1 text-xs text-slate-text hover:text-redbull-blue transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{member.email}</span>
                </a>
                <a 
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 text-xs text-slate-text hover:text-redbull-blue transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  <span className="truncate">Personal site</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-3">
                {/* <a href={member.social.linkedin} className="text-slate-text hover:text-redbull-blue">
                  <Linkedin className="w-4 h-4" />
                </a> */}
                <a href={`mailto:${member.social.email}`} className="text-slate-text hover:text-redbull-blue">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contributor CTA - Friendly and Descriptive */}
      <section className="relative bg-gradient-to-r from-redbull-blue to-blue-600 rounded-2xl p-8 overflow-hidden shadow-xl">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <HandHeart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              We're just getting started
            </h3>
            <p className="text-white/80 text-sm max-w-lg mx-auto">
              Hi, I'm <span className="font-semibold">Abraham</span>, founder of E-TALA. 
              What began as an idea in January 2026 is now an MVP ready for testing. 
              We're building in public and would love your feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            {[
              { text: 'Test our MVP and shape features' },
              { text: 'Join as an early seller or rider' },
              { text: 'Share your ideas with the team' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <Star className="w-4 h-4 text-white mx-auto mb-1" />
                <p className="text-xs text-white/90">{item.text}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-redbull-blue px-8 py-3 rounded-full text-sm font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shadow-lg">
              Become a Contributor
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-white/30 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" />
              Share Your Feedback
            </button>
          </div>

          <p className="text-xs text-white/60 text-center mt-4">
            Help us build something great for Tala • No commitment, just community
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;