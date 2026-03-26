'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { LoginForm } from '../components/login-form';
import { useLogin } from '../hooks/use-login';
import type { LoginFormData } from '../schemas/auth.schema';

export function LoginScreen(): ReactNode {
  const t = useTranslations('auth.login');
  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormData): void => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold shadow-lg">
            A
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t('title')}
          </h1>
        </div>

        <Card>
          <LoginForm onSubmit={onSubmit} isLoading={loginMutation.isPending} />
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('noAccount')}{' '}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            {t('signupLink')}
          </Link>
        </p>
      </div>
    </div>
  );
}
