import React, { useState, useRef, KeyboardEvent, ReactElement } from 'react';
import { TableTextContent } from '../tableTextContent/TableTextContent';
import { TableImageContent } from '../tableImageContent/TableImageContent';
import { TableContent, TextContent, ImageContent, TablePosition, ColumnAlignmentOption } from '../../../../../model/types';
import './tableEmptyContent.css';


type TableContentStatus = 'empty' | 'text' | 'image';


type Props = {
   position: TablePosition,
   alignment: ColumnAlignmentOption,
   updateInternalModel: (position: TablePosition, content: TableContent) => void,
   deleteFromInternalTable: () => void,
   triggerRerender: () => void,
};


function TableEmptyContent(props: Props): ReactElement {
   const {
      position,
      alignment,
      updateInternalModel,
      deleteFromInternalTable,
      triggerRerender
   } = props;

   const [contentPosition] = useState(position);
   const [contentAlignment] = useState(alignment);
   const [keyboardInput, setKeyboardInput] = useState('');
   const [contentStatus, setContentStatus] = useState<TableContentStatus>('empty');

   const dialog = useRef<HTMLDialogElement>(null);


   function openModalDialog() {
      const isDialogClosed = !dialog.current?.open;
      if (isDialogClosed) {
         dialog.current?.showModal();
      }
   }


   function handleAddingTextContentViaKeyboardInput(event: KeyboardEvent<HTMLButtonElement>) {
      const input = event.key;

      const isSingleCharacter = input.length === 1;
      if (isSingleCharacter) {
         setKeyboardInput(input);
         setContentStatus('text');
      }
   }


   function generateEmptyTableContent(): ReactElement {
      return (
         <>
            <button
               type="button"
               className="table-empty-content-add-button"
               onClick={openModalDialog}
               onKeyDown={handleAddingTextContentViaKeyboardInput}
            />
            <dialog ref={dialog}>
               <strong>Add Content Element</strong>
               <div className="table-empty-content-dialog-button-wrapper">
                  <button
                     type="button"
                     className="table-empty-content-dialog-button"
                     onClick={() => setContentStatus('text')}
                  >
                     Text
                  </button>
                  <button
                     type="button"
                     className="table-empty-content-dialog-button"
                     onClick={() => setContentStatus('image')}
                  >
                     Image
                  </button>
               </div>
            </dialog>
         </>
      );
   }


   function generateNewTextContent(): ReactElement {
      const textContent: TextContent = {
         type: 'text',
         text: keyboardInput,
         isLink: false,
         href: '',
         target: '',
         title: ''
      };
      updateInternalModel(contentPosition, textContent);

      const showDialogOnInitialRender = keyboardInput === '';
      const focusTextDisplayOnInitialRender = keyboardInput !== '';

      return (
         <TableTextContent
            textContent={textContent}
            alignment={contentAlignment}
            deleteFromInternalTable={deleteFromInternalTable}
            triggerRerender={triggerRerender}
            showDialogOnInitialRender={showDialogOnInitialRender}
            focusTextDisplayOnInitialRender={focusTextDisplayOnInitialRender}
         />
      );
   }


   function generateNewImageContent(): ReactElement {
      const imageContent: ImageContent = {
         type: 'image',
         src: '',
         alt: '',
         title: '',
         width: '',
         height: '',
         isLink: false,
         href: '',
         target: ''
      };
      updateInternalModel(contentPosition, imageContent);
      return (
         <TableImageContent
            imageContent={imageContent}
            alignment={contentAlignment}
            deleteFromInternalTable={deleteFromInternalTable}
            triggerRerender={triggerRerender}
            showDialogOnInitialRender
         />
      );
   }


   switch (contentStatus) {
      case 'empty':
         return generateEmptyTableContent();
      case 'text':
         return generateNewTextContent();
      case 'image':
         return generateNewImageContent();
      default:
         return generateEmptyTableContent();
   }

}


export { TableEmptyContent };
