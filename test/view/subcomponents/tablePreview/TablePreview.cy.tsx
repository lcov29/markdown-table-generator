import React from 'react';
import { TablePreview } from '../../../../src/view/subcomponents/tablePreview/TablePreview';


describe('<TablePreview />', () => {

   it('renders', () => {
      cy.mount(<TablePreview rowTotal={3} columnTotal={4} />);
      cy.get('thead > tr > :nth-child(4)').should('exist');
      cy.get('thead > tr > :nth-child(5)').should('not.exist');
      cy.get('tbody > :nth-child(1) > :nth-child(4)').should('exist');
      cy.get('tbody > :nth-child(1) > :nth-child(5)').should('not.exist');
      cy.get('tbody > :nth-child(2) > :nth-child(4)').should('exist');
      cy.get('tbody > :nth-child(2) > :nth-child(5)').should('not.exist');
      cy.get('tbody > :nth-child(3) > :nth-child(4)').should('not.exist');
   });

});
