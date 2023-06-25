/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, ReactElement } from 'react';
import { TablePosition, TableContent, ColumnAlignmentOption } from '../../../../model/types';
import { TableEmptyContent } from '../../content/tableEmptyContent/TableEmptyContent';
import { TableTitleContent } from '../../content/tableTitleContent/TableTitleContent';
import { TableTextContent } from '../../content/tableTextContent/TableTextContent';
import { TableImageContent } from '../../content/tableImageContent/TableImageContent';
import './tableEditorContentCell.css';



type Props = {
   content: TableContent,
   cellPosition: TablePosition,
   alignment: ColumnAlignmentOption,
   selectedRowIndex: number,
   selectedColumnIndex: number,
   highlightedRowIndex: number,
   highlightedColumnIndex: number,
   setSelectedRowIndex: (a: number) => void,
   setSelectedColumnIndex: (a: number) => void,
   addRowToInternalTable: (index: number) => void,
   addColumnToInternalTable: (index: number) => void,
   updateInternalModel: (position: TablePosition, content: TableContent) => void,
   isTitle?: boolean
};


function TableEditorContentCell(props: Props): ReactElement {
   const {
      content,
      cellPosition,
      alignment,
      selectedRowIndex,
      selectedColumnIndex,
      highlightedRowIndex,
      highlightedColumnIndex,
      setSelectedRowIndex,
      setSelectedColumnIndex,
      addRowToInternalTable,
      addColumnToInternalTable,
      updateInternalModel,
      isTitle = false
   } = props;
   const [position] = useState(cellPosition);


   function isColumnAddControlActive(): boolean {
      return selectedColumnIndex === position.columnIndex;
   }


   function isRowAddControlActive(): boolean {
      return selectedRowIndex === position.rowIndex;
   }


   function isRowHighlightActive(): boolean {
      return highlightedRowIndex === position.rowIndex;
   }


   function isColumnHighlightActive(): boolean {
      return highlightedColumnIndex === position.columnIndex;
   }


   function generateWrapperStyleClass(): string {
      const styleList: string[] = [];

      if (isColumnAddControlActive()) {
         styleList.push('table-editor-cell-wrapper-add-column-control-active');
      }

      if (isRowHighlightActive()) {
         styleList.push('table-editor-cell-wrapper-row-highlight-active');
      }

      if (isColumnHighlightActive()) {
         styleList.push('table-editor-cell-wrapper-column-highlight-active');
      }

      if (isTitle) {
         styleList.push('table-editor-title-cell');
      }

      return styleList.join(' ');
   }


   function generateContent(): ReactElement {

      let output = (
         <TableEmptyContent
            position={position}
            alignment={alignment}
            updateInternalModel={updateInternalModel}
         />
      );

      if (content) {
         switch (content.type) {
            case 'title':
               output = <TableTitleContent titleContent={content} alignment={alignment} />;
               break;
            case 'text':
               output = <TableTextContent textContent={content} alignment={alignment} />;
               break;
            case 'image':
               output = <TableImageContent imageContent={content} alignment={alignment} />;
               break;
            default:
               break;
         }
      }

      return <div className="table-editor-cell-content">{output}</div>;
   }


   function generateColumnAddControl(): ReactElement {
      const style = (isColumnAddControlActive()) ? 'table-editor-cell-add-column-control-active' : '';
      return (
         <div
            className={style}
            onPointerEnter={() => setSelectedColumnIndex(position.columnIndex)}
            onPointerLeave={() => setSelectedColumnIndex(-2)}
            onClick={() => addColumnToInternalTable(position.columnIndex)}
         />
      );
   }


   function generateRowAddControl(): ReactElement {
      const style = (isRowAddControlActive()) ? 'table-editor-cell-add-row-control-active' : '';
      return (
         <div
            className={`table-editor-cell-add-row-control ${style}`}
            onPointerEnter={() => setSelectedRowIndex(position.rowIndex)}
            onPointerLeave={() => setSelectedRowIndex(-2)}
            onClick={() => addRowToInternalTable(position.rowIndex)}
         />
      );
   }


   function generateGeneralAddControl(): ReactElement {
      if (isColumnAddControlActive()) {
         return generateColumnAddControl();
      }

      if (isRowAddControlActive()) {
         return generateRowAddControl();
      }

      return <div />;
   }


   return (
      <div className={`table-editor-cell-wrapper ${generateWrapperStyleClass()}`}>
         { generateContent() }
         { generateColumnAddControl() }
         { generateRowAddControl() }
         { generateGeneralAddControl()}
      </div>
   );

}


export { TableEditorContentCell };
