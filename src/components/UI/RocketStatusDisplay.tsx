import { useState, useEffect } from "react";
import { EventBus } from "../../game/EventBus";
// import { EventBus } from "./EventBus";
import { RocketSpeedAltitudeTable } from "./RocketSpeedAltitudeTable";
import { RocketSpeedometer } from "./RocketSpeedometer";

export const RocketStatusDisplay = () => {
  const [rocketStatus, setRocketStatus] = useState({
    speed: 0,
    altitude: 0,
    planet: "Earth",
  });

  useEffect(() => {
    const updateStatus = (data: typeof rocketStatus) => setRocketStatus(data);

    EventBus.on("rocketStatus", updateStatus);
    // EventBus.on("rocketStatus", (data: typeof rocketStatus) => {
    //   setRocketStatus(() => data);
    // });

    return () => {
      //   EventBus.off("rocketStatus");
      EventBus.off("rocketStatus", updateStatus);
    };
  }, []);

  return (
    <div className="text-gray-100 flex flex-col justify-center gap-4">
      {/* <RocketSpeedometer speed={rocketStatus.speed} maxSpeed={20000} /> */}
      <RocketSpeedometer speed={rocketStatus.speed} maxSpeed={200} />
      <RocketSpeedAltitudeTable
        altitude={rocketStatus.altitude}
        speed={rocketStatus.speed}
        planet={rocketStatus.planet}
      />
    </div>
  );
};
