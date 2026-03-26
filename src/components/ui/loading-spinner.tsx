import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  size?: SpinnerSize;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export function LoadingSpinner({
  message,
  fullScreen = true,
  size = 'md',
}: LoadingSpinnerProps): ReactNode {
  const displayMessage = message ?? 'Loading...';

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullScreen ? 'min-h-screen' : 'p-8',
      )}
      role="status"
      aria-label={displayMessage}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            'animate-spin rounded-full border-border border-t-primary',
            sizeMap[size],
          )}
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">{displayMessage}</p>
        <span className="sr-only">{displayMessage}</span>
      </div>
    </div>
  );
}
