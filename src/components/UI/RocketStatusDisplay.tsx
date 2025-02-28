import { useState, useEffect } from "react";
import { EventBus } from "../../game/EventBus";
import { RocketSpeedAltitudeTable } from "./RocketSpeedAltitudeTable";
import { RocketSpeedometer } from "./RocketSpeedometer";

export const RocketStatusDisplay = () => {
  const [rocketSpeed, setRocketSpeed] = useState({ speed: 0 });
  const [rocketLocation, setRocketLocation] = useState({
    location: "",
    isApproachingEarth: false,
    isApproachingMars: false,
    distanceToEarthKm: 0,
    distanceToMarsKm: 0,
    distanceFromEarthToMarsKm: 0,
  });

  const isNearEarth: boolean =
    rocketLocation.distanceToEarthKm <= rocketLocation.distanceToMarsKm;

  const isEarth: boolean = rocketLocation.location.toUpperCase() === "EARTH";
  const isMars: boolean = rocketLocation.location.toUpperCase() === "MARS";

  const isEarthOrMars = isEarth || isMars;

  const altitude = isNearEarth
    ? isEarthOrMars
      ? rocketLocation.distanceToEarthKm
      : rocketLocation.distanceToEarthKm * 100
    : isEarthOrMars
    ? rocketLocation.distanceToMarsKm
    : rocketLocation.distanceToMarsKm * 100;

  useEffect(() => {
    const updateSpeed = (speed: typeof rocketSpeed) => setRocketSpeed(speed);
    const updateLocation = (data: typeof rocketLocation) =>
      setRocketLocation(data);

    EventBus.on("rocketSpeed", updateSpeed);
    EventBus.on("rocketLocation", updateLocation);

    return () => {
      EventBus.off("rocketSpeed", updateSpeed);
      EventBus.off("rocketLocation", updateLocation);
    };
  }, []);

  return (
    <div className="text-gray-100 flex justify-center gap-4 pt-1">
      <RocketSpeedometer speed={rocketSpeed.speed} maxSpeed={20000} />
      <RocketSpeedAltitudeTable altitude={altitude} speed={rocketSpeed.speed} />
    </div>
  );
};
