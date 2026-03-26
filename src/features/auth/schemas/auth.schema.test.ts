import { describe, it, expect } from 'vitest';

import { createLoginSchema, createSignupSchema } from './auth.schema';
import type { ValidationMessages } from '@/i18n/get-validation-messages';

const messages: ValidationMessages = {
  emailRequired: 'Email is required',
  emailInvalid: 'Please enter a valid email',
  passwordRequired: 'Password is required',
  passwordMin: 'Password must be at least 6 characters',
  nameMin: 'Name must be at least 2 characters',
  confirmRequired: 'Please confirm your password',
  passwordsMismatch: 'Passwords do not match',
};

const loginSchema = createLoginSchema(messages);
const signupSchema = createSignupSchema(messages);

describe('loginSchema', () => {
  it('passes with valid data', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('fails with empty email', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('fails with invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'notanemail',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('fails with empty password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('signupSchema', () => {
  it('passes with valid data', () => {
    const result = signupSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('fails with short name', () => {
    const result = signupSchema.safeParse({
      name: 'J',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('fails with short password', () => {
    const result = signupSchema.safeParse({
      name: 'John',
      email: 'john@example.com',
      password: '12345',
      confirmPassword: '12345',
    });
    expect(result.success).toBe(false);
  });

  it('fails when passwords do not match', () => {
    const result = signupSchema.safeParse({
      name: 'John',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'different',
    });
    expect(result.success).toBe(false);
  });

  it('fails with invalid email', () => {
    const result = signupSchema.safeParse({
      name: 'John',
      email: 'invalid',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(result.success).toBe(false);
  });
});
