type RocketStatus = {
  isLoadGold: boolean;
  isTakeOff: boolean;
  isDropGold: boolean;
  isLanding: boolean;
};

export type TRocketActions = {
  updateEngineStatus: (engineStatus: RocketStatus) => void;
};

export type TRocket = {
  rocketStatus: RocketStatus;
  actions: TRocketActions;
};
