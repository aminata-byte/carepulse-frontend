import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({ 
  icon, 
  error,
  label,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-gray-secondary text-sm mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Icône à gauche */}
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-secondary">
            {icon}
          </div>
        )}
        
        {/* Input */}
        <input
          className={`
            w-full px-4 py-3.5 
            ${icon ? 'pl-12' : 'pl-4'}
            bg-dark-light 
            border-2 
            ${error ? 'border-red-500' : 'border-transparent focus:border-primary'}
            rounded-lg
            text-white
            placeholder:text-gray-secondary
            transition-all
            outline-none
            ${className}
          `}
          {...props}
        />
      </div>
      
      {/* Message d'erreur */}
      {error && (
        <p className="text-red-500 text-sm mt-1.5 ml-1">
          {error}
        </p>
      )}
    </div>
  );
};