import React, { ReactElement } from 'react';
import { TablePosition } from '../../../../../model/types';
import './tableEditorAddColumnControl.css';


type Props = {
   position: TablePosition,
   selectedColumnIndex: number,
   highlightedRowIndex: number,
   setSelectedColumnIndex: (a: number) => void,
   resetSelectedColumnIndex: () => void,
   addColumnToInternalTable: (index: number) => void,
   triggerRerender: () => void,
};


function TableEditorAddColumnControl(props: Props): ReactElement {
   const {
      position,
      selectedColumnIndex,
      highlightedRowIndex,
      setSelectedColumnIndex,
      resetSelectedColumnIndex,
      addColumnToInternalTable,
      triggerRerender
   } = props;


   function generateStyleClass(): string {
      const isControlActive = selectedColumnIndex === position.columnIndex;
      const isRowHighlightActive = highlightedRowIndex === position.rowIndex;
      const styleList: string[] = [];

      if (isControlActive) {
         styleList.push('table-editor-add-column-control-active');
      } else {
         styleList.push('table-editor-add-column-control');
      }

      if (isRowHighlightActive) {
         styleList.push('table-editor-add-column-control-row-hightlight-active');
      }

      return styleList.join(' ');
   }


   return (
      <button
         type="button"
         tabIndex={-1}
         className={generateStyleClass()}
         onPointerEnter={() => setSelectedColumnIndex(position.columnIndex)}
         onPointerLeave={resetSelectedColumnIndex}
         onClick={() => {
            addColumnToInternalTable(position.columnIndex + 1);
            triggerRerender();
         }}
      />
   );
}


export { TableEditorAddColumnControl };
