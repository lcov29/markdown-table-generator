import React, { useState, ReactElement } from 'react';
import { TablePosition } from '../../../../model/types';
import './tableEditorRemoveRowControl.css';


type Props = {
   position: TablePosition,
   highlightedRowIndex: number,
   setSelectedRowIndexToDelete: (a: number) => void,
   removeRowFromInternalTable: (index: number) => void,
   triggerRerender: () => void
};


function TableEditorRemoveRowControl(props: Props): ReactElement {
   const {
      position,
      highlightedRowIndex,
      setSelectedRowIndexToDelete,
      removeRowFromInternalTable,
      triggerRerender
   } = props;


   const isRowHighlightActive = highlightedRowIndex === position.rowIndex;
   const [isControlActive, setIsControlActive] = useState(isRowHighlightActive);


   function generateStyleClass(): string {
      const styleList: string[] = [];

      if (isControlActive) {
         styleList.push('table-editor-remove-row-control-active');
      } else {
         styleList.push('table-editor-remove-row-control');
      }

      return styleList.join(' ');
   }


   function handleClick(): void {
      if (isControlActive) {
         removeRowFromInternalTable(position.rowIndex);
         triggerRerender();
      } else {
         setSelectedRowIndexToDelete(position.rowIndex);
         setIsControlActive(true);
      }
   }


   function handlePointerLeave(): void {
      setSelectedRowIndexToDelete(-2);
      setIsControlActive(false);
   }


   return (
      <button
         type="button"
         tabIndex={(isControlActive) ? 0 : -1}
         className={generateStyleClass()}
         onClick={handleClick}
         onPointerLeave={handlePointerLeave}
      />
   );
}


export { TableEditorRemoveRowControl };
