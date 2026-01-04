import React, { useRef, useState } from 'react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  error?: string;
  onChange: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = 'image/jpeg,image/png,image/jpg,application/pdf',
  error,
  onChange,
}) => {
  const [fileName, setFileName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onChange(file);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-white text-sm mb-2">
          {label}
        </label>
      )}

      <div
        onClick={handleClick}
        className={`
          w-full p-8 
          bg-dark-light 
          border-2 border-dashed
          ${error ? 'border-red-500' : 'border-dark-lighter hover:border-primary'}
          rounded-lg
          cursor-pointer
          transition-all
          flex flex-col items-center justify-center
          text-center
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        <svg className="w-10 h-10 text-primary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>

        {fileName ? (
          <p className="text-white font-medium">{fileName}</p>
        ) : (
          <>
            <p className="text-primary font-medium">
              Click to upload <span className="text-gray-secondary">or drag and drop</span>
            </p>
            <p className="text-gray-secondary text-sm mt-1">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1.5 ml-1">
          {error}
        </p>
      )}
    </div>
  );
};