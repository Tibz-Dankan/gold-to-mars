import React from "react";
import { RocketEngineControlSwitch } from "../UI/RocketEngineControlSwitch";
import { EventBus } from "../../game/EventBus";
import {} from "react";
import { RocketAccelerator } from "../UI/RocketAccelerator";
import { useEngineStatusStore } from "../../store/engineStatus";
import { useStatisticsStore } from "../../store/statistics";

export const RocketEngineControlsLayout: React.FC = () => {
  const engineStatus = useEngineStatusStore((state) => state.engineStatus);
  const updateEngineStatus = useEngineStatusStore(
    (state) => state.updateEngineStatus
  );
  const updateEngineStatusTakeOff = useEngineStatusStore(
    (state) => state.updateTakeOff
  );
  const updateEngineStatusLoadGold = useEngineStatusStore(
    (state) => state.updateLoadGold
  );

  const updateEarthGoldQuantity = useStatisticsStore(
    (state) => state.updateEarthGoldQuantity
  );

  const updateCargo = useStatisticsStore((state) => state.updateCargo);

  const onLoadGoldHandler = (checked: boolean) => {
    if (!checked) return;

    const engineStatus = {
      isLoadGold: true,
      isTakeOff: false,
      isDropGold: false,
      isLanding: false,
    };
    EventBus.emit("engineStatus", engineStatus);
    // updateEngineStatus(engineStatus);
    updateEngineStatusLoadGold(true);
    updateEarthGoldQuantity(33.3333);
    updateCargo({ name: "Gold", quantity: 33.3333 });
  };

  const onTakeOffHandler = (checked: boolean) => {
    if (!checked) return;

    const engineStatus = {
      isLoadGold: true,
      isTakeOff: true,
      isDropGold: false,
      isLanding: false,
    };
    // EventBus.emit("engineStatus", engineStatus);
    updateEngineStatusTakeOff(true);
    EventBus.emit("takeOff", { takeOff: true });
    updateEngineStatus(engineStatus);
  };

  return (
    <div className=" rounded-lg flex flex-col gap-1 items-center justify-center">
      <RocketAccelerator />
      <RocketEngineControlSwitch
        label="Load Gold"
        onCheckHandler={onLoadGoldHandler}
        disabled={false}
        checked={engineStatus.isLoadGold}
      />
      <RocketEngineControlSwitch
        label="Take Off"
        onCheckHandler={onTakeOffHandler}
        disabled={false}
        checked={engineStatus.isTakeOff}
      />
    </div>
  );
};
