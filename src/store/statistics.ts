import { create } from "zustand";
import { TStatistics } from "../types/statistics";

const initialEarthGoldQuantity = 2440000;
const initialGoldValue = 15;
const initialBTClue = 25;

export const useStatisticsStore = create<
  { statistics: TStatistics["statistics"] } & TStatistics["actions"]
>((set, get) => ({
  statistics: {
    earthGoldQuantity: initialEarthGoldQuantity,
    marsGoldQuantity: 0,
    goldValue: initialGoldValue,
    btcValue: initialBTClue,
  },
  updateStatistics: (statistics) => set(() => ({ statistics: statistics })),
  updateMarsGoldQuantity: (goldQuantity) =>
    set(() => {
      const statistics = get().statistics;
      statistics.marsGoldQuantity = statistics.marsGoldQuantity + goldQuantity;
      statistics.goldValue = statistics.goldValue + 3;
      statistics.btcValue = statistics.btcValue + 8;

      return { statistics: statistics };
    }),
  updateEarthGoldQuantity: (goldQuantity) =>
    set(() => {
      const statistics = get().statistics;
      statistics.earthGoldQuantity =
        statistics.earthGoldQuantity - goldQuantity;
      return { statistics: statistics };
    }),
}));
