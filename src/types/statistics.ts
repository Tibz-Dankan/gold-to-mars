type Statistics = {
  earthGoldQuantity: number;
  marsGoldQuantity: number;
  goldValue: number;
  btcValue: number;
};

export type TStatisticsActions = {
  updateStatistics: (statistics: Statistics) => void;
  updateMarsGoldQuantity: (goldQuantity: number) => void;
  updateEarthGoldQuantity: (goldQuantity: number) => void;
};

export type TStatistics = {
  statistics: Statistics;
  actions: TStatisticsActions;
};
