// pages/marketplace/try-on-explain.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  Info,
  Smartphone,
  ShoppingBag,
  Share2,
  Play,
  ChevronDown,
  ChevronUp,
  FileText,
  Pause,
  Volume2,
  Maximize2,
  Clock,
  Zap,
  Shield
} from 'lucide-react';
import CategoryNavbar from '../../../common/CategoryNavbar';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  details: string[];
  tips?: string[];
}

interface TranscriptSegment {
  time: string;
  speaker: string;
  text: string;
}

const TryOnExplainPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const transcript: TranscriptSegment[] = [
    { time: '0:00', speaker: 'Narrator', text: 'Welcome to AI Virtual Try-On — the smarter way to shop for fashion online.' },
    { time: '0:08', speaker: 'Narrator', text: 'Start by browsing our marketplace and selecting any fashion item you love. Look for the camera icon — that means virtual try-on is available.' },
    { time: '0:18', speaker: 'Narrator', text: 'Next, upload a photo of yourself. For best results, stand in a well-lit space against a plain background. A full-body or upper-body shot works perfectly.' },
    { time: '0:30', speaker: 'Narrator', text: 'Our AI gets to work immediately — analyzing your body shape, pose, and lighting conditions to map the garment realistically onto your image.' },
    { time: '0:42', speaker: 'Narrator', text: 'In just three to five seconds, you will see the result. Toggle between before and after, adjust the fit, and share with friends to get their opinion.' },
    { time: '0:55', speaker: 'Narrator', text: 'When you are happy with how it looks, purchase with confidence — knowing exactly what you are getting before it arrives at your door.' },
    { time: '1:04', speaker: 'Narrator', text: 'AI Virtual Try-On. See it on you, before you buy it.' },
  ];

  const steps: Step[] = [
    {
      id: 1,
      title: 'Choose Your Item',
      description: 'Select any fashion item from our marketplace',
      badge: 'Step 1',
      icon: <ShoppingBag className="w-5 h-5" />,
      details: [
        'Browse our extensive collection including clothing, accessories, and footwear',
        'Look for the camera icon on product pages — it marks try-on enabled items',
        'Filter by category, size, color, and price to find what you are looking for',
        'Tap "Try On with AI" on any eligible product page to begin'
      ]
    },
    {
      id: 2,
      title: 'Upload Your Photo',
      description: 'Take or upload a photo for the AI to work with',
      badge: 'Step 2',
      icon: <Upload className="w-5 h-5" />,
      details: [
        'Use your device camera to take a new photo or upload from your gallery',
        'The AI works best with full-body or upper-body shots depending on clothing type',
        'You can also use the webcam feature for a real-time preview',
        'Your photo is processed securely and is not permanently stored'
      ],
      tips: [
        'Well-lit environment',
        'Plain background',
        'Clear area view',
        'Avoid baggy clothing'
      ]
    },
    {
      id: 3,
      title: 'AI Processing',
      description: 'Advanced AI maps the item onto your photo',
      badge: 'Step 3',
      icon: <Sparkles className="w-5 h-5" />,
      details: [
        'Our AI detects your body shape, pose, and the garment boundaries',
        'The system applies realistic lighting, shadow, and fabric drape effects',
        'Processing takes approximately three to five seconds',
        'The model supports all body types and works across a wide range of garment styles'
      ],
      tips: [
        'Advanced cloth segmentation',
        'Realistic shadow & drape',
        'All body types supported',
        'Photos never permanently stored'
      ]
    },
    {
      id: 4,
      title: 'Preview & Compare',
      description: 'See the result and toggle before and after',
      badge: 'Step 4',
      icon: <Share2 className="w-5 h-5" />,
      details: [
        'View a realistic render of the item on your photo',
        'Toggle between your original photo and the try-on result instantly',
        'Adjust positioning and scale if needed for a better fit',
        'Share with friends and family to get their opinion before purchasing'
      ]
    },
    {
      id: 5,
      title: 'Buy with Confidence',
      description: 'Purchase knowing exactly how it looks on you',
      badge: 'Step 5',
      icon: <CheckCircle2 className="w-5 h-5" />,
      details: [
        'Once satisfied, proceed directly to purchase from the product page',
        'Significantly reduces the likelihood of returns and exchanges',
        'Save your favourite try-on results for later comparison',
        'Your purchase history can surface new try-on recommendations'
      ]
    }
  ];

  const features = [
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: 'Reduce Returns',
      description: 'See exactly how items fit before purchasing, cutting down costly returns'
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: 'Try Anywhere',
      description: 'Shop confidently from the comfort of your home on any device'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Results in Seconds',
      description: 'Advanced AI delivers realistic try-on results in three to five seconds'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Private by Design',
      description: 'Your photos are processed securely and never stored permanently'
    }
  ];

  const toggleStep = (stepId: number) => {
    setActiveStep(prev => (prev === stepId ? null : stepId));
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <CategoryNavbar categoryName="AI Virtual Try-On" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pt-24">

        {/* Back Button */}
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-slate-text hover:text-sky-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Marketplace</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-sky-100 rounded-2xl mb-4">
            <Camera className="w-7 h-7 text-sky-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal mb-3">
            AI Virtual Try-On
          </h1>
          <p className="text-base sm:text-lg text-slate-text max-w-2xl mx-auto leading-relaxed">
            Experience how clothes look on you before buying. Make confident fashion choices from the comfort of your home.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-14">
          <div className="rounded-2xl border border-sky-100 overflow-hidden bg-white shadow-sm">

            {/* Video Thumbnail & Player */}
            <div className="relative aspect-video bg-gradient-to-br from-sky-900 via-sky-800 to-slate-900 overflow-hidden">

              {/* Thumbnail content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                {/* Simulated thumbnail layout */}
                <div className="flex items-end gap-4 mb-2">
                  {/* Before image mock */}
                  <div className="w-24 sm:w-32 h-36 sm:h-48 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20" />
                    <div className="w-10 h-16 rounded-lg bg-white/10" />
                    <span className="text-white/50 text-xs font-medium">Before</span>
                  </div>
                  {/* Arrow */}
                  <div className="mb-8">
                    <ChevronRight className="w-8 h-8 text-sky-300" />
                  </div>
                  {/* After image mock */}
                  <div className="w-24 sm:w-32 h-36 sm:h-48 rounded-xl bg-sky-500/30 border border-sky-300/40 flex flex-col items-center justify-center gap-2 shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-sky-200/40" />
                    <div className="w-10 h-16 rounded-lg bg-sky-300/30" />
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-sky-300" />
                      <span className="text-sky-200 text-xs font-medium">After</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-xs sm:text-sm tracking-wide">AI Virtual Try-On — How It Works</p>
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/30 hover:scale-105 active:scale-95"
                >
                  {isPlaying
                    ? <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    : <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" />
                  }
                </button>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                <Clock className="w-3 h-3 text-white/80" />
                <span className="text-white text-xs font-medium">1:08</span>
              </div>

              {/* Mock player controls bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-6 pb-3 flex items-center gap-3">
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-sky-400 rounded-full" />
                </div>
                <Volume2 className="w-4 h-4 text-white/60" />
                <Maximize2 className="w-4 h-4 text-white/60" />
              </div>
            </div>

            {/* Transcript Toggle */}
            <div className="border-t border-sky-100">
              <button
                onClick={() => setTranscriptOpen(p => !p)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-sky-50 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-charcoal">
                  <FileText className="w-4 h-4 text-sky-500" />
                  Video Transcript
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-text">{transcriptOpen ? 'Collapse' : 'Expand'}</span>
                  {transcriptOpen
                    ? <ChevronUp className="w-4 h-4 text-slate-text" />
                    : <ChevronDown className="w-4 h-4 text-slate-text" />
                  }
                </div>
              </button>

              {transcriptOpen && (
                <div className="px-5 pb-5 space-y-4 border-t border-sky-50 pt-4 animate-fade-in">
                  {transcript.map((seg, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-xs font-mono text-sky-500 mt-0.5 min-w-[36px] shrink-0">{seg.time}</span>
                      <div>
                        <span className="text-xs font-semibold text-sky-600 block mb-0.5">{seg.speaker}</span>
                        <p className="text-sm text-slate-text leading-relaxed">{seg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How It Works — Step Flow */}
        <div className="mb-14">
          <h2 className="text-2xl font-display font-semibold text-charcoal text-center mb-2">
            How It Works
          </h2>
          <p className="text-sm text-slate-text text-center mb-8">Tap any step to explore the details</p>

          <div className="space-y-3">
            {steps.map((step, index) => {
              const isOpen = activeStep === step.id;
              return (
                <div key={step.id} className="relative">

                  {/* Connector line (between steps, not last) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-full h-3 w-0.5 bg-sky-200 z-10" />
                  )}

                  {/* Step card */}
                  <div
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-sky-300 bg-white shadow-sm'
                        : 'border-sky-100 bg-white hover:border-sky-200'
                    }`}
                  >
                    {/* Step header — always visible */}
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full flex items-center gap-4 px-4 py-4 text-left"
                    >
                      {/* Icon circle */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isOpen
                            ? 'bg-sky-500 text-white shadow-md scale-105'
                            : 'bg-sky-100 text-sky-600'
                        }`}
                      >
                        {step.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium text-sky-400 uppercase tracking-wider">{step.badge}</span>
                        </div>
                        <h3 className={`font-display font-semibold text-base transition-colors ${isOpen ? 'text-sky-600' : 'text-charcoal'}`}>
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-text truncate">{step.description}</p>
                      </div>

                      {/* Chevron */}
                      <div className={`transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-5 h-5 text-slate-text" />
                      </div>
                    </button>

                    {/* Expanded content */}
                    {isOpen && (
                      <div className="px-4 pb-5 border-t border-sky-100 pt-4 animate-fade-in">
                        <div className="space-y-4">

                          {/* Details */}
                          <div>
                            <h4 className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5" />
                              What happens here
                            </h4>
                            <ul className="space-y-2.5">
                              {step.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                                  <span className="text-sm text-slate-text leading-relaxed">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tips */}
                          {step.tips && (
                            <div className="bg-sky-50 rounded-xl p-4">
                              <h4 className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-3">
                                Pro Tips
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                {step.tips.map((tip, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                                    <span className="text-xs text-sky-700">{tip}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Navigate between steps */}
                          <div className="flex items-center justify-between pt-2 border-t border-sky-100">
                            {step.id > 1 ? (
                              <button
                                onClick={() => toggleStep(step.id - 1)}
                                className="flex items-center gap-1 text-xs text-sky-500 hover:text-sky-700 transition-colors"
                              >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                {steps[step.id - 2].title}
                              </button>
                            ) : <div />}

                            {step.id < steps.length ? (
                              <button
                                onClick={() => toggleStep(step.id + 1)}
                                className="flex items-center gap-1 text-xs text-sky-500 hover:text-sky-700 transition-colors"
                              >
                                {steps[step.id].title}
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            ) : <div />}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Use It — Feature Cards */}
        <div className="mb-14">
          <div className="bg-white rounded-2xl border border-sky-100 p-6">
            <h2 className="text-xl font-display font-semibold text-charcoal text-center mb-6">
              Why Use AI Virtual Try-On?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveFeature(idx)}
                  onMouseLeave={() => setActiveFeature(null)}
                  className={`flex gap-4 p-4 rounded-xl border transition-all cursor-default ${
                    activeFeature === idx
                      ? 'border-sky-300 bg-sky-50'
                      : 'border-sky-100 hover:border-sky-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    activeFeature === idx ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-600'
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal mb-1">{feature.title}</h3>
                    <p className="text-xs text-slate-text leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-display font-bold text-white mb-2">
            Ready to Try It On?
          </h2>
          <p className="text-sky-100 mb-6 text-sm sm:text-base">
            Browse our fashion collection and experience AI virtual try-on today
          </p>
          <Link
            to="/marketplace/category/fashion"
            className="inline-flex items-center gap-2 bg-white text-sky-600 px-6 py-3 rounded-xl font-medium hover:bg-sky-50 transition-colors text-sm sm:text-base"
          >
            Explore Fashion Items
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TryOnExplainPage;