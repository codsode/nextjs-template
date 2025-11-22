import { create } from 'zustand';

import { createAuthSlice } from './slices';
import { type RootStore } from './types';

export const useAppStore = create<RootStore>()((...a) => ({
  ...createAuthSlice(...a),
}));
