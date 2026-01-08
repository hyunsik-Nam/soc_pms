import React, { forwardRef, SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  placeholder?: string;
}

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ label, options, error, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            block w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

SelectBox.displayName = 'SelectBox';

export default SelectBox;
