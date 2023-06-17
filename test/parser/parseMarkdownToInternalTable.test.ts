import { assert } from 'chai';
import {
   parseMarkdownTableIntoArray,
   parseTitleSeparator
} from '../../src/parser/parseMarkdownToInternalTable';



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
