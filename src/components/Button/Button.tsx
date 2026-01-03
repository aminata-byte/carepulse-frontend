import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children,
  isLoading = false,
  variant = 'primary',
  className = '',
  disabled,
  ...props 
}) => {
  return (
    <button
      className={`
        w-full py-3.5 px-6
        rounded-lg
        font-semibold
        transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variant === 'primary' 
          ? 'bg-primary hover:bg-primary-light shadow-green text-white' 
          : 'bg-dark-lighter hover:bg-dark-light text-white'
        }
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
              fill="none"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Chargement...
        </span>
      ) : (
        children
      )}
    </button>
  );
};