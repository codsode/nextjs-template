import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export function Section({ title, children }: SectionProps): ReactNode {
  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        {children}
      </div>
    </section>
  );
}
