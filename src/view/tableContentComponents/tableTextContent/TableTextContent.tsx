/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, ReactElement } from 'react';
import { TextContent, TablePosition, ColumnAlignmentOption, LinkTargetOption, TextContentUpdate } from '../../../model/types';
import './tableTextContent.css';


type Props = {
   position: TablePosition,
   textContent: TextContent,
   textAlignment: ColumnAlignmentOption,
   updateInternalModel: (position: TablePosition, payload: TextContentUpdate) => void
};


function TableTextContent(props: Props): ReactElement {
   const { position, textContent, textAlignment, updateInternalModel } = props;
   const [textInput, setTextInput] = useState(textContent.text);
   const [isLink, setIsLink] = useState(false);
   const [hrefInput, setHrefInput] = useState('');
   const [targetInput, setTargetInput] = useState<LinkTargetOption>('_blank');
   const dialog = useRef<HTMLDialogElement>(null);


   function generateOptionalLinkInputs(): ReactElement | null {
      if (isLink) {
         return (
            <>
               <label htmlFor="table-text-content-dialog-href-input">href</label>
               <input
                  id="table-text-content-dialog-href-input"
                  type="url"
                  name="hrefInput"
                  value={hrefInput}
                  onChange={(e) => {
                     setHrefInput(e.target.value);
                     updateInternalModel(position, { key: 'href', value: hrefInput });
                  }}
               />
               <label htmlFor="table-text-content-dialog-target-input">target</label>
               <select
                  id="table-text-content-dialog-target-input"
                  name="targetInput"
                  value={targetInput}
                  onChange={(e) => {
                     setTargetInput(e.target.value as LinkTargetOption);
                     updateInternalModel(position, { key: 'target', value: targetInput });
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


   return (
      <>
         <input
            type="text"
            name="textInput"
            style={{ border: 'none', textAlign: `${textAlignment}` }}
            value={textInput}
            onChange={(e) => {
               setTextInput(e.target.value);
               updateInternalModel(position, { key: 'text', value: textInput });
            }}
            onDoubleClick={() => dialog.current?.showModal()}
         />
         <dialog ref={dialog}>
            <form method="dialog" className="table-text-content-dialog">
               <label htmlFor="table-text-content-dialog-text-input">Text</label>
               <input
                  id="table-text-content-dialog-text-input"
                  type="text"
                  name="textInput"
                  value={textInput}
                  onChange={(e) => {
                     setTextInput(e.target.value);
                     updateInternalModel(position, { key: 'text', value: textInput });
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
                     updateInternalModel(position, { key: 'isLink', value: isLink });
                  }}
               />
               { generateOptionalLinkInputs() }
            </form>
         </dialog>
      </>
   );
}


export { TableTextContent };
