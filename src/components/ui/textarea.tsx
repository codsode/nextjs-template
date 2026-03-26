import React, { useId } from 'react';

import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = externalId ?? generatedId;
    const errorId = `${textareaId}-error`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground',
            'transition-colors duration-150 resize-y min-h-[80px]',
            'hover:border-input-hover',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed',
            error && 'border-destructive focus:ring-destructive',
            className,
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
