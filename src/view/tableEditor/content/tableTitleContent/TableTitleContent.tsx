/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, ReactElement } from 'react';
import { TitleContent, ColumnAlignmentOption } from '../../../../model/types';
import './tableTitleContent.css';


type Props = {
   titleContent: TitleContent,
   alignment: ColumnAlignmentOption
};


function TableTitleContent(props: Props): ReactElement {
   const { titleContent, alignment } = props;

   const [titleContentObj] = useState(titleContent);
   const [title, setTitle] = useState(titleContent.title);

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
            style={{ textAlign: `${alignment}` }}
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
               <label htmlFor="table-title-content-dialog-title-input">
                  <strong>Title</strong>
               </label>
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
            </form>
         </dialog>
      );
   }


   return (
      <>
         {generateTitleDisplay()}
         {generateModalInputDialog()}
      </>
   );
}


export { TableTitleContent };
