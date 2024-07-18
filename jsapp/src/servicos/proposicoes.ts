import { Proposicao } from '../model/proposicao';
import { toggleCarregando } from '../components/edt-app';

export const getProposicaoJsonix = async (sigla: string, numero: string, ano: number): Promise<any> => {
  const searchParams = new URLSearchParams({
    sigla,
    numero,
    ano: ano.toString(),
  }).toString();
  const resp = await fetch(`api/proposicao/texto-json?${searchParams}`);
  return await resp.json();
};

const buscarProposicoes = async (url: string): Promise<Proposicao[]> => {
  toggleCarregando();
  const resp = await fetch(url);
  const proposicoes = await resp.json();
  toggleCarregando();
  return proposicoes
    .map((p: any) => ({
      sigla: p.sigla,
      numero: p.numero,
      ano: p.ano,
      ementa: p.ementa,
      nomeProposicao: p.descricaoIdentificacao,
      idSdlegDocumentoItemDigital: p.idSdlegDocumentoItemDigital,
      dataPublicacao: p.dataPublicacao,
      dataLimiteRecebimentoEmendas: p.dataLimiteRecebimentoEmendas,
      labelPrazoRecebimentoEmendas: p.labelPrazoRecebimentoEmendas,
      labelTramitacao: p.labelTramitacao,
      codMateriaMigradaMATE: p.codMateriaMigradaMATE,
      tipoMateriaOrcamentaria: p.tipoMateriaOrcamentaria,
    }))
    .sort(compareProposicoesDesc);
};

export const pesquisarProposicoes = async (sigla: string, numero: string, ano: number): Promise<Proposicao[]> => {
  const searchParams = new URLSearchParams(
    numero ? { sigla, numero, ano: ano.toString(), carregarDatasDeMPs: 'true' } : { sigla, ano: ano.toString(), carregarDatasDeMPs: 'true' }
  ).toString();
  const url = `api/proposicoes?${searchParams}`;
  return buscarProposicoes(url);
};

export const pesquisarProposicoesEmTramitacao = async (sigla: string): Promise<Proposicao[]> => {
  const url = `api/proposicoesEmTramitacao?carregarDatasDeMPs=true&sigla=${sigla}`;
  return buscarProposicoes(url);
};

function compareProposicoesDesc(a: any, b: any): number {
  const s = b.ano - a.ano;
  return s || b.numero - a.numero;
}
