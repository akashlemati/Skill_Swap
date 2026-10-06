import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowRightLeft,
  Sparkles,
  CheckCircle2,
  Users,
  ShieldCheck,
  Zap,
  Repeat,
  Compass,
  Star
} from 'lucide-react';
import Button from '../components/Button';
import SkillCard from '../components/SkillCard';
import TestimonialCard from '../components/TestimonialCard';
import UserCard from '../components/UserCard';
import {
  platformStats,
  skillCategories,
  howItWorksSteps,
  mockUsers,
  mockTestimonials
} from '../data/mockData';

const Home = () => {
  // Interactive visual state for the Hero reciprocal connection explorer
  const [activeConnection, setActiveConnection] = useState(0);

  const heroConnections = [
    {
      left: { skill: 'JAVA', role: 'You Teach', tag: 'Spring Boot, Microservices', color: 'from-amber-500 to-orange-600' },
      right: { skill: 'REACT', role: 'They Teach', tag: 'Hooks, Tailwind, Vite', color: 'from-cyan-500 to-blue-600' },
      swapScore: '98% Compatibility'
    },
    {
      left: { skill: 'SQL', role: 'You Teach', tag: 'PostgreSQL, Optimization', color: 'from-emerald-500 to-teal-600' },
      right: { skill: 'AWS', role: 'They Teach', tag: 'Cloud, Docker, ECS', color: 'from-violet-500 to-indigo-600' },
      swapScore: '94% Compatibility'
    },
    {
      left: { skill: 'FIGMA', role: 'You Teach', tag: 'Design Systems, Prototyping', color: 'from-pink-500 to-rose-600' },
      right: { skill: 'PYTHON', role: 'They Teach', tag: 'Data Science, Pandas', color: 'from-blue-500 to-indigo-600' },
      swapScore: '92% Compatibility'
    }
  ];

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Next-Gen Peer Learning Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Learn a Skill. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600">
                  Share a Skill.
                </span> <br />
                Grow Together.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                SkillSwap connects people who want to learn with people who want to teach, creating meaningful peer-to-peer learning experiences.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/matches" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Find Your Skill Match
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/discover" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Explore Skills
                  </Button>
                </Link>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free Peer Swaps
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Direct 1-on-1 Mentorship
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Reciprocal Skill Visual (NOT a stock photo) */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40">
                {/* Header label */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Live Match Simulation
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    {heroConnections[activeConnection].swapScore}
                  </span>
                </div>

                {/* Connection Visual Cards */}
                <div className="my-6 space-y-4">
                  {/* Left Node (You Teach) */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                        {heroConnections[activeConnection].left.role}
                      </span>
                      <span className="text-xs text-slate-400">Expertise</span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                        {heroConnections[activeConnection].left.skill}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">
                        {heroConnections[activeConnection].left.tag}
                      </span>
                    </div>
                  </div>

                  {/* Bidirectional Swap Badge */}
                  <div className="flex items-center justify-center -my-2 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-200 animate-pulse">
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      RECIPROCAL EXCHANGE
                    </div>
                  </div>

                  {/* Right Node (They Teach) */}
                  <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-600">
                        {heroConnections[activeConnection].right.role}
                      </span>
                      <span className="text-xs text-slate-400">Target Skill</span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <h4 className="text-2xl font-black text-indigo-950 tracking-tight font-mono">
                        {heroConnections[activeConnection].right.skill}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">
                        {heroConnections[activeConnection].right.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Toggles */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Try other exchanges:</span>
                  <div className="flex gap-1.5">
                    {heroConnections.map((conn, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveConnection(idx)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-mono font-medium transition-colors cursor-pointer ${
                          activeConnection === idx
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {conn.left.skill} ↔ {conn.right.skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {platformStats.map((stat, i) => (
              <div key={stat.label} className={i !== 0 ? 'pt-4 lg:pt-0 lg:pl-6' : ''}>
                <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY SKILLSWAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Why Peer-To-Peer
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            Learning is faster when it's collaborative
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Traditional video tutorials leave you stuck on bug fixes. SkillSwap gives you direct accountability and 1-on-1 screen sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
              <Repeat className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Zero Financial Barrier</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              No subscription paywalls or hourly tutor fees. Your time and knowledge are the only currency you ever spend.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Double Reinforcement</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Teaching someone else reinforces your own mastery, while learning from a peer provides authentic, practical tips.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Verified Peer Ratings</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Community ratings, verified session reviews, and skill endorsements ensure respectful and productive swap sessions.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (6 steps) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Seamless User Journey
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            How SkillSwap Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Getting matched with a peer mentor takes just a few structured steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {howItWorksSteps.map((step) => (
            <div
              key={step.step}
              className="relative p-6 sm:p-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all"
            >
              <span className="text-3xl font-black font-mono text-indigo-100 block mb-2">
                {step.step}
              </span>
              <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. POPULAR SKILL CATEGORIES */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Browse Topics
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
              Popular Skill Categories
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Explore hundreds of verified exchange topics across modern industries.
            </p>
          </div>
          <Link to="/discover">
            <Button variant="outline" size="sm">
              View All Categories
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <SkillCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 6. FEATURED SKILL MATCHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Compatible Learners
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
              Featured Skill Matches
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Peers actively looking for swaps right now.
            </p>
          </div>
          <Link to="/matches">
            <Button variant="outline" size="sm">
              See All Match Suggestions
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockUsers.slice(0, 3).map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Real Stories
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            Hear from our peer community
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            See how developers, designers, and professionals elevate their careers through SkillSwap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTestimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-800 rounded-3xl p-8 sm:p-14 text-white text-center shadow-xl shadow-indigo-100">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Start Learning Today
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to trade skills with top peers?
            </h2>

            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
              Join thousands of engineers, designers, and creators who swap knowledge every single week. No subscription required.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto font-semibold">
                  Create Your Free Account
                </Button>
              </Link>
              <Link to="/discover" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white hover:bg-white/10">
                  Browse Peer Directory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
