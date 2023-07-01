/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { TableEmptyContent } from '../../../../../src/view/subcomponents/tableEditor/content/tableEmptyContent/TableEmptyContent';


describe('<TableEmptyContent />', () => {

   beforeEach(() => {
      cy.mount(
         <TableEmptyContent
            position={{ rowIndex: 1, columnIndex: 3 }}
            alignment="center"
            updateInternalModel={(position, content) => {}}
            deleteFromInternalTable={() => {}}
            triggerRerender={() => {}}
         />
      );
   });


   it('renders', () => { });


   it('show dialog upon click on content', () => {
      cy.get('.table-empty-content-dialog-button-wrapper').should('not.be.visible');
      cy.get('.table-empty-content-add-button').click();
      cy.get('.table-empty-content-dialog-button-wrapper').should('be.visible');
   });


   it('add text content', () => {
      cy.get('.table-empty-content-add-button').click();
      cy.get('.table-empty-content-dialog-button-wrapper > :nth-child(1)').click();
      cy.get('#table-text-content-dialog-text-input').should('exist');
   });


   it('add image content', () => {
      cy.get('.table-empty-content-add-button').click();
      cy.get('.table-empty-content-dialog-button-wrapper > :nth-child(2)').click();
      cy.get('#table-image-content-dialog-src-input').should('exist');
   });

});
