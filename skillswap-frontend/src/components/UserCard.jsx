import React, { useState } from 'react';
import { MapPin, Star, Sparkles, Check, ArrowRightLeft } from 'lucide-react';
import Button from './Button';

const UserCard = ({ user, onRequestSwap, onViewProfile }) => {
  const [requested, setRequested] = useState(false);

  const handleRequest = () => {
    setRequested(true);
    if (onRequestSwap) {
      onRequestSwap(user);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden">
      <div className="p-5 sm:p-6">
        {/* Top Header: Avatar, Name, Location, Compatibility */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-13 h-13 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div>
              <h3 className="font-semibold text-slate-900 text-base">{user.name}</h3>
              <p className="text-xs text-slate-500 font-medium line-clamp-1">{user.title}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {user.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-600 font-medium">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {user.rating} ({user.reviewsCount})
                </span>
              </div>
            </div>
          </div>

          {user.compatibility && (
            <div className="flex flex-col items-end">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                {user.compatibility}% Match
              </span>
            </div>
          )}
        </div>

        {/* User Bio */}
        <p className="mt-4 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {user.bio}
        </p>

        {/* Skills Section */}
        <div className="mt-5 space-y-3 pt-4 border-t border-slate-100">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Can Teach</span>
              <span className="text-[10px] text-indigo-600 font-normal">Expertise</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {user.skillsTeach.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  {skill.name}
                  <span className="text-[10px] text-indigo-400">({skill.level})</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Wants to Learn</span>
              <span className="text-[10px] text-amber-600 font-normal">Seeking</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {user.skillsLearn.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/50"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  {skill.name}
                  <span className="text-[10px] text-amber-600">({skill.level})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 sm:px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onViewProfile && onViewProfile(user)}
          className="flex-1 text-xs"
        >
          View Profile
        </Button>
        <Button
          variant={requested ? 'accent' : 'primary'}
          size="sm"
          onClick={handleRequest}
          disabled={requested}
          className="flex-1 text-xs"
        >
          {requested ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Requested
            </>
          ) : (
            <>
              <ArrowRightLeft className="w-3.5 h-3.5" />
              Request Swap
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
