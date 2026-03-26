'use client';

import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { useAppStore } from '@/store';
import { useRouter } from '@/i18n/navigation';
import { showError, showSuccess } from '@/lib/toast';
import {
  authApi,
  type LoginRequest,
  type AuthResponse,
} from '../services/auth.api';

export function useLogin(): UseMutationResult<
  AuthResponse,
  Error,
  LoginRequest
> {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const login = useAppStore((s) => s.login);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: async (response) => {
      await login(response.user, response.tokens);
      showSuccess(t('success'));
      router.push('/home');
    },
    onError: () => {
      showError(t('error'));
    },
  });
}
