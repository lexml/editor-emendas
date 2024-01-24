describe('Testando nova emenda from Landing Page', () => {
  describe('Nova emenda para MPV 1179/2023', () => {
    it('Deveria exibir editor com texto da MPV 1179/2023', () => {
      cy.exibirModalNovaEmenda();
      cy.getProposicoesTable().find('tbody > tr > td').contains('MPV 1179/2023').click();
      cy.getBtnSelecionar().click();
      cy.wait('@getMpv_1179_2023').its('response.statusCode').should('eq', 200);

      // Deveria exibir div com título da MPV 1179/2023 e ementa
      cy.get('edt-app div.detalhe-emenda sl-tag.detalhe-emenda--nome-proposicao').should('be.visible');
      cy.get('edt-app div.detalhe-emenda span.detalhe-emenda--ementa').should('be.visible');

      // Deveria exibir editor com texto estruturado da MPV 1179/2023
      cy.get('edt-app lexml-emenda lexml-eta p')
        .contains('Fica reaberto o prazo para elaboração do Plano de Mobilidade Urbana de que trata o')
        .should('exist');

      // Deveria exibir modal com orientações essenciais
      cy.get('edt-app edt-modal-orientacoes')
        .shadow()
        .find('sl-dialog[label*="Elementos do Editor de Emendas"] > div.wizard-content')
        .should('be.visible');

      cy.getBtnModalOrientacoes('Fechar').click();
    });
  });

  describe('Nova emenda para MPV 923/2020', () => {
    it('Deveria exibir editor no modo "Texto Livre" para MPV 923/2020', () => {
      cy.exibirModalNovaEmenda();
      cy.listarProposicoes2020();
      cy.selecionarMPVemModalNovaEmenda('MPV 923/2020');
      cy.getBtnSelecionar().click();

      cy.getModalEmendaSemTextoDialog().find('span[slot="label"]').contains('MPV 923/2020').should('be.visible');
      cy.getBtnEmendaSemTexto('OndeCouber').should('have.length', 1).click();

      // Deveria exibir div com título da MPV 923/2020 e ementa
      cy.get('edt-app div.detalhe-emenda sl-tag.detalhe-emenda--nome-proposicao').should('be.visible');
      cy.get('edt-app div.detalhe-emenda span.detalhe-emenda--ementa').should('be.visible');

      // Deveria exibir editor no modo "Onde couber" para a MPV 923/2020
      cy.get('edt-app lexml-emenda').then(le => {
        const lexmlEmenda = le[0] as any;
        const emenda = lexmlEmenda.getEmenda();
        expect(emenda.modoEdicao).equal('emendaArtigoOndeCouber');
      });
    });
  });
});
