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
const urlMpsEmTramitacao = baseUrl + '/api/proposicoesEmTramitacao-novo?carregarDatasDeMPs=true&sigla=MPV';
const urlMps2020 = baseUrl + '/api/proposicoes-novo?sigla=MPV&ano=2020&carregarDatasDeMPs=true';
const urlMpv_1179_2023 = baseUrl + '/api/proposicao/texto-json?sigla=MPV&numero=01179&ano=2023';
// const urlAbrirEmenda = baseUrl + '/api/emenda/pdf2json-novo';

Cypress.Commands.add('configurarInterceptadores', () => {
  cy.intercept('GET', urlMpsEmTramitacao, mpsEmTramitacao).as('getProposicoesEmTramitacao');
  cy.intercept('GET', urlMps2020, mps2020).as('getProposicoes2020');
  cy.intercept('GET', urlMpv_1179_2023, MPV_1179_2023).as('getMpv_1179_2023');
  // cy.intercept('POST', urlAbrirEmenda, { fixture: 'emenda_2_mpv_1179_2023.json' }).as('postAbrirEmenda');
});

Cypress.Commands.add('abrirEmenda', (payload: any) => {
  // Mock post request
  const urlAbrirEmenda = Cypress.config().baseUrl + '/api/emenda/pdf2json-novo';
  cy.intercept('POST', urlAbrirEmenda, { fixture: payload.fixtureEmendaJson }).as(payload.postAlias);

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

  cy.wait('@' + payload.postAlias);
});

