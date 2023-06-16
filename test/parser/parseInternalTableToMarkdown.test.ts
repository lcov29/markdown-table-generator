import { assert } from 'chai';
import { InternalTableModel } from '../../src/model/InternalTableModel';
import { TitleContent, TextContent, ImageContent, LinkContent } from '../../src/model/types';
import {
   parseTitleContent,
   parseSeparatorForTitleContent,
   parseTextContent,
   parseImageContent,
   parseLinkContent,
   parseTableContent,
   parseInternalTableTitleRowToMarkdown,
   parseInternalTableContentRowsToMarkdown,
   addLinesToTableRow,
   parseInternalTableToMarkdown
} from '../../src/parser/parseInternalTableToMarkdown';



describe('parseInternalTableToMarkdown.parseTitleContent()', () => {

   it('parse valid title content', () => {
      const titleContent: TitleContent = {
         type: 'title',
         title: 'Test',
         columnAlignment: 'left'
      };
      assert.equal(parseTitleContent(titleContent), 'Test ');
   });

});



describe('parseInternalTableToMarkdown.parseSeparatorForTitleContent()', () => {

   it('parse valid title content', () => {
      const titleContent: TitleContent = {
         type: 'title',
         title: 'Test',
         columnAlignment: 'left'
      };
      assert.equal(parseSeparatorForTitleContent(titleContent), ':----');

      titleContent.columnAlignment = 'right';
      assert.equal(parseSeparatorForTitleContent(titleContent), '----:');

      titleContent.columnAlignment = 'center';
      assert.equal(parseSeparatorForTitleContent(titleContent), ':---:');

      titleContent.title = '';
      assert.equal(parseSeparatorForTitleContent(titleContent), ':-:');
   });

});



describe('parseInternalTableToMarkdown.parseTextContent()', () => {

   it('parse valid text content', () => {
      const textContent: TextContent = {
         type: 'text',
         text: 'FooBar'
      };
      assert.equal(parseTextContent(textContent), 'FooBar ');
   });

});



describe('parseInternalTableToMarkdown.parseImageContent()', () => {

   it('parse valid image content', () => {
      const imageContentWithTitle: ImageContent = {
         type: 'image',
         src: 'https://test.com/image.jpg',
         alt: 'description',
         width: '40',
         height: '40',
         title: 'image title'
      };
      const imageContentWithoutTitle: ImageContent = {
         type: 'image',
         src: 'https://test.com/image.jpg',
         alt: 'description',
         width: '40',
         height: '40'
      };
      const imageTextWithTitle = '<img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> ';
      const imageTextWithoutTitle = '<img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> ';

      assert.equal(parseImageContent(imageContentWithTitle), imageTextWithTitle);
      assert.equal(parseImageContent(imageContentWithoutTitle), imageTextWithoutTitle);
   });

});



describe('parseInternalTableToMarkdown.parseLinkContent()', () => {

   it('parse valid link with text content', () => {
      const linkContentWithTextContent: LinkContent = {
         type: 'link',
         href: 'https://test.com/',
         target: '_blank',
         content: {
            type: 'text',
            text: 'Link Text'
         }
      };
      const linkWithTextContent = '<a href="https://test.com/" target="_blank">Link Text </a> ';
      assert.equal(parseLinkContent(linkContentWithTextContent), linkWithTextContent);
   });


   it('parse valid link with image content', () => {
      const linkContentWithImageContent: LinkContent = {
         type: 'link',
         href: 'https://test.com/',
         target: '_blank',
         content: {
            type: 'image',
            src: 'https://test.com/image.jpg',
            alt: 'description',
            width: '40',
            height: '40'
         }
      };
      const linkWithImageContent = '<a href="https://test.com/" target="_blank"><img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> </a> ';
      assert.equal(parseLinkContent(linkContentWithImageContent), linkWithImageContent);
   });

});



describe('parseInternalTableToMarkdown.parseTableContent()', () => {

   it('parse valid title content', () => {
      const titleContent: TitleContent = {
         type: 'title',
         title: 'Test',
         columnAlignment: 'left'
      };
      assert.equal(parseTableContent(titleContent), 'Test ');
   });


   it('parse valid text content', () => {
      const textContent: TextContent = {
         type: 'text',
         text: 'FooBar'
      };
      assert.equal(parseTableContent(textContent), 'FooBar ');
   });


   it('parse valid image content', () => {
      const imageContentWithTitle: ImageContent = {
         type: 'image',
         src: 'https://test.com/image.jpg',
         alt: 'description',
         width: '40',
         height: '40',
         title: 'image title'
      };
      const imageContentWithoutTitle: ImageContent = {
         type: 'image',
         src: 'https://test.com/image.jpg',
         alt: 'description',
         width: '40',
         height: '40'
      };
      const imageTextWithTitle = '<img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> ';
      const imageTextWithoutTitle = '<img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> ';

      assert.equal(parseTableContent(imageContentWithTitle), imageTextWithTitle);
      assert.equal(parseTableContent(imageContentWithoutTitle), imageTextWithoutTitle);
   });


   it('parse valid link with text content', () => {
      const linkContentWithTextContent: LinkContent = {
         type: 'link',
         href: 'https://test.com/',
         target: '_blank',
         content: {
            type: 'text',
            text: 'Link Text'
         }
      };
      const linkWithTextContent = '<a href="https://test.com/" target="_blank">Link Text </a> ';
      assert.equal(parseTableContent(linkContentWithTextContent), linkWithTextContent);
   });


   it('parse valid link with image content', () => {
      const linkContentWithImageContent: LinkContent = {
         type: 'link',
         href: 'https://test.com/',
         target: '_blank',
         content: {
            type: 'image',
            src: 'https://test.com/image.jpg',
            alt: 'description',
            width: '40',
            height: '40'
         }
      };
      const linkWithImageContent = '<a href="https://test.com/" target="_blank"><img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> </a> ';
      assert.equal(parseTableContent(linkContentWithImageContent), linkWithImageContent);
   });


   it('parse empty content represented by null value', () => {
      assert.equal(parseTableContent(null), '');
   });

});



