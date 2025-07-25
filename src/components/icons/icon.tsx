import React from "react";
import { icons } from "./icons";

export interface IconComponentProps {
  name: string;
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
}

export const IconComponent = (props: IconComponentProps) => {
  const Icon = icons[props.name];

  return Icon ? (
    <Icon
      onClick={props?.onClick}
      className={`richtext-w-4 richtext-h-4 ${props?.className || ""}`}
    />
  ) : null;
};
