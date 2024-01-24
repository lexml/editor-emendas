describe('Testando elementos da landing page', () => {
  // afterEach(() => {
  //   cy.window().then(win => {
  //     expect(win.console.error).to.have.callCount(0);
  //   });
  // });

  describe('Botão "Selecionar Medida Provisória"', () => {
    it('Click', () => {
      cy.getBtnSelecionarMpvLandingPage().click();
      cy.getModalNovaEmendaDialog();
    });
  });

  describe('Botão "Abrir emenda do seu local"', () => {
    it('Click', () => {
      cy.abrirEmenda({
        fixtureEmendaJson: 'emenda_2_mpv_1179_2023.json',
        pdfName: 'DOC-EMENDA-2---MPV-11792023-20230711.pdf',
        postAlias: 'postAbrirEmendaPadrao',
        closeModalOrientacoes: true,
      });
    });
  });

  describe('Botão "Acessar os vídeos tutoriais"', () => {
    it('Click', () => {
      cy.getBtnAcessarVideosLandingPage().click();
      cy.getModalAjudaDialog();
    });
  });
});
