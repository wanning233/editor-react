import React, { useMemo } from 'react';
import { Select } from 'antd';
import type { ButtonViewReturnComponentProps } from '@/types';

export interface Item {
  title: string;
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>;
  action?: ButtonViewReturnComponentProps['action'];
  disabled?: boolean;
}

interface IPropsFontSizeMenuButton {
  editor: any;
  disabled?: boolean;
  tooltip?: string;
  items?: Item[];
}

const { Option } = Select;

function FontSizeMenuButton(props: IPropsFontSizeMenuButton) {
  const active = useMemo(() => {
    const find: any = (props.items || []).find((k: any) => k.isActive());
    if (find) {
      return find;
    }
    const item: Item = {
      title: 'Default', // 默认值
      isActive: () => false,
    };
    return item;
  }, [props]);

  const handleChange = (value: string) => {
    const selectedItem = props.items?.find(item => item.title === value);
    selectedItem?.action?.();
  };

  return (
    <Select
      value={active.title}
      onChange={handleChange}
      disabled={props?.disabled}
      style={{ width: 120 }} // 设置宽度
      title={props?.tooltip}
    >
      {props?.items?.map((item: any, index) => (
        <Option key={`font-size-${index}`} value={item.title} disabled={item.disabled}>
          {item.title}
        </Option>
      ))}
    </Select>
  );
}

export default FontSizeMenuButton;
