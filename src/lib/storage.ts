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
    } catch (error) {
      console.error(`Storage set error for key "${key}":`, error);
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
    } catch (error) {
      console.error(`Storage get error for key "${key}":`, error);
      return null;
    }
  },

  remove: (key: string): void => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Storage remove error for key "${key}":`, error);
    }
  },
};
