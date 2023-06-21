/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, ReactElement } from 'react';
import { TextContent, ColumnAlignmentOption, LinkTargetOption } from '../../../model/types';
import './tableTextContent.css';


type Props = {
   textContent: TextContent,
   alignment: ColumnAlignmentOption
};


function TableTextContent(props: Props): ReactElement {
   const { textContent, alignment } = props;

   const [internalContentObj] = useState(textContent);
   const [text, setText] = useState(textContent.text);
   const [isLink, setIsLink] = useState(textContent.isLink);
   const [href, setHref] = useState(textContent.href);
   const [target, setTarget] = useState(textContent.target);

   const dialog = useRef<HTMLDialogElement>(null);


   function generateTextDisplay(): ReactElement {
      const input = (
         <p style={{ border: 'none', textAlign: `${alignment}` }}>
            { text }
         </p>
      );
      return (isLink) ? <a href={href} target={target}>{input}</a> : input;
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
                     internalContentObj.href = e.target.value;
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
                     internalContentObj.target = input;
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
                     internalContentObj.text = e.target.value;
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
                     internalContentObj.isLink = e.target.checked;
                     if (e.target.checked) {
                        setTarget('_blank');
                        internalContentObj.target = '_blank';
                     } else {
                        setHref('');
                        setTarget('');
                        internalContentObj.href = '';
                        internalContentObj.target = '';
                     }
                  }}
               />
               { generateOptionalLinkInputs() }
            </form>
         </dialog>
      );
   }


   return (
      <div
         className="table-text-content-wrapper"
         style={{ justifyContent: `${alignment}` }}
         onDoubleClick={() => { if (!dialog.current?.open) { dialog.current?.showModal(); } }}
      >
         { generateTextDisplay() }
         { generateModalInputDialog() }
      </div>
   );
}


export { TableTextContent };
