import { assert } from 'chai';
import {
   parseMarkdownTableIntoArray,
   parseTitleSeparator,
   isImageString
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
