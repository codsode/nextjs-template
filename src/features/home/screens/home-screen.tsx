'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { useAppStore } from '@/store';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '../components/feature-card';

const featureKeys = [
  'auth',
  'state',
  'responsive',
  'forms',
  'testing',
  'quality',
] as const;

export function HomeScreen(): ReactNode {
  const t = useTranslations('home');
  const ts = useTranslations('showcase');
  const user = useAppStore((state) => state.user);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg sm:p-8">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
          {t('welcome', { name: user?.name ?? '' })}
        </h1>
        <p className="mt-1 text-sm opacity-80 sm:text-base">{user?.email}</p>
        <p className="mt-3 text-sm opacity-70">{t('loggedIn')}</p>
        <Link href="/showcase" className="mt-4 inline-block">
          <Button variant="secondary" size="md" className="text-foreground">
            {ts('viewShowcase')}
          </Button>
        </Link>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Features</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((key) => (
            <FeatureCard
              key={key}
              title={t(`features.${key}.title`)}
              description={t(`features.${key}.description`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
