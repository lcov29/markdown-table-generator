import { TitleContent, ColumnAlignmentOption, TextContent, ImageContent } from '../model/types';


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


function parseTitleContent(title: string, separator: string): TitleContent {
   return {
      type: 'title',
      title,
      columnAlignment: parseTitleSeparator(separator)
   };
}


function extractAttributeValue(attribute: string, string: string): string {
   const regExp = new RegExp(`${attribute}=".*?"`, 'i');
   const attributeMatch = regExp.exec(string);

   if (attributeMatch) {
      let value = attributeMatch[0];
      value = value.replace(`${attribute}=`, '');
      value = value.replaceAll('"', '');
      return value;
   }
   return '';
}


function isImageString(string: string): boolean {
   return /<img\s*src="\w*".*>/g.test(string);
}


export {
   parseMarkdownTableIntoArray,
   parseTitleSeparator,
   parseTitleContent,
   extractAttributeValue,
   isImageString
};
