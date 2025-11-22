import axios from 'axios';

import { useAppStore } from '@/store';
import { showError } from '@/utils';
import { ENV } from '@/constants';

export const client = axios.create({
  baseURL: `${ENV.NEXT_PUBLIC_API_URL}`,
});

client.interceptors.request.use(config => {
  const tokens = useAppStore(state => state.tokens);
  if (!!tokens) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  response => response,
  error => {
    const { logout } = useAppStore(state => state);
    if (error.response?.status === 401) {
      showError('Your session has expired, please log in again');
      logout();
    }
    return Promise.reject(error);
  }
);
