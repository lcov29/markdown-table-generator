/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect, KeyboardEvent, ReactElement } from 'react';
import { TextContent, ColumnAlignmentOption, LinkTargetOption } from '../../../../model/types';
import './tableTextContent.css';


type Props = {
   textContent: TextContent,
   alignment: ColumnAlignmentOption,
   deleteFromInternalTable: () => void,
   triggerRerender: () => void,
   showDialogOnInitialRender?: boolean
};


function TableTextContent(props: Props): ReactElement {
   const {
      textContent,
      alignment,
      deleteFromInternalTable,
      triggerRerender,
      showDialogOnInitialRender = false
   } = props;

   const [textContentObj] = useState(textContent);
   const [text, setText] = useState(textContent.text);
   const [isLink, setIsLink] = useState(textContent.isLink);
   const [href, setHref] = useState(textContent.href);
   const [target, setTarget] = useState(textContent.target);

   const dialog = useRef<HTMLDialogElement>(null);


   function openModalDialog() {
      const isDialogClosed = !dialog.current?.open;
      if (isDialogClosed) {
         dialog.current?.showModal();
      }
   }


   useEffect(() => { if (showDialogOnInitialRender) openModalDialog(); }, []);


   function handleContentDeletion() {
      deleteFromInternalTable();
      triggerRerender();
   }


   function handleLastCharacterDeletion() {
      const textWithoutLastCharacter = text.substring(0, text.length - 1);
      setText(textWithoutLastCharacter);
      textContent.text = textWithoutLastCharacter;
   }


   function handleAddCharacter(event: KeyboardEvent<HTMLButtonElement>) {
      const isSpace = event.code === 'Space';
      const input = (isSpace) ? ' ' : event.key;

      const isSingleCharacter = input.length === 1;
      if (isSingleCharacter) {
         const newText = text + input;
         setText(newText);
         textContent.text = newText;
         event.preventDefault();
      }
   }


   function handleKeyboardInput(event: KeyboardEvent<HTMLButtonElement>) {
      switch (event.code) {
         case 'Delete':
            handleContentDeletion();
            break;
         case 'Backspace':
            handleLastCharacterDeletion();
            break;
         default:
            handleAddCharacter(event);
            break;
      }
   }


   function generateTextDisplay(): ReactElement {
      const linkText = (
         <a href={href} target={target} onClick={(e) => e.stopPropagation()}>
            {text}
         </a>
      );

      return (
         <button
            type="button"
            className="table-text-content-text-display-button"
            style={{ textAlign: `${alignment}` }}
            onClick={openModalDialog}
            onKeyDown={handleKeyboardInput}
         >
            {(isLink) ? linkText : text}
         </button>
      );
   }


   function generateOptionalLinkInputs(): ReactElement | null {
      if (isLink) {
         return (
            <>
               <label htmlFor="table-text-content-dialog-href-input">href</label>
               <input
                  id="table-text-content-dialog-href-input"
                  type="url"
                  name="hrefInput"
                  value={href}
                  onChange={(e) => {
                     setHref(e.target.value);
                     textContentObj.href = e.target.value;
                  }}
               />
               <label htmlFor="table-text-content-dialog-target-input">target</label>
               <select
                  id="table-text-content-dialog-target-input"
                  name="targetInput"
                  value={target}
                  onChange={(e) => {
                     const input = e.target.value as LinkTargetOption;
                     setTarget(input);
                     textContentObj.target = input;
                  }}
               >
                  <option value="_blank">_blank</option>
                  <option value="_parent">_parent</option>
               </select>
            </>
         );
      }
      return null;
   }


   function generateModalInputDialog(): ReactElement {
      return (
         <dialog ref={dialog}>
            <form method="dialog" className="table-text-content-dialog">
               <strong>Text</strong>
               <div />
               <label htmlFor="table-text-content-dialog-text-input">Text</label>
               <input
                  id="table-text-content-dialog-text-input"
                  type="text"
                  name="textInput"
                  value={text}
                  onChange={(e) => {
                     setText(e.target.value);
                     textContentObj.text = e.target.value;
                  }}
               />
               <label htmlFor="table-text-content-dialog-link-input"><strong>Link</strong></label>
               <input
                  id="table-text-content-dialog-link-input"
                  type="checkbox"
                  name="linkCheckbox"
                  checked={isLink}
                  onChange={(e) => {
                     setIsLink(e.target.checked);
                     textContentObj.isLink = e.target.checked;
                     if (e.target.checked) {
                        setTarget('_blank');
                        textContentObj.target = '_blank';
                     } else {
                        setHref('');
                        setTarget('');
                        textContentObj.href = '';
                        textContentObj.target = '';
                     }
                  }}
               />
               {generateOptionalLinkInputs()}
            </form>
            <div className="table-text-content-dialog-control-wrapper">
               <button
                  type="button"
                  className="table-text-content-dialog-control-delete-button"
                  onClick={handleContentDeletion}
               >
                  Delete
               </button>
               <button
                  type="button"
                  className="table-text-content-dialog-control-close-button"
                  onClick={() => dialog.current?.close()}
               >
                  Close
               </button>
            </div>
         </dialog>
      );
   }


   return (
      <>
         {generateTextDisplay()}
         {generateModalInputDialog()}
      </>
   );
}


export { TableTextContent };
