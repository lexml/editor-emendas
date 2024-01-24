/// <reference types="cypress" />

Cypress.Commands.add('exibirModalNovaEmenda', (waitProposicoes = true) => {
  cy.window().then(win => {
    const el = win.document.querySelector('edt-app edt-landing-page');
    if (el) {
      cy.contains('Selecionar Medida Provisória').click();
    } else {
      cy.get('edt-app > edt-menu > sl-button[title="Nova emenda"]').click();
    }

    waitProposicoes && cy.wait('@getProposicoesEmTramitacao');
  });
});

Cypress.Commands.add('getBtnSelecionar', (): Cypress.Chainable<JQuery<HTMLElement>> => {
  cy.get('edt-app edt-modal-nova-emenda').shadow().find('sl-button[data-cy="btnSelecionarMpv"]').as('btnSelecionarMpv').should('have.length', 1);
  return cy.get('@btnSelecionarMpv');
  // return cy.get('edt-app edt-modal-nova-emenda').shadow().get('sl-button[data-cy="btnSelecionarMpv"]');
});

Cypress.Commands.add('getModalNovaEmendaDialog', (): Cypress.Chainable<JQuery<HTMLElement>> => {
  cy.get('edt-app edt-modal-nova-emenda')
    .shadow()
    .find('sl-dialog[data-cy="dialog-nova-emenda"]')
    .as('modalNovaEmendaDialog')
    .should('have.length', 1);
  return cy.get('@modalNovaEmendaDialog');
});

Cypress.Commands.add('getProposicoesTable', (): Cypress.Chainable<JQuery<HTMLElement>> => {
  cy.getModalNovaEmendaDialog().find('div.table-wrap > table').as('proposicoesTable').should('have.length', 1);
  return cy.getModalNovaEmendaDialog().find('div.table-wrap > table');
});

Cypress.Commands.add('listarProposicoes2020', () => {
  cy.getModalNovaEmendaDialog().find('sl-input.ano-proposicao').invoke('val', '2020').trigger('input');
  cy.getModalNovaEmendaDialog().find('#pesquisarButton').click();
  cy.wait('@getProposicoes2020').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('selecionarMPVemModalNovaEmenda', (tituloProposicao: string, pressionarBtnSelecionar = false) => {
  cy.getProposicoesTable().find('tbody > tr').contains(tituloProposicao).click();

  if (pressionarBtnSelecionar) {
    cy.getModalNovaEmendaDialog().find('sl-button').contains('Selecionar').click();
  }
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      configurarInterceptadores(): Chainable<void>;
      exibirModalNovaEmenda(waitProposicoes?: boolean): Chainable<void>;
      selecionarMPVemModalNovaEmenda(tituloProposicao: string, pressionarBtnSelecionar?: boolean): Chainable<void>;
      getBtnSelecionar(): Cypress.Chainable<JQuery<HTMLElement>>;
      getModalNovaEmendaDialog(): Cypress.Chainable<JQuery<HTMLElement>>;
      getProposicoesTable(): Cypress.Chainable<JQuery<HTMLElement>>;
      listarProposicoes2020(): Chainable<void>;
    }
  }
}

// Ref: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
