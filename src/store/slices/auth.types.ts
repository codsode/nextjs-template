import { User } from "@/models";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tokens: Tokens | null;
}

export interface AuthActions {
  login: (user: User, tokens: Tokens) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setTokens: (tokens: Tokens) => void;
}

export interface AuthSlice extends AuthState, AuthActions {}

export type AuthPersistedState = Pick<AuthSlice, "user" | "isAuthenticated" | "tokens">;