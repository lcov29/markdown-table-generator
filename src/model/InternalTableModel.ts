/* eslint-disable no-param-reassign */
import { TablePosition, TitleContent, LinkContent, TextContent, ImageContent } from './types';


type Content = TitleContent | LinkContent | TextContent | ImageContent | null;


class InternalTableModel {

   #table: Content[][] = [];

   #rowTotal: number;

   #columnTotal: number;


   constructor(rowTotal = 0, columnTotal = 0) {
      this.#rowTotal = rowTotal;
      this.#columnTotal = columnTotal;
      this.initializeTable(rowTotal, columnTotal);
   }


   public get rowTotal(): number {
      return this.#rowTotal;
   }


   public get columnTotal(): number {
      return this.#columnTotal;
   }


   public set table(table: Content[][]) {
      this.#table = table;
      this.#columnTotal = table.length;
      this.#rowTotal = table[0].length;
   }


   public addRowAt(index: number) {
      const isValidIndex = index > 0;

      if (isValidIndex) {
         const rowIndex = (index > this.#rowTotal) ? this.#rowTotal : index;
         this.#table.forEach((columnArray) => {
            columnArray.splice(rowIndex, 0, null);
         });
         this.#rowTotal++;
      } else {
         const message1 = 'Can not add new first row due to it being reserved for title objects';
         const message2 = 'Index must not be negative';
         throw new RangeError((index === 0) ? message1 : message2);
      }
   }


   public addColumnAt(index: number) {
      const isValidIndex = index >= 0;

      if (isValidIndex) {
         const columnIndex = (index > this.#columnTotal) ? this.#columnTotal : index;
         const columnArray = new Array(this.#rowTotal).fill(null);
         columnArray[0] = { type: 'title', title: '', columnAlignment: 'left' };
         this.#table.splice(columnIndex, 0, columnArray);
         this.#columnTotal++;
      } else {
         throw new RangeError('Index must not be negative');
      }
   }


   public removeRowAt(index: number) {
      const isValidIndex = index > 0;

      if (isValidIndex) {
         const rowIndex = (index > this.#rowTotal) ? this.#rowTotal - 1 : index;
         const mutatedTable = this.#table.map(
            (columnArray) => columnArray.filter(
               (element, currentRowIndex) => currentRowIndex !== rowIndex
            )
         );
         this.#table = mutatedTable;
         this.#rowTotal--;
      } else {
         const message1 = 'First row can not be removed due to it being reserved for title objects';
         const message2 = 'Index must not be negative';
         throw new RangeError((index === 0) ? message1 : message2);
      }
   }


   public removeColumnAt(index: number) {
      const isValidIndex = index >= 0;

      if (isValidIndex) {
         const columnIndex = (index > this.#columnTotal) ? this.#columnTotal - 1 : index;
         const mutatedTable = this.#table.filter(
            (element, currentColumnIndex) => currentColumnIndex !== columnIndex
         );
         this.#table = mutatedTable;
         this.#columnTotal--;
      } else {
         throw new RangeError('Index must not be negative');
      }
   }


   public swapRows(row1Index: number, row2Index: number) {
      const isValidIndex = row1Index !== 0 && row2Index !== 0;

      if (isValidIndex) {
         const index1 = (row1Index > this.#rowTotal) ? this.#rowTotal - 1 : row1Index;
         const index2 = (row2Index > this.#rowTotal) ? this.#rowTotal - 1 : row2Index;

         this.#table.forEach((columnArray) => {
            const tempElement = columnArray[index1];
            columnArray[index1] = columnArray[index2];
            columnArray[index2] = tempElement;
         });
      } else {
         throw new RangeError('First row can not be swapped due to it being reserved for title objects');
      }
   }


   public swapColumns(column1Index: number, column2Index: number) {
      const isValidIndex = column1Index >= 0 && column2Index >= 0;

      if (isValidIndex) {
         const index1 = (column1Index > this.#columnTotal) ? this.#columnTotal - 1 : column1Index;
         const index2 = (column2Index > this.#columnTotal) ? this.#columnTotal - 1 : column2Index;

         const temp = this.#table[index1];
         this.#table[index1] = this.#table[index2];
         this.#table[index2] = temp;
      } else {
         throw new RangeError('Indices must not be negative');
      }
   }


   private initializeTable(rowTotal = 0, columnTotal = 0): void {
      const isValidTableSize = rowTotal > 0 && columnTotal > 0;

      if (isValidTableSize) {
         const table = [];
         const columnArray = new Array(rowTotal).fill(null);

         for (let i = 1; i <= columnTotal; i++) {
            const columnArrayCopy = columnArray.slice();
            columnArrayCopy[0] = { type: 'title', title: '', columnAlignment: 'left' };
            table.push(columnArrayCopy);
         }

         this.#table = table;
      } else {
         throw new RangeError('Arguments rowTotal and columnTotal must be greater than zero');
      }
   }


   public getTableClone(): (TitleContent | LinkContent | TextContent | ImageContent | null)[][] {
      const clone = this.#table.map(
         (columnArray) => columnArray.map(
            (cellElement) => ((cellElement) ? JSON.parse(JSON.stringify(cellElement)) : null)
         )
      );
      return clone;
   }


}


export { InternalTableModel };


