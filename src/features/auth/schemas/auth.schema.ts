import { z } from 'zod';

import type { ValidationMessages } from '@/i18n/get-validation-messages';

export function createLoginSchema(m: ValidationMessages) {
  return z.object({
    email: z.string().min(1, m.emailRequired).email(m.emailInvalid),
    password: z.string().min(1, m.passwordRequired),
  });
}

export function createSignupSchema(m: ValidationMessages) {
  return z
    .object({
      name: z.string().min(2, m.nameMin),
      email: z.string().min(1, m.emailRequired).email(m.emailInvalid),
      password: z.string().min(6, m.passwordMin),
      confirmPassword: z.string().min(1, m.confirmRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: m.passwordsMismatch,
      path: ['confirmPassword'],
    });
}

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
export type SignupFormData = z.infer<ReturnType<typeof createSignupSchema>>;
