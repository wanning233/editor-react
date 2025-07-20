import React, { useState } from 'react';
import { Popover, Button } from 'antd';
import '../../../styles/Table.scss'; 
import {
  TABLE_DEFAULT_SELECTED_GRID_SIZE,
  TABLE_INIT_GRID_SIZE,
  TABLE_MAX_GRID_SIZE,
} from '../../../components/constants';
import { isMobile } from '../../../utils/is-mobile';

const createArray = (length: number) => Array.from({ length }).map((_, index) => index + 1);

interface IPropsCreateTablePopover {
  createTable: any;
  children: any;
}

export interface GridSize {
  rows: number;
  cols: number;
}

export interface CreateTablePayload extends GridSize {
  withHeaderRow: boolean;
}

function CreateTablePopover(props: IPropsCreateTablePopover) {
  const [withHeaderRow, setWithHeaderRow] = useState<boolean>(true);
  const [tableGridSize, setTableGridSize] = useState<GridSize>({
    rows: isMobile() ? TABLE_MAX_GRID_SIZE : TABLE_INIT_GRID_SIZE,
    cols: isMobile() ? TABLE_MAX_GRID_SIZE : TABLE_INIT_GRID_SIZE,
  });

  const [selectedTableGridSize, setSelectedTableGridSize] = useState<GridSize>({
    rows: TABLE_DEFAULT_SELECTED_GRID_SIZE,
    cols: TABLE_DEFAULT_SELECTED_GRID_SIZE,
  });

  const [visible, setVisible] = useState<boolean>(false); // State for popover visibility

  function selectTableGridSize(rows: number, cols: number): void {
    if (rows === tableGridSize.rows) {
      setTableGridSize((prev) => ({
        ...prev,
        rows: Math.min(rows + 1, TABLE_MAX_GRID_SIZE),
      }));
    }

    if (cols === tableGridSize.cols) {
      setTableGridSize((prev) => ({
        ...prev,
        cols: Math.min(cols + 1, TABLE_MAX_GRID_SIZE),
      }));
    }

    setSelectedTableGridSize({ rows, cols });
  }

  function onMouseDown(rows: number, cols: number) {
    props?.createTable({ rows, cols, withHeaderRow });
    resetTableGridSize();
    setVisible(false); // Hide popover after selection
  }

  function resetTableGridSize(): void {
    setWithHeaderRow(false);
    setTableGridSize({
      rows: TABLE_INIT_GRID_SIZE,
      cols: TABLE_INIT_GRID_SIZE,
    });
    setSelectedTableGridSize({
      rows: TABLE_DEFAULT_SELECTED_GRID_SIZE,
      cols: TABLE_DEFAULT_SELECTED_GRID_SIZE,
    });
  }

  return (
    <Popover 
      content={
        <div className="table-grid-size-editor">
          <div className="grid-container">
            {createArray(tableGridSize.rows).map((row) => (
              <div className="grid-row" key={`r-${row}`}>
                {createArray(tableGridSize.cols).map((col) => (
                  <div
                    key={`c-${col}`}
                    onMouseDown={() => onMouseDown(row, col)}
                    onMouseOver={() => selectTableGridSize(row, col)}
                    className={`grid-cell ${col <= selectedTableGridSize.cols && row <= selectedTableGridSize.rows ? 'active' : ''}`}
                  >
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="selected-size">
            {selectedTableGridSize.rows} x {selectedTableGridSize.cols}
          </div>
        </div>
      }
      visible={visible} // Control visibility
      onVisibleChange={setVisible} // Update visibility state
    >
      <span onClick={() => setVisible(true)}>{props.children}</span> {/* Show popover on click */}
    </Popover>
  );
}

export default CreateTablePopover;
