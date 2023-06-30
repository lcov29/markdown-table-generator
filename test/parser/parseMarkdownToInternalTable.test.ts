import { assert } from 'chai';
import {
   parseMarkdownTableIntoArray,
   parseTitleSeparator,
   isImageString,
   isLinkString,
   removeLeadingAndTrailingPipeCharacters,
   splitRowIntoColumnsByUnescapedPipeCharacters,
   trimColumnContent,
   extractAttributeValue,
   parseTitleRow,
   parseContentRows,
   parseMarkdownToInternalTable
} from '../../src/parser/parseMarkdownToInternalTable';
import { TableContent, TitleContent } from '../../src/model/types';



const markdownTableDefinition = `|Header1   |Header2 |
|:---------|-------:|
|Some Text |<img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/> |
|          |<a href="https://test.com/" target="_blank"><img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> </a> |`;



describe('parseMarkdownToInternalTable.parseMarkdownTableIntoArray()', () => {

   it('parses valid markdown table into array', () => {
      const expectedResult = [
         ['Header1', 'Header2'],
         [':---------', '-------:'],
         ['Some Text', '<img src="https://test.com/image.jpg" alt="description" width="40" height="40" title="image title"/>'],
         ['', '<a href="https://test.com/" target="_blank"><img src="https://test.com/image.jpg" alt="description" width="40" height="40"/> </a>']
      ];
      assert.deepEqual(parseMarkdownTableIntoArray(markdownTableDefinition), expectedResult);
   });

});



describe('parseMarkdownToInternalTable.parseTitleSeparator()', () => {

   it('parses valid title separators', () => {
      assert.equal(parseTitleSeparator(':--------'), 'left');
      assert.equal(parseTitleSeparator('--------:'), 'right');
      assert.equal(parseTitleSeparator(':-------:'), 'center');
   });


   it('parses invalid title separators to result "left"', () => {
      assert.equal(parseTitleSeparator('invalid'), 'left');
   });

});



describe('parseMarkdownToInternalTable.isImageString()', () => {

   it('detects valid image string', () => {
      assert.equal(isImageString('<img src="SRC" alt="ALT" >'), true);
      assert.equal(isImageString('<img src="SRC">'), true);
      assert.equal(isImageString('<img src="SRC" alt="ALT">'), true);
      assert.equal(isImageString('<img src="SRC" alt="ALT" />'), true);
      assert.equal(isImageString('<img src="SRC" alt="ALT"/>'), true);
   });


   it('detects invalid image string', () => {
      assert.equal(isImageString('<im src="SRC" alt="ALT" >'), false);
      assert.equal(isImageString('img src="SRC" alt="ALT">'), false);
      assert.equal(isImageString('<im src="SRC" alt="ALT" />'), false);
      assert.equal(isImageString('<img src="SRC" alt="ALT"'), false);
      assert.equal(isImageString('<img alt="ALT >"'), false);
      assert.equal(isImageString('<img alt="ALT>"'), false);
      assert.equal(isImageString('<img alt="ALT />"'), false);
      assert.equal(isImageString('<img alt="ALT/>"'), false);
   });


   it('detects non image string', () => {
      assert.equal(isImageString(''), false);
      assert.equal(isImageString('FooBar'), false);
   });

});



describe('parseMarkdownToInternalTable.isLinkString()', () => {

   it('detects valid link string', () => {
      assert.equal(isLinkString('<a href="https://test.com">Text</a>'), true);
      assert.equal(isLinkString('<a href="https://test.com" target="_blank">Text</a>'), true);
      assert.equal(isLinkString('<a href="https://test.com" target="_blank"><img src="source" alt="ALT"></a>'), true);
   });


   it('detects invalid link string', () => {
      assert.equal(isLinkString('<a>Text</a>'), false);
   });


   it('detects non link string', () => {
      assert.equal(isLinkString(''), false);
      assert.equal(isLinkString('FooBar'), false);
      assert.equal(isLinkString('<im src="SRC" alt="ALT" >'), false);
   });

});



describe('parseMarkdownToInternalTable.removeLeadingAndTrailingPipeCharacters()', () => {

   it('removes leading and trailing pipe characters', () => {
      const rowList = ['|content 1 |content 2', 'content 1 |content 2|', '|content 1 |content 2|'];
      const expectedResult = ['content 1 |content 2', 'content 1 |content 2', 'content 1 |content 2'];
      assert.deepEqual(removeLeadingAndTrailingPipeCharacters(rowList), expectedResult);
   });


   it('does not alter inputs without leading and trailing pipe characters', () => {
      const rowList = ['content 1 |content 2', 'content 3 |content 4'];
      assert.deepEqual(removeLeadingAndTrailingPipeCharacters(rowList), rowList);

   });

});



describe('parseMarkdownToInternalTable.splitRowIntoColumnsByUnescapedPipeCharacters()', () => {

   it('splits columns correctly', () => {
      const rowList = ['content 1 |content 2', 'content 3 |content 4', 'content 5 \\| content6'];
      const expectedResult = [['content 1 ', 'content 2'], ['content 3 ', 'content 4'], ['content 5 \\| content6']];
      assert.deepEqual(splitRowIntoColumnsByUnescapedPipeCharacters(rowList), expectedResult);
   });

});



