import { assert } from 'chai';
import { parseMarkdownTableIntoArray } from '../../src/parser/parseMarkdownToInternalTable';


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
