import React, { useState, ReactElement, CSSProperties } from 'react';
import { InternalTableModel } from '../../model/InternalTableModel';
import { TableEditorRemoveColumnControl } from './structure/TableEditorRemoveColumnControl/TableEditorRemoveColumnControl';
import { TableEditorAddColumnControl } from './structure/TableEditorAddColumnControl/TableEditorAddColumnControl';
import { TableEditorContentCell } from './structure/TableEditorContentCell/TableEditorContentCell';
import { TableEditorRemoveRowControl } from './structure/TableEditorRemoveRowControl/TableEditorRemoveRowControl';
import { TitleContent, TablePosition, TableContent } from '../../model/types';
import './tableEditor.css';


type Props = {
   internalTable: InternalTableModel
};


function TableEditor(props: Props): ReactElement {
   const { internalTable } = props;
   const [selectedRowIndex, setSelectedRowIndex] = useState(-2);
   const [selectedColumnIndex, setSelectedColumnIndex] = useState(-2);
   const [highlightedRowIndex, setHighlightedRowIndex] = useState(-2);
   const [highlightedColumnIndex, setHighlightedColumnIndex] = useState(-2);
   const [rerender, setRerender] = useState(false);


   function triggerRerender(): void {
      setRerender(!rerender);
   }


   function getStyleObj(): CSSProperties {
      return { '--table-editor-content-column-amount': internalTable.columnTotal } as CSSProperties;
   }


   function generateColumnControlRow(): ReactElement[] {
      const elementList: ReactElement[] = [<div key="-1" />];

      for (let columnIndex = 0; columnIndex < internalTable.columnTotal; columnIndex++) {
         elementList.push(
            <TableEditorRemoveColumnControl
               key={`${columnIndex}`}
               position={{ rowIndex: -1, columnIndex }}
               highlightedColumnIndex={highlightedColumnIndex}
               setSelectedColumnIndexToDelete={setHighlightedColumnIndex}
               removeColumnFromInternalTable={
                  (index) => internalTable.removeColumnAt(index)
               }
               triggerRerender={() => triggerRerender()}
            />
         );
      }

      elementList.push(<div key={`${internalTable.columnTotal}`} />);
      return elementList;
   }



   function generateTitleRow(): ReactElement[] {
      const elementList: ReactElement[] = [];

      elementList.push(
         <TableEditorAddColumnControl
            key="-1"
            position={{ rowIndex: 0, columnIndex: 0 }}
            highlightedRowIndex={highlightedRowIndex}
            selectedColumnIndex={selectedColumnIndex}
            setSelectedColumnIndex={setSelectedColumnIndex}
            addColumnToInternalTable={(index) => internalTable.addColumnAt(index)}
            triggerRerender={() => triggerRerender()}
         />
      );

      for (let columnIndex = 0; columnIndex < internalTable.columnTotal; columnIndex++) {
         const position = { rowIndex: 0, columnIndex };
         const content = internalTable.getContentAt(position) as TitleContent;

         elementList.push(
            <TableEditorContentCell
               key={`${columnIndex}`}
               content={content}
               cellPosition={{ rowIndex: 0, columnIndex: columnIndex + 1 }}
               alignment={content.columnAlignment}
               highlightedRowIndex={highlightedRowIndex}
               highlightedColumnIndex={highlightedColumnIndex}
               selectedRowIndex={selectedRowIndex}
               selectedColumnIndex={selectedColumnIndex}
               setSelectedRowIndex={setSelectedRowIndex}
               setSelectedColumnIndex={setSelectedColumnIndex}
               addRowToInternalTable={(index) => internalTable.addRowAt(index)}
               addColumnToInternalTable={(index) => internalTable.addColumnAt(index)}
               updateInternalModel={
                  (cellPosition: TablePosition, cellContent: TableContent) => {
                     internalTable.setContentAt(cellPosition, cellContent);
                  }
               }
               triggerRerender={() => triggerRerender()}
               isTitle
            />
         );
      }

      elementList.push(<div key={`${internalTable.columnTotal}`} />);
      return elementList;
   }



   function generateContentRows(): ReactElement[] {
      const elementList: ReactElement[] = [];

      for (let rowIndex = 1; rowIndex < internalTable.rowTotal; rowIndex++) {

         elementList.push(
            <TableEditorAddColumnControl
               key={`${rowIndex} -1`}
               position={{ rowIndex, columnIndex: 0 }}
               highlightedRowIndex={highlightedRowIndex}
               selectedColumnIndex={selectedColumnIndex}
               setSelectedColumnIndex={setSelectedColumnIndex}
               addColumnToInternalTable={(index) => internalTable.addColumnAt(index)}
               triggerRerender={() => triggerRerender()}
            />
         );

         for (let columnIndex = 0; columnIndex < internalTable.columnTotal; columnIndex++) {

            const position = { rowIndex, columnIndex };
            const content = internalTable.getContentAt(position) as TableContent;
            const titlePosition = { rowIndex: 0, columnIndex };
            const titleContent = internalTable.getContentAt(titlePosition) as TitleContent;

            elementList.push(
               <TableEditorContentCell
                  key={`${rowIndex} ${columnIndex}`}
                  content={content}
                  cellPosition={{ rowIndex, columnIndex: columnIndex + 1 }}
                  alignment={titleContent.columnAlignment}
                  highlightedRowIndex={highlightedRowIndex}
                  highlightedColumnIndex={highlightedColumnIndex}
                  selectedRowIndex={selectedRowIndex}
                  selectedColumnIndex={selectedColumnIndex}
                  setSelectedRowIndex={setSelectedRowIndex}
                  setSelectedColumnIndex={setSelectedColumnIndex}
                  addRowToInternalTable={(index) => internalTable.addRowAt(index)}
                  addColumnToInternalTable={(index) => internalTable.addColumnAt(index)}
                  updateInternalModel={
                     (cellPosition: TablePosition, cellContent: TableContent) => {
                        internalTable.setContentAt(cellPosition, cellContent);
                     }
                  }
                  triggerRerender={() => triggerRerender()}
               />
            );

         }

         elementList.push(
            <TableEditorRemoveRowControl
               key={`${rowIndex} ${internalTable.rowTotal}`}
               position={{ rowIndex, columnIndex: internalTable.columnTotal }}
               highlightedRowIndex={highlightedRowIndex}
               setSelectedRowIndexToDelete={setHighlightedRowIndex}
               removeRowFromInternalTable={(index) => internalTable.removeRowAt(index)}
               triggerRerender={() => triggerRerender()}
            />
         );
      }

      return elementList;
   }



   function generateEmptyRow(): ReactElement[] {
      const elementList: ReactElement[] = [];
      for (let i = 0; i < internalTable.columnTotal + 2; i++) {
         elementList.push(<div key={i}>&nbsp;</div>);
      }
      return elementList;
   }



   return (
      <div
         className="table-editor-wrapper"
         style={getStyleObj()}
         onPointerLeave={() => setSelectedRowIndex(-2)}
      >
         { generateColumnControlRow() }
         { generateTitleRow() }
         { generateContentRows() }
         { generateEmptyRow()}
      </div>
   );

}


export { TableEditor };