describe('parseInternalTableToMarkdown.parseInternalTableTitleRowToMarkdown()', () => {

   it('parse title row of valid internal table', () => {
      const obj = new InternalTableModel(2, 2);
      obj.table = [
         [
            {
               type: 'title',
               title: 'Header1',
               columnAlignment: 'left'
            },
            {
               type: 'text',
               text: 'Some Text'
            },
            null
         ],
         [
            {
               type: 'title',
               title: 'Header2',
               columnAlignment: 'right'
            },
            {
               type: 'image',
               src: 'https://test.com/image.jpg',
               alt: 'description',
               width: '40',
               height: '40',
               title: 'image title'
            },
            {
               type: 'link',
               href: 'https://test.com/',
               target: '_blank',
               content: {
                  type: 'image',
                  src: 'https://test.com/image.jpg',
                  alt: 'description',
                  width: '40',
                  height: '40'
               }
            }
         ],
         [
            {
               type: 'title',
               title: 'Header3',
               columnAlignment: 'center'
            },
            {
               type: 'text',
               text: 'Some Text'
            },
            null
         ],
      ];
      const parsedTitleRow = parseInternalTableTitleRowToMarkdown(obj);
      const expectedResult = [
         ['Header1 ', 'Header2 ', 'Header3 '],
         [':-------', '-------:', ':------:']
      ];
      assert.deepEqual(parsedTitleRow, expectedResult);
   });

});



describe('parseInternalTableToMarkdown.parseInternalTableContentRowsToMarkdown()', () => {

   it('parse content rows of valid internal table', () => {
      const obj = new InternalTableModel(2, 2);
      obj.table = [
         [
            {
               type: 'title',
               title: 'Header1',
               columnAlignment: 'left'
            },
            {
               type: 'text',
               text: 'Some Text'
            },
            null
         ],
         [
            {
               type: 'title',
               title: 'Header2',
               columnAlignment: 'right'
            },
            {
               type: 'image',
               src: 'https://test.com/image.jpg',
               alt: 'description',
               width: '40',
               height: '40',
               title: 'image title'
            },
            {
               type: 'link',
               href: 'https://test.com/',
               target: '_blank',
               content: {
                  type: 'image',
                  src: 'https://test.com/image.jpg',
                  alt: 'description',
                  width: '40',
                  height: '40'
               }
            }
         ]
      ];
      const parsedTable = parseInternalTableContentRowsToMarkdown(obj);
      const expectedResult = [
         ['Some Text ', '<img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> '],
         ['', '<a href="https://test.com/" target="_blank"><img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> </a> ']
      ];
      assert.deepEqual(parsedTable, expectedResult);
   });

});



describe('parseInternalTableToMarkdown.addLinesToTableRow()', () => {

   it('format row of strings', () => {
      const output = addLinesToTableRow(['Content1 ', 'Content2 ', 'Content3 ']);
      const expectedOutput = '|Content1 |Content2 |Content3 |';
      assert.equal(output, expectedOutput);
   });

});



describe('parseInternalTableToMarkdown.parseInternalTableToMarkdown()', () => {

   it('parse internal table to markdown table string', () => {
      const obj = new InternalTableModel(2, 2);
      obj.table = [
         [
            {
               type: 'title',
               title: 'Header1',
               columnAlignment: 'left'
            },
            {
               type: 'text',
               text: 'Some Text'
            },
            null
         ],
         [
            {
               type: 'title',
               title: 'Header2',
               columnAlignment: 'right'
            },
            {
               type: 'image',
               src: 'https://test.com/image.jpg',
               alt: 'description',
               width: '40',
               height: '40',
               title: 'image title'
            },
            {
               type: 'link',
               href: 'https://test.com/',
               target: '_blank',
               content: {
                  type: 'image',
                  src: 'https://test.com/image.jpg',
                  alt: 'description',
                  width: '40',
                  height: '40'
               }
            }
         ]
      ];

      const parsedTable = parseInternalTableToMarkdown(obj);
      const expectedResult = '|Header1 |Header2 |\n|:-------|-------:|\n|Some Text |<img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> |\n||<a href="https://test.com/" target="_blank"><img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> </a> |';
      assert.equal(parsedTable, expectedResult);
   });

});
