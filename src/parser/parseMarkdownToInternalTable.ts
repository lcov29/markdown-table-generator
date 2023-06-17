import { TitleContent, ColumnAlignmentOption } from '../model/types';


function parseMarkdownTableIntoArray(markdownTable: string): string[][] {
   let rowArray = markdownTable.split('\n');

   // remove leading and trailing pipe characters per row
   rowArray = rowArray.map((row) => row.substring(1, row.length - 1));

   const tableArray = rowArray.map(
      (row) => {
         const splittedRowArray = row.split('|');
         return splittedRowArray.map((cellContent) => cellContent.trim());
      }
   );

   return tableArray;
}


function parseTitleSeparator(separator: string): ColumnAlignmentOption {
   const isLeftAligned = separator.startsWith(':');
   const isRightAligned = separator.endsWith(':');

   if (isLeftAligned && isRightAligned) {
      return 'center';
   }

   if (isLeftAligned) {
      return 'left';
   }

   if (isRightAligned) {
      return 'right';
   }

   return 'left';
}


export { parseMarkdownTableIntoArray, parseTitleSeparator };
