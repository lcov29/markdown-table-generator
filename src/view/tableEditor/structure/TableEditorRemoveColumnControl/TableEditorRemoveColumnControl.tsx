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
