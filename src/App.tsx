/* eslint-disable max-len */
import React, { useState, ReactElement } from 'react';
import { InternalTableModel } from './model/InternalTableModel';
import { LandingPage } from './view/pages/landingPage/LandingPage';
import { TableDimensionInputPage } from './view/pages/tableDimensionInputPage/TableDimensionInputPage';
import { TableEditorPage } from './view/pages/tableEditorPage/TableEditorPage';
import { MarkdownOutputPage } from './view/pages/markdownOutputPage/markdownOutputPage';
import { MarkdownInputPage } from './view/pages/markdownInputPage/MarkdownInputPage';
import { PageId } from './view/pages/pageIdType';
import './app.css';


function App(): ReactElement {
   const [pageId, setPageId] = useState<PageId>('landing-page');
   const [internalTable, setInternalTable] = useState(new InternalTableModel(3, 3));

   switch (pageId) {
      case 'landing-page':
         return <LandingPage setPageId={setPageId} />;

      case 'table-dimension-input-page':
         return <TableDimensionInputPage setInternalTable={setInternalTable} setPageId={setPageId} />;

      case 'table-editor-page':
         return <TableEditorPage internalTable={internalTable} setPageId={setPageId} />;

      case 'markdown-output-page':
         return <MarkdownOutputPage internalTable={internalTable} setPageId={setPageId} />;

      case 'markdown-input-page':
         return <MarkdownInputPage setInternalTable={setInternalTable} setPageId={setPageId} />;

      default:
         return <LandingPage setPageId={setPageId} />;
   }
}


export { App };
