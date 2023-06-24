import React, { useState, ReactElement } from 'react';
import './tableEditorRemoveRowControl.css';


type Props = {
   rowIndex: number,
   setSelectedRowIndexToDelete: (a: number) => void,
   removeRowFromInternalTable: (index: number) => void,
};


function TableEditorRemoveRowControl(props: Props): ReactElement {
   const {
      rowIndex,
      setSelectedRowIndexToDelete,
      removeRowFromInternalTable
   } = props;


   const [isControlActive, setIsControlActive] = useState(false);


   function generateClassName(): string {
      if (isControlActive) {
         return 'table-editor-remove-row-control-active';
      }
      return 'table-editor-remove-row-control';
   }


   function handleClick(): void {
      if (isControlActive) {
         removeRowFromInternalTable(rowIndex);
      } else {
         setSelectedRowIndexToDelete(rowIndex);
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
         className={generateClassName()}
         onClick={handleClick}
         onPointerLeave={handlePointerLeave}
      />
   );
}


export { TableEditorRemoveRowControl };
