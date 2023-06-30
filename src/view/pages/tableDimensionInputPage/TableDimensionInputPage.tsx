/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, ReactElement } from 'react';
import { InternalTableModel } from '../../../model/InternalTableModel';
import { TablePreview } from '../../subcomponents/tablePreview/TablePreview';
import { PageId } from '../pageIdType';
import './tableDimensionInputPage.css';


type Props = {
   setPageId: (id: PageId) => void,
   setInternalTable: (table: InternalTableModel) => void
};


function TableDimensionInputPage(props: Props): ReactElement {
   const { setPageId, setInternalTable } = props;

   const [rowInput, setRowInput] = useState(3);
   const [columnInput, setColumnInput] = useState(3);


   function handleBackClick() {
      setPageId('landing-page');
   }


   function handleInputCompletion() {
      const isInputValid = rowInput > 0 && columnInput > 0;

      if (isInputValid) {
         const internalTable = new InternalTableModel(rowInput, columnInput);
         setInternalTable(internalTable);
         setPageId('table-editor-page');
      }
   }


   return (
      <div className="page-wrapper table-dimension-input-page-wrapper">
         <div className="table-dimension-input-page-content-wrapper">
            <div className="control-wrapper table-dimension-input-page-input-wrapper">
               <h2>Table Dimension</h2>
               <label>
                  Row
                  <input
                     type="number"
                     min={1}
                     value={rowInput}
                     onChange={(e) => setRowInput(Number.parseInt(e.target.value, 10))}
                  />
               </label>
               <label>
                  Column
                  <input
                     type="number"
                     min={1}
                     value={columnInput}
                     onChange={(e) => setColumnInput(Number.parseInt(e.target.value, 10))}
                  />
               </label>
               <div className="table-dimension-input-page-control-wrapper">
                  <button type="button" className="app-button" onClick={handleBackClick}>Back</button>
                  <button type="button" className="app-button" onClick={handleInputCompletion}>OK</button>
               </div>
            </div>
         </div>
         <div className="control-wrapper table-dimension-input-page-preview-wrapper">
            <h2>Table Preview</h2>
            <TablePreview rowTotal={rowInput} columnTotal={columnInput} />
         </div>
      </div>
   );
}


export { TableDimensionInputPage };
