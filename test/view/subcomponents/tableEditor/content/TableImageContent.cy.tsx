import React from 'react';
import { TableImageContent } from '../../../../../src/view/subcomponents/tableEditor/content/tableImageContent/TableImageContent';
import { ImageContent } from '../../../../../src/model/types';


describe('<TableImageContent />', () => {

   beforeEach(() => {
      const imageContent: ImageContent = {
         type: 'image',
         src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
         alt: 'Alt',
         width: '40',
         height: '40',
         title: 'Title',
         isLink: false,
         href: 'https://www.typescriptlang.org/docs/',
         target: '_parent'
      };
      cy.mount(
         <TableImageContent
            imageContent={imageContent}
            alignment="center"
            deleteFromInternalTable={() => {}}
            triggerRerender={() => {}}
         />
      );
   });


   it('renders', () => { });


   it('displays img', () => {
      cy.get('img').should('exist');
   });


   it('hides dialog on initial render', () => {
      cy.get('.table-image-content-dialog').should('not.be.visible');
   });


   it('displays dialog on initial render if component parameter is set', () => {
      const imageContent: ImageContent = {
         type: 'image',
         src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
         alt: 'Alt',
         width: '40',
         height: '40',
         title: 'Title',
         isLink: false,
         href: 'https://www.typescriptlang.org/docs/',
         target: '_parent'
      };
      cy.mount(
         <TableImageContent
            imageContent={imageContent}
            alignment="center"
            deleteFromInternalTable={() => {}}
            triggerRerender={() => {}}
            showDialogOnInitialRender
         />
      );
      cy.get('.table-image-content-dialog').should('be.visible');
   });


   it('displays dialog on control click', () => {
      cy.get('.table-image-content-dialog').should('not.be.visible');
      cy.get('.table-image-content-text-display-button').click();
      cy.get('.table-image-content-dialog').should('be.visible');
   });


   it('displays initial content in dialog', () => {
      cy.get('.table-image-content-text-display-button').click();
      cy.get('#table-image-content-dialog-src-input').should('have.value', 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg');
      cy.get('#table-image-content-dialog-alt-input').should('have.value', 'Alt');
      cy.get('#table-image-content-dialog-title-input').should('have.value', 'Title');
      cy.get('#table-image-content-dialog-width-input').should('have.value', '40');
      cy.get('#table-image-content-dialog-height-input').should('have.value', '40');
   });


   it('show link inputs on link click', () => {
      cy.get('.table-image-content-text-display-button').click();
      cy.get('#table-image-content-dialog-href-input').should('not.exist');
      cy.get('#table-image-content-dialog-link-input').click();
      cy.get('#table-image-content-dialog-href-input').should('exist');
      cy.get('#table-image-content-dialog-href-input').should('have.value', 'https://www.typescriptlang.org/docs/');
   });


   it('close dialog by clicking on close button', () => {
      cy.get('.table-image-content-dialog').should('not.be.visible');
      cy.get('.table-image-content-text-display-button').click();
      cy.get('.table-image-content-dialog').should('be.visible');
      cy.get('.table-image-content-dialog-control-close-button').click();
      cy.get('.table-image-content-dialog').should('not.be.visible');
   });

});
