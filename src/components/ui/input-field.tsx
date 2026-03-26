import React, { useId } from 'react';

import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, icon, className, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const inputId = externalId ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground',
              'transition-colors duration-150',
              'hover:border-input-hover',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
              'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:hover:border-input',
              icon ? 'pl-10' : undefined,
              error && 'border-destructive focus:ring-destructive',
              className,
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
        </div>
        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-xs font-medium text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = 'InputField';
