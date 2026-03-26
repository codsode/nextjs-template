import { type StateCreator } from 'zustand';
import { persist, type StorageValue } from 'zustand/middleware';

import type { User, Tokens } from '@/features/auth/types';
import { storage } from '@/lib/storage';

import type { AuthPersistedState, AuthSlice } from './auth.types';

function setAuthCookie(token: string | null) {
  if (typeof document === 'undefined') return;
  if (token) {
    document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  } else {
    document.cookie = 'auth-token=; path=/; max-age=0';
  }
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [],
  [['zustand/persist', AuthPersistedState]]
> = persist(
  (set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    tokens: null,
    __hydrated: false,

    login: async (user: User, tokens: Tokens) => {
      try {
        set({ isLoading: true, error: null });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          tokens,
        });

        setAuthCookie(tokens.accessToken);
      } catch (error) {
        set({
          isLoading: false,
          error: error instanceof Error ? error.message : 'Login failed',
        });
      }
    },

    logout: () => {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        tokens: null,
      });
      setAuthCookie(null);
    },

    clearError: () => {
      set({ error: null });
    },

    setLoading: (loading: boolean) => {
      set({ isLoading: loading });
    },

    setTokens: (tokens: Tokens) => {
      set({ tokens });
      setAuthCookie(tokens.accessToken);
    },
  }),
  {
    name: 'user-data',
    storage: {
      setItem: (name: string, value: unknown) => {
        storage.set(name, value);
      },
      getItem: (name: string) => {
        return storage.get(name) as StorageValue<AuthPersistedState>;
      },
      removeItem: (name: string) => {
        storage.remove(name);
      },
    },
    partialize: (state): AuthPersistedState => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      tokens: state.tokens,
    }),
    onRehydrateStorage: () => {
      return (state) => {
        if (state) {
          state.__hydrated = true;
          if (state.tokens?.accessToken) {
            setAuthCookie(state.tokens.accessToken);
          }
        }
      };
    },
  },
);
