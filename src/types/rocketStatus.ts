type RocketStatus = {
  speed: number;
  altitude: number;
  planet: "Earth" | "Mars";
  engineStatus: "IGNITE" | "TAKE_OFF" | "SHUTDOWN" | "LANDING" | "CRUISING";
};

export type TRocket = {
  rocketStatus: RocketStatus;
};
