// components/common/BackArrow.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackArrow: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="group flex items-center gap-2 text-slate-text hover:text-redbull-blue transition-colors bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm border border-cool-gray hover:border-redbull-blue/30"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      <span className="text-sm font-medium hidden sm:inline">Back</span>
    </button>
  );
};

export default BackArrow;