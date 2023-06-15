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


   public getContentAt(position: TablePosition): Content {
      if (this.isValidPosition(position)) {
         return this.#table[position.columnIndex][position.rowIndex];
      }
      throw new RangeError('Position is not valid');
   }


   public addContentAt(position: TablePosition, content: Content) {
      if (this.isValidPosition(position)) {
         const isTitleRowAffected = position.rowIndex === 0;
         const isNonTitleContent = content === null || content.type !== 'title';
         const isValidTitle = isTitleRowAffected && content?.type === 'title';
         const isValidNonTitle = !isTitleRowAffected && isNonTitleContent;

         if (isValidTitle || isValidNonTitle) {
            this.#table[position.columnIndex][position.rowIndex] = content;
         } else {
            const message1 = 'Content of first row is reserved to title content objects';
            const message2 = 'Title content objects are restricted to first row';
            throw new Error((isTitleRowAffected) ? message1 : message2);
         }
      } else {
         throw new RangeError('Position is not valid');
      }
   }


   public removeContentAt(position: TablePosition) {
      if (!this.isValidPosition(position)) {
         throw new RangeError('Position is not valid');
      }

      const isTitleContent = position.rowIndex === 0;
      if (isTitleContent) {
         throw new Error('Title content must not be removed');
      } else {
         this.#table[position.columnIndex][position.rowIndex] = null;
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


   private isValidPosition(position: TablePosition): boolean {
      const { rowIndex, columnIndex } = position;
      const isValidRowIndex = rowIndex >= 0 && rowIndex < this.#rowTotal;
      const isValidColumnIndex = columnIndex >= 0 && columnIndex < this.#columnTotal;
      return isValidRowIndex && isValidColumnIndex;
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


