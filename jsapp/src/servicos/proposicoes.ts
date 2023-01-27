import { Proposicao } from '../model/proposicao';

export const getProposicaoJsonix = async (
  sigla: string,
  numero: string,
  ano: number
): Promise<any> => {
  const searchParams = new URLSearchParams({
    sigla,
    numero,
    ano: ano.toString(),
  }).toString();
  const resp = await fetch('api/proposicao/texto-json?' + searchParams);
  return await resp.json();
};

export const pesquisarProposicoes = async (
  sigla: string,
  numero: string,
  ano: number
): Promise<Proposicao[]> => {
  const searchParams = new URLSearchParams(
    numero
      ? { sigla, numero, ano: ano.toString() }
      : { sigla, ano: ano.toString() }
  ).toString();
  const resp = await fetch('api/proposicoes?' + searchParams);
  const proposicoes = await resp.json();
  return proposicoes
    .map((p: any) => ({
      sigla: p.sigla,
      numero: p.numero,
      ano: p.ano,
      ementa: p.ementa,
      nomeProposicao: p.sigla + ' ' + p.numero + '/' + p.ano,
      idSdlegDocumentoItemDigital: p.idSdlegDocumentoItemDigital,
    }))
    .sort(compareProposicoesDesc);
};

function compareProposicoesDesc(a: any, b: any): number {
  const s = b.ano - a.ano;
  return s ? s : b.numero - a.numero;
}

export const pesquisarProposicoesEmTramitacao = async (
  sigla: string
): Promise<Proposicao[]> => {
  const resp = await fetch('api/proposicoesEmTramitacao?sigla=' + sigla);
  const proposicoes = await resp.json();
  return proposicoes
    .map((p: any) => ({
      sigla: p.sigla,
      numero: p.numero,
      ano: p.ano,
      ementa: p.ementa,
      nomeProposicao: p.sigla + ' ' + p.numero + '/' + p.ano,
      idSdlegDocumentoItemDigital: p.idSdlegDocumentoItemDigital,
    }))
    .sort(compareProposicoesDesc);
};