Cypress.Commands.add('checarDadosAposAbrirEmenda', (payload: any) => {
  cy.fixture(payload.fixtureEmendaJson).then(emenda => {
    fnChecarTituloEmenda(payload.pdfName);
    fnChecarSituacaoEmenda(emenda);
    fnChecarTituloMpv(emenda);
    fnChecarEmentaMpv(emenda);
    fnChecarDadosEmendaAbaTexto(emenda);
    fnChecarDadosEmendaAbaJustificativa(emenda);
    fnChecarDadosEmendaAbaAutoria(emenda);
    fnChecarDadosEmendaAbaAvisos(emenda);

    if (emenda.modoEdicao !== 'emendaTextoLivre') {
      fnChecarDadosEmendaLateralComando(emenda);
      if (payload.checarMensagemRenumeracao && hasDispositivoAdicionado(emenda)) {
        fnChecarMensagemRenumeracao();
      }
    }

    // checarDadosEmendaAbaTexto
    // - checarDadosEmendasLateralComando
    // - checarDadosEmendasLateralNotas
    // checarDadosEmendaAbaJustificativa
    // checarDadosEmendaAbaAutoria
    // checarDadosEmendaAlerta
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

const fnChecarDadosEmendaAbaTexto = (emenda: any): void => {
  // Verificar modoEdicao. Testar de acordo com o modo.
  emenda.modoEdicao === 'emenda' && fnChecarDadosEmendaAbaTextoPadrao(emenda);
  emenda.modoEdicao === 'emendaOndeCouber' && fnChecarDadosEmendaAbaTextoOndeCouber(emenda);
  emenda.modoEdicao === 'emendaSubstituicaoDeTermo' && fnChecarDadosEmendaAbaTextoSubstituicaoDeTermo(emenda);
  emenda.modoEdicao === 'emendaTextoLivre' && fnChecarDadosEmendaAbaTextoTextoLivre(emenda);
};

const fnChecarDadosEmendaAbaTextoPadrao = (emenda: any): void => {
  // TODO: tornar genérico
  const rotulo = emenda.componentes[0].dispositivos.dispositivosAdicionados[0].rotulo;
  cy.get('edt-app lexml-eta-editor').find('label').contains(rotulo);

  // Verificar mensagem alerta de identificação de sufixo
  cy.get('#onmodalsufixos.mensagem.mensagem--warning').should('have.text', 'Como interpretar sufixos (-1, -2,...)?. Saiba mais');

  // Verificar a identificação do link Saiba mais e clicar nele
  cy.get('span.mensagem__fix').should('have.text', 'Saiba mais');
  cy.get('#onmodalsufixos').click();

  // Exibir a janela modal de Sufixos de posicionamento
  cy.get('#onmodalsufixos').should('be.visible');

  // Verificando o título da janela modal
  cy.get('lexml-sufixos-modal').shadow().find('sl-dialog').find('span').should('have.text', 'Sufixos de posicionamento');

  // Verificando parte do texto do parágrafo da janela modal
  cy.get('lexml-sufixos-modal').shadow().find('sl-dialog').find('div').find('p').should('contain', 'Os sufixos na numeração');

  // Verificando o clique no botão não mostrar novamente
  cy.get('lexml-sufixos-modal').shadow().find('sl-dialog').find('div.footer-container').find('sl-switch#noShowAgain').click();

  // Verificando o clique no botão fechar da janela modal
  cy.get('lexml-sufixos-modal').shadow().find('sl-dialog').find('div.footer-container').find('sl-button').click();

  // Verificar o link da lei citada no artigo 1-1 e clicar no link
  cy.get('#lx-eta-editor > .ql-tooltip > .ql-preview').click({ force: true });
};

const fnChecarDadosEmendaAbaTextoOndeCouber = (emenda: any): void => {
  fnChecarDadosEmendaAbaTextoPadrao(emenda);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fnChecarDadosEmendaAbaTextoSubstituicaoDeTermo = (emenda: any): void => {
  // TODO
};

const fnChecarDadosEmendaAbaTextoTextoLivre = (emenda: any): void => {
  cy.get('edt-app lexml-emenda sl-tab-panel[name="lexml-eta"]')
    .find('editor-texto-rico div.ql-editor')
    .then(div => {
      const innerHTML = div[0].innerHTML;
      const aux = emenda.comandoEmendaTextoLivre.texto;
      expect(innerHTML).equal(aux);
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fnChecarDadosEmendaAbaJustificativa = (emenda: any): void => {
  cy.get('#sl-tab-2').click();
  cy.get('#editor-texto-rico-justificativa-inner > .ql-editor > p').contains('É preciso consolidar na Lei de Mobilidade Urbana');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fnChecarDadosEmendaAbaAutoria = (emenda: any): void => {
  // TODO: Verificar se os campos das seções da aba estão preenchidos
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fnChecarDadosEmendaAbaAvisos = (emenda: any): void => {
  cy.get('edt-app lexml-emenda sl-tab-panel[name="avisos"] lexml-eta-alertas')
    .shadow()
    .contains(
      'Os rótulos apresentados servem apenas para o posicionamento correto do novo dispositivo no texto. Serão feitas as renumerações necessárias no momento da consolidação das emendas.'
    );
};

const hasDispositivoAdicionado = (emenda: any): boolean => {
  return emenda.componentes.some((componente: any) => componente.dispositivos.dispositivosAdicionados.length > 0);
};

const fnChecarDadosEmendaLateralComando = (emenda: any): void => {
  fnChecarComandoCabecalho(emenda);
  fnChecarComandoCitacao(emenda);
};

const fnChecarComandoCabecalho = (emenda: any): void => {
  const cabecalho = emenda.comandoEmenda.comandos[0].cabecalho;
  cy.get('edt-app lexml-emenda-comando').shadow().find('div.lexml-emenda-cabecalhoComando').contains(cabecalho);
};

const fnChecarMensagemRenumeracao = (): void => {
  cy.get('edt-app lexml-emenda-comando')
    .shadow()
    .find('div.lexml-emenda-complementoComando.mensagem.mensagem--warning')
    .contains(
      'Os dispositivos acima propostos e adjacentes deverão ser devidamente renumerados no momento da consolidação das emendas ao texto da proposição pela Redação Final.'
    );
};

const fnChecarComandoCitacao = (emenda: any): void => {
  const citacao = emenda.comandoEmenda.comandos[0].citacao;
  cy.get('edt-app lexml-emenda-comando')
    .shadow()
    .find('div.lexml-emenda-citacaoComando')
    .then(div => {
      const aux = citacao
        .replace(/<\/?[^>]*>?/g, '')
        .replaceAll(/\s+/g, ' ')
        .trim();
      const innerHTML = div[0].innerHTML
        .replace(/<\/?[^>]*>?/g, '')
        .replace(/\s+/g, ' ')
        .replace('...............................................', '')
        .trim();
      expect(innerHTML).equal(aux);
    });
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      configurarInterceptadores(): Chainable<void>;
      abrirEmenda(payload: any): Chainable<void>;
      checarDadosAposAbrirEmenda(payload: any): Chainable<void>;
    }
  }
}

// Cypress.Commands.add('exibirModalNovaEmenda', (waitProposicoes = true) => {
//   cy.window().then(win => {
//     const el = win.document.querySelector('edt-app edt-landing-page');
//     if (el) {
//       cy.contains('Selecionar Medida Provisória').click();
//     } else {
//       cy.get('edt-app > edt-menu > sl-button[title="Nova emenda"]').click();
//     }

//     waitProposicoes && cy.wait('@getProposicoesEmTramitacao');
//   });
// });

// Cypress.Commands.add('getBtnSelecionar', (): Cypress.Chainable<JQuery<HTMLElement>> => {
//   cy.get('edt-app edt-modal-nova-emenda').shadow().get('sl-button[data-cy="btnSelecionarMpv"]').as('btnSelecionarMpv').should('have.length', 1);
//   return cy.get('@btnSelecionarMpv');
//   // return cy.get('edt-app edt-modal-nova-emenda').shadow().get('sl-button[data-cy="btnSelecionarMpv"]');
// });

// Cypress.Commands.add('selecionarMPVemModalNovaEmenda', (tituloProposicao: string, pressionarBtnSelecionar = false) => {
//   if ((cy.find('edt-landing-page') as any).length) {
//     cy.contains('Selecionar Medida Provisória').click();
//   }

//   cy.get('edt-app edt-modal-nova-emenda')
//     .shadow()
//     .get('sl-dialog[label="Selecionar texto"] > div > div.table-wrap > table > tbody > tr')
//     .contains(tituloProposicao)
//     .click();

//   if (pressionarBtnSelecionar) {
//     cy.get('edt-app edt-modal-nova-emenda').shadow().get('sl-dialog[label="Selecionar texto"] > sl-button').contains('Selecionar').click();
//   }
// });

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace Cypress {
//     interface Chainable {
//       configurarInterceptadores(): Chainable<void>;
//       exibirModalNovaEmenda(waitProposicoes?: boolean): Chainable<void>;
//       selecionarMPVemModalNovaEmenda(tituloProposicao: string, pressionarBtnSelecionar?: boolean): Chainable<void>;
//       getBtnSelecionar(): Cypress.Chainable<JQuery<HTMLElement>>;
//     }
//   }
// }
