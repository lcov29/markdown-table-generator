import { TitleContent, ColumnAlignmentOption, TextContent, ImageContent, LinkContent, LinkTargetOption, TableContent } from '../model/types';


function isImageString(string: string): boolean {
   return /<img\s*src=".*".*>/g.test(string);
}


function isLinkString(string: string): boolean {
   return /<a\s*href=".*".*>.*<\/a>/g.test(string);
}


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


function parseTitleRow(markdownTable: string[][]): TitleContent[] {
   const titleRow: TitleContent[] = [];

   for (let i = 0; i < markdownTable[0].length; i++) {
      const titleElement = markdownTable[0][i];
      const separatorElement = markdownTable[1][i];
      titleRow.push(parseTitleContent(titleElement, separatorElement));
   }

   return titleRow;
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


function parseTextContent(string: string): TextContent {
   return { type: 'text', text: string };
}


function parseImageContent(string: string): ImageContent {
   return {
      type: 'image',
      src: extractAttributeValue('src', string),
      alt: extractAttributeValue('alt', string),
      width: extractAttributeValue('width', string),
      height: extractAttributeValue('height', string),
      title: extractAttributeValue('title', string)
   };
}


function parseInnerLinkContent(string: string): TextContent | ImageContent {
   const temp = />.+</g.exec(string);

   if (!temp) {
      return parseTextContent('');
   }

   const innerContent = temp[0].substring(1, temp[0].length - 1);

   if (isImageString(innerContent)) {
      return parseImageContent(innerContent);
   }

   return parseTextContent(innerContent);
}


function parseLinkContent(string: string): LinkContent {
   return {
      type: 'link',
      href: extractAttributeValue('href', string),
      target: extractAttributeValue('target', string) as LinkTargetOption,
      content: parseInnerLinkContent(string)
   };
}


function parseNonTitleContent(string: string): TableContent {
   const isLinkContent = isLinkString(string);
   const isImageContent = isImageString(string);
   const isTextContent = !isImageContent && !isLinkContent;

   if (isLinkContent) {
      return parseLinkContent(string);
   }

   if (isImageContent) {
      return parseImageContent(string);
   }

   if (isTextContent) {
      return (string) ? parseTextContent(string) : null;
   }

   return null;
}


function parseContentRows(markdownTable: string[][]): TableContent[][] {
   const parsedContentRowList: TableContent[][] = [];

   for (let row = 2; row < markdownTable.length; row++) {
      const parsedContentRow = markdownTable[row].map(
         (cellContent) => parseNonTitleContent(cellContent)
      );
      parsedContentRowList.push(parsedContentRow);
   }

   return parsedContentRowList;
}


export {
   isImageString,
   isLinkString,
   parseMarkdownTableIntoArray,
   parseTitleSeparator,
   parseTitleContent,
   parseTitleRow,
   parseContentRows,
   extractAttributeValue,
   parseImageContent,
   parseLinkContent
};
