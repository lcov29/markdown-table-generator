import React, { ReactElement } from 'react';
import './tablePreview.css';


type Props = {
   rowTotal: number,
   columnTotal: number
};


function TablePreview(props: Props): ReactElement {
   const { rowTotal, columnTotal } = props;


   function generateTableHeader(): ReactElement {
      const elementList: ReactElement[] = [];

      for (let columnIndex = 0; columnIndex < columnTotal; columnIndex++) {
         elementList.push(<th key={columnIndex}>&nbsp;</th>);
      }
      return <thead><tr>{elementList}</tr></thead>;
   }


   function generateTableBody(): ReactElement {
      const rowElementList: ReactElement[] = [];
      const columnElementList: ReactElement[] = [];

      for (let columnIndex = 0; columnIndex < columnTotal; columnIndex++) {
         columnElementList.push(<td key={columnIndex}>&nbsp;</td>);
      }

      for (let rowIndex = 1; rowIndex < rowTotal; rowIndex++) {
         rowElementList.push(<tr key={rowIndex}>{columnElementList}</tr>);
      }

      return <tbody>{rowElementList}</tbody>;
   }


   return (
      <table className="table-preview">
         { generateTableHeader() }
         { generateTableBody() }
      </table>
   );
}


export { TablePreview };
