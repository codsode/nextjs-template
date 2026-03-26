'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { SignupForm } from '../components/signup-form';
import { useSignup } from '../hooks/use-signup';
import type { SignupFormData } from '../schemas/auth.schema';

export function SignupScreen(): ReactNode {
  const t = useTranslations('auth.signup');
  const signupMutation = useSignup();

  const onSubmit = (data: SignupFormData): void => {
    signupMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
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
          <SignupForm
            onSubmit={onSubmit}
            isLoading={signupMutation.isPending}
          />
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('hasAccount')}{' '}
          <Link
            href="/login"
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            {t('loginLink')}
          </Link>
        </p>
      </div>
    </div>
  );
}
