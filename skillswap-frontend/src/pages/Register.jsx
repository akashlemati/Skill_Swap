import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    bio: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.location.trim()) {
      errs.location = 'Location (city, country or timezone) is required.';
    }

    if (!formData.bio.trim()) {
      errs.bio = 'Please add a brief bio outlining what you want to learn or teach.';
    } else if (formData.bio.trim().length < 15) {
      errs.bio = 'Bio should be at least 15 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setFormError('');

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        bio: formData.bio
      });
      navigate('/dashboard');
    } catch (err) {
      setFormError('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/30 p-8 sm:p-10">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-indigo-600 text-white items-center justify-center shadow-md shadow-indigo-100 mb-2">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Join the SkillSwap Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Exchange your skills with peers worldwide and accelerate your learning
          </p>
        </div>

        {formError && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Full Name"
            id="name"
            name="name"
            placeholder="Sarah Connor"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="sarah@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
          </div>

          <Input
            label="Location / Timezone"
            id="location"
            name="location"
            placeholder="e.g. San Francisco, CA (PST)"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
            helperText="Helps match you with peers in suitable time zones."
            required
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="bio" className="text-sm font-medium text-slate-700">
              Short Bio & Goals <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              placeholder="Tell other learners what you're good at and what skills you want to level up..."
              value={formData.bio}
              onChange={handleChange}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 ${
                errors.bio
                  ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            />
            {errors.bio && <p className="text-xs text-rose-600 font-medium">{errors.bio}</p>}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Profile...' : 'Complete Registration'}
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs text-slate-600">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
