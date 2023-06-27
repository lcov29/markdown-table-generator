import React, { useState, ReactElement } from 'react';
import { TablePosition, ColumnAlignmentOption } from '../../../../model/types';
import './tableEditorColumnControl.css';


type Props = {
   position: TablePosition,
   highlightedColumnIndex: number,
   setHighlightedColumnIndex: (a: number) => void,
   removeColumnFromInternalTable: (index: number) => void,
   updateColumnAlignment: (index: number, alignment: ColumnAlignmentOption) => void,
   triggerRerender: () => void
};


function TableEditorColumnControl(props: Props): ReactElement {
   const {
      position,
      highlightedColumnIndex,
      setHighlightedColumnIndex,
      removeColumnFromInternalTable,
      updateColumnAlignment,
      triggerRerender
   } = props;


   const isColumnHighlightActive = highlightedColumnIndex === position.columnIndex;
   const [isControlActive, setIsControlActive] = useState(isColumnHighlightActive);


   function handleWrapperClick(): void {
      setHighlightedColumnIndex(position.columnIndex);
      setIsControlActive(true);
   }


   function handleRemoveControlClick(): void {
      removeColumnFromInternalTable(position.columnIndex);
      triggerRerender();
   }


   function handleAlignmentUpdateClick(alignment: ColumnAlignmentOption): void {
      updateColumnAlignment(position.columnIndex, alignment);
      triggerRerender();
   }


   function handlePointerLeave(): void {
      setHighlightedColumnIndex(-2);
      setIsControlActive(false);
   }


   if (isControlActive) {
      return (
         <div
            className="table-editor-column-control-wrapper-active"
            onPointerLeave={handlePointerLeave}
         >
            <div className="table-editor-column-control-alignment-input-wrapper">
               <button
                  type="button"
                  className="
                     table-editor-column-control-alignment-input
                     table-editor-column-control-left-alignment-input"
                  title="Left Align"
                  onClick={() => handleAlignmentUpdateClick('left')}
               >
                  <span className="table-editor-column-control-alignment-icon-bar" />
                  <span className="table-editor-column-control-alignment-icon-bar" />
                  <span className="table-editor-column-control-alignment-icon-bar" />
               </button>
               <button
                  type="button"
                  className="
                     table-editor-column-control-alignment-input
                     table-editor-column-control-center-alignment-input"
                  title="Center Align"
                  onClick={() => handleAlignmentUpdateClick('center')}

               >
                  <span className="table-editor-column-control-alignment-icon-bar" />
                  <span className="table-editor-column-control-alignment-icon-bar" />
                  <span className="table-editor-column-control-alignment-icon-bar" />
               </button>
               <button
                  type="button"
                  className="
                     table-editor-column-control-alignment-input
                     table-editor-column-control-right-alignment-input"
                  title="Right Align"
                  onClick={() => handleAlignmentUpdateClick('right')}

               >
                  <span className="table-editor-column-control-alignment-icon-bar" />
                  <span className="table-editor-column-control-alignment-icon-bar" />
                  <span className="table-editor-column-control-alignment-icon-bar" />
               </button>
            </div>
            <button
               type="button"
               className="table-editor-remove-column-control"
               onClick={handleRemoveControlClick}
            />
         </div>
      );
   }

   return (
      <button
         type="button"
         className="table-editor-column-control-wrapper"
         tabIndex={-1}
         onClick={handleWrapperClick}
         onPointerLeave={handlePointerLeave}
      />
   );



}


export { TableEditorColumnControl };
