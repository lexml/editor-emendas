import { Proposicao } from '../model/proposicao';

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
  const searchParams = new URLSearchParams(
    numero
      ? { sigla, numero, ano: ano.toString() }
      : { sigla, ano: ano.toString() }
  ).toString();
  const resp = await fetch('api/proposicoes?' + searchParams);
  const proposicoes = await resp.json();
  return proposicoes.map((p: any) => ({
    sigla: p.sigla,
    numero: p.numero,
    ano: p.ano,
    ementa: p.ementa,
    nomeProposicao: p.sigla + ' ' + p.numero + '/' + p.ano,
  }));
};
