import React, { useState } from 'react';
import { Sparkles, ArrowRightLeft, Check, CheckCircle2, MapPin, Award } from 'lucide-react';
import Button from './Button';

const MatchCard = ({ match, onViewMatch, onRequestSwap }) => {
  const [requested, setRequested] = useState(match.status === 'Pending');

  const handleRequest = () => {
    setRequested(true);
    if (onRequestSwap) {
      onRequestSwap(match);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between">
      <div>
        {/* Match Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src={match.user.avatar}
              alt={match.user.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div>
              <h3 className="font-semibold text-slate-900 text-base">{match.user.name}</h3>
              <p className="text-xs text-slate-500">{match.user.location}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              {match.matchScore}% Match
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">High Reciprocal Fit</p>
          </div>
        </div>

        {/* Skill Exchange Relationship Box */}
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-50/80 rounded-xl border border-slate-100">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold tracking-wide text-indigo-600 uppercase">
              You Learn From Them
            </span>
            <div className="text-sm font-semibold text-slate-800">
              {match.theyTeach}
            </div>
            <p className="text-xs text-slate-500">
              Matches your goal: <span className="font-medium text-slate-700">{match.youWant}</span>
            </p>
          </div>

          <div className="space-y-1 md:border-l md:border-slate-200 md:pl-4">
            <span className="text-[11px] font-semibold tracking-wide text-emerald-600 uppercase">
              You Teach Them
            </span>
            <div className="text-sm font-semibold text-slate-800">
              {match.youTeach}
            </div>
            <p className="text-xs text-slate-500">
              Matches their goal: <span className="font-medium text-slate-700">{match.theyWant}</span>
            </p>
          </div>
        </div>

        {/* Match Parameters & Compatibility metadata */}
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location Compatibility
            </span>
            <span className="font-medium text-slate-800">{match.locationMatch}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Award className="w-3.5 h-3.5 text-slate-400" /> Experience Level Fit
            </span>
            <span className="font-medium text-slate-800">{match.levelMatch}</span>
          </div>
        </div>

        {match.notes && (
          <p className="mt-3 text-xs text-slate-500 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-100/60">
            💡 {match.notes}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => onViewMatch && onViewMatch(match)}
        >
          View Match
        </Button>
        <Button
          variant={requested ? 'accent' : 'primary'}
          size="sm"
          className="flex-1"
          onClick={handleRequest}
          disabled={requested}
        >
          {requested ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Swap Requested
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

export default MatchCard;
