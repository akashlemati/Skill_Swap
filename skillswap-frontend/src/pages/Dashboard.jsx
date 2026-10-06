import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  BookOpen,
  Award,
  Plus,
  Video,
  Check,
  X,
  UserCheck,
  ArrowRightLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockDashboardData, mockMatches } from '../data/mockData';
import Button from '../components/Button';
import MatchCard from '../components/MatchCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState(mockDashboardData.pendingRequests);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const handleAcceptRequest = (id) => {
    setAcceptedRequests((prev) => [...prev, id]);
    setTimeout(() => {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }, 1200);
  };

  const handleDeclineRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. WELCOME HEADER & PROFILE COMPLETION */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400'}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-50"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back, {user?.name?.split(' ')[0] || 'Learner'}!
              </h1>
              <span className="text-xl">👋</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              You have <span className="font-semibold text-indigo-600">2 upcoming swap sessions</span> this week. Keep up the momentum!
            </p>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="w-full md:w-72 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span>Profile Strength</span>
            <span className="text-indigo-600">{mockDashboardData.profileCompletion}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${mockDashboardData.profileCompletion}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Add 1 more verified skill to reach 100% and rank higher in discovery.
          </p>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Skills, Match Suggestions, Upcoming Sessions */}
        <div className="lg:col-span-8 space-y-8">
          {/* Skills Teach & Learn Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Skills I Teach */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">Skills I Teach</h2>
                </div>
                <Link to="/profile/edit">
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </Link>
              </div>

              <div className="space-y-2.5">
                {(user?.skillsTeach || mockDashboardData.skillsTeach).map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-800">{skill.name}</p>
                      <p className="text-[11px] text-slate-400">{skill.level || 'Expert'}</p>
                    </div>
                    <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills I Want To Learn */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">Skills I Learn</h2>
                </div>
                <Link to="/profile/edit">
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </Link>
              </div>

              <div className="space-y-2.5">
                {(user?.skillsLearn || mockDashboardData.skillsLearn).map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-800">{skill.name}</p>
                      <span className="text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-md">
                        {skill.level || skill.targetLevel || 'Learning'}
                      </span>
                    </div>
                    {skill.progress && (
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-amber-500 h-1.5 rounded-full"
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Upcoming Sessions</h2>
              </div>
              <span className="text-xs text-slate-500">Live 1-on-1 swaps</span>
            </div>

            <div className="space-y-3">
              {mockDashboardData.upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={session.peer.avatar}
                      alt={session.peer.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-white"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {session.topic}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Peer: <span className="font-medium text-slate-700">{session.peer.name}</span> • {session.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                    <span className="text-xs font-semibold text-slate-700">
                      {session.time}
                    </span>
                    <Button variant="primary" size="sm" className="text-xs">
                      <Video className="w-3.5 h-3.5 mr-1" />
                      Join Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Skill Matches Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Top Recommended Matches</h2>
                <p className="text-xs text-slate-500">
                  Calculated based on your complementary skill profile
                </p>
              </div>
              <Link to="/matches">
                <Button variant="ghost" size="sm" className="text-indigo-600">
                  View All Matches <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockMatches.slice(0, 2).map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Pending Requests & Recent Activity */}
        <div className="lg:col-span-4 space-y-8">
          {/* Pending Swap Requests */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-indigo-600" />
                Pending Requests ({requests.length})
              </h2>
            </div>

            {requests.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center italic">
                No pending requests right now.
              </p>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => {
                  const isAccepted = acceptedRequests.includes(req.id);
                  return (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={req.fromUser.avatar}
                          alt={req.fromUser.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{req.fromUser.name}</h4>
                          <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md">
                            {req.proposedSkill}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 italic">"{req.message}"</p>

                      <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">{req.date}</span>
                        {isAccepted ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Accepted!
                          </span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleDeclineRequest(req.id)}
                              className="px-2.5 py-1 text-slate-500 hover:text-slate-800 text-xs rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                              Decline
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAcceptRequest(req.id)}
                              className="px-3 py-1 bg-indigo-600 text-white font-medium text-xs rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                            >
                              Accept
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Recent Activity
            </h2>

            <div className="space-y-4">
              {mockDashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-slate-700 leading-snug">{activity.text}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
