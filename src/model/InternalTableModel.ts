import { TitleContent, LinkContent, TextContent, ImageContent } from './types';


class InternalTableModel {

   private table: (TitleContent | LinkContent | TextContent | ImageContent | null)[][] = [];

   private rowTotal: number;

   private columnTotal: number;


   constructor(rowTotal = 0, columnTotal = 0) {
      this.rowTotal = rowTotal;
      this.columnTotal = columnTotal;
      this.initializeTable(rowTotal, columnTotal);
   }


   private initializeTable(rowTotal = 0, columnTotal = 0): void {
      const isValidTableSize = rowTotal > 0 && columnTotal > 0;

      if (isValidTableSize) {
         const table = [];
         const columnArray = new Array(rowTotal);
         columnArray.fill(null);

         for (let i = 1; i <= columnTotal; i++) {
            table.push(columnArray.slice());
         }

         this.table = table;
      } else {
         throw new RangeError('Arguments rowTotal and columnTotal must be greater than zero');
      }
   }


}


export { InternalTableModel };


