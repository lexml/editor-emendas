describe('Abrir emenda', () => {
  describe('From landing page', () => {
    it('Emenda padrão', () => {
      cy.abrirEmenda({
        fixtureEmendaJson: 'emenda_2_mpv_1179_2023.json',
        pdfName: 'DOC-EMENDA-2---MPV-11792023-20230711.pdf',
        postAlias: 'postAbrirEmendaPadrao',
        closeModalOrientacoes: true,
      });

      cy.checarDadosAposAbrirEmenda({
        fixtureEmendaJson: 'emenda_2_mpv_1179_2023.json',
        pdfName: 'DOC-EMENDA-2---MPV-11792023-20230711.pdf',
        checarMensagemRenumeracao: true,
      });
    });

    // it('Emenda onde couber', () => {
    //   expect(false).to.be.true;
    // });
    // it('Emenda substituição de termo', () => {
    //   expect(false).to.be.true;
    // });
    it('Emenda texto livre', () => {
      cy.abrirEmenda({
        fixtureEmendaJson: 'emenda_14_mpv_1179_2023.json',
        pdfName: 'DOC-EMENDA-14---MPV-11792023-20230711.pdf',
        postAlias: 'postAbrirEmendaTextoLivre',
        closeModalOrientacoes: false,
      });
    });
  });

  // describe('From menu', () => {
  //   it('Emenda padrão', () => {
  //     expect(false).to.be.true;
  //   });
  //   it('Emenda onde couber', () => {
  //     expect(false).to.be.true;
  //   });
  //   it('Emenda substituição de termo', () => {
  //     expect(false).to.be.true;
  //   });
  //   it('Emenda texto livre', () => {
  //     expect(false).to.be.true;
  //   });
  // });
});
