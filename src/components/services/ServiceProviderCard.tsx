// components/services/ServiceProviderCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle,
  Heart,
  Briefcase
} from 'lucide-react';
import type { ServiceProvider } from '../../data/services';

interface ServiceProviderCardProps {
  provider: ServiceProvider;
  viewMode?: 'grid' | 'list';
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({ provider, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <Link
        to={`/services/provider/${provider.id}`}
        className="block bg-white rounded-xl border border-purple-100 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-32 h-32">
            <img 
              src={provider.image} 
              alt={provider.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-display font-semibold text-charcoal">
                    {provider.name}
                  </h3>
                  {provider.verified && (
                    <CheckCircle className="w-4 h-4 text-purple-600 fill-current" />
                  )}
                </div>
                <p className="text-sm text-purple-600 mb-1">{provider.profession}</p>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-text/70">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{provider.location}</span>
                  </div>
                  <span className="w-1 h-1 bg-slate-text/30 rounded-full"></span>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    <span>{provider.experience} yrs</span>
                  </div>
                </div>
              </div>
              <button className="p-1.5 text-slate-text hover:text-purple-600 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-charcoal">{provider.rating}</span>
                  <span className="text-xs text-slate-text">({provider.reviews})</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  provider.availability === 'available' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {provider.availability}
                </span>
              </div>
              <div>
                {provider.hourlyRate ? (
                  <span className="text-sm font-medium text-purple-600">
                    KSh {provider.hourlyRate}/hr
                  </span>
                ) : provider.fixedPrice ? (
                  <span className="text-sm font-medium text-purple-600">
                    KSh {provider.fixedPrice}
                  </span>
                ) : null}
              </div>
            </div>

            {provider.badges && (
              <div className="flex flex-wrap gap-1 mt-2">
                {provider.badges.slice(0, 2).map((badge, idx) => (
                  <span key={idx} className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Grid View
  return (
    <Link
      to={`/services/provider/${provider.id}`}
      className="group block bg-white rounded-xl border border-purple-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={provider.image} 
          alt={provider.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {provider.verified && (
          <div className="absolute top-2 right-2 bg-purple-600 text-white p-1 rounded-full">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs">
          {provider.availability}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-display font-semibold text-charcoal mb-1 group-hover:text-purple-600 transition-colors">
          {provider.name}
        </h3>
        <p className="text-sm text-purple-600 mb-2">{provider.profession}</p>

        <div className="flex items-center gap-2 text-xs text-slate-text/70 mb-2">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{provider.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-charcoal">{provider.rating}</span>
            <span className="text-xs text-slate-text">({provider.reviews})</span>
          </div>
          <div>
            {provider.hourlyRate ? (
              <span className="text-sm font-medium text-purple-600">
                KSh {provider.hourlyRate}/hr
              </span>
            ) : provider.fixedPrice ? (
              <span className="text-sm font-medium text-purple-600">
                KSh {provider.fixedPrice}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-text/70 mt-2">
          <Clock className="w-3 h-3" />
          <span>Responds {provider.responseTime}</span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceProviderCard;