Cypress.Commands.add('getBtnSelecionarMpvLandingPage', (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('button[data-cy="btnSelecionarMpvLandingPage"]');
});

Cypress.Commands.add('getBtnAbrirEmendaLandingPage', (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('button[data-cy="btnAbrirEmendaLandingPage"]');
});

Cypress.Commands.add('getBtnAcessarVideosLandingPage', (): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get('button[data-cy="btnAcessarVideosLandingPage"]');
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getBtnSelecionarMpvLandingPage(): Cypress.Chainable<JQuery<HTMLElement>>;
      getBtnAbrirEmendaLandingPage(): Cypress.Chainable<JQuery<HTMLElement>>;
      getBtnAcessarVideosLandingPage(): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
