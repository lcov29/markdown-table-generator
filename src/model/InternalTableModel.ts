/* eslint-disable no-param-reassign */
import { TablePosition, TitleContent, TextContent, ImageContent, TableContent } from './types';


class InternalTableModel {

   #table: TableContent[][] = [];

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


   public set table(table: TableContent[][]) {
      this.#table = table;
      this.#rowTotal = table.length;
      this.#columnTotal = table[0].length;
   }


   public addRowAt(index: number) {
      const isValidIndex = index > 0;

      if (isValidIndex) {
         const rowIndex = (index > this.#rowTotal) ? this.#rowTotal : index;
         const rowArray = new Array(this.#columnTotal).fill(null);
         this.#table.splice(rowIndex, 0, rowArray);
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

         this.#table.forEach((rowArray) => {
            rowArray.splice(columnIndex, 0, null);
         });
         this.#table[0][columnIndex] = { type: 'title', title: '', columnAlignment: 'left' };

         this.#columnTotal++;
      } else {
         throw new RangeError('Index must not be negative');
      }
   }


   public removeRowAt(index: number) {
      const isValidIndex = index > 0;

      if (isValidIndex) {
         const rowIndex = (index > this.#rowTotal) ? this.#rowTotal - 1 : index;
         const mutatedTable = this.#table.filter(
            (element, currentRowIndex) => currentRowIndex !== rowIndex
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
         const mutatedTable = this.#table.map(
            (rowArray) => rowArray.filter(
               (element, currentRowIndex) => currentRowIndex !== columnIndex
            )
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

         const tempElement = this.#table[index1];
         this.#table[index1] = this.#table[index2];
         this.#table[index2] = tempElement;
      } else {
         throw new RangeError('First row can not be swapped due to it being reserved for title objects');
      }
   }


   public swapColumns(column1Index: number, column2Index: number) {
      const isValidIndex = column1Index >= 0 && column2Index >= 0;

      if (isValidIndex) {
         const index1 = (column1Index > this.#columnTotal) ? this.#columnTotal - 1 : column1Index;
         const index2 = (column2Index > this.#columnTotal) ? this.#columnTotal - 1 : column2Index;

         this.#table.forEach((rowArray) => {
            const tempElement = rowArray[index1];
            rowArray[index1] = rowArray[index2];
            rowArray[index2] = tempElement;
         });
      } else {
         throw new RangeError('Indices must not be negative');
      }
   }


   public getContentAt(position: TablePosition): TableContent {
      if (this.isValidPosition(position)) {
         return this.#table[position.rowIndex][position.columnIndex];
      }
      throw new RangeError('Position is not valid');
   }


   public setContentAt(position: TablePosition, content: TableContent) {
      if (this.isValidPosition(position)) {
         const isTitleRowAffected = position.rowIndex === 0;
         const isNonTitleContent = content === null || content.type !== 'title';
         const isValidTitle = isTitleRowAffected && content?.type === 'title';
         const isValidNonTitle = !isTitleRowAffected && isNonTitleContent;

         if (isValidTitle || isValidNonTitle) {
            this.#table[position.rowIndex][position.columnIndex] = content;
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
         this.#table[position.rowIndex][position.columnIndex] = null;
      }
   }


   public swapContent(position1: TablePosition, position2: TablePosition) {
      const isPositionValid = this.isValidPosition(position1) && this.isValidPosition(position2);
      if (!isPositionValid) {
         throw new RangeError('Position is not valid');
      }

      const isTitleContentSwap = position1.rowIndex === 0 && position2.rowIndex === 0;
      const isNonTitleContentSwap = position1.rowIndex > 0 && position2.rowIndex > 0;
      const isSwapValid = isTitleContentSwap || isNonTitleContentSwap;

      if (isSwapValid) {
         const temp = this.getContentAt(position1);
         this.setContentAt(position1, this.getContentAt(position2));
         this.setContentAt(position2, temp);
      } else {
         throw new Error('Title content in first row can not be swapped with non title content');
      }
   }


   private initializeTable(rowTotal = 0, columnTotal = 0): void {
      const isValidTableSize = rowTotal > 0 && columnTotal > 0;

      if (isValidTableSize) {
         const titleObj = { type: 'title', title: '', columnAlignment: 'left' };
         const titleRow = new Array(columnTotal).fill(titleObj);
         const contentRow = new Array(columnTotal).fill(null);

         this.#table = [titleRow];
         for (let row = 1; row < rowTotal; row++) {
            this.#table.push(contentRow.slice());
         }
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


   public getTableClone(): TableContent[][] {
      const clone = this.#table.map(
         (rowArray) => rowArray.map(
            (cellElement) => ((cellElement) ? JSON.parse(JSON.stringify(cellElement)) : null)
         )
      );
      return clone;
   }

}


export { InternalTableModel };


