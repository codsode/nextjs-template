'use client';

import type { ChangeEvent, ReactNode } from 'react';
import { useLocale } from 'next-intl';

import { useRouter, usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  hi: 'HI',
};

export function LanguageSwitcher(): ReactNode {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    router.replace(pathname, { locale: e.target.value as Locale });
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="rounded-lg border border-border bg-card px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-input-hover focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label="Select language"
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeLabels[loc]}
        </option>
      ))}
    </select>
  );
}
