import React from 'react';
import { TableTextContent } from '../../../../../src/view/subcomponents/tableEditor/content/tableTextContent/TableTextContent';
import { TextContent } from '../../../../../src/model/types';


describe('<TableTextContent />', () => {

   beforeEach(() => {
      const textContent: TextContent = {
         type: 'text',
         text: 'Text Input',
         isLink: false,
         href: 'https://domain.com',
         target: '_blank',
         title: 'Text Title'
      };
      cy.mount(
         <TableTextContent
            textContent={textContent}
            alignment="left"
            deleteFromInternalTable={() => {}}
            triggerRerender={() => {}}
            showDialogOnInitialRender={false}
            focusTextDisplayOnInitialRender={false}
         />
      );
   });


   it('renders', () => { });


   it('is rendered with closed dialog and correct text', () => {
      cy.get('#table-text-content-dialog-text-input').should('not.be.visible');
      cy.get('.table-text-content-text-display-button').should('have.text', 'Text Input');
   });


   it('opens input dialog upon click on control button', () => {
      cy.get('#table-text-content-dialog-text-input').should('not.be.visible');
      cy.get('.table-text-content-text-display-button').click();
      cy.get('#table-text-content-dialog-text-input').should('be.visible');
   });


   it('closes open input dialog with click on close button', () => {
      cy.get('.table-text-content-text-display-button').click();
      cy.get('#table-text-content-dialog-text-input').should('be.visible');
      cy.get('.table-text-content-dialog-control-close-button').click();
      cy.get('#table-text-content-dialog-text-input').should('not.be.visible');
   });


   it('dialog displays correct initial content', () => {
      cy.get('.table-text-content-text-display-button').click();
      cy.get('#table-text-content-dialog-text-input').should('have.value', 'Text Input');
      cy.get('#table-text-content-dialog-link-input').should('not.be.checked');
   });


   it('updates text by typing while content element is focused', () => {
      cy.get('.table-text-content-text-display-button').focus();
      cy.get('.table-text-content-text-display-button').should('have.text', 'Text Input');
      cy.get('.table-text-content-text-display-button').type(' Type');
      cy.get('.table-text-content-text-display-button').should('have.text', 'Text Input Type');
   });


   it('updates text by typing in dialog input', () => {
      cy.get('.table-text-content-text-display-button').click();
      cy.get('#table-text-content-dialog-text-input').type(' Type');
      cy.get('#table-text-content-dialog-text-input').should('have.value', 'Text Input Type');
      cy.get('.table-text-content-text-display-button').should('have.text', 'Text Input Type');
   });


   it('updates text by typing in dialog input', () => {
      cy.get('.table-text-content-text-display-button').click();
      cy.get('#table-text-content-dialog-text-input').type(' Type');
      cy.get('#table-text-content-dialog-text-input').should('have.value', 'Text Input Type');
      cy.get('.table-text-content-text-display-button').should('have.text', 'Text Input Type');
   });


   it('displays link input upon checkbox click', () => {
      cy.get('.table-text-content-text-display-button').click();
      cy.get('#table-text-content-dialog-href-input').should('not.exist');
      cy.get('#table-text-content-dialog-link-input').click();
      cy.get('#table-text-content-dialog-href-input').should('exist');
   });


   it('displays correct content of link input', () => {
      cy.get('.table-text-content-text-display-button').click();
      cy.get('#table-text-content-dialog-link-input').click();
      cy.get('#table-text-content-dialog-href-input').should('have.value', 'https://domain.com');
      cy.get('#table-text-content-dialog-target-input').should('have.value', '_blank');
      cy.get('#table-text-content-dialog-title-input').should('have.value', 'Text Title');
   });

});
