import { InternalTableModel } from '../model/InternalTableModel';
import { TitleContent, TextContent, ImageContent, TableContent } from '../model/types';


function parseTitleContent(titleContent: TitleContent): string {
   return `${titleContent.title} `;
}


function parseSeparatorForTitleContent(titleContent: TitleContent): string {
   const { title, columnAlignment } = titleContent;
   const titleLength = (title.length > 1) ? title.length : 2;

   switch (columnAlignment) {
      case 'left':
         return `:${'-'.repeat(titleLength)}`;
      case 'right':
         return `${'-'.repeat(titleLength)}:`;
      case 'center':
         return `:${'-'.repeat(titleLength - 1)}:`;
      default:
         return `:${'-'.repeat(titleLength)}`;
   }
}


function parseTextContent(textContent: TextContent): string {
   const { text, isLink, href, target } = textContent;
   return (isLink) ? `<a href="${href}" target="${target}">${text}</a> ` : `${text} `;
}


function parseImageContent(imageContent: ImageContent): string {
   const { src, alt, width, height, title, isLink, href, target } = imageContent;

   let image: string;
   if (title !== '') {
      image = `<img src="${src}" alt="${alt}" width="${width}" height="${height}" title="${title}"/> `;
   } else {
      image = `<img src="${src}" alt="${alt}" width="${width}" height="${height}"/> `;
   }

   return (isLink) ? `<a href="${href}" target="${target}">${image}</a> ` : image;
}


function parseTableContent(content: TableContent): string {
   if (content === null) {
      return '';
   }

   switch (content.type) {
      case 'title':
         return parseTitleContent(content);
      case 'text':
         return parseTextContent(content);
      case 'image':
         return parseImageContent(content);
      default:
         return '';
   }
}


function parseInternalTableTitleRowToMarkdown(internalTable: InternalTableModel): string[][] {
   const parsedRows: string[][] = [[], []];
   for (let column = 0; column < internalTable.columnTotal; column++) {
      const position = { rowIndex: 0, columnIndex: column };
      const titleContent = internalTable.getContentAt(position) as TitleContent;
      parsedRows[0].push(parseTableContent(titleContent));
      parsedRows[1].push(parseSeparatorForTitleContent(titleContent));
   }
   return parsedRows;
}


function parseInternalTableContentRowsToMarkdown(internalTable: InternalTableModel): string[][] {
   const parsedTable: string[][] = [];

   for (let row = 1; row < internalTable.rowTotal; row++) {
      const rowArray: string[] = [];

      for (let column = 0; column < internalTable.columnTotal; column++) {
         const position = { rowIndex: row, columnIndex: column };
         const content = parseTableContent(internalTable.getContentAt(position));
         rowArray.push(content);
      }

      parsedTable.push(rowArray);
   }

   return parsedTable;
}


function addLinesToTableRow(row: string[]): string {
   return `|${row.join('|')}|`;
}


function parseInternalTableToMarkdown(internalTable: InternalTableModel): string {
   const titleRow = parseInternalTableTitleRowToMarkdown(internalTable);
   const contentRows = parseInternalTableContentRowsToMarkdown(internalTable);
   const tableRows = [...titleRow, ...contentRows];
   return tableRows.map((row) => addLinesToTableRow(row)).join('\n');
}


export {
   parseTitleContent,
   parseSeparatorForTitleContent,
   parseTextContent,
   parseImageContent,
   parseTableContent,
   parseInternalTableTitleRowToMarkdown,
   parseInternalTableContentRowsToMarkdown,
   addLinesToTableRow,
   parseInternalTableToMarkdown
};
