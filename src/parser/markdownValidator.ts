/*
function test() {
   const rowArray = markdownTable.split('\n');
}
*/


function checkValidAmountOfPipeCharacters(rowArray: string[]) {
   let pipeCharacterAmount = 0;

   const checkPipeCharacters = (row: string, index: number) => {
      const pipeCharacterList = row.match(/\|/g);
      const rowPipeCharacterAmount = (pipeCharacterList) ? pipeCharacterList.length : 0;
      const isInitializationRequired = pipeCharacterAmount === 0;
      const hasRowNoPipeCharacter = rowPipeCharacterAmount === 0;
      const hasRowInvalidPipeCharacterAmount = rowPipeCharacterAmount < 2;

      if (isInitializationRequired) {
         pipeCharacterAmount = rowPipeCharacterAmount;
      }

      if (hasRowNoPipeCharacter) {
         throw new Error(`Row ${index + 1}: No pipe characters detected`);
      }

      if (hasRowInvalidPipeCharacterAmount) {
         throw new Error(`Row ${index + 1}: Row needs at least two pipe characters`);
      }

      const hasRowDifferentPipeCharacterAmount = rowPipeCharacterAmount !== pipeCharacterAmount;
      if (hasRowDifferentPipeCharacterAmount) {
         throw new Error('Rows have different number of pipe characters');
      }
   };

   rowArray.forEach(checkPipeCharacters);
}



function checkLeadingAndTrailingPipeCharacters(rowArray: string[]) {

   const checkPipeCharacters = (row: string, index: number) => {
      const hasNoLeadingPipeCharacter = !row.startsWith('|');
      const hasNoTrailingPipeCharacter = !row.endsWith('|');

      if (hasNoLeadingPipeCharacter) {
         throw new Error(`Row ${index + 1}: Does not start with pipe character`);
      }

      if (hasNoTrailingPipeCharacter) {
         throw new Error(`Row ${index + 1}: Does not end with pipe character`);
      }
   };

   rowArray.forEach(checkPipeCharacters);
}



function checkIfMultipleRowTableHasSeparatorRow(rowArray: string[]) {
   const isMultipleRowTable = rowArray.length > 1;
   const hasSeparatorRow = (isMultipleRowTable) ? rowArray[1].match(/[^|:-]/g) === null : false;

   if (isMultipleRowTable && !hasSeparatorRow) {
      throw new Error('Row 2: Is not valid separator row');
   }
}



function validateMarkdown(markdown: string) {
   const rowArray = markdown.split('\n');

   checkLeadingAndTrailingPipeCharacters(rowArray);
   checkValidAmountOfPipeCharacters(rowArray);
   checkIfMultipleRowTableHasSeparatorRow(rowArray);
}



export {
   checkValidAmountOfPipeCharacters,
   checkLeadingAndTrailingPipeCharacters,
   checkIfMultipleRowTableHasSeparatorRow,
   validateMarkdown
};
