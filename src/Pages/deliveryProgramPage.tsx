// pages/DeliveryProgramPage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Bike, 
  Clock, 
  Wallet, 
  Star, 
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  FileText,
  UserCheck,
  Truck,
  Zap,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeliveryApplicationForm from '../components/deliveryProgram/deliveryApplicationProgram';

const DeliveryProgramPage: React.FC = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer for application deadline (7 days from now)
  useEffect(() => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    deadline.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const benefits = [
    {
      icon: Zap,
      title: 'Earn Extra Income',
      description: 'Boost your daily hustle with flexible delivery work. Earn commission on every successful delivery',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: Clock,
      title: 'Work on Your Terms',
      description: 'No fixed hours, no minimum shifts. Deliver when it fits your schedule',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Wallet,
      title: 'Commission-Based Earnings',
      description: 'Get paid per delivery. The more you deliver, the more you earn',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: TrendingUp,
      title: 'Weekly Payouts',
      description: 'Receive your earnings every Friday. Simple and transparent',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Star,
      title: 'Performance Rewards',
      description: 'Bonus incentives for consistent high-quality deliveries',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Truck,
      title: 'Flexible Partnership',
      description: 'No contracts, no commitments. Deliver as a partner, not an employee',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100'
    }
  ];

  const steps = [
    {
      icon: FileText,
      title: 'Submit Application',
      description: 'Fill out the quick application form with your basic details',
      duration: '5-10 minutes'
    },
    {
      icon: UserCheck,
      title: 'Quick Review',
      description: 'We verify your ID and vehicle details',
      duration: '1-2 days'
    },
    {
      icon: Bike,
      title: 'Get Enlisted',
      description: 'Complete a brief orientation about our delivery ethics and standards',
      duration: '30 minutes'
    },
    {
      icon: CheckCircle2,
      title: 'Start Delivering',
      description: 'Accept deliveries and start earning commission immediately',
      duration: 'Start today'
    }
  ];

  const requirements = [
    'Valid identification (National ID or Passport)',
    'Reliable vehicle (bicycle, motorcycle, or car)',
    'Smartphone with internet access',
    'Minimum 18 years of age',
    'Commitment to ethical delivery practices'
  ];

  const ethicsPrinciples = [
    'Treat every package with care and respect',
    'Communicate clearly with customers',
    'Deliver on time, every time',
    'Maintain professional conduct',
    'Follow road safety rules'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-redbull-blue-pale via-soft-white to-warm-gray">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cool-gray">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-warm-gray rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-text" />
            </button>
            <h1 className="text-lg font-display font-semibold text-redbull-blue">
              Delivery Partnership Program
            </h1>
          </div>
        </div>
      </div>

      <main className="pb-20">
        {!showForm ? (
          <>
            {/* Hero Section with Background Image */}
            <section className="relative overflow-hidden">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Delivery rider"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-redbull-blue/90 via-redbull-blue/80 to-transparent"></div>
              </div>
              
              <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-3xl"
                >
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <Truck className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">Limited Slots Available</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                    Deliver with e-tala
                  </h1>
                  
                  <p className="text-lg text-white/90 mb-8">
                    Turn your daily hustle into extra income. Deliver on your terms, 
                    earn commission, and be part of Tala's growing delivery network.
                  </p>

                  {/* Countdown and Button - Side by Side on large screens */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Countdown Timer */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex-shrink-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-white" />
                        <span className="text-sm text-white font-medium">Application Deadline</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">{timeLeft.days}</div>
                          <div className="text-xs text-white/80">Days</div>
                        </div>
                        <div className="text-white text-2xl font-bold">:</div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                          <div className="text-xs text-white/80">Hours</div>
                        </div>
                        <div className="text-white text-2xl font-bold">:</div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                          <div className="text-xs text-white/80">Mins</div>
                        </div>
                        <div className="text-white text-2xl font-bold">:</div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                          <div className="text-xs text-white/80">Secs</div>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-white text-redbull-blue px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 flex-shrink-0"
                    >
                      Apply Now - Only 10 Spots Left
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* How It Works */}
            <section className="py-16 px-4">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-display font-bold text-charcoal text-center mb-3">
                  How to Get Enlisted
                </h2>
                <p className="text-center text-slate-text mb-12 max-w-2xl mx-auto">
                  Simple steps to start earning extra income with flexible delivery work
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-redbull-blue to-sky-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-sm font-bold text-redbull-blue mb-2">
                          Step {index + 1}
                        </div>
                        <h3 className="font-semibold text-charcoal mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-text mb-1">
                          {step.description}
                        </p>
                        <p className="text-xs text-slate-text/70">
                          {step.duration}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Benefits - Partnership Focus */}
            <section className="py-16 px-4 bg-white">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-display font-bold text-charcoal text-center mb-3">
                  Why Partner with e-tala?
                </h2>
                <p className="text-center text-slate-text mb-12 max-w-2xl mx-auto">
                  Flexible delivery work that fits your lifestyle and helps you earn extra
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-warm-gray rounded-2xl p-6 hover:shadow-md transition-all"
                      >
                        <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                          <Icon className={`w-6 h-6 ${benefit.color}`} />
                        </div>
                        <h3 className="font-semibold text-charcoal mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-slate-text">
                          {benefit.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Ethics & Requirements */}
            <section className="py-16 px-4 bg-gradient-to-b from-redbull-blue-pale to-soft-white">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Requirements */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <h2 className="text-xl font-display font-bold text-charcoal">
                        What You Need
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-warm-gray rounded-xl">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-slate-text">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ethics Principles */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-purple-600" />
                      </div>
                      <h2 className="text-xl font-display font-bold text-charcoal">
                        Our Delivery Ethics
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {ethicsPrinciples.map((principle, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-warm-gray rounded-xl">
                          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
                          </div>
                          <span className="text-sm text-slate-text">{principle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-r from-redbull-blue to-sky-600 rounded-2xl p-8 md:p-12 text-center text-white">
                  <h2 className="text-3xl font-display font-bold mb-4">
                    Ready to Start Earning?
                  </h2>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Join as a delivery partner and earn extra income on your own terms. 
                    Limited spots available - apply now before the deadline.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-white text-redbull-blue px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                    >
                      Apply Now - {timeLeft.days} Days Left
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-xs text-white/70">
                    No commitment • Work when you want • Get paid per delivery
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : (
          <DeliveryApplicationForm />
        )}
      </main>
    </div>
  );
};

export default DeliveryProgramPage;