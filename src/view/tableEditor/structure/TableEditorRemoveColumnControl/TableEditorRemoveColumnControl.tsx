import React, { useState, ReactElement } from 'react';
import { TablePosition } from '../../../../model/types';
import './tableEditorRemoveColumnControl.css';


type Props = {
   position: TablePosition,
   highlightedColumnIndex: number,
   setSelectedColumnIndexToDelete: (a: number) => void,
   removeColumnFromInternalTable: (index: number) => void,
   triggerRerender: () => void
};


function TableEditorRemoveColumnControl(props: Props): ReactElement {
   const {
      position,
      highlightedColumnIndex,
      setSelectedColumnIndexToDelete,
      removeColumnFromInternalTable,
      triggerRerender
   } = props;


   const isColumnHighlightActive = highlightedColumnIndex === position.columnIndex;
   const [isControlActive, setIsControlActive] = useState(isColumnHighlightActive);


   function generateStyleClass(): string {
      const activeStyle = 'table-editor-remove-column-control-active';
      const baseStyle = 'table-editor-remove-column-control';
      return (isControlActive) ? activeStyle : baseStyle;
   }


   function handleClick(): void {
      if (isControlActive) {
         removeColumnFromInternalTable(position.columnIndex);
         triggerRerender();
      } else {
         setSelectedColumnIndexToDelete(position.columnIndex);
         setIsControlActive(true);
      }
   }


   function handlePointerLeave(): void {
      setSelectedColumnIndexToDelete(-2);
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


export { TableEditorRemoveColumnControl };
