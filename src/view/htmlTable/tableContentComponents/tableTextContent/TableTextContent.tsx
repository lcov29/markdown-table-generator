/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, ReactElement } from 'react';
import { TextContent, ColumnAlignmentOption, LinkTargetOption } from '../../../../model/types';
import './tableTextContent.css';


type Props = {
   textContent: TextContent,
   alignment: ColumnAlignmentOption
};


function TableTextContent(props: Props): ReactElement {
   const { textContent, alignment } = props;

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
