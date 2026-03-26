'use client';

import { useEffect } from 'react';

import { useAppStore } from '@/store';
import { useRouter } from '@/i18n/navigation';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function RootPage() {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const isHydrated = useAppStore((state) => state.__hydrated);

  useEffect(() => {
    if (isHydrated) {
      router.replace(isAuthenticated ? '/home' : '/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  return <LoadingSpinner />;
}
