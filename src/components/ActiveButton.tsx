//@ts-ignore
import { Button, Tooltip } from "antd";
import type { ButtonViewReturnComponentProps } from "@/types";
import { getShortcutKey } from "../utils/plateform";
import { IconComponent } from "./icons/icon";

export interface ActiveButtonProps {
  icon?: string;
  title?: string;
  tooltip?: string;
  disabled?: boolean;
  shortcutKeys?: string[];
  customClass?: string;
  loading?: boolean;
  tooltipOptions?: any;
  color?: string;
  action?: ButtonViewReturnComponentProps["action"];
  isActive?: ButtonViewReturnComponentProps["isActive"];
  children?: React.ReactNode;
  asChild?: boolean;
  upload?: boolean;
  initialDisplayedColor?: string;
}

export const ActiveButton = ({
  isActive,
  action,
  children,
  title,
  tooltip,
  disabled,
  shortcutKeys,
  customClass,
  loading,
  icon,
}: ActiveButtonProps & { iconProps?: any }) => {
  const buttonContent = (
    <Button
      type={isActive?.() ? "primary" : "default"}
      onClick={action}
      disabled={disabled}
      loading={loading}
      className={customClass}
      title={title}
    >
      {icon && <IconComponent name={icon} />}
      {!icon && children}
    </Button>
  );

  if (tooltip || shortcutKeys?.length) {
    const tooltipContent = (
      <div>
        {tooltip && <div>{tooltip}</div>}
        {shortcutKeys?.length && (
          <div className="text-xs text-gray-400">
            {shortcutKeys.map((key) => getShortcutKey(key)).join(" ")}
          </div>
        )}
      </div>
    );

    return <Tooltip title={tooltipContent}>{buttonContent}</Tooltip>;
  }

  return buttonContent;
};
