import { TitleContent, ColumnAlignmentOption, TextContent, ImageContent, LinkTargetOption, TableContent } from '../model/types';
import { validateMarkdown } from '../validator/markdownValidator';


function isImageString(string: string): boolean {
   return /<img\s*src=".*".*>/g.test(string);
}


function isMarkdownImageString(string: string): boolean {
   return /!\[.*?\]\(.*?\)/g.test(string);
}


function isLinkString(string: string): boolean {
   return /<a\s*href=".*".*>.*<\/a>/g.test(string);
}


function isMarkdownLinkString(string: string): boolean {
   return /^\[.*?\]\(.*?\)/g.test(string);
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
   let innerContent;

   if (isLinkString(string)) {
      innerContent = />.+</g.exec(string);
   }

   if (isMarkdownLinkString(string)) {
      innerContent = /\[.+\]/g.exec(string);
   }

   if (innerContent) {
      const linkText = innerContent[0].substring(1, innerContent[0].length - 1);
      return linkText;
   }

   return '';
}


function parseLinkHref(string: string): string {
   if (isLinkString(string)) {
      return extractAttributeValue('href', string);
   }

   if (isMarkdownLinkString(string)) {
      const innerContent = /\([^"]*/g.exec(string);
      if (innerContent) {
         let href = innerContent[0].replace('(', '');
         href = href.replace(')', '');
         return href.trim();
      }
   }

   return '';
}


function parseLinkTarget(string: string): LinkTargetOption {
   if (isLinkString(string)) {
      return extractAttributeValue('target', string) as LinkTargetOption;
   }
   return '_blank';
}


function parseLinkTitle(string: string): string {
   if (isLinkString(string)) {
      return extractAttributeValue('title', string);
   }

   if (isMarkdownLinkString(string) || isMarkdownImageString(string)) {
      const innerContent = /".*"/g.exec(string);
      if (innerContent) {
         const title = innerContent[0].replaceAll('"', '');
         return title.trim();
      }
   }

   return '';
}


function parseImageAltText(string: string): string {
   if (isImageString(string)) {
      return extractAttributeValue('alt', string);
   }

   if (isMarkdownImageString(string)) {
      const innerContent = /\[.+\]/g.exec(string);
      if (innerContent) {
         const alt = innerContent[0].substring(1, innerContent[0].length - 1);
         return alt.trim();
      }
   }

   return '';
}


function parseImageSrcText(string: string): string {
   if (isImageString(string)) {
      return extractAttributeValue('src', string);
   }

   if (isMarkdownImageString(string)) {
      const innerContent = /\(.+\)/g.exec(string);
      if (innerContent) {
         let src = innerContent[0].substring(1, innerContent[0].length - 1);
         src = src.replaceAll(/".*"/g, '');
         return src.trim();
      }
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
   const isLink = isLinkString(string) || isMarkdownLinkString(string);
   const href = (isLink) ? parseLinkHref(string) : '';
   const target = (isLink) ? parseLinkTarget(string) : '';

   return {
      type: 'image',
      src: parseImageSrcText(string),
      alt: parseImageAltText(string),
      width: extractAttributeValue('width', string),
      height: extractAttributeValue('height', string),
      title: parseLinkTitle(string),
      isLink,
      href,
      target
   };
}


function parseTextContent(string: string): TextContent {
   const isLink = isLinkString(string) || isMarkdownLinkString(string);
   const text = (isLink) ? parseLinkText(string) : string;
   const href = (isLink) ? parseLinkHref(string) : '';
   const target = (isLink) ? parseLinkTarget(string) : '';
   const title = (isLink) ? parseLinkTitle(string) : '';

   return { type: 'text', text, isLink, href, target, title };
}


function parseNonTitleContent(string: string): TableContent {
   if (isImageString(string) || isMarkdownImageString(string)) {
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

   for (let rowIndex = 2; rowIndex < markdownTable.length; rowIndex++) {
      const row = markdownTable[rowIndex];
      const parsedContentRow = row.map((cellContent) => parseNonTitleContent(cellContent));
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
