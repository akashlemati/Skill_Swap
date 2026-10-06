import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Sparkles,
  MapPin,
  CheckCircle2,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { mockUsers, skillCategories } from '../data/mockData';
import UserCard from '../components/UserCard';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

const Discover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All');
  const [locationFilter, setLocationFilter] = useState('');
  const [swapToast, setSwapToast] = useState(null);

  // Filter logic
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      // 1. Search term match (Name, Bio, Skills)
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.bio.toLowerCase().includes(term) ||
        user.skillsTeach.some((s) => s.name.toLowerCase().includes(term)) ||
        user.skillsLearn.some((s) => s.name.toLowerCase().includes(term));

      // 2. Category filter
      const matchesCategory =
        selectedCategory === 'All' ||
        user.skillsTeach.some((s) => s.category?.toLowerCase() === selectedCategory.toLowerCase()) ||
        user.skillsLearn.some((s) => s.category?.toLowerCase() === selectedCategory.toLowerCase());

      // 3. Skill Level filter
      const matchesLevel =
        selectedSkillLevel === 'All' ||
        user.skillsTeach.some((s) => s.level.toLowerCase() === selectedSkillLevel.toLowerCase());

      // 4. Location filter
      const matchesLocation =
        !locationFilter ||
        user.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesLevel && matchesLocation;
    });
  }, [searchTerm, selectedCategory, selectedSkillLevel, locationFilter]);

  const handleRequestSwap = (user) => {
    setSwapToast(`Skill-Swap proposal successfully dispatched to ${user.name}!`);
    setTimeout(() => {
      setSwapToast(null);
    }, 3500);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedSkillLevel('All');
    setLocationFilter('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast Notification */}
      {swapToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{swapToast}</span>
          <button
            onClick={() => setSwapToast(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Peer Directory
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">
          Discover Skill-Swap Peers
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Find learners and mentors across programming, design, language, and leadership with complementary interests.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by skill name (e.g. Java, React, Figma), person name, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Category Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="All">All Categories</option>
              {skillCategories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Skill Level Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">Expertise Level</label>
            <select
              value={selectedSkillLevel}
              onChange={(e) => setSelectedSkillLevel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="All">Any Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Location / Timezone */}
          <div>
            <label className="text-xs font-semibold text-slate-600 mb-1 block">Location / Timezone</label>
            <input
              type="text"
              placeholder="e.g. San Francisco, Berlin, EST..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Filter count & reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>Showing <strong className="text-slate-800">{filteredUsers.length}</strong> peers ready to swap</span>
          {(searchTerm || selectedCategory !== 'All' || selectedSkillLevel !== 'All' || locationFilter) && (
            <button
              onClick={handleResetFilters}
              className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onRequestSwap={handleRequestSwap}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No peers found matching your filters"
          description="Try broadening your search term, resetting category selections, or clearing location constraints."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
};

export default Discover;
