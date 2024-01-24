Cypress.Commands.add('getModalAjudaDialog', (): Cypress.Chainable<JQuery<HTMLElement>> => {
  cy.get('edt-app edt-modal-ajuda').shadow().find('sl-dialog[data-cy="dialog-ajuda"]').as('modalAjudaDialog').should('have.length', 1);
  return cy.get('@modalAjudaDialog');
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getModalAjudaDialog(): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
