import React, { ReactElement } from 'react';
import { InternalTableModel } from '../../../model/InternalTableModel';
import { parseInternalTableToMarkdown } from '../../../parser/parseInternalTableToMarkdown';
import { PageId } from '../pageIdType';
import './markdownOutputPage.css';


type Props = {
   internalTable: InternalTableModel,
   setPageId: (id: PageId) => void
};


function MarkdownOutputPage(props: Props): ReactElement {
   const { internalTable, setPageId } = props;

   return (
      <div className="markdown-output-page-wrapper">
         <h2>Markdown Table</h2>
         <textarea>
            {parseInternalTableToMarkdown(internalTable)}
         </textarea>
         <div className="markdown-output-page-control-wrapper">
            <button type="button" onClick={() => setPageId('table-editor-page')}>
               Back
            </button>
            <button type="button" onClick={() => setPageId('landing-page')}>
               Ok
            </button>
         </div>
      </div>
   );
}


export { MarkdownOutputPage };
