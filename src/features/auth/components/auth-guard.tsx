'use client';

import { useEffect, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { useAppStore } from '@/store';
import { useRouter } from '@/i18n/navigation';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

type GuardMode = 'protected' | 'guest';

interface AuthGuardProps {
  children: ReactNode;
  mode: GuardMode;
}

export function AuthGuard({ children, mode }: AuthGuardProps): ReactNode {
  const t = useTranslations('common');
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const isHydrated = useAppStore((state) => state.__hydrated);

  useEffect(() => {
    if (!isHydrated) return;

    if (mode === 'protected' && !isAuthenticated) {
      router.replace('/login');
    }

    if (mode === 'guest' && isAuthenticated) {
      router.replace('/home');
    }
  }, [isAuthenticated, isHydrated, mode, router]);

  if (!isHydrated) {
    return <LoadingSpinner message={t('loading')} />;
  }

  if (mode === 'protected' && !isAuthenticated) {
    return <LoadingSpinner message={t('redirecting')} />;
  }

  if (mode === 'guest' && isAuthenticated) {
    return <LoadingSpinner message={t('redirecting')} />;
  }

  return <>{children}</>;
}
