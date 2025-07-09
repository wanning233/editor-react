import { Button } from 'antd';
import type { ButtonViewReturnComponentProps } from '@/types';

export interface ActiveButtonProps {
  icon?: string
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcutKeys?: string[]
  customClass?: string
  loading?: boolean
  tooltipOptions?: any
  color?: string
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
  children?: React.ReactNode
  asChild?: boolean
  upload?: boolean
  initialDisplayedColor?: string
  }
export const ActiveButton = ({ isActive, action, icon, children,title } : ActiveButtonProps) => {
    return (
      <Button
        onClick={action}
      >
        {children}
      </Button>
    );
  };
