import { useState, useEffect } from "react";
import { EventBus } from "../../game/EventBus";
import { RocketSpeedAltitudeTable } from "./RocketSpeedAltitudeTable";
import { RocketSpeedometer } from "./RocketSpeedometer";

export const RocketStatusDisplay = () => {
  const [rocketStatus, setRocketStatus] = useState({
    speed: 0,
    altitude: 0,
    planet: "Earth",
  });
  const [rocketSpeed, setRocketSpeed] = useState({ speed: 0 });

  useEffect(() => {
    const updateStatus = (data: typeof rocketStatus) => setRocketStatus(data);
    const updateSpeed = (speed: typeof rocketSpeed) => setRocketSpeed(speed);

    EventBus.on("rocketStatus", updateStatus);
    EventBus.on("rocketSpeed", updateSpeed);

    return () => {
      EventBus.off("rocketStatus", updateStatus);
      EventBus.off("rocketSpeed", updateSpeed);
    };
  }, []);

  return (
    <div className="text-gray-100 flex flex-col justify-center gap-4">
      <RocketSpeedometer speed={rocketSpeed.speed} maxSpeed={20000} />
      <RocketSpeedAltitudeTable
        altitude={rocketStatus.altitude}
        speed={rocketSpeed.speed}
        planet={rocketStatus.planet}
      />
    </div>
  );
};
