import { Ambiente, ambiente } from './../components/edt-ambiente';
import { Proposicao } from '../model/proposicao';
import { toggleCarregando } from '../components/edt-app';

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
  toggleCarregando();
  const searchParams = new URLSearchParams(
    numero
      ? { sigla, numero, ano: ano.toString(), carregarDatasDeMPs: 'true' }
      : { sigla, ano: ano.toString(), carregarDatasDeMPs: 'true' }
  ).toString();
  const resp = await fetch('api/proposicoes-novo?' + searchParams);
  const proposicoes = await resp.json();
  toggleCarregando();
  return proposicoes
    .map((p: any) => ({
      sigla: p.sigla,
      numero: p.numero,
      ano: p.ano,
      ementa: p.ementa,
      nomeProposicao: p.sigla + ' ' + p.numero + '/' + p.ano,
      idSdlegDocumentoItemDigital: p.idSdlegDocumentoItemDigital,
      dataPublicacao: p.dataPublicacao,
      dataLimiteRecebimentoEmendas: p.dataLimiteRecebimentoEmendas,
      labelPrazoRecebimentoEmendas: p.labelPrazoRecebimentoEmendas,
      labelTramitacao: p.labelTramitacao,
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
  toggleCarregando();
  const resp = await fetch(
    'api/proposicoesEmTramitacao-novo?carregarDatasDeMPs=true&sigla=' + sigla
  );
  const proposicoes = await resp.json();
  toggleCarregando();
  return proposicoes
    .map((p: any) => ({
      sigla: p.sigla,
      numero: p.numero,
      ano: p.ano,
      ementa: p.ementa,
      nomeProposicao: p.sigla + ' ' + p.numero + '/' + p.ano,
      idSdlegDocumentoItemDigital: p.idSdlegDocumentoItemDigital,
      dataPublicacao: p.dataPublicacao,
      dataLimiteRecebimentoEmendas: p.dataLimiteRecebimentoEmendas,
      labelPrazoRecebimentoEmendas: p.labelPrazoRecebimentoEmendas,
      labelTramitacao: p.labelTramitacao,
    }))
    .sort(compareProposicoesDesc);
};

export const sendEmailMotivoEmendaTextoLivre = (motivo: string): void => {
  if (ambiente === Ambiente.PRODUCAO) {
    fetch('api/motivo-emenda-texo-livre', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ motivo }),
    });
  }
};
