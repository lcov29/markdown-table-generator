import { assert } from 'chai';
import { InternalTableModel } from '../../src/model/InternalTableModel';
import { TitleContent, TextContent, ImageContent } from '../../src/model/types';
import {
   parseTitleContent,
   parseSeparatorForTitleContent,
   parseTextContent,
   parseImageContent,
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

   it('parse valid text content without link', () => {
      const textContent: TextContent = {
         type: 'text',
         text: 'FooBar',
         isLink: false,
         href: '',
         target: '',
         title: ''
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
         title: 'image title',
         isLink: false,
         href: '',
         target: ''
      };
      const imageContentWithoutTitle: ImageContent = {
         type: 'image',
         src: 'https://test.com/image.jpg',
         alt: 'description',
         width: '40',
         height: '40',
         title: '',
         isLink: false,
         href: '',
         target: ''
      };
      const imageContentWithLink: ImageContent = {
         type: 'image',
         src: 'https://test.com/image.jpg',
         alt: 'description',
         width: '40',
         height: '40',
         title: '',
         isLink: true,
         href: 'https://test.com',
         target: '_blank'
      };
      const imageTextWithTitle = '<img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> ';
      const imageTextWithoutTitle = '<img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> ';
      const imageTextWithLink = '<a href="https://test.com" target="_blank"><img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> </a> ';

      assert.equal(parseImageContent(imageContentWithTitle), imageTextWithTitle);
      assert.equal(parseImageContent(imageContentWithoutTitle), imageTextWithoutTitle);
      assert.equal(parseImageContent(imageContentWithLink), imageTextWithLink);
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
         text: 'FooBar',
         isLink: false,
         href: '',
         target: '',
         title: ''
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
         title: 'image title',
         isLink: false,
         href: '',
         target: ''
      };
      const imageContentWithoutTitle: ImageContent = {
         type: 'image',
         src: 'https://test.com/image.jpg',
         alt: 'description',
         width: '40',
         height: '40',
         title: '',
         isLink: false,
         href: '',
         target: ''
      };
      const imageTextWithTitle = '<img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> ';
      const imageTextWithoutTitle = '<img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> ';

      assert.equal(parseTableContent(imageContentWithTitle), imageTextWithTitle);
      assert.equal(parseTableContent(imageContentWithoutTitle), imageTextWithoutTitle);
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
            { type: 'title', title: 'Header1', columnAlignment: 'left' },
            { type: 'title', title: 'Header2', columnAlignment: 'right' },
            { type: 'title', title: 'Header3', columnAlignment: 'center' }
         ],
         [
            { type: 'text', text: 'Some Text', isLink: false, href: '', target: '', title: '' },
            {
               type: 'image',
               src: 'https://test.com/image.jpg',
               alt: 'description',
               width: '40',
               height: '40',
               title: 'image title',
               isLink: false,
               href: '',
               target: ''
            }
         ],
         [
            { type: 'text', text: 'Some Text', isLink: false, href: '', target: '', title: '' },
            null,
            {
               type: 'image',
               src: 'https://test.com/image.jpg',
               alt: 'description',
               width: '40',
               height: '40',
               title: 'image title',
               isLink: true,
               href: 'https://test.com/',
               target: '_blank'
            }
         ]
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
            { type: 'title', title: 'Header1', columnAlignment: 'left' },
            { type: 'title', title: 'Header2', columnAlignment: 'right' },
            { type: 'title', title: 'Header3', columnAlignment: 'center' }
         ],
         [
            { type: 'text', text: 'Some Text', isLink: false, href: '', target: '', title: '' },
            null,
            {
               type: 'image',
               src: 'https://test.com/image.jpg',
               alt: 'description',
               width: '40',
               height: '40',
               title: 'image title',
               isLink: false,
               href: '',
               target: ''
            }
         ],
         [
            { type: 'text', text: 'Some Other Text', isLink: false, href: '', target: '', title: '' },
            null,
            {
               type: 'image',
               src: 'https://test.com/image.jpg',
               alt: 'description',
               width: '40',
               height: '40',
               title: 'image title',
               isLink: true,
               href: 'https://test.com/',
               target: '_blank'
            }
         ]
      ];

      const parsedTable = parseInternalTableContentRowsToMarkdown(obj);
      const expectedResult = [
         ['Some Text ', '', '<img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> '],
         ['Some Other Text ', '', '<a href="https://test.com/" target="_blank"><img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> </a> ']
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
            { type: 'title', title: 'Header1', columnAlignment: 'left' },
            { type: 'title', title: 'Header2', columnAlignment: 'right' },
         ],
         [
            { type: 'text', text: 'Some Text', isLink: false, href: '', target: '', title: '' },
            {
               type: 'image',
               src: 'https://test.com/image.jpg',
               alt: 'description',
               width: '40',
               height: '40',
               title: 'image title',
               isLink: false,
               href: '',
               target: ''
            }
         ],
         [
            null,
            {
               type: 'image',
               src: 'https://test.com/image.jpg',
               alt: 'description',
               width: '40',
               height: '40',
               title: 'image title',
               isLink: true,
               href: 'https://test.com/',
               target: '_blank'
            }
         ]
      ];

      const parsedTable = parseInternalTableToMarkdown(obj);
      const expectedResult = '|Header1 |Header2 |\n|:-------|-------:|\n|Some Text |<img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> |\n||<a href="https://test.com/" target="_blank"><img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> </a> |';
      assert.equal(parsedTable, expectedResult);
   });

});
