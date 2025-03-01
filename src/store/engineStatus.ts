import { create } from "zustand";
import { TRocket } from "../types/rocketStatus";

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
    set(() => ({ engineStatus: engineStatus })),
}));
