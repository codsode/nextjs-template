'use client';

import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input-field';
import { getValidationMessages } from '@/i18n/get-validation-messages';
import { createLoginSchema, type LoginFormData } from '../schemas/auth.schema';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export function LoginForm({
  onSubmit,
  isLoading = false,
}: LoginFormProps): ReactNode {
  const t = useTranslations('auth.login');
  const tv = useTranslations('auth.validation');
  const schema = createLoginSchema(getValidationMessages(tv));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label={t('emailLabel')}
        type="email"
        placeholder={t('emailPlaceholder')}
        error={errors.email?.message}
        disabled={isLoading}
        autoComplete="email"
        {...register('email')}
      />

      <InputField
        label={t('passwordLabel')}
        type="password"
        placeholder={t('passwordPlaceholder')}
        error={errors.password?.message}
        disabled={isLoading}
        autoComplete="current-password"
        {...register('password')}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
      >
        {t('submit')}
      </Button>
    </form>
  );
}
