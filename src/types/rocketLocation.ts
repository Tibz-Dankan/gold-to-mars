export type TRocketLocation = {
  location: "Mars" | "Earth" | "Space";
  isApproachingEarth: boolean;
  isApproachingMars: boolean;
  distanceToEarthKm: number;
  distanceToMarsKm: number;
  distanceFromEarthToMarsKm: number;
};
