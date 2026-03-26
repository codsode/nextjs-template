import React, { useId } from 'react';

import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const inputId = externalId ?? generatedId;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={inputId}
          className="inline-flex cursor-pointer items-center gap-2.5"
        >
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={cn(
              'h-4.5 w-4.5 rounded border border-input bg-card text-primary',
              'transition-colors duration-150',
              'checked:bg-primary checked:border-primary',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'accent-primary',
              error && 'border-destructive',
              className,
            )}
            aria-invalid={error ? 'true' : undefined}
            {...props}
          />
          {label && (
            <span className="text-sm text-foreground select-none">{label}</span>
          )}
        </label>
        {error && (
          <p className="text-xs font-medium text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
