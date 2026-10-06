import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
        <Compass className="w-8 h-8" />
      </div>
      <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
        404 Error
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-slate-500 max-w-md leading-relaxed">
        The skill-swap page you are searching for doesn't exist, has been moved, or is temporarily unavailable.
      </p>

      <div className="mt-8 flex items-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Homepage
          </Button>
        </Link>
        <Link to="/discover">
          <Button variant="secondary" size="md">
            Browse Skills
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
