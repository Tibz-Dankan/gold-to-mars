import React from "react";
import { RocketEngineControlSwitch } from "../UI/RocketEngineControlSwitch";
import { EventBus } from "../../game/EventBus";
import {} from "react";
import { RocketAccelerator } from "../UI/RocketAccelerator";
import { useEngineStatusStore } from "../../store/engineStatus";

export const RocketEngineControlsLayout: React.FC = () => {
  const engineStatus = useEngineStatusStore((state) => state.engineStatus);
  const updateEngineStatus = useEngineStatusStore(
    (state) => state.updateEngineStatus
  );

  const onLoadGoldHandler = (checked: boolean) => {
    if (!checked) return;

    const engineStatus = {
      isLoadGold: true,
      isTakeOff: false,
      isDropGold: false,
      isLanding: false,
    };
    EventBus.emit("engineStatus", engineStatus);
    updateEngineStatus(engineStatus);
  };

  const onTakeOffHandler = (checked: boolean) => {
    if (!checked) return;

    const engineStatus = {
      isLoadGold: true,
      isTakeOff: true,
      isDropGold: false,
      isLanding: false,
    };
    EventBus.emit("engineStatus", engineStatus);
    EventBus.emit("takeOff", { takeOff: true });
    updateEngineStatus(engineStatus);
  };

  const onDropGoldHandler = (checked: boolean) => {
    if (!checked) return;

    const engineStatus = {
      isLoadGold: true,
      isTakeOff: true,
      isDropGold: true,
      isLanding: false,
    };
    EventBus.emit("engineStatus", engineStatus);
    updateEngineStatus(engineStatus);
  };

  const onLandingHandler = (checked: boolean) => {
    if (!checked) return;

    const engineStatus = {
      isLoadGold: true,
      isTakeOff: true,
      isDropGold: true,
      isLanding: true,
    };
    EventBus.emit("engineStatus", engineStatus);
    updateEngineStatus(engineStatus);
  };

  console.log("engineStatus: ", engineStatus);

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
