import { IconComponent } from "../../../components/icons/icon";
import { ActiveButton } from "../../../components/ActiveButton";
import { Editor } from "@tiptap/core";
//@ts-ignore
import { ColorPicker, Button } from "antd";
import { useState } from "react";

interface ColorActiveButtonProps {
  editor: Editor;
  color?: string[];
  isActive: boolean;
  action: (color: string | undefined) => void;
  initialDisplayedColor?: string;
  defaultColor?: string;
  disabled?: boolean;
}

interface IconCProps {
  fill?: string;
}

interface ColorProps {
  clear?: boolean;
  metaColor?: MetaColor;
}

interface MetaColor {
  isVisable: boolean;
  r: number;
  g: number;
  b: number;
  a: number;
}
function IconC({ fill }: IconCProps) {
  return (
    <svg
      className="color-icon"
      viewBox="0 0 240 240"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g transform="translate(0.000000, 0.500000)">
          <g transform="translate(39.000000, 17.353553)">
            <path
              d="M11,201.146447 L167,201.146447 C173.075132,201.146447 178,206.071314 178,212.146447 C178,218.221579 173.075132,223.146447 167,223.146447 L11,223.146447 C4.92486775,223.146447 7.43989126e-16,218.221579 0,212.146447 C-7.43989126e-16,206.071314 4.92486775,201.146447 11,201.146447 Z"
              id="矩形"
              fill={fill || "#DF2A3F"}
              fillRule="evenodd"
            />
            <path
              d="M72.3425855,16.8295583 C75.799482,7.50883712 86.1577877,2.75526801 95.4785089,6.21216449 C100.284516,7.99463061 104.096358,11.7387855 105.968745,16.4968188 L106.112518,16.8745422 L159.385152,161.694068 C161.291848,166.877345 158.635655,172.624903 153.452378,174.531599 C148.358469,176.405421 142.719567,173.872338 140.716873,168.864661 L140.614848,168.598825 L89.211,28.86 L37.3759214,168.623816 C35.4885354,173.712715 29.8981043,176.351047 24.7909589,174.617647 L24.5226307,174.522368 C19.4337312,172.634982 16.7953993,167.044551 18.5287999,161.937406 L18.6240786,161.669077 L72.3425855,16.8295583 Z"
              id="路径-21"
              fill="currentColor"
              fillRule="nonzero"
            />
            <path
              d="M121,103.146447 C126.522847,103.146447 131,107.623599 131,113.146447 C131,118.575687 126.673329,122.994378 121.279905,123.142605 L121,123.146447 L55,123.146447 C49.4771525,123.146447 45,118.669294 45,113.146447 C45,107.717207 49.3266708,103.298515 54.7200952,103.150288 L55,103.146447 L121,103.146447 Z"
              id="路径-22"
              fill="currentColor"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

function ColorActiveButton(props: ColorActiveButtonProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    props.defaultColor
  );

  function onChange(color: ColorProps) {
    if (color && color.metaColor) {
      const rgbaColor = `rgba(${color.metaColor.r}, ${color.metaColor.g}, ${color.metaColor.b}, ${color.metaColor.a})`;
      props.action?.(rgbaColor);
      setSelectedColor(rgbaColor);
    } else {
      props.action?.(undefined);
      setSelectedColor(undefined);
    }
  }

  function toggleColor() {
    props.action?.(selectedColor);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      <div style={{ width: "30px" }}>
        <ActiveButton
          disabled={props?.disabled}
          action={toggleColor}
          customClass="color-main-btn"
        >
          <span>
            <IconC fill={selectedColor || props.initialDisplayedColor} />
          </span>
        </ActiveButton>
      </div>
      <div style={{ width: "28px" }}>
        <ColorPicker
          color={selectedColor}
          //@ts-ignore
          onChange={onChange}
          disabled={props?.disabled}
          colors={props?.color}
          defaultColor={props?.defaultColor}
        >
          <Button
            variant="outlined"
            disabled={props?.disabled}
            style={{
              width: "28px",
              height: "40px",
              minWidth: "28px",
              padding: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconComponent name="MenuDown" />
          </Button>
        </ColorPicker>
      </div>
    </div>
  );
}

export default ColorActiveButton;
