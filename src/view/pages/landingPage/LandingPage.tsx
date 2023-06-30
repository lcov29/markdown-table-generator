import React, { ReactElement } from 'react';
import { PageId } from '../pageIdType';
import './landingPage.css';


type Props = {
   setPageId: (id: PageId) => void
};


function LandingPage(props: Props): ReactElement {
   const { setPageId } = props;

   return (
      <div className="landing-page-wrapper">
         <div className="landing-page-control-wrapper">
            <h2>Markdown Table Generator</h2>
            <button
               type="button"
               className="app-button landing-page-button"
               onClick={() => setPageId('table-dimension-input-page')}
            >
               Create New Table
            </button>
            <button
               type="button"
               className="app-button landing-page-button"
               onClick={() => setPageId('markdown-input-page')}
            >
               Edit Existing Table
            </button>
         </div>
      </div>
   );
}


export { LandingPage };
