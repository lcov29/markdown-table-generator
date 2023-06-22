import React, { ReactElement } from 'react';
import { InternalTableModel } from '../../model/InternalTableModel';
import { TableTitleContent } from './tableContentComponents/tableTitleContent/TableTitleContent';
import { TableTextContent } from './tableContentComponents/tableTextContent/TableTextContent';
import { TableImageContent } from './tableContentComponents/tableImageContent/TableImageContent';
import { TableEmptyContent } from './tableContentComponents/tableEmptyContent/TableEmptyContent';
import { TableContent, ColumnAlignmentOption, TitleContent, TablePosition } from '../../model/types';
import './htmlTable.css';


type Props = {
   internalTable: InternalTableModel,
   updateInternalModel: (position: TablePosition, content: TableContent) => void
};


function HtmlTable(props: Props): ReactElement {
   const { internalTable, updateInternalModel } = props;


   function generateTableContentElement(
      position: TablePosition,
      content: TableContent,
      alignment: ColumnAlignmentOption
   ): ReactElement | null {

      const emptyContent = (
         <TableEmptyContent
            position={position}
            alignment={alignment}
            updateInternalModel={updateInternalModel}
         />
      );

      if (content === null) {
         return emptyContent;
      }

      switch (content.type) {
         case 'title':
            return <TableTitleContent titleContent={content} alignment={alignment} />;
         case 'text':
            return <TableTextContent textContent={content} alignment={alignment} />;
         case 'image':
            return <TableImageContent imageContent={content} alignment={alignment} />;
         default:
            return emptyContent;
      }
   }


   function generateTableHeader(): ReactElement {
      const headerList: ReactElement[] = [];
      const rowIndex = 0;

      for (let columnIndex = 0; columnIndex < internalTable.columnTotal; columnIndex++) {
         const position = { rowIndex, columnIndex };
         const contentElement = internalTable.getContentAt(position) as TitleContent;
         const alignment = contentElement.columnAlignment;
         const tableElement = generateTableContentElement(position, contentElement, alignment);
         headerList.push(<th key={columnIndex}>{tableElement}</th>);
      }

      return <thead><tr key={rowIndex}>{headerList}</tr></thead>;
   }


   function generateTableBody(): ReactElement {
      const dataList: ReactElement[][] = [];

      for (let rowIndex = 1; rowIndex < internalTable.rowTotal; rowIndex++) {
         dataList.push([]);

         for (let columnIndex = 0; columnIndex < internalTable.columnTotal; columnIndex++) {
            const titlePosition = { rowIndex: 0, columnIndex };
            const titleElement = internalTable.getContentAt(titlePosition) as TitleContent;
            const alignment = titleElement.columnAlignment;

            const position = { rowIndex, columnIndex };
            const contentElement = internalTable.getContentAt(position);
            const tableElement = generateTableContentElement(position, contentElement, alignment);
            dataList[rowIndex - 1].push(<td key={columnIndex}>{tableElement}</td>);
         }

      }

      return (
         <tbody>
            { dataList.map((rowList, index) => <tr key={index}>{rowList}</tr>) }
         </tbody>
      );
   }


   return (
      <table className="html-table">
         { generateTableHeader() }
         { generateTableBody() }
      </table>
   );

}


export { HtmlTable };
