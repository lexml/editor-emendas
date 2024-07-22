/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import './custom-commands/modal-nova-emenda.commands';
import './custom-commands/modal-emenda-sem-texto.commands';
import './custom-commands/landing-page.commands';
import './custom-commands/modal-ajuda.commands';
import './custom-commands/modal-orientacoes.commands';

import { mpsEmTramitacao } from '../fixtures/mps-em-tramitacao';
import { mps2020 } from '../fixtures/mps-2020';
import { MPV_1179_2023 } from '../fixtures/mpv-1179-2023';

const baseUrl = Cypress.config().baseUrl; // 'https://www3.congressonacional.leg.br/editor-emendas' ou 'http://localhost:8000'
const urlMpsEmTramitacao = baseUrl + '/api/proposicoesEmTramitacao?carregarDatasDeMPs=true&sigla=MPV';
const urlMps2020 = baseUrl + '/api/proposicoes?sigla=MPV&ano=2020&carregarDatasDeMPs=true';
const urlMpv_1179_2023 = baseUrl + '/api/proposicao/texto-json?sigla=MPV&numero=01179&ano=2023';
const urlParlamentares = baseUrl + '/api/parlamentares';
// const urlAbrirEmenda = baseUrl + '/api/emenda/pdf2json-novo';

Cypress.Commands.add('configurarInterceptadores', () => {
  cy.intercept('GET', urlMpsEmTramitacao, mpsEmTramitacao).as('getProposicoesEmTramitacao');
  cy.intercept('GET', urlMps2020, mps2020).as('getProposicoes2020');
  cy.intercept('GET', urlParlamentares, { fixture: 'parlamentares.json' }).as('getParlamentares');
  cy.intercept('GET', urlMpv_1179_2023, MPV_1179_2023).as('getMpv_1179_2023');
  // cy.intercept('POST', urlAbrirEmenda, { fixture: 'emenda_2_mpv_1179_2023.json' }).as('postAbrirEmenda');
});

Cypress.Commands.add('ignorarErro', (text: string) => {
  Cypress.on('uncaught:exception', err => {
    if (err.message.includes(text)) {
      console.log('ERRO IGNORADO:', text);
      return false;
    }
  });
});

Cypress.Commands.add('abrirEmenda', (payload: any) => {
  const postAlias = 'postAbrirEmenda';
  // Mock post request
  const urlAbrirEmenda = Cypress.config().baseUrl + '/api/emenda/pdf2json';
  cy.intercept('POST', urlAbrirEmenda, { fixture: payload.fixtureEmendaJson }).as(postAlias);

  // Mock showOpenFilePicker
  cy.window().then(win => {
    const file = { name: payload.pdfName };
    const fileHandle = { getFile: (cy.stub().resolves(file) as any).as('getFile') };
    cy.stub(win as any, 'showOpenFilePicker').resolves([fileHandle]);
  });

  cy.getBtnAbrirEmendaLandingPage().should('have.length', 1).click();
  cy.get('@getFile').should('be.called');
  payload.closeModalOrientacoes && cy.getBtnModalOrientacoes('Fechar').click();
  // cy.window().then(win => {
  //   expect(win.console.error).to.have.callCount(0);
  // });

  cy.wait('@' + postAlias);
});

Cypress.Commands.add('checarDadosAposAbrirEmenda', (payload: any) => {
  cy.fixture(payload.fixtureEmendaJson).then(emenda => {
    fnChecarTituloEmenda(payload.pdfName);
    fnChecarSituacaoEmenda(emenda);
    fnChecarTituloMpv(emenda);
    fnChecarEmentaMpv(emenda);
  });
});

const fnChecarTituloEmenda = (pdfName = ''): void => {
  cy.get('edt-app')
    .find('div.titulo-editor')
    .contains(pdfName.replace(/\.pdf$/, ''));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fnChecarSituacaoEmenda = (emenda: any): void => {
  // TODO: situação está com erro
};

const fnChecarTituloMpv = (emenda: any): void => {
  const pr = emenda.proposicao;
  cy.get('edt-app div.detalhe-emenda sl-tag.detalhe-emenda--nome-proposicao').contains(`${pr.sigla} ${pr.numero}/${pr.ano}`);
};

const fnChecarEmentaMpv = (emenda: any): void => {
  cy.get('edt-app div.detalhe-emenda span.detalhe-emenda--ementa').contains(emenda.proposicao.ementa);
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      configurarInterceptadores(): Chainable<void>;
      ignorarErro(text: string): void;
      abrirEmenda(payload: any): Chainable<void>;
      checarDadosAposAbrirEmenda(payload: any): Chainable<void>;
    }
  }
}
