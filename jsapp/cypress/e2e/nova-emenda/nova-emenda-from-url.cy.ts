import { mpsEmTramitacao } from '../../fixtures/mps-em-tramitacao';

describe('Testando nova emenda from URL', () => {
  const interceptarBuscaProposicao = (numero: string, ano: number, proposicao: any): void => {
    cy.intercept('GET', `**/api/proposicoes?sigla=MPV&numero=${numero}&ano=${ano}&carregarDatasDeMPs=true`, [proposicao]).as(
      `getProposicaoMpv_${numero}_${ano}`
    );
  };

  it('Deveria abrir o editor e limpar os parametros da URL para MPV com texto disponivel', () => {
    const proposicao = mpsEmTramitacao.find(mp => mp.descricaoIdentificacao === 'MPV 1179/2023')!;
    interceptarBuscaProposicao('1179', 2023, proposicao);

    cy.visit('/?acao=nova-emenda&sigla=MPV&numero=1179&ano=2023');

    cy.wait('@getProposicaoMpv_1179_2023').its('response.statusCode').should('eq', 200);
    cy.wait('@getMpv_1179_2023').its('response.statusCode').should('eq', 200);
    cy.location('search').should('eq', '');
    cy.get('edt-app div.detalhe-emenda sl-tag.detalhe-emenda--nome-proposicao').contains('MPV 1179/2023').should('be.visible');
    cy.get('edt-app lexml-emenda lexml-eta p').contains('Fica reaberto o prazo').should('exist');
  });

  it('Deveria abrir o modal de texto indisponivel e limpar os parametros da URL para MPV sem texto', () => {
    const proposicao = {
      descricaoIdentificacao: 'MPV 1334/2026',
      sigla: 'MPV',
      numero: '01334',
      ano: 2026,
      ementa:
        'Altera a Lei nº 11.738, de 16 de julho de 2008, para dispor sobre o piso salarial profissional nacional para os profissionais do magistério público da educação básica.',
      idSdlegDocumentoItemDigital: null,
      labelPrazoRecebimentoEmendas: 'encerrado',
      labelTramitacao: '',
    };
    interceptarBuscaProposicao('1334', 2026, proposicao);

    cy.visit('/?acao=nova-emenda&sigla=MPV&numero=1334&ano=2026');

    cy.wait('@getProposicaoMpv_1334_2026').its('response.statusCode').should('eq', 200);
    cy.location('search').should('eq', '');
    cy.getModalEmendaSemTextoDialog().find('span[slot="label"]').contains('MPV 1334/2026').should('be.visible');
    cy.getBtnEmendaSemTexto('OndeCouber').should('have.length', 1);
    cy.getBtnEmendaSemTexto('SubstituicaoTermo').should('have.length', 1);
    cy.getBtnEmendaSemTexto('TextoLivre').should('have.length', 1);
  });
});
