export const MPV_1179_2023 = {
  name: {
    namespaceURI: 'http://www.lexml.gov.br/1.0',
    localPart: 'LexML',
    prefix: '',
    key: '{http://www.lexml.gov.br/1.0}LexML',
    string: '{http://www.lexml.gov.br/1.0}LexML',
  },
  value: {
    TYPE_NAME: 'br_gov_lexml__1.LexML',
    metadado: {
      TYPE_NAME: 'br_gov_lexml__1.Metadado',
      identificacao: {
        TYPE_NAME: 'br_gov_lexml__1.Identificacao',
        urn: 'urn:lex:br:federal:medida.provisoria:2023-07-07;1179',
      },
    },
    projetoNorma: {
      TYPE_NAME: 'br_gov_lexml__1.ProjetoNorma',
      norma: {
        TYPE_NAME: 'br_gov_lexml__1.HierarchicalStructure',
        parteInicial: {
          TYPE_NAME: 'br_gov_lexml__1.ParteInicial',
          epigrafe: {
            TYPE_NAME: 'br_gov_lexml__1.GenInline',
            id: 'epigrafe',
            content: ['MEDIDA PROVISÓRIA Nº 1.179, DE 7 DE JULHO DE 2023 '],
          },
          ementa: {
            TYPE_NAME: 'br_gov_lexml__1.GenInline',
            id: 'ementa',
            content: [
              'Reabre o prazo de que trata o ',
              {
                name: {
                  namespaceURI: 'http://www.lexml.gov.br/1.0',
                  localPart: 'span',
                  prefix: '',
                  key: '{http://www.lexml.gov.br/1.0}span',
                  string: '{http://www.lexml.gov.br/1.0}span',
                },
                value: {
                  TYPE_NAME: 'br_gov_lexml__1.GenInline',
                  href: 'urn:lex:br:federal:lei:2012-01-03;12587!art24',
                  content: ['art. 24 da Lei nº 12.587, de 3 de janeiro de 2012'],
                },
              },
              ', que institui as diretrizes da Política Nacional de Mobilidade Urbana.\n',
            ],
          },
          preambulo: {
            TYPE_NAME: 'br_gov_lexml__1.TextoType',
            id: 'preambulo',
            p: [
              {
                TYPE_NAME: 'br_gov_lexml__1.GenInline',
                content: [
                  '\n    O PRESIDENTE DA REPÚBLICA, no uso da atribuição que lhe confere o art. 62 da Constituição, adota a seguinte Medida Provisória, com força de lei:\n  ',
                ],
              },
            ],
          },
        },
        articulacao: {
          TYPE_NAME: 'br_gov_lexml__1.Articulacao',
          lXhier: [
            {
              name: {
                namespaceURI: 'http://www.lexml.gov.br/1.0',
                localPart: 'Artigo',
                prefix: '',
                key: '{http://www.lexml.gov.br/1.0}Artigo',
                string: '{http://www.lexml.gov.br/1.0}Artigo',
              },
              value: {
                TYPE_NAME: 'br_gov_lexml__1.DispositivoType',
                id: 'art1',
                rotulo: 'Art. 1º',
                lXcontainersOmissis: [
                  {
                    name: {
                      namespaceURI: 'http://www.lexml.gov.br/1.0',
                      localPart: 'Caput',
                      prefix: '',
                      key: '{http://www.lexml.gov.br/1.0}Caput',
                      string: '{http://www.lexml.gov.br/1.0}Caput',
                    },
                    value: {
                      TYPE_NAME: 'br_gov_lexml__1.DispositivoType',
                      id: 'art1_cpt',
                      p: [
                        {
                          TYPE_NAME: 'br_gov_lexml__1.GenInline',
                          content: [
                            '\n    Fica reaberto o prazo para elaboração do Plano de Mobilidade Urbana de que trata o ',
                            {
                              name: {
                                namespaceURI: 'http://www.lexml.gov.br/1.0',
                                localPart: 'span',
                                prefix: '',
                                key: '{http://www.lexml.gov.br/1.0}span',
                                string: '{http://www.lexml.gov.br/1.0}span',
                              },
                              value: {
                                TYPE_NAME: 'br_gov_lexml__1.GenInline',
                                href: 'urn:lex:br:federal:lei:2012-01-03;12587!art24_par4',
                                content: ['§4º do art. 24 da Lei nº 12.587, de 3 de janeiro de 2012'],
                              },
                            },
                            ', até as seguintes datas:\n\n  ',
                          ],
                        },
                      ],
                      lXcontainersOmissis: [
                        {
                          name: {
                            namespaceURI: 'http://www.lexml.gov.br/1.0',
                            localPart: 'Inciso',
                            prefix: '',
                            key: '{http://www.lexml.gov.br/1.0}Inciso',
                            string: '{http://www.lexml.gov.br/1.0}Inciso',
                          },
                          value: {
                            TYPE_NAME: 'br_gov_lexml__1.DispositivoType',
                            id: 'art1_cpt_inc1',
                            rotulo: 'I –',
                            p: [
                              {
                                TYPE_NAME: 'br_gov_lexml__1.GenInline',
                                content: ['\n    12 de abril de 2024, para Municípios com mais de duzentos e cinquenta mil habitantes; e\n\n  '],
                              },
                            ],
                          },
                        },
                        {
                          name: {
                            namespaceURI: 'http://www.lexml.gov.br/1.0',
                            localPart: 'Inciso',
                            prefix: '',
                            key: '{http://www.lexml.gov.br/1.0}Inciso',
                            string: '{http://www.lexml.gov.br/1.0}Inciso',
                          },
                          value: {
                            TYPE_NAME: 'br_gov_lexml__1.DispositivoType',
                            id: 'art1_cpt_inc2',
                            rotulo: 'II –',
                            p: [
                              {
                                TYPE_NAME: 'br_gov_lexml__1.GenInline',
                                content: ['\n    12 de abril de 2025, para Municípios com até duzentos e cinquenta mil habitantes.\n\n  '],
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              name: {
                namespaceURI: 'http://www.lexml.gov.br/1.0',
                localPart: 'Artigo',
                prefix: '',
                key: '{http://www.lexml.gov.br/1.0}Artigo',
                string: '{http://www.lexml.gov.br/1.0}Artigo',
              },
              value: {
                TYPE_NAME: 'br_gov_lexml__1.DispositivoType',
                id: 'art2',
                rotulo: 'Art. 2º',
                lXcontainersOmissis: [
                  {
                    name: {
                      namespaceURI: 'http://www.lexml.gov.br/1.0',
                      localPart: 'Caput',
                      prefix: '',
                      key: '{http://www.lexml.gov.br/1.0}Caput',
                      string: '{http://www.lexml.gov.br/1.0}Caput',
                    },
                    value: {
                      TYPE_NAME: 'br_gov_lexml__1.DispositivoType',
                      id: 'art2_cpt',
                      p: [
                        {
                          TYPE_NAME: 'br_gov_lexml__1.GenInline',
                          content: ['\n    Esta Medida Provisória entra em vigor na data de sua publicação.\n\n  '],
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
};
