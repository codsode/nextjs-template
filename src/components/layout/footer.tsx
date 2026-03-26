'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer(): ReactNode {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <p
          className="text-center text-xs text-muted-foreground"
          suppressHydrationWarning
        >
          {t('copyright', { year: CURRENT_YEAR })}
        </p>
      </div>
    </footer>
  );
}
