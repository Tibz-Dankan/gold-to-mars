type RocketStatus = {
  isLoadGold: boolean;
  isTakeOff: boolean;
  isDropGold: boolean;
  isLanding: boolean;
};

export type TRocketActions = {
  updateEngineStatus: (engineStatus: RocketStatus) => void;
  updateLoadGold: (loadGold: boolean) => void;
  updateTakeOff: (takeOff: boolean) => void;
};

export type TRocket = {
  rocketStatus: RocketStatus;
  actions: TRocketActions;
};
