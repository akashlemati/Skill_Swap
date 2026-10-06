import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Star,
  Award,
  BookOpen,
  Edit3,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Profile = () => {
  const { user } = useAuth();

  const reviews = [
    {
      id: 'rev-1',
      author: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent Spring Boot explanation! Walked me through controller architectures with crystal clear examples.'
    },
    {
      id: 'rev-2',
      author: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      date: '1 month ago',
      comment: 'Super patient mentor. We traded React state management patterns for Java OOP design patterns. Highly recommend!'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 1. PROFILE HEADER CARD */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400'}
              alt={user?.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {user?.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Swapper
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 mt-1">{user?.title || 'SkillSwap Member'}</p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {user?.location || 'San Francisco, CA'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {user?.rating || '4.9'} ({user?.reviewsCount || '18'} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {user?.availability || 'Weekday Evenings'}
                </span>
              </div>
            </div>
          </div>

          <Link to="/profile/edit" className="self-stretch sm:self-auto">
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              <Edit3 className="w-4 h-4 mr-1.5" />
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            About & Learning Objectives
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
            {user?.bio || 'Passionate software developer looking to trade technical skills and collaborate on peer projects.'}
          </p>
        </div>
      </div>

      {/* 2. SKILLS SHOWCASE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills I Teach */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Skills I Teach</h2>
              <p className="text-xs text-slate-500">Available for peer mentoring</p>
            </div>
          </div>

          <div className="space-y-3">
            {user?.skillsTeach?.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{skill.name}</h4>
                  <span className="text-xs text-slate-500">{skill.category || 'Technology'}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/50">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills I Want to Learn */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Skills I Want to Learn</h2>
              <p className="text-xs text-slate-500">Target areas for reciprocal exchange</p>
            </div>
          </div>

          <div className="space-y-3">
            {user?.skillsLearn?.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{skill.name}</h4>
                  <span className="text-xs text-slate-500">{skill.category || 'General'}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/50">
                  {skill.level || 'Seeking Beginner Guidance'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. REVIEWS & ENDORSEMENTS */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Peer Reviews & Testimonials</h2>
            <p className="text-xs text-slate-500">Verified reviews from completed swap sessions</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900">{user?.rating || '4.9'}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
