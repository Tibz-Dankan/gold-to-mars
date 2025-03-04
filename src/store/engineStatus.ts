import { create } from "zustand";
import { TRocket } from "../types/rocketStatus";
import { produce, enableMapSet } from "immer";

enableMapSet(); // Enable Map & Set support for Immer

export const useEngineStatusStore = create<
  { engineStatus: TRocket["rocketStatus"] } & TRocket["actions"]
>((set) => ({
  engineStatus: {
    isLoadGold: false,
    isTakeOff: false,
    isDropGold: false,
    isLanding: false,
  },
  updateEngineStatus: (engineStatus) =>
    // set(() => ({ engineStatus: engineStatus })),
    set(
      produce((state) => {
        state.engineStatus = engineStatus;
      })
    ),
  updateLoadGold: (loadGold: boolean) =>
    set(
      produce((state) => {
        state.engineStatus.isLoadGold = loadGold;
      })
    ),
  updateTakeOff: (takeOff: boolean) =>
    set(
      produce((state) => {
        state.engineStatus.isTakeOff = takeOff;
      })
    ),
}));
