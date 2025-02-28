import React from "react";
import { RocketEngineControlsLayout } from "./RocketEngineControlsLayout";
import { RocketCampus } from "../UI/RocketCampus";

export const ControlLayout: React.FC = () => {
  return (
    <div className="flex items-end justify-start gap-8">
      <RocketCampus />
      <RocketEngineControlsLayout />
    </div>
  );
};
