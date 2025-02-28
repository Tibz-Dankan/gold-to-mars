type RocketStatus = {
  isLoadGold: boolean;
  isTakeOff: boolean;
  isDropGold: boolean;
  isLanding: boolean;
};

export type TRocket = {
  rocketStatus: RocketStatus;
};
