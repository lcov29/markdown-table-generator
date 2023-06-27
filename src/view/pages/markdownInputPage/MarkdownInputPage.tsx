import React, { ReactElement } from 'react';
import { PageId } from '../pageIdType';
import { InternalTableModel } from '../../../model/InternalTableModel';
import { parseMarkdownToInternalTable } from '../../../parser/parseMarkdownToInternalTable';


type Props = {
   setPageId: (id: PageId) => void,
   setInternalTable: (table: InternalTableModel) => void
};


function MarkdownInputPage(props: Props): ReactElement {
   const { setInternalTable, setPageId } = props;


   function handleMarkdownInput(markdown: string) {
      try {
         const parsedTable = parseMarkdownToInternalTable(markdown);
         const internalTable = new InternalTableModel(1, 1);
         internalTable.table = parsedTable;
         setInternalTable(internalTable);
         setPageId('table-editor-page');
      } catch (e) {
         console.warn(`Error: ${e}`);
         // TODO: Implement proper user alert
      }
   }


   return (
      <div className="markdown-input-page-wrapper">
         <h2>Enter Markdown Table Definition</h2>
         <textarea onChange={(e) => handleMarkdownInput(e.target.value)} />
      </div>
   );
}


export { MarkdownInputPage };
