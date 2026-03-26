import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export default function NotFound(): ReactNode {
  const t = useTranslations('error');
  const tc = useTranslations('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-border sm:text-9xl">
        {t('notFoundCode')}
      </p>
      <h1 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">
        {t('notFoundTitle')}
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {t('notFoundDescription')}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-10 items-center rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
      >
        {tc('goHome')}
      </Link>
    </div>
  );
}
