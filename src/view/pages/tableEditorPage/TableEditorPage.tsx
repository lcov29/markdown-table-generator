import React, { ReactElement } from 'react';
import { InternalTableModel } from '../../../model/InternalTableModel';
import { TableEditor } from '../../subcomponents/tableEditor/TableEditor';
import { PageId } from '../pageIdType';
import './tableEditorPage.css';


type Props = {
   internalTable: InternalTableModel,
   setPageId: (id: PageId) => void
};


function TableEditorPage(props: Props): ReactElement {
   const { internalTable, setPageId } = props;

   return (
      <div className="control-wrapper table-editor-page-wrapper">
         <h2>Table Editor</h2>
         <TableEditor internalTable={internalTable} />
         <div className="table-editor-page-control-wrapper">
            <button type="button" className="app-button" onClick={() => setPageId('landing-page')}>
               Back
            </button>
            <button type="button" className="app-button" onClick={() => setPageId('markdown-output-page')}>
               Generate Markdown
            </button>
         </div>
      </div>
   );
}


export { TableEditorPage };
