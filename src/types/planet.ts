// EventBus.emit("planetPosition", {
//   earthPositionX: earthPositionX,
//   earthPositionY: earthPositionY,
//   marsPositionX: marsPositionX,
//   marsPositionY: marsPositionY,
// });

type PlanetPosition = {
  earthPositionX: number;
  earthPositionY: number;
  marsPositionX: number;
  marsPositionY: number;
  rocketPositionX: number;
  rocketPositionY: number;
};

export type TPlanet = {
  planetPosition: PlanetPosition;
};
