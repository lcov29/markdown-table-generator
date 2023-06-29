import { TitleContent, ColumnAlignmentOption, TextContent, ImageContent, LinkTargetOption, TableContent } from '../model/types';
import { validateMarkdown } from './markdownValidator';


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


function parseLinkText(string: string): string {
   const innerContent = />.+</g.exec(string);

   if (innerContent) {
      const linkText = innerContent[0].substring(1, innerContent[0].length - 1);
      return linkText;
   }

   return '';
}


function parseTextContent(string: string): TextContent {
   if (isLinkString(string)) {
      return {
         type: 'text',
         text: parseLinkText(string),
         isLink: true,
         href: extractAttributeValue('href', string),
         target: extractAttributeValue('target', string) as LinkTargetOption,
      };
   }
   return {
      type: 'text',
      text: string,
      isLink: false,
      href: '',
      target: ''
   };
}


function parseImageContent(string: string): ImageContent {
   if (isLinkString(string)) {
      return {
         type: 'image',
         src: extractAttributeValue('src', string),
         alt: extractAttributeValue('alt', string),
         width: extractAttributeValue('width', string),
         height: extractAttributeValue('height', string),
         title: extractAttributeValue('title', string),
         isLink: true,
         href: extractAttributeValue('href', string),
         target: extractAttributeValue('target', string) as LinkTargetOption,
      };
   }
   return {
      type: 'image',
      src: extractAttributeValue('src', string),
      alt: extractAttributeValue('alt', string),
      width: extractAttributeValue('width', string),
      height: extractAttributeValue('height', string),
      title: extractAttributeValue('title', string),
      isLink: false,
      href: '',
      target: ''
   };
}


function parseNonTitleContent(string: string): TableContent {
   if (isImageString(string)) {
      return parseImageContent(string);
   }
   return (string) ? parseTextContent(string) : null;
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


function parseMarkdownToInternalTable(markdown: string): TableContent[][] {
   validateMarkdown(markdown);
   const markdownTableArray = parseMarkdownTableIntoArray(markdown);
   const titleRow = parseTitleRow(markdownTableArray);
   const contentRows = parseContentRows(markdownTableArray);
   contentRows.splice(0, 0, titleRow); // add title row as first row
   return contentRows;
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
   parseMarkdownToInternalTable
};
