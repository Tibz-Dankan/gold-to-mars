import { create } from "zustand";

type TControls = {
  start: boolean;
  pause: boolean;
  updateGameStart: (start: boolean) => void;
  updateGamePause: (pause: boolean) => void;
  resetGame: () => void;
};

export const useControlsStore = create<TControls>((set) => ({
  start: false,
  pause: false,
  updateGameStart: (start: boolean) => set(() => ({ start: start })),
  updateGamePause: (pause: boolean) => set(() => ({ pause: pause })),
  resetGame: () => set(() => ({ start: false, pause: false })), //To try out this one
}));
