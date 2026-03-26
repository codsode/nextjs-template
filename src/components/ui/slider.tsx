import React, { useId } from 'react';

import { cn } from '@/lib/utils';

interface SliderProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: string;
  showValue?: boolean;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    { label, showValue = false, className, id: externalId, value, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = externalId ?? generatedId;

    return (
      <div className={cn('w-full', className)}>
        {(label || showValue) && (
          <div className="mb-2 flex items-center justify-between">
            {label && (
              <label
                htmlFor={inputId}
                className="text-sm font-medium text-foreground"
              >
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm font-medium text-muted-foreground">
                {value}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type="range"
          value={value}
          className={cn(
            'w-full h-2 rounded-full appearance-none cursor-pointer bg-secondary',
            'accent-primary',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
          {...props}
        />
      </div>
    );
  },
);

Slider.displayName = 'Slider';
