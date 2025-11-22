// Storage key type
export type StorageKey = string;

/**
 * Storage object with localStorage-like API
 */
export const storage = {
  /**
   * Set a value in storage
   */
  set: <T>(key: StorageKey, value: T): void => {
    try {
      if (typeof window === 'undefined') return;
      
      if (value === undefined || value === null) {
        localStorage.removeItem(key);
        return;
      }
      
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Storage set error for key "${key}":`, error);
    }
  },

  /**
   * Get a value from storage
   */
  get: <T>(key: StorageKey): T | null => {
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

  /**
   * Remove an item from storage
   */
  remove: (key: StorageKey): void => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Storage remove error for key "${key}":`, error);
    }
  },

  /**
   * Check if a key exists
   */
  contains: (key: StorageKey): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(key) !== null;
  },

  /**
   * Get all storage keys
   */
  getAllKeys: (): string[] => {
    if (typeof window === 'undefined') return [];
    return Object.keys(localStorage);
  },

  /**
   * Clear all storage
   */
  clearAll: (): void => {
    localStorage.clear();
  },
};