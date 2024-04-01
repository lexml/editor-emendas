describe('Abrir emenda', () => {
  describe('From landing page', () => {
    it.only('Emenda padrão', () => {
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

      // // TODO: Testar Título da emenda
      // // TODO: Testar Status da emenda (sem alterações)
      // // TODO: Testar Título da MPV
      // // TODO: Testar preenchimentos de todas as abas do lexml-emenda

      // cy.get('edt-app lexml-emenda-comando')
      //   .shadow()
      //   .find('div.lexml-emenda-cabecalhoComando')
      //   .contains('Acrescente-se art. 1º-1 à Medida Provisória, com a seguinte redação:');

      // cy.get('edt-app lexml-emenda-comando')
      //   .shadow()
      //   .find('div.lexml-emenda-citacaoComando > p')
      //   .contains('A Lei nº 12.587, de 3 de janeiro de 2012, passa a vigorar com as seguintes alterações:');

      // cy.get('edt-app lexml-eta-editor')
      //   .find('label')
      //   .contains('Art. 1º-1')
      //   .closest('lexml-emenda')
      //   .then(le => {
      //     const lexmlEmenda = le[0] as any;
      //     const emenda = lexmlEmenda.getEmenda();
      //     expect(emenda.componentes[0].dispositivos.dispositivosAdicionados.length).equal(1);
      //   });
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
