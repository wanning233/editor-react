import React, { useMemo } from "react";
//@ts-ignore
import { Dropdown, Button, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { ButtonViewReturnComponentProps } from "../../../types";
import { getShortcutKey } from "../../../utils/plateform";
import { IconComponent } from "../../../components/icons/icon";

export interface Item {
  title: string;
  icon?: string;
  isActive: NonNullable<ButtonViewReturnComponentProps["isActive"]>;
  action?: ButtonViewReturnComponentProps["action"];
  style?: React.CSSProperties;
  shortcutKeys?: string[];
  disabled?: boolean;
  divider?: boolean;
  default?: boolean;
}

interface IPropsTextAlignMenuButton {
  editor: any;
  disabled?: boolean;
  color?: string;
  maxHeight?: string | number;
  icon?: string;
  tooltip?: string;
  items?: Item[];
}

function TextAlignMenuButton(props: IPropsTextAlignMenuButton) {
  const active = useMemo(() => {
    const find: any = props?.items?.find((k: any) => k.isActive());
    if (find && !find.default) {
      return {
        ...find,
        icon: find.icon ? find.icon : props.icon,
      };
    }
    const item: Item = {
      title: props?.tooltip as any,
      icon: props.icon,
      isActive: () => false,
    };

    return item;
  }, [props]);

  const menuItems = props?.items?.map((item, index) => ({
    key: `text-align-${index}`,
    label: (
      <Tooltip
        title={
          <div>
            <div>{item.title}</div>
            {!!item.shortcutKeys?.length && (
              <div>
                {item.shortcutKeys?.map((key) => getShortcutKey(key)).join(" ")}
              </div>
            )}
          </div>
        }
      >
        <div
          className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded"
          onClick={item?.action}
        >
          {item?.icon && <IconComponent name={item.icon} className="w-4 h-4" />}
        </div>
      </Tooltip>
    ),
    // disabled: item.disabled,
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      // disabled={props?.disabled}
      placement="bottomLeft"
    >
      <Button
        type="text"
        size="small"
        // disabled={props?.disabled}
        title={props?.tooltip}
        className="flex items-center justify-center w-12 h-12"
      >
        {active?.icon && (
          <IconComponent name={active.icon} className="w-4 h-4 mr-1" />
        )}
        <DownOutlined className="text-xs text-gray-500" />
      </Button>
    </Dropdown>
  );
}

export default TextAlignMenuButton;
