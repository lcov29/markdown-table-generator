import React, { useState, ReactElement } from 'react';
import { TablePosition } from '../../../../model/types';
import './tableEditorRemoveColumnControl.css';


type Props = {
   position: TablePosition,
   highlightedColumnIndex: number,
   setSelectedColumnIndexToDelete: (a: number) => void,
   removeColumnFromInternalTable: (index: number) => void,
};


function TableEditorRemoveColumnControl(props: Props): ReactElement {
   const {
      position,
      highlightedColumnIndex,
      setSelectedColumnIndexToDelete,
      removeColumnFromInternalTable
   } = props;


   const [isControlActive, setIsControlActive] = useState(false);


   function isColumnHighlightActive(): boolean {
      return highlightedColumnIndex === position.columnIndex;
   }


   function generateStyleClass(): string {
      const styleList: string[] = [];

      if (isControlActive) {
         styleList.push('table-editor-remove-column-control-active');
      } else {
         styleList.push('table-editor-remove-column-control');
      }

      if (isColumnHighlightActive()) {
         styleList.push('table-editor-remove-column-control-column-highlight');
      }

      return styleList.join(' ');
   }


   function handleClick(): void {
      if (isControlActive) {
         removeColumnFromInternalTable(position.columnIndex);
      } else {
         setSelectedColumnIndexToDelete(position.columnIndex);
         setIsControlActive(true);
      }
   }


   function handlePointerLeave(): void {
      setSelectedColumnIndexToDelete(-1);
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
