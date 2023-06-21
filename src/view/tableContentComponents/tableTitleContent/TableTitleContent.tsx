/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, ReactElement } from 'react';
import { TitleContent, ColumnAlignmentOption } from '../../../model/types';
import './tableTitleContent.css';


type Props = {
   titleContent: TitleContent,
   alignment: ColumnAlignmentOption
};


function TableTitleContent(props: Props): ReactElement {
   const { titleContent, alignment } = props;

   const [titleContentObj] = useState(titleContent);
   const [title, setTitle] = useState(titleContent.title);
   const [columnAlignment, setColumnAlignment] = useState(alignment);

   const dialog = useRef<HTMLDialogElement>(null);


   function openModalDialog() {
      const isDialogClosed = !dialog.current?.open;
      if (isDialogClosed) {
         dialog.current?.showModal();
      }
   }


   function generateTitleDisplay(): ReactElement {
      return (
         <button
            type="button"
            className="table-title-content-title-display-button"
            style={{ textAlign: `${columnAlignment}` }}
            onClick={openModalDialog}
         >
            <strong>{title}</strong>
         </button>
      );
   }


   function generateModalInputDialog(): ReactElement {
      return (
         <dialog ref={dialog}>
            <form method="dialog" className="table-title-content-dialog">
               <label htmlFor="table-title-content-dialog-title-input">Title</label>
               <input
                  id="table-title-content-dialog-title-input"
                  type="text"
                  name="titleInput"
                  value={title}
                  onChange={(e) => {
                     setTitle(e.target.value);
                     titleContentObj.title = e.target.value;
                  }}
               />
               <label htmlFor="table-title-content-dialog-alignment-input">Column Alignment</label>
               <select
                  id="table-title-content-dialog-alignment-input"
                  name="alignmentInput"
                  value={columnAlignment}
                  onChange={(e) => {
                     const input = e.target.value as ColumnAlignmentOption;
                     setColumnAlignment(input);
                     titleContentObj.columnAlignment = input;
                  }}
               >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
               </select>
            </form>
         </dialog>
      );
   }


   return (
      <div
         className="table-title-content-wrapper"
         style={{ justifyContent: `${columnAlignment}` }}
         onDoubleClick={openModalDialog}
      >
         {generateTitleDisplay()}
         {generateModalInputDialog()}
      </div>
   );
}


export { TableTitleContent };
