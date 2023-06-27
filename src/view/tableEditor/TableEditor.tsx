/* eslint-disable react/jsx-no-bind */
import React, { useState, ReactElement, CSSProperties } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InternalTableModel } from '../../model/InternalTableModel';
import { TableEditorColumnControl } from './structure/TableEditorColumnControl/TableEditorColumnControl';
import { TableEditorAddColumnControl } from './structure/TableEditorAddColumnControl/TableEditorAddColumnControl';
import { TableEditorContentCell } from './structure/TableEditorContentCell/TableEditorContentCell';
import { TableEditorRemoveRowControl } from './structure/TableEditorRemoveRowControl/TableEditorRemoveRowControl';
import { TitleContent, TablePosition, TableContent, ColumnAlignmentOption } from '../../model/types';
import './tableEditor.css';


type Props = {
   internalTable: InternalTableModel
};


function TableEditor(props: Props): ReactElement {
   const { internalTable } = props;

   const defaultSelectedIndex = -2;
   const defaultHighlightedIndex = -2;

   const [selectedRowIndex, setSelectedRowIndex] = useState(defaultSelectedIndex);
   const [selectedColumnIndex, setSelectedColumnIndex] = useState(defaultSelectedIndex);
   const [highlightedRowIndex, setHighlightedRowIndex] = useState(defaultHighlightedIndex);
   const [highlightedColumnIndex, setHighlightedColumnIndex] = useState(defaultHighlightedIndex);
   const [rerender, setRerender] = useState(false);


   function triggerRerender(): void {
      setRerender(!rerender);
   }


   function resetSelectedRowIndex() {
      setSelectedRowIndex(defaultSelectedIndex);
   }


   function resetSelectedColumnIndex() {
      setSelectedColumnIndex(defaultSelectedIndex);
   }


   function resetHighlightedRowIndex() {
      setHighlightedRowIndex(defaultHighlightedIndex);
   }


   function resetHighlightedColumnIndex() {
      setHighlightedColumnIndex(defaultHighlightedIndex);
   }


   function updateColumnAlignment(columnIndex: number, alignment: ColumnAlignmentOption): void {
      const position: TablePosition = { rowIndex: 0, columnIndex };
      const title = internalTable.getContentAt(position) as TitleContent;
      title.columnAlignment = alignment;
   }


   function getStyleObj(): CSSProperties {
      return { '--table-editor-content-column-amount': internalTable.columnTotal } as CSSProperties;
   }


   function generateColumnControlRow(): ReactElement[] {
      const elementList: ReactElement[] = [<div key="-1" />];

      for (let columnIndex = 0; columnIndex < internalTable.columnTotal; columnIndex++) {
         elementList.push(
            <TableEditorColumnControl
               key={uuidv4()}
               position={{ rowIndex: -1, columnIndex }}
               highlightedColumnIndex={highlightedColumnIndex}
               setHighlightedColumnIndex={setHighlightedColumnIndex}
               resetHighlightedColumnIndex={resetHighlightedColumnIndex}
               removeColumnFromInternalTable={
                  (index) => internalTable.removeColumnAt(index)
               }
               updateColumnAlignment={updateColumnAlignment}
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
            position={{ rowIndex: 0, columnIndex: -1 }}
            highlightedRowIndex={highlightedRowIndex}
            selectedColumnIndex={selectedColumnIndex}
            setSelectedColumnIndex={setSelectedColumnIndex}
            resetSelectedColumnIndex={resetSelectedColumnIndex}
            addColumnToInternalTable={(index) => internalTable.addColumnAt(index)}
            triggerRerender={() => triggerRerender()}
         />
      );

      for (let columnIndex = 0; columnIndex < internalTable.columnTotal; columnIndex++) {
         const position = { rowIndex: 0, columnIndex };
         const content = internalTable.getContentAt(position) as TitleContent;

         elementList.push(
            <TableEditorContentCell
               key={uuidv4()}
               content={content}
               position={position}
               alignment={content.columnAlignment}
               highlightedRowIndex={highlightedRowIndex}
               highlightedColumnIndex={highlightedColumnIndex}
               selectedRowIndex={selectedRowIndex}
               selectedColumnIndex={selectedColumnIndex}
               setSelectedRowIndex={setSelectedRowIndex}
               resetSelectedColumnIndex={resetSelectedColumnIndex}
               resetSelectedRowIndex={resetSelectedRowIndex}
               setSelectedColumnIndex={setSelectedColumnIndex}
               addRowToInternalTable={(index) => internalTable.addRowAt(index)}
               addColumnToInternalTable={(index) => internalTable.addColumnAt(index)}
               updateInternalModel={
                  (cellPosition: TablePosition, cellContent: TableContent) => {
                     internalTable.setContentAt(cellPosition, cellContent);
                  }
               }
               triggerRerender={() => triggerRerender()}
               isLastRow={position.rowIndex === internalTable.rowTotal - 1}
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
               key={uuidv4()}
               position={{ rowIndex, columnIndex: -1 }}
               highlightedRowIndex={highlightedRowIndex}
               selectedColumnIndex={selectedColumnIndex}
               setSelectedColumnIndex={setSelectedColumnIndex}
               resetSelectedColumnIndex={resetSelectedColumnIndex}
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
                  key={uuidv4()}
                  content={content}
                  position={position}
                  alignment={titleContent.columnAlignment}
                  highlightedRowIndex={highlightedRowIndex}
                  highlightedColumnIndex={highlightedColumnIndex}
                  selectedRowIndex={selectedRowIndex}
                  selectedColumnIndex={selectedColumnIndex}
                  setSelectedRowIndex={setSelectedRowIndex}
                  setSelectedColumnIndex={setSelectedColumnIndex}
                  resetSelectedRowIndex={resetSelectedRowIndex}
                  resetSelectedColumnIndex={resetSelectedColumnIndex}
                  addRowToInternalTable={(index) => internalTable.addRowAt(index)}
                  addColumnToInternalTable={(index) => internalTable.addColumnAt(index)}
                  updateInternalModel={
                     (cellPosition: TablePosition, cellContent: TableContent) => {
                        internalTable.setContentAt(cellPosition, cellContent);
                     }
                  }
                  triggerRerender={() => triggerRerender()}
                  isLastRow={position.rowIndex === internalTable.rowTotal - 1}
               />
            );

         }

         elementList.push(
            <TableEditorRemoveRowControl
               key={uuidv4()}
               position={{ rowIndex, columnIndex: internalTable.columnTotal }}
               highlightedRowIndex={highlightedRowIndex}
               setHighlightedRowIndex={setHighlightedRowIndex}
               resetHighlightedRowIndex={resetHighlightedRowIndex}
               removeRowFromInternalTable={(index) => internalTable.removeRowAt(index)}
               triggerRerender={() => triggerRerender()}
            />
         );
      }

      return elementList;
   }



   return (
      <div
         className="table-editor-wrapper"
         style={getStyleObj()}
         onPointerLeave={() => {
            resetSelectedRowIndex();
            resetSelectedColumnIndex();
         }}
      >
         { generateColumnControlRow() }
         { generateTitleRow() }
         { generateContentRows() }
      </div>
   );

}


export { TableEditor };
