import { TitleContent, ColumnAlignmentOption, TextContent, ImageContent, LinkTargetOption, TableContent } from '../model/types';
import { validateMarkdown } from '../validator/markdownValidator';


function isImageString(string: string): boolean {
   return /<img\s*src=".*".*>/g.test(string);
}


function isLinkString(string: string): boolean {
   return /<a\s*href=".*".*>.*<\/a>/g.test(string);
}


function removeLeadingAndTrailingPipeCharacters(rowList: string[]): string[] {
   return rowList.map((row) => row.replaceAll(/^\||\|$/g, ''));
}


function splitRowIntoColumnsByUnescapedPipeCharacters(rowList: string[]): string[][] {
   return rowList.map((row) => row.split(/(?<!\\)\|/g));
}


function trimColumnContent(tableArray: string[][]): string[][] {
   const trim = (columnContent: string) => columnContent.trim();
   return tableArray.map((row) => row.map(trim));
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


function parseLinkText(string: string): string {
   const innerContent = />.+</g.exec(string);

   if (innerContent) {
      const linkText = innerContent[0].substring(1, innerContent[0].length - 1);
      return linkText;
   }

   return '';
}


function parseTitleContent(title: string, separator: string): TitleContent {
   return {
      type: 'title',
      title,
      columnAlignment: parseTitleSeparator(separator)
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


function parseNonTitleContent(string: string): TableContent {
   if (isImageString(string)) {
      return parseImageContent(string);
   }
   return (string) ? parseTextContent(string) : null;
}


function parseMarkdownTableIntoArray(markdownTable: string): string[][] {
   let rowList: string[];
   let tableArray: string[][];

   rowList = markdownTable.split('\n');
   rowList = removeLeadingAndTrailingPipeCharacters(rowList);
   tableArray = splitRowIntoColumnsByUnescapedPipeCharacters(rowList);
   tableArray = trimColumnContent(tableArray);

   return tableArray;
}


function parseTitleRow(markdownTable: string[][]): TitleContent[] {
   const titleRow: TitleContent[] = [];
   const hasSeparator = markdownTable.length > 1;

   for (let columnIndex = 0; columnIndex < markdownTable[0].length; columnIndex++) {
      const titleElement = markdownTable[0][columnIndex];
      const separatorElement = (hasSeparator) ? markdownTable[1][columnIndex] : '';
      const titleContent = parseTitleContent(titleElement, separatorElement);
      titleRow.push(titleContent);
   }

   return titleRow;
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


function addTitleRow(tableArray: TableContent[][], titleRow: TitleContent[]) {
   tableArray.splice(0, 0, titleRow);
}


function parseMarkdownToInternalTable(markdown: string): TableContent[][] {
   validateMarkdown(markdown);
   const markdownTableArray = parseMarkdownTableIntoArray(markdown);
   const titleRow = parseTitleRow(markdownTableArray);
   const tableArray = parseContentRows(markdownTableArray);
   addTitleRow(tableArray, titleRow);
   return tableArray;
}


export {
   isImageString,
   isLinkString,
   removeLeadingAndTrailingPipeCharacters,
   splitRowIntoColumnsByUnescapedPipeCharacters,
   trimColumnContent,
   extractAttributeValue,
   parseTitleSeparator,
   parseLinkText,
   parseTitleContent,
   parseMarkdownTableIntoArray,
   parseTitleRow,
   parseContentRows,
   addTitleRow,
   parseMarkdownToInternalTable
};
