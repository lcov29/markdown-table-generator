/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect, KeyboardEvent, ReactElement } from 'react';
import { ImageContent, ColumnAlignmentOption, LinkTargetOption } from '../../../../model/types';
import './tableImageContent.css';


type Props = {
   imageContent: ImageContent,
   alignment: ColumnAlignmentOption,
   deleteFromInternalTable: () => void,
   triggerRerender: () => void,
   showDialogOnInitialRender?: boolean
};


function TableImageContent(props: Props): ReactElement {
   const {
      imageContent,
      alignment,
      deleteFromInternalTable,
      triggerRerender,
      showDialogOnInitialRender
   } = props;

   const [imageContentObj] = useState(imageContent);
   const [src, setSrc] = useState(imageContent.src);
   const [alt, setAlt] = useState(imageContent.alt);
   const [width, setWidth] = useState(imageContent.width);
   const [height, setHeight] = useState(imageContent.height);
   const [title, setTitle] = useState(imageContent.title);
   const [isLink, setIsLink] = useState(imageContent.isLink);
   const [href, setHref] = useState(imageContent.href);
   const [target, setTarget] = useState(imageContent.target);
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


   function handleKeyboardInput(event: KeyboardEvent<HTMLButtonElement>) {
      const isDeleteRequest = event.code === 'Delete';
      if (isDeleteRequest) {
         handleContentDeletion();
      }
   }


   function generateImage(): ReactElement {
      const image = <img src={src} alt={alt} width={width} height={height} title={title} />;
      const linkImage = (
         <a href={href} target={target} onClick={(e) => e.stopPropagation()}>
            {image}
         </a>
      );

      return (
         <button
            type="button"
            className="table-image-content-text-display-button"
            style={{ justifyContent: `${alignment}` }}
            onClick={openModalDialog}
            onKeyDown={handleKeyboardInput}
         >
            {(isLink) ? linkImage : image}
         </button>
      );
   }


   function generateOptionalLinkInputs(): ReactElement | null {
      if (isLink) {
         return (
            <>
               <label htmlFor="table-image-content-dialog-href-input">href</label>
               <input
                  id="table-image-content-dialog-href-input"
                  type="url"
                  name="hrefInput"
                  value={href}
                  onChange={(e) => {
                     setHref(e.target.value);
                     imageContentObj.href = e.target.value;
                  }}
               />
               <label htmlFor="table-image-content-dialog-target-input">target</label>
               <select
                  id="table-image-content-dialog-target-input"
                  name="targetInput"
                  value={target}
                  onChange={(e) => {
                     const input = e.target.value as LinkTargetOption;
                     setTarget(input);
                     imageContentObj.target = input;
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
            <form method="dialog" className="table-image-content-dialog">
               <strong>Image</strong>
               <div />
               <label htmlFor="table-image-content-dialog-src-input">Src</label>
               <input
                  id="table-image-content-dialog-src-input"
                  type="url"
                  name="srcInput"
                  value={src}
                  onChange={(e) => {
                     setSrc(e.target.value);
                     imageContentObj.src = e.target.value;
                  }}
               />
               <label htmlFor="table-image-content-dialog-alt-input">Alt</label>
               <input
                  id="table-image-content-dialog-alt-input"
                  type="text"
                  name="altInput"
                  value={alt}
                  onChange={(e) => {
                     setAlt(e.target.value);
                     imageContentObj.alt = e.target.value;
                  }}
               />
               <label htmlFor="table-image-content-dialog-title-input">Title</label>
               <input
                  id="table-image-content-dialog-title-input"
                  type="text"
                  name="titleInput"
                  value={title}
                  onChange={(e) => {
                     setTitle(e.target.value);
                     imageContentObj.title = e.target.value;
                  }}
               />
               <label htmlFor="table-image-content-dialog-width-input">Width</label>
               <input
                  id="table-image-content-dialog-width-input"
                  type="number"
                  name="titleInput"
                  value={width}
                  onChange={(e) => {
                     setWidth(e.target.value);
                     imageContentObj.width = e.target.value;
                  }}
               />
               <label htmlFor="table-image-content-dialog-height-input">Height</label>
               <input
                  id="table-image-content-dialog-height-input"
                  type="number"
                  name="titleInput"
                  value={height}
                  onChange={(e) => {
                     setHeight(e.target.value);
                     imageContentObj.height = e.target.value;
                  }}
               />
               <label htmlFor="table-image-content-dialog-link-input"><strong>Link</strong></label>
               <input
                  id="table-image-content-dialog-link-input"
                  type="checkbox"
                  name="linkCheckbox"
                  checked={isLink}
                  onChange={(e) => {
                     setIsLink(e.target.checked);
                     imageContentObj.isLink = e.target.checked;
                     if (e.target.checked) {
                        setTarget('_blank');
                        imageContentObj.target = '_blank';
                     } else {
                        setHref('');
                        setTarget('');
                        imageContentObj.href = '';
                        imageContentObj.target = '';
                     }
                  }}
               />
               {generateOptionalLinkInputs()}
            </form>
            <div className="table-image-content-dialog-control-wrapper">
               <button
                  type="button"
                  className="table-image-content-dialog-control-delete-button"
                  onClick={handleContentDeletion}
               >
                  Delete
               </button>
               <button
                  type="button"
                  className="table-image-content-dialog-control-close-button"
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
         {generateImage()}
         {generateModalInputDialog()}
      </>
   );

}


export { TableImageContent };
