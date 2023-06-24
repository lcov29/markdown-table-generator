/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from 'react';
import { TablePosition } from '../../../../model/types';
import './tableEditorAddRowControl.css';


type Props = {
   position: TablePosition,
   selectedColumnIndex: number,
   highlightedRowIndex: number,
   setSelectedColumnIndex: (a: number) => void,
   addColumnToInternalTable: (index: number) => void
};


function TableEditorAddRowControl(props: Props): ReactElement {
   const {
      position,
      selectedColumnIndex,
      highlightedRowIndex,
      setSelectedColumnIndex,
      addColumnToInternalTable
   } = props;


   function isControlActive(): boolean {
      return selectedColumnIndex === position.columnIndex;
   }


   function isRowHighlightActive(): boolean {
      return highlightedRowIndex === position.rowIndex;
   }


   function generateStyleClass(): string {
      const styleList: string[] = [];

      if (isControlActive()) {
         styleList.push('table-editor-add-row-control-active');
      } else {
         styleList.push('table-editor-add-row-control');
      }

      if (isRowHighlightActive()) {
         styleList.push('table-editor-add-row-control-row-hightlight-active');
      }

      return styleList.join(' ');
   }


   return (
      <div className="table-editor-add-row-control-wrapper">
         <div
            className={generateStyleClass()}
            onPointerEnter={() => setSelectedColumnIndex(position.columnIndex)}
            onPointerLeave={() => setSelectedColumnIndex(-1)}
            onClick={() => addColumnToInternalTable(position.columnIndex)}
         />
      </div>
   );
}


export { TableEditorAddRowControl };
