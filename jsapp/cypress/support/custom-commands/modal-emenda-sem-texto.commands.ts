/// <reference types="cypress" />

Cypress.Commands.add('getModalEmendaSemTextoDialog', (): Cypress.Chainable<JQuery<HTMLElement>> => {
  cy.get('edt-app edt-modal-emenda-sem-texto')
    .shadow()
    .find('sl-dialog[data-cy="dialog-emenda-sem-texto"]')
    .as('modalEmendaSemTextoDialog')
    .should('have.length', 1);

  return cy.get('@modalEmendaSemTextoDialog');
});

Cypress.Commands.add('getBtnEmendaSemTexto', (btnName: string): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.getModalEmendaSemTextoDialog().find(`sl-button[data-cy="btn${btnName}"]`);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getBtnEmendaSemTexto(btnName: string): Cypress.Chainable<JQuery<HTMLElement>>;
      getModalEmendaSemTextoDialog(): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Ref: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
