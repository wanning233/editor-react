//@ts-ignore
import { Button, Tooltip } from "antd";
import type { ButtonViewReturnComponentProps } from "@/types";
import { getShortcutKey } from "../utils/plateform";
import { IconComponent } from "./icons/icon";
import React from "react";

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
  tooltipOptions,
}: ActiveButtonProps & { iconProps?: any }) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handleClick = () => {
    if (!disabled && action) {
      setIsPressed(true);
      action();
      // 短暂显示按压状态
      setTimeout(() => setIsPressed(false), 150);
    }
  };

  const isButtonActive = isActive?.() || false;

  const buttonContent = (
    <Button
      type={isButtonActive ? "primary" : "default"}
      onClick={handleClick}
      disabled={disabled}
      loading={loading}
      className={`
        toolbar-button
        ${isButtonActive ? "active" : ""}
        ${isPressed ? "pressed" : ""}
        ${customClass || ""}
      `}
      title={title}
      aria-pressed={isButtonActive}
      style={{
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        ...(isPressed ? { transform: "scale(0.95)" } : {}),
      }}
    >
      <div className="button-content">
        {icon && (
          <IconComponent
            name={icon}
            className={`icon ${isButtonActive ? "active" : ""}`}
          />
        )}
        {!icon && children && (
          <span className={`button-text ${isButtonActive ? "active" : ""}`}>
            {children}
          </span>
        )}
      </div>
    </Button>
  );

  if (tooltip || shortcutKeys?.length) {
    const tooltipContent = (
      <div className="tooltip-content">
        {tooltip && <div className="tooltip-text">{tooltip}</div>}
        {shortcutKeys?.length && (
          <div className="tooltip-shortcuts">
            {shortcutKeys
              .map((key, index) => (
                <kbd key={index} className="shortcut-key">
                  {getShortcutKey(key)}
                </kbd>
              ))
              .reduce((acc, curr, index) => {
                if (index === 0) return [curr];
                return [
                  ...acc,
                  <span key={`sep-${index}`} className="key-separator">
                    +
                  </span>,
                  curr,
                ];
              }, [] as React.ReactNode[])}
          </div>
        )}
      </div>
    );

    return (
      <Tooltip
        title={tooltipContent}
        placement="bottom"
        mouseEnterDelay={0.5}
        overlayClassName="modern-tooltip"
        {...tooltipOptions}
      >
        {buttonContent}
      </Tooltip>
    );
  }

  return buttonContent;
};
