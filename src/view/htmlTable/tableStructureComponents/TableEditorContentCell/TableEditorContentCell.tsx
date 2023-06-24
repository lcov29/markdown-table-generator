/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, ReactElement } from 'react';
import { TablePosition } from '../../../../model/types';
import './tableEditorContentCell.css';


type Props = {
   content: ReactElement,
   cellPosition: TablePosition,
   selectedRowIndex: number,
   selectedColumnIndex: number,
   setSelectedRowIndex: (a: number) => void,
   setSelectedColumnIndex: (a: number) => void,
   addRowToInternalTable: (index: number) => void,
   addColumnToInternalTable: (index: number) => void,
   isTitle?: boolean
};


function TableEditorContentCell(props: Props): ReactElement {
   const {
      content,
      cellPosition,
      selectedRowIndex,
      selectedColumnIndex,
      setSelectedRowIndex,
      setSelectedColumnIndex,
      addRowToInternalTable,
      addColumnToInternalTable,
      isTitle = false
   } = props;
   const [position] = useState(cellPosition);


   function isColumnAddControlActive(): boolean {
      return selectedColumnIndex === position.columnIndex;
   }


   function isRowAddControlActive(): boolean {
      return selectedRowIndex === position.rowIndex;
   }


   function generateWrapperStyleClass(): string {
      const styleList: string[] = [];

      if (isColumnAddControlActive()) {
         styleList.push('table-editor-cell-wrapper-add-column-control-active');
      }

      if (isTitle) {
         styleList.push('table-editor-title-cell');
      }

      return styleList.join(' ');
   }


   function generateColumnAddControl(): ReactElement {
      const style = (isColumnAddControlActive()) ? 'table-editor-cell-add-column-control-active' : '';
      return (
         <div
            className={style}
            onPointerEnter={() => setSelectedColumnIndex(position.columnIndex)}
            onPointerLeave={() => setSelectedColumnIndex(-1)}
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
            onPointerLeave={() => setSelectedRowIndex(-1)}
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
         <div className="table-editor-cell-content">{content}</div>
         { generateColumnAddControl() }
         { generateRowAddControl() }
         { generateGeneralAddControl()}
      </div>
   );

}


export { TableEditorContentCell };
