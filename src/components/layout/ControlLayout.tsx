import React from "react";
import { ControlPad } from "../UI/ControlPad";

export const ControlLayout: React.FC = () => {
  return (
    <div className="w-full max-h-[20vh] flex items-center justify-end">
      <ControlPad />
    </div>
  );
};
