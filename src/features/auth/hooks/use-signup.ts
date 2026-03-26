'use client';

import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { useAppStore } from '@/store';
import { useRouter } from '@/i18n/navigation';
import { showError, showSuccess } from '@/lib/toast';
import {
  authApi,
  type SignupRequest,
  type AuthResponse,
} from '../services/auth.api';

export function useSignup(): UseMutationResult<
  AuthResponse,
  Error,
  SignupRequest
> {
  const t = useTranslations('auth');
  const router = useRouter();
  const login = useAppStore((s) => s.login);

  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: async (response) => {
      await login(response.user, response.tokens);
      showSuccess(t('login.success'));
      router.push('/home');
    },
    onError: () => {
      showError(t('signup.error'));
    },
  });
}
