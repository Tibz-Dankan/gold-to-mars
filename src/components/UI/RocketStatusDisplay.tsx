import { useState, useEffect } from "react";
import { EventBus } from "../../game/EventBus";
// import { EventBus } from "./EventBus";

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
    <div className="text-gray-100">
      <h2>Rocket Status</h2>
      <p>Speed: {rocketStatus.speed.toFixed(2)} m/s</p>
      <p>Altitude: {rocketStatus.altitude.toFixed(2)} km</p>
      <p>From: {rocketStatus.planet}</p>
    </div>
  );
};
