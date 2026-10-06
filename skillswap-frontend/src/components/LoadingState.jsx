import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = 'Loading skill matches...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3 animate-spin">
        <Loader2 className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium text-slate-700">{message}</p>
      <p className="text-xs text-slate-400 mt-1">Please wait a moment while we fetch the latest data.</p>
    </div>
  );
};

export default LoadingState;
