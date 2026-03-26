'use client';

import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/input-field';
import { getValidationMessages } from '@/i18n/get-validation-messages';
import {
  createSignupSchema,
  type SignupFormData,
} from '../schemas/auth.schema';

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
  isLoading?: boolean;
}

export function SignupForm({
  onSubmit,
  isLoading = false,
}: SignupFormProps): ReactNode {
  const t = useTranslations('auth.signup');
  const tv = useTranslations('auth.validation');
  const schema = createSignupSchema(getValidationMessages(tv));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label={t('nameLabel')}
        type="text"
        placeholder={t('namePlaceholder')}
        error={errors.name?.message}
        disabled={isLoading}
        autoComplete="name"
        {...register('name')}
      />

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
        autoComplete="new-password"
        {...register('password')}
      />

      <InputField
        label={t('confirmPasswordLabel')}
        type="password"
        placeholder={t('confirmPasswordPlaceholder')}
        error={errors.confirmPassword?.message}
        disabled={isLoading}
        autoComplete="new-password"
        {...register('confirmPassword')}
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
