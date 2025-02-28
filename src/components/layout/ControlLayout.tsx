import React from "react";
// import { ControlPad } from "../UI/ControlPad";
// import { RocketStatusDisplay } from "../UI/RocketStatusDisplay";
import { RocketEngineControlsLayout } from "./RocketEngineControlsLayout";
import { RocketCampusLayout } from "./RocketCampusLayout";

export const ControlLayout: React.FC = () => {
  return (
    <div
      className="w-full max-h-[20vh]s flex items-end justify-start
     gap-4 bg-pink-500s bg-slate-800 p-4 rounded-lg"
    >
      {/* <RocketStatusDisplay /> */}
      <RocketCampusLayout />
      <RocketEngineControlsLayout />
      {/* <ControlPad /> */}
    </div>
  );
};
