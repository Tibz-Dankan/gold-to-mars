import React, { useState } from "react";
import { RocketEngineControlSwitch } from "../UI/RocketEngineControlSwitch";
import { EventBus } from "../../game/EventBus";
import {} from "react";
import { TRocket } from "../../types/rocketStatus";
import { RocketAccelerator } from "../UI/RocketAccelerator";

export const RocketEngineControlsLayout: React.FC = () => {
  const [engineStatus, setEngineStatus] =
    useState<TRocket["rocketStatus"]["engineStatus"]>("SHUTDOWN");
  // const engineStatus =
  //   "IGNITE" || "TAKE_OFF" || "SHUTDOWN" || "LANDING" || "CRUISING";

  // const isIgnite: boolean = engineStatus === "IGNITE";
  // const isTakeOff: boolean = engineStatus === "TAKE_OFF";
  // const isCruising: boolean = engineStatus === "CRUISING";
  // const isLanding: boolean = engineStatus === "LANDING";
  // const isShutdown: boolean = engineStatus === "SHUTDOWN";

  const onIgniteEngineHandler = (checked: boolean) => {
    console.log("checked Ignite engine: ", checked);
    EventBus.emit("engineStatus", { engineStatus: "IGNITE" });
    setEngineStatus(() => "IGNITE");
  };

  const onShutdownEngineHandler = (checked: boolean) => {
    console.log("checked shutdown engine: ", checked);
    EventBus.emit("engineStatus", { engineStatus: "SHUTDOWN" });
    setEngineStatus(() => "SHUTDOWN");
  };

  const onTakeOffEngineHandler = (checked: boolean) => {
    console.log("checked takeOff engine: ", checked);
    EventBus.emit("engineStatus", { engineStatus: "TAKE_OFF" });
    setEngineStatus(() => "TAKE_OFF");
    if (!checked) return;
    EventBus.emit("takeOff", { takeOff: true });
  };

  const onLandingEngineHandler = (checked: boolean) => {
    console.log("checked landing engine: ", checked);
    EventBus.emit("engineStatus", { engineStatus: "LANDING" });
    setEngineStatus(() => "LANDING");
  };

  console.log("Engine Status: ", engineStatus);

  return (
    <div className=" rounded-lg flex flex-col gap-1 items-center justify-center">
      <RocketAccelerator />
      <RocketEngineControlSwitch
        label="Shutdown Engine"
        onCheckHandler={onShutdownEngineHandler}
        disabled={false}
      />
      <RocketEngineControlSwitch
        label="Ignite Engine"
        onCheckHandler={onIgniteEngineHandler}
        disabled={false}
      />
      <RocketEngineControlSwitch
        label="Take Off"
        onCheckHandler={onTakeOffEngineHandler}
        disabled={false}
      />
      <RocketEngineControlSwitch
        label="Landing"
        onCheckHandler={onLandingEngineHandler}
        disabled={false}
      />
    </div>
  );
};
