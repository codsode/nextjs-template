import { apiClient } from '@/lib/api/client';
import type { User, Tokens } from '../types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: Tokens;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // TODO: Replace with real API call
    // const response = await apiClient.post<AuthResponse>('/auth/login', data);
    // return response.data;

    // Demo implementation
    await new Promise((r) => setTimeout(r, 500));
    return {
      user: {
        _id: '1',
        name: 'User',
        email: data.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      tokens: {
        accessToken: 'token_' + Date.now(),
        refreshToken: 'refresh_' + Date.now(),
      },
    };
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    // TODO: Replace with real API call
    // const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    // return response.data;

    // Demo implementation
    await new Promise((r) => setTimeout(r, 500));
    return {
      user: {
        _id: Math.random().toString(),
        name: data.name,
        email: data.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      tokens: {
        accessToken: 'token_' + Date.now(),
        refreshToken: 'refresh_' + Date.now(),
      },
    };
  },

  logout: async (): Promise<void> => {
    // TODO: Replace with real API call
    // await apiClient.post('/auth/logout');
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/profile');
    return response.data;
  },
};
