import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAppStore } from '../store';

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

describe('auth-slice', () => {
  beforeEach(() => {
    // Reset store to initial state
    useAppStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      tokens: null,
      __hydrated: false,
    });
    document.cookie = '';
  });

  it('has correct initial state', () => {
    const state = useAppStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.tokens).toBeNull();
  });

  it('login sets user and tokens', async () => {
    const user = {
      _id: '1',
      name: 'Test User',
      email: 'test@example.com',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };
    const tokens = {
      accessToken: 'access123',
      refreshToken: 'refresh123',
    };

    // Speed up the setTimeout in login
    vi.useFakeTimers();
    const loginPromise = useAppStore.getState().login(user, tokens);
    vi.advanceTimersByTime(1000);
    await loginPromise;
    vi.useRealTimers();

    const state = useAppStore.getState();
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.tokens).toEqual(tokens);
    expect(state.isLoading).toBe(false);
  });

  it('logout clears state', async () => {
    // Set up authenticated state
    useAppStore.setState({
      user: {
        _id: '1',
        name: 'Test',
        email: 'test@test.com',
        createdAt: '',
        updatedAt: '',
      },
      isAuthenticated: true,
      tokens: { accessToken: 'token', refreshToken: 'refresh' },
    });

    useAppStore.getState().logout();

    const state = useAppStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.tokens).toBeNull();
  });

  it('setLoading updates loading state', () => {
    useAppStore.getState().setLoading(true);
    expect(useAppStore.getState().isLoading).toBe(true);

    useAppStore.getState().setLoading(false);
    expect(useAppStore.getState().isLoading).toBe(false);
  });

  it('clearError resets error', () => {
    useAppStore.setState({ error: 'Some error' });
    useAppStore.getState().clearError();
    expect(useAppStore.getState().error).toBeNull();
  });

  it('setTokens updates tokens', () => {
    const tokens = { accessToken: 'new-access', refreshToken: 'new-refresh' };
    useAppStore.getState().setTokens(tokens);
    expect(useAppStore.getState().tokens).toEqual(tokens);
  });
});
