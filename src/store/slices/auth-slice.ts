import { type StateCreator } from 'zustand';
import { persist, type StorageValue } from 'zustand/middleware';

import { type User } from '@/models';
import { storage } from '@/utils';

import {
  type AuthPersistedState,
  type AuthSlice,
  type Tokens,
} from './auth.types';

export const createAuthSlice: StateCreator<
  AuthSlice,
  [],
  [['zustand/persist', AuthPersistedState]]
> = persist(
  set => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    tokens: null,
    __hydrated: false,
    login: async (user: User, tokens: Tokens) => {
      try {
        set({ isLoading: true, error: null });

        await new Promise(resolve => setTimeout(resolve, 1000));

        set({
          user: user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          tokens: tokens,
        });
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
    },

    clearError: () => {
      set({ error: null });
    },

    setLoading: (loading: boolean) => {
      set({ isLoading: loading });
    },
    setTokens: (tokens: Tokens) => {
      set({ tokens: tokens });
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
        }
      };
    },
  }
);
