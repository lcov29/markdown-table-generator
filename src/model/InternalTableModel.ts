import { TitleContent, LinkContent, TextContent, ImageContent } from './types';


class InternalTableModel {

   #table: (TitleContent | LinkContent | TextContent | ImageContent | null)[][] = [];

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


