import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  ...props 
}) => {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          type="checkbox"
          className="sr-only peer"
          {...props}
        />
        <div className="w-5 h-5 border-2 border-dark-lighter rounded bg-dark-light peer-checked:bg-primary peer-checked:border-primary transition-all" />
        <svg
          className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-gray-secondary text-sm leading-relaxed">
        {label}
      </span>
    </label>
  );
};