import React, { useState, ReactElement } from 'react';
import { PageId } from '../pageIdType';
import { InternalTableModel } from '../../../model/InternalTableModel';
import { parseMarkdownToInternalTable } from '../../../parser/parseMarkdownToInternalTable';
import { validateMarkdown } from '../../../validator/markdownValidator';
import './markdownInputPage.css';


type Props = {
   setPageId: (id: PageId) => void,
   setInternalTable: (table: InternalTableModel) => void
};


function MarkdownInputPage(props: Props): ReactElement {
   const { setInternalTable, setPageId } = props;
   const [userInput, setUserInput] = useState('');


   function handleEditButtonClick() {
      const parsedTable = parseMarkdownToInternalTable(userInput);
      const internalTable = new InternalTableModel(1, 1);
      internalTable.table = parsedTable;
      setInternalTable(internalTable);
      setPageId('table-editor-page');
   }


   function generateControl(): ReactElement | null {
      try {
         validateMarkdown(userInput);

         return (
            <button
               type="button"
               className="app-button markdown-input-page-edit-button"
               onClick={handleEditButtonClick}
            >
               Edit Markdown Table
            </button>
         );
      } catch (e: any) {
         const isUserInputSet = userInput !== '';
         if (isUserInputSet) {
            return <p className="markdown-input-page-error-notification">{e.message}</p>;
         }

         return null;
      }
   }


   function generateTextareaStyleClass(): string {
      return (userInput !== '') ? '' : 'markdown-input-page-content-wrapper-textarea';
   }


   return (
      <div className="markdown-input-page-wrapper">
         <div className="control-wrapper markdown-input-page-content-wrapper">
            <h2>Enter Markdown Table Definition</h2>
            <textarea
               className={generateTextareaStyleClass()}
               onChange={(e) => setUserInput(e.target.value)}
            />
            {generateControl()}
         </div>
      </div>
   );
}


export { MarkdownInputPage };
