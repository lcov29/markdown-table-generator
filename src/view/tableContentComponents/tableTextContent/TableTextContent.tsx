import React, { useState, ReactElement } from 'react';
import { TextContent, TablePosition, ColumnAlignmentOption } from '../../../model/types';


type Props = {
   position: TablePosition,
   textContent: TextContent,
   textAlignment: ColumnAlignmentOption,
   updateInternalModel: (position: TablePosition, text: string) => void
};


function TableTextContent(props: Props): ReactElement {
   const { position, textContent, textAlignment, updateInternalModel } = props;
   const [textInput, setTextInput] = useState(textContent.text);

   return (
      <input
         type="text"
         style={{ border: 'none', textAlign: `${textAlignment}` }}
         value={textInput}
         onChange={(e) => setTextInput(e.target.value)}
         onBlur={() => { updateInternalModel(position, textInput); }}
      />
   );
}


export { TableTextContent };
