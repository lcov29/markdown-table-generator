/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, ReactElement } from 'react';
import './tableContentRow.css';


type Props = {
   contentElementList: ReactElement[],
   removeContentAt: () => void
};


function TableContentRow(props: Props): ReactElement {
   const { contentElementList, removeContentAt } = props;

   const [isLeftControlActive, setIsLeftControlActive] = useState(false);
   const [isRightControlActive, setIsRightControlActive] = useState(false);
   const [isPreviewControlActive, setIsPreviewControlActive] = useState(false);


   function isControlActive(): boolean {
      return isLeftControlActive || isRightControlActive || isPreviewControlActive;
   }


   function generateTableContentCells(): ReactElement[] {
      return contentElementList.map((contentElement, index) => (
         <td key={index} className={(isControlActive()) ? 'table-content-row-cell-active' : ''}>
            {contentElement}
         </td>
      ));
   }


   function generateControlCell(condition: boolean, clickHandler: () => void): ReactElement {
      const leaveHandler = () => {
         setIsLeftControlActive(false);
         setIsRightControlActive(false);
         setIsPreviewControlActive(false);
      };

      if (condition) {
         return (
            <td
               className="table-content-row-control-cell-active"
               onClick={removeContentAt}
               onPointerLeave={leaveHandler}
            >
               X
            </td>
         );
      }
      return (
         <td
            className="table-content-row-control-cell"
            onClick={clickHandler}
            onPointerEnter={() => setIsPreviewControlActive(true)}
            onPointerLeave={leaveHandler}
         />
      );
   }


   function generateLeftControlCell(): ReactElement {
      const clickHandler = () => {
         setIsLeftControlActive(true);
         setIsRightControlActive(false);
         setIsPreviewControlActive(false);
      };

      return generateControlCell(isLeftControlActive, clickHandler);
   }


   function generateRightControlCell(): ReactElement {
      const clickHandler = () => {
         setIsRightControlActive(true);
         setIsLeftControlActive(false);
         setIsPreviewControlActive(false);
      };

      return generateControlCell(isRightControlActive, clickHandler);
   }


   return (
      <tr className={(isControlActive()) ? 'table-content-row-active' : ''}>
         { generateLeftControlCell() }
         { generateTableContentCells() }
         { generateRightControlCell() }
      </tr>
   );
}


export { TableContentRow };
