import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  placeholder = 'Select an option',
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-white text-sm mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          className={`
            w-full px-4 py-3.5 
            bg-dark-light 
            border-2 
            ${error ? 'border-red-500' : 'border-transparent focus:border-primary'}
            rounded-lg
            text-white
            appearance-none
            transition-all
            outline-none
            cursor-pointer
            ${className}
          `}
          {...props}
        >
          <option value="" disabled className="text-gray-secondary">
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-dark-light text-white"
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Flèche dropdown */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1.5 ml-1">
          {error}
        </p>
      )}
    </div>
  );
};