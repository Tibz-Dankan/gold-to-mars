import React, { useState } from "react";
import { RocketEngineControlSwitch } from "../UI/RocketEngineControlSwitch";
import { EventBus } from "../../game/EventBus";
import {} from "react";
import { TRocket } from "../../types/rocketStatus";
import { RocketAccelerator } from "../UI/RocketAccelerator";

export const RocketEngineControlsLayout: React.FC = () => {
  const [engineStatus, setEngineStatus] = useState<TRocket["rocketStatus"]>({
    isLoadGold: false,
    isTakeOff: false,
    isDropGold: false,
    isLanding: false,
  });
  // const engineStatus =
  //   "IGNITE" || "TAKE_OFF" || "SHUTDOWN" || "LANDING" || "CRUISING";

  // const isIgnite: boolean = engineStatus === "IGNITE";
  // const isTakeOff: boolean = engineStatus === "TAKE_OFF";
  // const isCruising: boolean = engineStatus === "CRUISING";
  // const isLanding: boolean = engineStatus === "LANDING";
  // const isShutdown: boolean = engineStatus === "SHUTDOWN";

  const onLoadGoldHandler = (checked: boolean) => {
    console.log("checked loadGold engine: ", checked);
    EventBus.emit("engineStatus", { engineStatus: "LOAD_GOLD" });
    setEngineStatus({
      isLoadGold: true,
      isTakeOff: false,
      isDropGold: false,
      isLanding: false,
    });
    EventBus.emit("loadGold", { loadGold: true });
  };

  const onTakeOffHandler = (checked: boolean) => {
    console.log("checked takeOff engine: ", checked);
    EventBus.emit("engineStatus", { engineStatus: "TAKE_OFF" });
    setEngineStatus({
      isLoadGold: true,
      isTakeOff: true,
      isDropGold: false,
      isLanding: false,
    });
    if (!checked) return;
    EventBus.emit("takeOff", { takeOff: true });
  };

  const onDropGoldHandler = (checked: boolean) => {
    console.log("checked drop gold engine: ", checked);
    EventBus.emit("engineStatus", { engineStatus: "DROP_GOLD" });
    setEngineStatus({
      isLoadGold: true,
      isTakeOff: true,
      isDropGold: true,
      isLanding: false,
    });
  };

  const onLandingHandler = (checked: boolean) => {
    console.log("checked landing engine: ", checked);
    EventBus.emit("engineStatus", { engineStatus: "LANDING" });
    setEngineStatus({
      isLoadGold: true,
      isTakeOff: true,
      isDropGold: true,
      isLanding: true,
    });
  };

  console.log("Engine Status: ", engineStatus);

  return (
    <div className=" rounded-lg flex flex-col gap-1 items-center justify-center">
      <RocketAccelerator />
      <RocketEngineControlSwitch
        label="Load Gold"
        onCheckHandler={onLoadGoldHandler}
        disabled={false}
      />
      <RocketEngineControlSwitch
        label="Take Off"
        onCheckHandler={onTakeOffHandler}
        disabled={false}
      />
      <RocketEngineControlSwitch
        label="Drop Gold"
        onCheckHandler={onDropGoldHandler}
        disabled={false}
      />
      <RocketEngineControlSwitch
        label="Landing"
        onCheckHandler={onLandingHandler}
        disabled={false}
      />
    </div>
  );
};
