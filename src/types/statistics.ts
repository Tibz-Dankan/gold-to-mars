type Statistics = {
  earthGoldQuantity: number;
  marsGoldQuantity: number;
  goldValue: number;
  btcValue: number;
};

type Cargo = {
  name: string;
  quantity: number;
};

export type TStatisticsActions = {
  updateStatistics: (statistics: Statistics) => void;
  updateMarsGoldQuantity: (goldQuantity: number) => void;
  updateEarthGoldQuantity: (goldQuantity: number) => void;
  updateCargo: (cargo: Cargo) => void;
};

export type TStatistics = {
  statistics: Statistics;
  cargo: Cargo;
  actions: TStatisticsActions;
};
