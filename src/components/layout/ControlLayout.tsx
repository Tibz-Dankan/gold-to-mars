import React from "react";
// import { ControlPad } from "../UI/ControlPad";
import { RocketStatusDisplay } from "../UI/RocketStatusDisplay";
import { RocketEngineControlsLayout } from "./RocketEngineControlsLayout";
import { RocketCampusLayout } from "./RocketCampusLayout";

export const ControlLayout: React.FC = () => {
  return (
    <div
      className="w-full max-h-[20vh]s flex items-center justify-start
     gap-8 bg-pink-500s bg-slate-800"
    >
      <RocketStatusDisplay />
      <RocketCampusLayout />
      <RocketEngineControlsLayout />
      {/* <ControlPad /> */}
    </div>
  );
};
