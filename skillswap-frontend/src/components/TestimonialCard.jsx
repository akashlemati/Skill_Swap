import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div>
        <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
          <Quote className="w-4 h-4" />
        </div>
        <p className="text-sm text-slate-700 leading-relaxed italic">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3.5">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-50"
        />
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{testimonial.author}</h4>
          <p className="text-xs text-slate-500">{testimonial.role}</p>
          <span className="inline-block mt-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
            {testimonial.skillExchanged}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
