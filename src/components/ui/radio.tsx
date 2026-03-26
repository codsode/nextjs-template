import React, { useId } from 'react';

import { cn } from '@/lib/utils';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  error,
  direction = 'vertical',
  className,
}: RadioGroupProps): React.ReactNode {
  const groupId = useId();

  return (
    <fieldset className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <legend className="mb-1 text-sm font-medium text-foreground">
          {label}
        </legend>
      )}
      <div
        className={cn(
          'flex gap-3',
          direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        )}
        role="radiogroup"
      >
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                'inline-flex cursor-pointer items-center gap-2.5',
                option.disabled && 'opacity-50 cursor-not-allowed',
              )}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange?.(option.value)}
                disabled={option.disabled}
                className={cn(
                  'h-4.5 w-4.5 border border-input bg-card text-primary',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
                  'accent-primary',
                  error && 'border-destructive',
                )}
              />
              <span className="text-sm text-foreground select-none">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
