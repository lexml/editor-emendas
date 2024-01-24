/// <reference types="cypress" />

Cypress.Commands.add('getModalOrientacoesDialog', (): Cypress.Chainable<JQuery<HTMLElement>> => {
  cy.get('edt-app edt-modal-orientacoes')
    .shadow()
    .find('sl-dialog[label*="Elementos do Editor de Emendas"]')
    .as('modalOrientacoesDialog')
    .should('have.length', 1);
  return cy.get('@modalOrientacoesDialog');
});

Cypress.Commands.add('getBtnModalOrientacoes', (btnName: string): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.getModalOrientacoesDialog().find(`sl-button[data-cy="btn${btnName}"]`);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getBtnModalOrientacoes(btnName: string): Cypress.Chainable<JQuery<HTMLElement>>;
      getModalOrientacoesDialog(): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
