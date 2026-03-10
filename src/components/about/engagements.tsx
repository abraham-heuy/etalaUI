// components/about/EngagementsContent.tsx
import React from 'react';
import { Gift, Star, Users, Calendar, Tag, TrendingUp } from 'lucide-react';

const EngagementsContent: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Current Offers Banner */}
      <div className="bg-gradient-to-r from-redbull-blue to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <Gift className="w-8 h-8" />
          <h2 className="text-2xl font-display font-bold">Current Offers</h2>
        </div>
        <p className="text-white/80 text-sm">
          Exclusive deals from local sellers. Updated weekly.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((offer) => (
          <div key={offer} className="bg-white rounded-xl p-5 border border-cool-gray hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-redbull-blue-light rounded-full flex items-center justify-center">
                <Tag className="w-5 h-5 text-redbull-blue" />
              </div>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Limited</span>
            </div>
            <h3 className="font-display font-semibold text-charcoal mb-1">Farm Fresh Bundle</h3>
            <p className="text-xs text-slate-text mb-3">By Mama Lucy's Farm</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-slate-text line-through">KSh 1,200</span>
                <span className="text-lg font-bold text-redbull-blue ml-2">KSh 899</span>
              </div>
              <button className="text-xs bg-redbull-blue text-white px-3 py-1.5 rounded-full">
                Claim
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Community Engagement */}
      <section className="bg-white rounded-xl p-6 border border-cool-gray">
        <h2 className="text-xl font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-redbull-blue" />
          Community Initiatives
        </h2>
        <div className="space-y-4">
          {[
            { title: 'Farmer of the Month', desc: 'Supporting local farmers', icon: Star, color: 'text-yellow-500' },
            { title: 'Weekly Market Days', desc: 'Every Saturday at Tala Town', icon: Calendar, color: 'text-green-500' },
            { title: 'Refer & Earn', desc: 'Get KSh 100 for every friend', icon: TrendingUp, color: 'text-redbull-blue' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 p-3 bg-warm-gray/50 rounded-xl">
                <div className={`w-8 h-8 bg-white rounded-full flex items-center justify-center ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-charcoal text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-text">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default EngagementsContent;