'use client';

import { useAppStore } from '@/store';
import { useRouter } from '@/i18n/navigation';
import type { User } from '../types';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  handleLogout: () => void;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const isHydrated = useAppStore((s) => s.__hydrated);
  const logoutAction = useAppStore((s) => s.logout);

  const handleLogout = (): void => {
    logoutAction();
    router.push('/login');
  };

  return {
    user,
    isAuthenticated,
    isHydrated,
    handleLogout,
  };
}
