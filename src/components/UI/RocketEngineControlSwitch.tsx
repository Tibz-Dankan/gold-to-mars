import React from "react";
import { ToggleSwitch } from "./ToggleSwitch";

type RocketPilotEngineControlsProps = {
  label: string;
  disabled: boolean;
  onCheckHandler: (checked: boolean) => void;
};

export const RocketEngineControlSwitch: React.FC<
  RocketPilotEngineControlsProps
> = (props) => {
  // const green4 = "#69db7c";
  // const green9 = "#2b8a3e";
  // const green8 = "#2f9e44";
  const teal5 = "#20c997";
  // const teal8 = "#099268";
  const teal9 = "#087f5b";

  const gray5 = "#adb5bd";
  // const gray6 = "#868e96";
  const gray7 = "#495057";

  return (
    <div
      className="w-full px-2 py-1 pb-2 flex items-center justify-between
      gap-4 rounded-lgs bg-slate-700/60 "
    >
      <span className="text-gray-300 text-[12px] font-[400]">
        {props.label}
      </span>
      <ToggleSwitch
        disabled={props.disabled}
        onCheck={props.onCheckHandler}
        checked={props.disabled}
        checkedIcon={<div />}
        uncheckedIcon={<div />}
        offColor={gray5}
        onColor={teal5}
        offHandleColor={gray7}
        onHandleColor={teal9}
        diameter={16}
        height={10}
        width={32}
        className="-mb-1"
      />
    </div>
  );
};
