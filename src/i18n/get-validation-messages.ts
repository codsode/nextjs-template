import type { useTranslations } from 'next-intl';

type TranslateFn = ReturnType<typeof useTranslations<'auth.validation'>>;

export interface ValidationMessages {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMin: string;
  nameMin: string;
  confirmRequired: string;
  passwordsMismatch: string;
}

export function getValidationMessages(t: TranslateFn): ValidationMessages {
  return {
    emailRequired: t('emailRequired'),
    emailInvalid: t('emailInvalid'),
    passwordRequired: t('passwordRequired'),
    passwordMin: t('passwordMin'),
    nameMin: t('nameMin'),
    confirmRequired: t('confirmRequired'),
    passwordsMismatch: t('passwordsMismatch'),
  };
}
