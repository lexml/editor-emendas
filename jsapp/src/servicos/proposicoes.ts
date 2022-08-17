import { Proposicao } from '../model/Proposicao';

export const getProposicaoJsonix = async (
  sigla: string,
  numero: string,
  ano: number
): Promise<any> => {
  const url = new URL(
    'https://emendas-api.herokuapp.com/proposicao/texto-lexml/json'
  );
  url.search = new URLSearchParams({
    sigla,
    numero,
    ano: ano.toString(),
  }).toString();
  const resp = await fetch(url);
  return await resp.json();
};

export const pesquisarProposicoes = async (
  sigla: string,
  numero: string,
  ano: number
): Promise<Proposicao[]> => {
  const url = new URL('https://emendas-api.herokuapp.com/proposicoes');
  url.search = new URLSearchParams(
    numero
      ? { sigla, numero, ano: ano.toString() }
      : { sigla, ano: ano.toString() }
  ).toString();
  const resp = await fetch(url);
  const proposicoes = await resp.json();
  return proposicoes.map((p: any) => ({
    sigla: p.sigla,
    numero: p.numero,
    ano: p.ano,
    ementa: p.ementa,
    nomeProposicao: p.sigla + ' ' + p.numero + '/' + p.ano,
  }));
};
