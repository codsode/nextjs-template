import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps): ReactNode {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground p-5 shadow-sm sm:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
