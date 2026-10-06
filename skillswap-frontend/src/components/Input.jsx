import React from 'react';

const Input = ({
  label,
  id,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  helperText,
  required = false,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id || name} className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 ${
          error
            ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 hover:border-slate-300'
        } ${disabled ? 'bg-slate-50 cursor-not-allowed opacity-75' : ''}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
