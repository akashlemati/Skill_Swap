import React, { useState } from 'react';
import { Sparkles, ArrowRightLeft, CheckCircle2, SlidersHorizontal, Info, X } from 'lucide-react';
import { mockMatches } from '../data/mockData';
import MatchCard from '../components/MatchCard';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

const Matches = () => {
  const [matchList, setMatchList] = useState(mockMatches);
  const [filterScore, setFilterScore] = useState(85);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedMatchModal, setSelectedMatchModal] = useState(null);

  const filteredMatches = matchList.filter((m) => m.matchScore >= filterScore);

  const handleRequestSwap = (match) => {
    setToastMessage(`Reciprocal swap request sent to ${match.user.name}!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleViewMatch = (match) => {
    setSelectedMatchModal(match);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> AI Reciprocal Matching Engine
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
            Your Skill Compatibility Matches
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Our 2-way algorithm pairs your teaching skills with their learning wishlist, and vice-versa.
          </p>
        </div>

        {/* Min Compatibility Slider */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-4">
          <div className="text-xs">
            <span className="text-slate-500 font-medium">Min Match Score:</span>
            <span className="ml-1.5 font-bold text-indigo-600 font-mono text-sm">{filterScore}%</span>
          </div>
          <input
            type="range"
            min="70"
            max="95"
            step="5"
            value={filterScore}
            onChange={(e) => setFilterScore(Number(e.target.value))}
            className="accent-indigo-600 cursor-pointer w-28"
          />
        </div>
      </div>

      {/* Matching Explanation Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3.5">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-indigo-950 leading-relaxed">
          <strong>How 2-way matching works:</strong> You teach Java, they want Java. They teach React, you want React.
          When both learning vectors align along with schedule and language compatibility, a reciprocal match is formed.
        </div>
      </div>

      {/* Matches Grid */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onViewMatch={handleViewMatch}
              onRequestSwap={handleRequestSwap}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matches at this threshold"
          description={`No peers currently reach a ${filterScore}% reciprocal score. Try lowering the threshold slider.`}
          actionLabel="Reset to 80%"
          onAction={() => setFilterScore(80)}
        />
      )}

      {/* View Match Detailed Modal */}
      {selectedMatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMatchModal.user.avatar}
                  alt={selectedMatchModal.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedMatchModal.user.name}</h3>
                  <p className="text-xs text-slate-500">{selectedMatchModal.user.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMatchModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <span className="text-[11px] font-semibold text-indigo-700 uppercase">
                  Reciprocal Exchange Breakdown
                </span>
                <p className="text-xs text-slate-700 mt-1">
                  <strong>You learn:</strong> {selectedMatchModal.theyTeach}
                </p>
                <p className="text-xs text-slate-700 mt-0.5">
                  <strong>You teach:</strong> {selectedMatchModal.youTeach}
                </p>
              </div>

              <div className="text-xs space-y-1.5 text-slate-600">
                <p><strong>Location Compatibility:</strong> {selectedMatchModal.locationMatch}</p>
                <p><strong>Availability Fit:</strong> {selectedMatchModal.user.availability}</p>
                <p><strong>User Bio:</strong> {selectedMatchModal.user.bio}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedMatchModal(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleRequestSwap(selectedMatchModal);
                  setSelectedMatchModal(null);
                }}
              >
                <ArrowRightLeft className="w-3.5 h-3.5 mr-1" />
                Confirm Swap Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;
