/**
 * Parâmetros de inicialização de edição de documento
 */
export class LexmlEmendaParametrosEdicao {
  modo = 'Emenda';

  // Identificação da proposição (texto) emendado.
  // Opcional se for informada a emenda ou o projetoNorma
  proposicao?: {
    sigla: string;
    numero: string;
    ano: string;
    ementa: string;
  };

  // Preenchido automaticamente se for informada a emenda ou o projetoNorma
  ementa = '';

  // Indicação de matéria orçamentária. Utilizado inicalmente para definir destino de emenda a MP
  isMateriaOrcamentaria = false;

  // Texto json da proposição para emenda ou edição estruturada (modo 'emenda' ou 'edicao')
  // Obrigatório para modo 'emenda'
  // Opcional para modo 'edicao'
  projetoNorma?: any;

  // Emenda a ser aberta para edição
  emenda?: any;

  // Motivo de uma nova emenda de texto livre
  // Preenchido automaticamente se for informada a emenda
  motivo = '';

  // Identificação do usuário para registro de marcas de revisão
  usuario?: any;

  // Preferências de usuário ----

  // Autoria padrão
  autoriaPadrao?: { identificacao: string; siglaCasaLegislativa: 'SF' | 'CD' };

  // Opções de impressão padrão
  opcoesImpressaoPadrao?: {
    imprimirBrasao: boolean;
    textoCabecalho: string;
    tamanhoFonte: number;
  };
}
