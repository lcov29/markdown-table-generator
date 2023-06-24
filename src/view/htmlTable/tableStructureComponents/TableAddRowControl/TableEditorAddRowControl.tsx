/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from 'react';
import './tableEditorAddRowControl.css';


type Props = {
   columnIndex: number,
   selectedColumnIndex: number,
   setSelectedColumnIndex: (a: number) => void,
   addColumnToInternalTable: (index: number) => void
};


function TableEditorAddRowControl(props: Props): ReactElement {
   const {
      columnIndex,
      selectedColumnIndex,
      setSelectedColumnIndex,
      addColumnToInternalTable
   } = props;


   function generateStyleClass(): string {
      const isControlActive = selectedColumnIndex === columnIndex;
      if (isControlActive) {
         return 'table-editor-add-row-control-active';
      }
      return 'table-editor-add-row-control';
   }


   return (
      <div className="table-editor-add-row-control-wrapper">
         <div
            className={generateStyleClass()}
            onPointerEnter={() => setSelectedColumnIndex(columnIndex)}
            onPointerLeave={() => setSelectedColumnIndex(-1)}
            onClick={() => addColumnToInternalTable(columnIndex)}
         />
      </div>
   );
}


export { TableEditorAddRowControl };
