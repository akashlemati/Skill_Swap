import React from 'react';
import {
  Code2,
  Layout,
  BrainCircuit,
  Palette,
  Languages,
  Music,
  Briefcase,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  Code2,
  Layout,
  BrainCircuit,
  Palette,
  Languages,
  Music,
  Briefcase,
  Camera
};

const SkillCard = ({ category }) => {
  const IconComponent = iconMap[category.icon] || Layers;

  return (
    <Link
      to={`/discover?category=${encodeURIComponent(category.name)}`}
      className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200"
    >
      <div>
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {category.name}
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
          {category.description}
        </p>

        {category.popular && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {category.popular.slice(0, 3).map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>{category.skillsCount} Skills • {category.usersCount}+ Peers</span>
        <span className="flex items-center gap-1 text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
          Explore <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};

export default SkillCard;
