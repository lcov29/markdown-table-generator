/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, KeyboardEvent, ReactElement } from 'react';
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


   function handleLastCharacterDeletion() {
      const titleWithoutLastCharacter = title.substring(0, title.length - 1);
      setTitle(titleWithoutLastCharacter);
      titleContent.title = titleWithoutLastCharacter;
   }


   function handleAddCharacter(event: KeyboardEvent<HTMLButtonElement>) {
      const isSpace = event.code === 'Space';
      const input = (isSpace) ? ' ' : event.key;

      const isSingleCharacter = input.length === 1;
      if (isSingleCharacter) {
         const newTitle = title + input;
         setTitle(newTitle);
         titleContent.title = newTitle;
         event.preventDefault();
      }
   }


   function handleKeyboardInput(event: KeyboardEvent<HTMLButtonElement>) {
      switch (event.code) {
         case 'Backspace':
            handleLastCharacterDeletion();
            break;
         default:
            handleAddCharacter(event);
            break;
      }
   }


   function generateTitleDisplay(): ReactElement {
      return (
         <button
            type="button"
            className="table-title-content-title-display-button"
            style={{ textAlign: `${alignment}` }}
            onClick={openModalDialog}
            onKeyDown={handleKeyboardInput}
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
