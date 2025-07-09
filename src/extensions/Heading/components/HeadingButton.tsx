import React from 'react';
import { Select } from 'antd';

interface HeadingButtonProps {
  items: Array<{ action: () => void; isActive: () => boolean; disabled: boolean; icon: string; shortcutKeys: string[]; }>; 
  disable: boolean;
}

export const HeadingButton: React.FC<HeadingButtonProps> = ({ items, disable }) => {
  const handleSelect = (value: string) => {
    const level = parseInt(value);
    const selectedItem = items[level];
    if (selectedItem && !selectedItem.disabled) {
      selectedItem.action();
    }
  };

  return (
    <Select
      defaultValue="Heading"
      style={{ width: 100 }}
      onSelect={handleSelect}
      disabled={disable}
    >
      {items.map((item, index) => (
        <Select.Option key={index} value={index} disabled={item.disabled}>
          H{index + 1}
        </Select.Option>
      ))}
    </Select>
  );
};

export default HeadingButton;
