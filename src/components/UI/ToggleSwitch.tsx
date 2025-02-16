import React, { useState } from "react";
import Switch from "react-switch";
import { twMerge } from "tailwind-merge";

interface ToggleSwitchProps {
  checked: boolean;
  disabled?: boolean;
  diameter?: number;
  width?: number;
  height?: number;
  offColor?: string; // hexadecimal
  onColor?: string; //hexadecimal
  offHandleColor?: string; // hexadecimal
  onHandleColor?: string; //hexadecimal
  checkedIcon?: JSX.Element;
  uncheckedIcon?: JSX.Element;
  className?: string;
  onCheck: (value: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
  const [checked, setChecked] = useState(props.checked ? props.checked : false);

  const onChangeHandler = (checked: boolean) => {
    setChecked(() => checked);
    props.onCheck(checked);
  };

  return (
    <label>
      <Switch
        onChange={onChangeHandler}
        checked={checked}
        disabled={props.disabled ? props.disabled : false}
        handleDiameter={props.diameter}
        width={props.width}
        height={props.height}
        offColor={props.offColor}
        onColor={props.onColor}
        offHandleColor={props.offHandleColor}
        onHandleColor={props.onHandleColor}
        checkedIcon={props.checkedIcon}
        uncheckedIcon={props.uncheckedIcon}
        activeBoxShadow={"0 0 0px 0px #495057"}
        className={twMerge(``, props.className)}
      />
    </label>
  );
};