describe('parseMarkdownToInternalTable.trimColumnContent', () => {

   it('trims column content correctly', () => {
      const tableArray = [['    content 1', '   content 2   '], ['content 3    ', 'content 4']];
      const expectedResult = [['content 1', 'content 2'], ['content 3', 'content 4']];
      assert.deepEqual(trimColumnContent(tableArray), expectedResult);
   });

});



describe('parseMarkdownToInternalTable.extractAttributeValue()', () => {

   it('extracts value of existing attribute', () => {
      assert.equal(extractAttributeValue('src', '<img src="image/source/name.jpg" alt="altText" title="title" width="40" height="30">'), 'image/source/name.jpg');
      assert.equal(extractAttributeValue('alt', '<img src="image/source/name.jpg" alt="altText" title="title" width="40" height="30">'), 'altText');
      assert.equal(extractAttributeValue('title', '<img src="image/source/name.jpg" alt="altText" title="title" width="40" height="30">'), 'title');
      assert.equal(extractAttributeValue('width', '<img src="image/source/name.jpg" alt="altText" title="title" width="40" height="30">'), '40');
      assert.equal(extractAttributeValue('height', '<img src="image/source/name.jpg" alt="altText" title="title" width="40" height="30">'), '30');
      assert.equal(extractAttributeValue('height', '<img src="image/source/name.jpg" alt="altText" title="title" width="40" height="">'), '');
   });


   it('returns empty string for nonexisting attribute', () => {
      assert.equal(extractAttributeValue('title', '<img src="image/source/name.jpg" alt="altText">'), '');
   });

});



describe('parseMarkdownToInternalTable.parseTitleRow()', () => {

   it('parses title row of valid markdown table', () => {
      const table = [
         ['Title1', 'Title2', 'Title3'],
         [':-----', '-----:', ':----:'],
         ['Content1.1', 'Content1.2', 'Content1.3'],
         ['Content2.1', 'Content2.2', 'Content2.3'],
         ['Content3.1', 'Content3.2', 'Content3.3']
      ];
      const expectedResult: TitleContent[] = [
         { type: 'title', title: 'Title1', columnAlignment: 'left' },
         { type: 'title', title: 'Title2', columnAlignment: 'right' },
         { type: 'title', title: 'Title3', columnAlignment: 'center' }
      ];
      assert.deepEqual(parseTitleRow(table), expectedResult);
   });

});



describe('parseMarkdownToInternalTable.parseContentRows()', () => {

   it('parses content rows of valid markdown table', () => {
      const table = [
         ['Title1', 'Title2', 'Title3'],
         [':-----', '-----:', ':----:'],
         [
            'Content1.1',
            'Content1.2',
            'Content1.3'
         ],
         [
            'Content2.1',
            '<img src="image/source/name.jpg" alt="altText" title="title" width="40" height="30">',
            'Content2.3'],
         [
            '<a href="https://test.com" target="_blank">Link Text</a>',
            'Content3.2',
            '<a href="https://test.com" target="_blank"><img src="https://domain.com/picture.jpg" alt="Alternative Description"></a>'
         ]
      ];
      const expectedResult: TableContent[][] = [
         [
            { type: 'text', text: 'Content1.1', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content1.2', isLink: false, href: '', target: '', title: '' },
            { type: 'text', text: 'Content1.3', isLink: false, href: '', target: '', title: '' }
         ],
         [
            { type: 'text', text: 'Content2.1', isLink: false, href: '', target: '', title: '' },
            {
               type: 'image',
               src: 'image/source/name.jpg',
               alt: 'altText',
               width: '40',
               height: '30',
               title: 'title',
               isLink: false,
               href: '',
               target: ''
            },
            { type: 'text', text: 'Content2.3', isLink: false, href: '', target: '', title: '' }
         ],
         [
            {
               type: 'text',
               text: 'Link Text',
               isLink: true,
               href: 'https://test.com',
               target: '_blank',
               title: ''
            },
            { type: 'text', text: 'Content3.2', isLink: false, href: '', target: '', title: '' },
            {
               type: 'image',
               src: 'https://domain.com/picture.jpg',
               alt: 'Alternative Description',
               width: '',
               height: '',
               title: '',
               isLink: true,
               href: 'https://test.com',
               target: '_blank'
            }
         ]
      ];
      assert.deepEqual(parseContentRows(table), expectedResult);
   });

});



describe('parseMarkdownToInternalTable.parseMarkdownToInternalTable()', () => {

   it('parses valid markdown table', () => {
      const expectedResult: TableContent[][] = [
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
               title: '',
               isLink: true,
               href: 'https://test.com/',
               target: '_blank'
            }
         ]
      ];
      assert.deepEqual(parseMarkdownToInternalTable(markdownTableDefinition), expectedResult);
   });

});




