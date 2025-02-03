import { create } from "zustand";

export const useStatisticsStore = create((set) => ({
  stats: null,
  updateH: (stats: any) => set(() => ({ stats: stats })),
}));
