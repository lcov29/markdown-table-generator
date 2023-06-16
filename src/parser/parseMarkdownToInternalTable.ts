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


export { parseMarkdownTableIntoArray };
