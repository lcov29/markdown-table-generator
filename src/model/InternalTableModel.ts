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


   private initializeTable(rowTotal = 0, columnTotal = 0): void {
      const isValidTableSize = rowTotal > 0 && columnTotal > 0;

      if (isValidTableSize) {
         const table = [];
         const columnArray = new Array(rowTotal).fill(null);

         for (let i = 1; i <= columnTotal; i++) {
            const columnArrayCopy = columnArray.slice();
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


