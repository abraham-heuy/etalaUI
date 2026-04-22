import React from 'react';
import { Briefcase } from 'lucide-react';

interface BusinessQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect';
  options?: string[];
  required: boolean;
  placeholder?: string;
}

interface BusinessQuestionsStepProps {
  questions: BusinessQuestion[];
  answers: Record<string, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errors: Record<string, string>;
}

const BusinessQuestionsStep: React.FC<BusinessQuestionsStepProps> = ({
  questions,
  answers,
  setAnswers,
  errors,
}) => {
  const handleChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleMultiselect = (id: string, option: string, checked: boolean) => {
    const current = answers[id]?.split(',').filter(Boolean) || [];
    const updated = checked ? [...current, option] : current.filter(v => v !== option);
    setAnswers(prev => ({ ...prev, [id]: updated.join(',') }));
  };

  return (
    <div className="bg-white rounded-xl border border-sky-100 p-6 mt-6">
      <h2 className="text-lg font-display font-semibold text-charcoal mb-4 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-redbull-blue" />
        Business Details
      </h2>
      <p className="text-sm text-slate-text mb-4">Tell us more about your business</p>

      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id}>
            <label className="text-sm font-medium text-charcoal mb-1 block">
              {q.question} {q.required && <span className="text-red-500">*</span>}
            </label>

            {q.type === 'text' && (
              <input
                type="text"
                value={answers[q.id] || ''}
                onChange={(e) => handleChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[q.id]
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                }`}
              />
            )}

            {q.type === 'textarea' && (
              <textarea
                value={answers[q.id] || ''}
                onChange={(e) => handleChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[q.id]
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                }`}
              />
            )}

            {q.type === 'select' && q.options && (
              <select
                value={answers[q.id] || ''}
                onChange={(e) => handleChange(q.id, e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[q.id]
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-sky-200 focus:border-redbull-blue focus:ring-redbull-blue/20'
                }`}
              >
                <option value="">Select an option</option>
                {q.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {q.type === 'multiselect' && q.options && (
              <div className="space-y-2">
                {q.options.map(opt => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={opt}
                      checked={answers[q.id]?.split(',').includes(opt)}
                      onChange={(e) => handleMultiselect(q.id, opt, e.target.checked)}
                      className="rounded text-redbull-blue focus:ring-redbull-blue"
                    />
                    <span className="text-sm text-slate-text">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {errors[q.id] && <p className="text-xs text-red-600 mt-1">{errors[q.id]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessQuestionsStep;