interface Storage {
  set: <T>(key: string, value: T) => void;
  get: <T>(key: string) => T | null;
  remove: (key: string) => void;
}

export const storage: Storage = {
  set: <T>(key: string, value: T): void => {
    try {
      if (typeof window === 'undefined') return;

      if (value === undefined || value === null) {
        localStorage.removeItem(key);
        return;
      }

      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch {
      // Silent fail — storage may be unavailable in SSR or incognito
    }
  },

  get: <T>(key: string): T | null => {
    try {
      if (typeof window === 'undefined') return null;

      const value = localStorage.getItem(key);
      if (value === null) return null;

      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    } catch {
      return null;
    }
  },

  remove: (key: string): void => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch {
      // Silent fail
    }
  },
};
