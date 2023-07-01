import React from 'react';
import { TableTitleContent } from '../../../../../src/view/subcomponents/tableEditor/content/tableTitleContent/TableTitleContent';
import { TitleContent, ColumnAlignmentOption } from '../../../../../src/model/types';


describe('<TableTitleContent />', () => {

   beforeEach(() => {
      const titleContent: TitleContent = {
         type: 'title',
         title: 'Some Title',
         columnAlignment: 'left'
      };
      const alignment: ColumnAlignmentOption = 'left';
      cy.mount(<TableTitleContent titleContent={titleContent} alignment={alignment} />);
   });


   it('renders', () => {});


   it('is rendered with closed dialog and correct title text', () => {
      cy.get('#table-title-content-dialog-title-input').should('not.be.visible');
      cy.get('.table-title-content-title-display-button').should('have.attr', 'style');
      cy.get('.table-title-content-title-display-button').should('have.text', 'Some Title');
   });


   it('opens input dialog upon click', () => {
      cy.get('#table-title-content-dialog-title-input').should('not.be.visible');
      cy.get('.table-title-content-title-display-button').click();
      cy.get('#table-title-content-dialog-title-input').should('be.visible');
   });


   it('input dialog displays correct title text after opening dialog and after typing', () => {
      cy.get('.table-title-content-title-display-button').click();
      cy.get('#table-title-content-dialog-title-input').should('have.value', 'Some Title');
   });


   it('updates title by typing in dialog input field', () => {
      cy.get('.table-title-content-title-display-button').click();
      cy.get('#table-title-content-dialog-title-input').type('Input');
      cy.get('#table-title-content-dialog-title-input').should('have.value', 'Some TitleInput');
      cy.get('.table-title-content-title-display-button').should('have.text', 'Some TitleInput');
   });


   it('update title by hitting backspace in dialog input field', () => {
      cy.get('.table-title-content-title-display-button').click();
      cy.get('#table-title-content-dialog-title-input').should('have.value', 'Some Title');
      cy.get('.table-title-content-title-display-button').should('have.text', 'Some Title');
      cy.get('#table-title-content-dialog-title-input').type('{Backspace}');
      cy.get('#table-title-content-dialog-title-input').should('have.value', 'Some Titl');
      cy.get('.table-title-content-title-display-button').should('have.text', 'Some Titl');
   });


   it('closes dialog by clicking on close button', () => {
      cy.get('#table-title-content-dialog-title-input').should('not.be.visible');
      cy.get('.table-title-content-title-display-button').click();
      cy.get('#table-title-content-dialog-title-input').should('be.visible');
      cy.get('.table-title-content-dialog-control-close-button').click();
      cy.get('#table-title-content-dialog-title-input').should('not.be.visible');
   });


   it('updates title by typing while content element is focused', () => {
      cy.get('.table-title-content-title-display-button').focus();
      cy.get('.table-title-content-title-display-button').type('foo');
      cy.get('.table-title-content-title-display-button').should('have.text', 'Some Titlefoo');
   });


   it('update title by hitting backspace key while content element is focused', () => {
      cy.get('.table-title-content-title-display-button').should('have.text', 'Some Title');
      cy.get('.table-title-content-title-display-button').focus();
      cy.get('.table-title-content-title-display-button').type('{Backspace}');
      cy.get('.table-title-content-title-display-button').should('have.text', 'Some Titl');
   });

});
