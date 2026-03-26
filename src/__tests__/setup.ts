import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import en from '../../translations/en.json';

afterEach(() => {
  cleanup();
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
}));

vi.mock('next-intl', () => {
  function getNestedValue(obj: Record<string, unknown>, path: string): string {
    const parts = path.split('.');
    let current: unknown = obj;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return path;
      }
    }
    return typeof current === 'string' ? current : path;
  }

  return {
    useTranslations: (namespace?: string) => {
      const t = (key: string, params?: Record<string, unknown>) => {
        const fullKey = namespace ? `${namespace}.${key}` : key;
        let value = getNestedValue(en as Record<string, unknown>, fullKey);
        if (params) {
          Object.entries(params).forEach(([k, v]) => {
            value = value.replace(`{${k}}`, String(v));
          });
        }
        return value;
      };
      t.raw = (key: string) => {
        const fullKey = namespace ? `${namespace}.${key}` : key;
        return getNestedValue(en as Record<string, unknown>, fullKey);
      };
      return t;
    },
    useLocale: () => 'en',
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
      children,
  };
});

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    const a = document.createElement('a');
    a.href = href;
    return { type: 'a', props: { href, ...props, children } };
  },
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  redirect: vi.fn(),
}));
