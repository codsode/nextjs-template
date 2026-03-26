'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  themes,
  type ThemeColors,
  type ThemeMode,
  type ThemeName,
} from '@/config/themes';
import { storage } from '@/lib/storage';

interface ThemeContextValue {
  theme: ThemeName;
  mode: ThemeMode;
  resolvedMode: 'light' | 'dark';
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeVars(colors: ThemeColors): void {
  const root = document.documentElement;
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });
}

function getSystemMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function resolve(m: ThemeMode): 'light' | 'dark' {
  return m === 'system' ? getSystemMode() : m;
}

function readSaved(): { theme: ThemeName; mode: ThemeMode } {
  return {
    theme: storage.get<ThemeName>('theme-name') ?? 'blue',
    mode: storage.get<ThemeMode>('theme-mode') ?? 'system',
  };
}

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [theme, setThemeState] = useState<ThemeName>(() => readSaved().theme);
  const [mode, setModeState] = useState<ThemeMode>(() => readSaved().mode);
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>(() =>
    resolve(readSaved().mode),
  );
  const mounted = useRef(false);

  const setTheme = useCallback(
    (t: ThemeName): void => {
      setThemeState(t);
      storage.set('theme-name', t);
      applyThemeVars(themes[t][resolve(mode)]);
    },
    [mode],
  );

  const setMode = useCallback(
    (m: ThemeMode): void => {
      setModeState(m);
      storage.set('theme-mode', m);
      const r = resolve(m);
      setResolvedMode(r);
      document.documentElement.classList.toggle('dark', r === 'dark');
      applyThemeVars(themes[theme][r]);
    },
    [theme],
  );

  // Apply theme to DOM on mount + listen for system changes
  useEffect(() => {
    const r = resolve(mode);
    if (!mounted.current) {
      mounted.current = true;
      document.documentElement.classList.toggle('dark', r === 'dark');
      applyThemeVars(themes[theme][r]);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (): void => {
      if (mode !== 'system') return;
      const newResolved = getSystemMode();
      setResolvedMode(newResolved);
      document.documentElement.classList.toggle('dark', newResolved === 'dark');
      applyThemeVars(themes[theme][newResolved]);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mode]);

  return (
    <ThemeContext.Provider
      value={{ theme, mode, resolvedMode, setTheme, setMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
