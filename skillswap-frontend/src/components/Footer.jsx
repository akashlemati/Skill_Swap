import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, Heart, Globe, Share2, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & mission */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 text-lg tracking-tight">
                Skill<span className="text-indigo-600">Swap</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              SkillSwap connects people who want to learn with people who want to teach, creating meaningful peer-to-peer learning experiences.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-1">
              <a href="#" className="hover:text-indigo-600 transition-colors" aria-label="Global Community">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors" aria-label="Discussion">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/discover" className="hover:text-indigo-600 transition-colors">
                  Discover Peers
                </Link>
              </li>
              <li>
                <Link to="/matches" className="hover:text-indigo-600 transition-colors">
                  Skill Matches
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-indigo-600 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#categories" className="hover:text-indigo-600 transition-colors">
                  Popular Categories
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Exchanges */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Top Exchanges
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <span className="text-slate-700 font-medium">Java</span> ↔ <span className="text-indigo-600">React</span>
              </li>
              <li>
                <span className="text-slate-700 font-medium">SQL</span> ↔ <span className="text-indigo-600">AWS Cloud</span>
              </li>
              <li>
                <span className="text-slate-700 font-medium">Figma</span> ↔ <span className="text-indigo-600">Python ML</span>
              </li>
              <li>
                <span className="text-slate-700 font-medium">Spanish</span> ↔ <span className="text-indigo-600">TypeScript</span>
              </li>
            </ul>
          </div>

          {/* Community & Architecture */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              SkillSwap Architecture
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Built with React, Vite, and Tailwind CSS. Prepared for Java Spring Boot backend integration.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 text-slate-600">
              Frontend v1.0 • Dev Mode
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SkillSwap Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for lifelong peer learners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
