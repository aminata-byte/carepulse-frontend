import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
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

      <textarea
        className={`
          w-full px-4 py-3.5
          bg-dark-light
          border-2
          ${error ? 'border-red-500' : 'border-transparent focus:border-primary'}
          rounded-lg
          text-white
          placeholder:text-gray-secondary
          transition-all
          outline-none
          resize-none
          min-h-[120px]
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1.5 ml-1">
          {error}
        </p>
      )}
    </div>
  );
};