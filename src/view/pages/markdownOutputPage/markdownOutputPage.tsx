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

   const markdown = parseInternalTableToMarkdown(internalTable);

   return (
      <div className="markdown-output-page-wrapper">
         <div className="markdown-output-page-content-wrapper">
            <h2>Markdown Table Definition</h2>
            <textarea defaultValue={markdown} />
            <div className="markdown-output-page-control-wrapper">
               <button
                  type="button"
                  className="app-button"
                  onClick={() => setPageId('table-editor-page')}
               >
                  Back
               </button>
               <button
                  type="button"
                  className="app-button"
                  onClick={() => setPageId('landing-page')}
               >
                  Close
               </button>
            </div>
         </div>
      </div>
   );
}


export { MarkdownOutputPage };
