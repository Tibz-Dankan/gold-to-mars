import React from "react";
import { ControlPad } from "../UI/ControlPad";
import { RocketStatusDisplay } from "../UI/RocketStatusDisplay";

export const ControlLayout: React.FC = () => {
  return (
    <div className="w-full max-h-[20vh] flex items-center justify-start gap-8">
      <RocketStatusDisplay />
      <ControlPad />
    </div>
  );
};
