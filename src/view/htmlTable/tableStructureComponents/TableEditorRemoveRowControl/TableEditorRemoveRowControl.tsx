import React, { useState, ReactElement } from 'react';
import { TablePosition } from '../../../../model/types';
import './tableEditorRemoveRowControl.css';


type Props = {
   position: TablePosition,
   highlightedRowIndex: number,
   setSelectedRowIndexToDelete: (a: number) => void,
   removeRowFromInternalTable: (index: number) => void,
};


function TableEditorRemoveRowControl(props: Props): ReactElement {
   const {
      position,
      highlightedRowIndex,
      setSelectedRowIndexToDelete,
      removeRowFromInternalTable
   } = props;


   const [isControlActive, setIsControlActive] = useState(false);


   function isRowHighlightActive(): boolean {
      return highlightedRowIndex === position.rowIndex;
   }


   function generateStyleClass(): string {
      const styleList: string[] = [];

      if (isControlActive) {
         styleList.push('table-editor-remove-row-control-active');
      } else {
         styleList.push('table-editor-remove-row-control');
      }

      if (isRowHighlightActive()) {
         styleList.push('table-editr-remove-row-control-row-highlight');
      }

      return styleList.join(' ');
   }


   function handleClick(): void {
      if (isControlActive) {
         removeRowFromInternalTable(position.rowIndex);
      } else {
         setSelectedRowIndexToDelete(position.rowIndex);
         setIsControlActive(true);
      }
   }


   function handlePointerLeave(): void {
      setSelectedRowIndexToDelete(-1);
      setIsControlActive(false);
   }


   return (
      <button
         type="button"
         className={generateStyleClass()}
         onClick={handleClick}
         onPointerLeave={handlePointerLeave}
      />
   );
}


export { TableEditorRemoveRowControl };
