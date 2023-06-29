import { expect } from 'chai';
import {
   checkValidAmountOfPipeCharacters,
   checkLeadingAndTrailingPipeCharacters,
   checkIfMultipleRowTableHasSeparatorRow,
   validateMarkdown
} from '../../src/validator/markdownValidator';



describe('markdownValidator.checkValidAmountOfPipeCharacters()', () => {

   it('detects missing pipe characters', () => {
      let rowArray = ['| | |', 'Test', '| |', '| |||'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.throw(Error, 'Row 2: No pipe characters detected');

      rowArray = ['Test', 'Test', '| |', '| |||'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.throw(Error, 'Row 1: No pipe characters detected');

      rowArray = ['| |', '\\|', '| |', '| |||'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.throw(Error, 'Row 2: No pipe characters detected');
   });


   it('detects row with only one pipe character', () => {
      let rowArray = ['| | |', '|', '| |'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.throw(Error, 'Row 2: Row needs at least two pipe characters');

      rowArray = ['| | |', '| | |', '|'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.throw(Error, 'Row 3: Row needs at least two pipe characters');

      rowArray = ['| | |', '| | |', '|\\|'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.throw(Error, 'Row 3: Row needs at least two pipe characters');
   });


   it('detects different number of pipe characters in rows', () => {
      let rowArray = ['| |', '| | |', '| | |'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.throw(Error, 'Rows have different number of pipe characters');

      rowArray = ['| |', '| |', '| | |'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.throw(Error, 'Rows have different number of pipe characters');

      rowArray = ['| | \\|', '| | \\|', '| | |'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.throw(Error, 'Rows have different number of pipe characters');
   });


   it('passes input with valid amount of pipe characters', () => {
      let rowArray = ['|   ||', '| | |', '| | |'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.not.throw(Error);

      rowArray = ['|   |\\||', '| | |', '| | \\| |'];
      expect(() => checkValidAmountOfPipeCharacters(rowArray)).to.not.throw(Error);
   });

});



describe('markdownValidator.checkLeadingAndTrailingPipeCharacters()', () => {

   it('detects missing leading pipe character', () => {
      let rowArray = ['| |', ' | | |', '| | |'];
      expect(() => checkLeadingAndTrailingPipeCharacters(rowArray)).to.throw(Error, 'Row 2: Does not start with pipe character');

      rowArray = ['foo  | |', '| | |', '| | |'];
      expect(() => checkLeadingAndTrailingPipeCharacters(rowArray)).to.throw(Error, 'Row 1: Does not start with pipe character');
   });


   it('detects missing trailing pipe character', () => {
      let rowArray = ['| |', '| | |', '| | | '];
      expect(() => checkLeadingAndTrailingPipeCharacters(rowArray)).to.throw(Error, 'Row 3: Does not end with pipe character');

      rowArray = ['| |', '| | | bar', '| | |'];
      expect(() => checkLeadingAndTrailingPipeCharacters(rowArray)).to.throw(Error, 'Row 2: Does not end with pipe character');

      rowArray = ['| |', '| | | \\|', '| | |'];
      expect(() => checkLeadingAndTrailingPipeCharacters(rowArray)).to.throw(Error, 'Row 2: Does not end with pipe character');
   });


   it('passes input with leading and trailing pipe characters', () => {
      const rowArray = ['| |', '| | |', '| | | |'];
      expect(() => checkLeadingAndTrailingPipeCharacters(rowArray)).to.not.throw(Error);
   });

});



describe('markdownValidator.checkIfMultipleRowTableHasSeparatorRow()', () => {

   it('detects missing separator row in multi row table', () => {
      const rowArray = ['|Title1 |Title2 |', '|Content |Content | '];
      expect(() => checkIfMultipleRowTableHasSeparatorRow(rowArray)).to.throw(Error, 'Row 2: Is not a valid separator row');
   });


   it('detects invalid separator row in multi row table', () => {
      const rowArray = ['|Title1 |Title2 |', '|:--- |:---:|', '| | | '];
      expect(() => checkIfMultipleRowTableHasSeparatorRow(rowArray)).to.throw(Error, 'Row 2: Is not a valid separator row');
   });


   it('passes single row table', () => {
      const rowArray = ['|Title1 |Title2 |'];
      expect(() => checkIfMultipleRowTableHasSeparatorRow(rowArray)).to.not.throw(Error);
   });


   it('passes multiple row table with valid separator row', () => {
      let rowArray = ['|Title1 |Title2 |', '|:-----|:----:|'];
      expect(() => checkIfMultipleRowTableHasSeparatorRow(rowArray)).to.not.throw(Error);

      rowArray = ['|Title1 |Title2 |', '|:-----|:----:|', '|Content1 |Content2 |'];
      expect(() => checkIfMultipleRowTableHasSeparatorRow(rowArray)).to.not.throw(Error);
   });

});



describe('markdownValidator.validateMarkdown()', () => {

   it('detects invalid markdown', () => {
      let markdown = 'Title 1  |Title 2  |\n|:--------|--------:|\n|Content 1|Content 2|';
      expect(() => validateMarkdown(markdown)).to.throw(Error);

      markdown = '|Title 1  |Title 2  |\n|:--------|--------:\n|Content 1|Content 2|';
      expect(() => validateMarkdown(markdown)).to.throw(Error);

      markdown = '|Title 1  |Title 2  |\n|:--------|--------:|\n|Content 1|Content 2|Content 3 |';
      expect(() => validateMarkdown(markdown)).to.throw(Error);

      markdown = '|Title 1  |Title 2  |\n|Content 1|Content 2|Content 3 |';
      expect(() => validateMarkdown(markdown)).to.throw(Error);

      markdown = '|';
      expect(() => validateMarkdown(markdown)).to.throw(Error);

      markdown = '';
      expect(() => validateMarkdown(markdown)).to.throw(Error);
   });


   it('passes valid markdown', () => {
      let markdown = '|Title 1  |Title 2  |\n|:--------|--------:|\n|Content 1|Content 2|';
      expect(() => validateMarkdown(markdown)).to.not.throw(Error);

      markdown = '|Title 1  |Title 2  |';
      expect(() => validateMarkdown(markdown)).to.not.throw(Error);
   });

});
