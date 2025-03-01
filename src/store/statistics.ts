import { create } from "zustand";
import { TStatistics } from "../types/statistics";
import { produce, enableMapSet } from "immer";

enableMapSet(); // Enable Map & Set support for Immer

const initialEarthGoldQuantity = 2440000;
const initialGoldValue = 15;
const initialBTClue = 25;

// TODO: TO persist this data
export const useStatisticsStore = create<
  {
    statistics: TStatistics["statistics"];
    cargo: TStatistics["cargo"];
  } & TStatistics["actions"]
>((set, get) => ({
  statistics: {
    earthGoldQuantity: initialEarthGoldQuantity,
    marsGoldQuantity: 0,
    goldValue: initialGoldValue,
    btcValue: initialBTClue,
  },
  cargo: { name: "", quantity: 0 },
  updateStatistics: (statistics) => set(() => ({ statistics: statistics })),
  // updateMarsGoldQuantity: (goldQuantity) =>
  //   set(() => {
  //     const statistics = get().statistics;
  //     statistics.marsGoldQuantity = statistics.marsGoldQuantity + goldQuantity;
  //     statistics.goldValue = statistics.goldValue + 3;
  //     statistics.btcValue = statistics.btcValue + 8;

  //     return { statistics: statistics };
  //   }),
  updateMarsGoldQuantity: (goldQuantity) =>
    // set(() => {
    //   const statistics = get().statistics;
    //   statistics.marsGoldQuantity = statistics.marsGoldQuantity + goldQuantity;
    //   statistics.goldValue = statistics.goldValue + 3;
    //   statistics.btcValue = statistics.btcValue + 8;

    //   return { statistics: statistics };
    // }),
    set(
      produce((state) => {
        const statistics = get().statistics;
        statistics.marsGoldQuantity =
          statistics.marsGoldQuantity + goldQuantity;
        statistics.goldValue = statistics.goldValue + 3;
        statistics.btcValue = statistics.btcValue + 8;
        state.statistics = statistics;
        // state.onlineStatusMap.set(status.userID, status);
      })
    ),
  updateEarthGoldQuantity: (goldQuantity) =>
    set(() => {
      const statistics = get().statistics;
      statistics.earthGoldQuantity =
        statistics.earthGoldQuantity - goldQuantity;
      return { statistics: statistics };
    }),
  updateCargo: (cargo) => set(() => ({ cargo: cargo })),
}));
