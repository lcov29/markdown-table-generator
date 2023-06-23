/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, ReactElement } from 'react';
import './tableAddRowControl.css';


type Props = {
   contentColumnTotal: number,
   addRowToInternalTable: () => void
};


function TableAddRowControl(props: Props): ReactElement {
   const { contentColumnTotal, addRowToInternalTable } = props;
   const [isControlActive, setIsControlActive] = useState(false);


   function generateTableCells() {
      const cellList: ReactElement[] = [];

      for (let i = 0; i < contentColumnTotal; i++) {
         const isCellActiveClass = (isControlActive) ? 'table-add-row-control-cell-active' : '';

         cellList.push(
            <td
               key={i}
               className={`table-add-row-control-cell ${isCellActiveClass}`}
               onPointerEnter={() => setIsControlActive(true)}
               onPointerLeave={() => setIsControlActive(false)}
               onClick={addRowToInternalTable}
            />
         );
      }

      return cellList;
   }


   return (
      <tr>
         <td className="empty-cell" />
         { generateTableCells() }
      </tr>
   );
}


export { TableAddRowControl };
