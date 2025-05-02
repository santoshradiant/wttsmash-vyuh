import { create } from 'zustand/react';
import { SiteSettings } from './types';

type WttState = {
  settings?: SiteSettings;
};

type WttActions = {
  setSettings(settings: SiteSettings): void;
};

export type WttStore = WttState & WttActions;

export const useWttStore = create<WttStore>()((set) => ({
  // State
  settings: undefined,

  // Actions
  setSettings: (settings) => set({ settings }),
}));
