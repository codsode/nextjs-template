import React, { useId } from 'react';

import { cn } from '@/lib/utils';

interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, id: externalId, checked, ...props }, ref) => {
    const generatedId = useId();
    const inputId = externalId ?? generatedId;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex cursor-pointer items-center gap-2.5',
          props.disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            aria-checked={checked}
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'h-6 w-10 rounded-full border border-input bg-secondary transition-colors duration-200',
              'peer-checked:bg-primary peer-checked:border-primary',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
            )}
          />
          <div
            className={cn(
              'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-card shadow-sm transition-transform duration-200',
              'peer-checked:translate-x-4',
            )}
          />
        </div>
        {label && (
          <span className="text-sm text-foreground select-none">{label}</span>
        )}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
