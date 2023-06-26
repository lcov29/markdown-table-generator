/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from 'react';
import { TablePosition, TableContent, ColumnAlignmentOption } from '../../../../model/types';
import { TableEmptyContent } from '../../content/tableEmptyContent/TableEmptyContent';
import { TableTitleContent } from '../../content/tableTitleContent/TableTitleContent';
import { TableTextContent } from '../../content/tableTextContent/TableTextContent';
import { TableImageContent } from '../../content/tableImageContent/TableImageContent';
import './tableEditorContentCell.css';


type Props = {
   content: TableContent,
   position: TablePosition,
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
   triggerRerender: () => void,
   isTitle?: boolean
};


function TableEditorContentCell(props: Props): ReactElement {
   const {
      content,
      position,
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
      triggerRerender,
      isTitle = false
   } = props;


   function isColumnAddControlActive(): boolean {
      return selectedColumnIndex === position.columnIndex;
   }


   function isRowAddControlActive(): boolean {
      return selectedRowIndex === position.rowIndex;
   }


   function generateWrapperStyleClass(): string {
      const isRowHighlightActive = highlightedRowIndex === position.rowIndex;
      const isColumnHighlightActive = highlightedColumnIndex === position.columnIndex;
      const styleList: string[] = ['table-editor-content-cell-wrapper'];

      if (isRowHighlightActive) {
         styleList.push('table-editor-content-cell-wrapper-row-highlight-active');
      }

      if (isColumnHighlightActive) {
         styleList.push('table-editor-content-cell-wrapper-column-highlight-active');
      }

      if (isTitle) {
         styleList.push('table-editor-content-cell-wrapper-is-title');
      }

      return styleList.join(' ');
   }


   function generateColumnAddControlStyleClass(): string {
      const baseClass = 'table-editor-content-cell-add-column-control';
      const activeClass = 'table-editor-content-cell-add-column-control-active';
      return (isColumnAddControlActive()) ? activeClass : baseClass;
   }


   function generateRowAddControlStyleClass(): string {
      const baseClass = 'table-editor-content-cell-add-row-control';
      const activeClass = 'table-editor-content-cell-add-row-control-active';
      return (isRowAddControlActive()) ? activeClass : baseClass;
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

      return (
         <div className="table-editor-content-cell-content-wrapper">
            <div className="table-editor-content-cell-content">{output}</div>
         </div>
      );
   }


   function generateColumnAddControl(): ReactElement {
      return (
         <div className="table-editor-content-cell-add-column-control-wrapper">
            <div
               className={generateColumnAddControlStyleClass()}
               onPointerEnter={() => setSelectedColumnIndex(position.columnIndex)}
               onPointerLeave={() => setSelectedColumnIndex(-2)}
               onClick={() => {
                  addColumnToInternalTable(position.columnIndex + 1);
                  triggerRerender();
               }}
            />
         </div>
      );
   }


   function generateRowAddControl(): ReactElement {
      return (
         <div className="table-editor-content-cell-add-row-control-wrapper">
            <div
               className={generateRowAddControlStyleClass()}
               onPointerEnter={() => setSelectedRowIndex(position.rowIndex)}
               onPointerLeave={() => setSelectedRowIndex(-2)}
               onClick={() => {
                  addRowToInternalTable(position.rowIndex + 1);
                  triggerRerender();
               }}
            >
               &nbsp;
            </div>
         </div>
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
      <div className={` ${generateWrapperStyleClass()}`}>
         { generateContent() }
         { generateColumnAddControl() }
         { generateRowAddControl() }
         { generateGeneralAddControl()}
      </div>
   );

}


export { TableEditorContentCell };
