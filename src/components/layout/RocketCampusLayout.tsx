import React from "react";
import { RocketAccelerator } from "../UI/RocketAccelerator";
import { RocketCampus } from "../UI/RocketCampus";

export const RocketCampusLayout: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <RocketCampus />
      <RocketAccelerator />
    </div>
  );
};
