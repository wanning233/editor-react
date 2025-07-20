import React from 'react';

import { ActiveButton } from "../../../components/ActiveButton";
import CreateTablePopover from './CreateTablePopover';
import type { ButtonViewReturnComponentProps } from '../../../types';

interface IPropsTableActionButton {
  editor: any
  icon?: any
  tooltip?: string
  disabled?: boolean
  color?: string
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
}

function TableActionButton(props: IPropsTableActionButton) {
  function createTable(options: any) {
    if (!props.disabled) {
      props.editor
        .chain()
        .focus()
        .insertTable({ ...options, withHeaderRow: false })
        .run();
    }
  }

  return (
    <CreateTablePopover createTable={createTable}>
      <ActiveButton
        icon={props?.icon}
        tooltip={props?.tooltip}
        disabled={props?.disabled}
        color={props?.color}
        action={props?.action}
        isActive={props?.isActive}
      />
    </CreateTablePopover>
  );
}

export default TableActionButton;
