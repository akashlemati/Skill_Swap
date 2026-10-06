import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const EditProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    location: user?.location || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    availability: user?.availability || ''
  });

  const [skillsTeach, setSkillsTeach] = useState(
    user?.skillsTeach || [
      { name: 'Java', level: 'Advanced', category: 'Programming' },
      { name: 'Spring Boot', level: 'Advanced', category: 'Programming' }
    ]
  );

  const [skillsLearn, setSkillsLearn] = useState(
    user?.skillsLearn || [
      { name: 'React', level: 'Beginner', category: 'Web Development' },
      { name: 'Tailwind CSS', level: 'Beginner', category: 'Web Development' }
    ]
  );

  const [newTeachSkill, setNewTeachSkill] = useState({ name: '', level: 'Intermediate', category: 'Programming' });
  const [newLearnSkill, setNewLearnSkill] = useState({ name: '', level: 'Beginner', category: 'Web Development' });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTeachSkill = (e) => {
    e.preventDefault();
    if (!newTeachSkill.name.trim()) return;
    setSkillsTeach((prev) => [...prev, { ...newTeachSkill }]);
    setNewTeachSkill({ name: '', level: 'Intermediate', category: 'Programming' });
  };

  const handleRemoveTeachSkill = (index) => {
    setSkillsTeach((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddLearnSkill = (e) => {
    e.preventDefault();
    if (!newLearnSkill.name.trim()) return;
    setSkillsLearn((prev) => [...prev, { ...newLearnSkill }]);
    setNewLearnSkill({ name: '', level: 'Beginner', category: 'Web Development' });
  };

  const handleRemoveLearnSkill = (index) => {
    setSkillsLearn((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      ...formData,
      skillsTeach,
      skillsLearn
    });
    setSavedSuccess(true);
    setTimeout(() => {
      navigate('/profile');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>
        <h1 className="text-xl font-bold text-slate-900">Edit Profile</h1>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Profile changes saved successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Professional Headline"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. San Francisco, CA"
            />
            <Input
              label="Availability Schedule"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="e.g. Weekday Evenings & Weekends"
            />
          </div>

          <Input
            label="Avatar Image URL"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            helperText="Provide a public image link for your profile picture."
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="bio" className="text-sm font-medium text-slate-700">
              Biography
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              placeholder="Describe your background, what you enjoy mentoring, and what you want to learn..."
            />
          </div>
        </div>

        {/* Skills I Teach */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Skills I Teach
          </h2>

          <div className="space-y-2">
            {skillsTeach.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-800">{skill.name}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                    {skill.level}
                  </span>
                  <span className="text-xs text-slate-400">{skill.category}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveTeachSkill(index)}
                  className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                  title="Remove skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add teach skill row */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Skill name (e.g. Java, Docker)"
                value={newTeachSkill.name}
                onChange={(e) => setNewTeachSkill({ ...newTeachSkill, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800"
              />
            </div>
            <select
              value={newTeachSkill.level}
              onChange={(e) => setNewTeachSkill({ ...newTeachSkill, level: e.target.value })}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <Button variant="secondary" size="sm" onClick={handleAddTeachSkill}>
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
        </div>

        {/* Skills I Want To Learn */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Skills I Want To Learn
          </h2>

          <div className="space-y-2">
            {skillsLearn.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-800">{skill.name}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-medium">
                    {skill.level}
                  </span>
                  <span className="text-xs text-slate-400">{skill.category}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveLearnSkill(index)}
                  className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                  title="Remove skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add learn skill row */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Target skill (e.g. React, UX Wireframing)"
                value={newLearnSkill.name}
                onChange={(e) => setNewLearnSkill({ ...newLearnSkill, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800"
              />
            </div>
            <select
              value={newLearnSkill.level}
              onChange={(e) => setNewLearnSkill({ ...newLearnSkill, level: e.target.value })}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <Button variant="secondary" size="sm" onClick={handleAddLearnSkill}>
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link to="/profile">
            <Button variant="secondary" size="md">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="md">
            <Save className="w-4 h-4 mr-1.5" />
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
