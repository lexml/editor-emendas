import { VOCABULARIO } from './vocabulario';

export const getSigla = (urn: string): string => {
  const tipo = getTipo(urn) ?? {};

  const fnProcurarPorUrnTipoDocumento = (item: any): any =>
    item.urnTipoDocumento === tipo.urn;

  return (
    VOCABULARIO.siglas.find(fnProcurarPorUrnTipoDocumento)?.sigla ??
    VOCABULARIO.fakeUrns.find(fnProcurarPorUrnTipoDocumento)?.sigla ??
    ''
  );
};

export const getTipo = (urn: string): any => {
  const tipo = urn.replace('urn:lex:br:', '')?.split(':');
  return VOCABULARIO.tiposDocumento.filter(t => t.urn === tipo[1])[0];
};

export const getNumero = (urn: string): string => {
  const partes = urn.replace('urn:lex:br:', '')?.split(':');
  return partes[2]?.indexOf(';') > -1
    ? partes[2]?.substring(partes[2].indexOf(';') + 1)
    : '';
};

export const getAno = (urn: string): string =>
  getData(urn).split('/').slice(-1)[0];

export const getData = (urn: string): string => {
  const partes = urn.replace('urn:lex:br:', '')?.split(':');

  const dataInformada = partes[2]?.substring(0, partes[2].indexOf(';'));

  if (/\d{4}$/.test(dataInformada)) {
    return dataInformada;
  }
  const d = partes[2]
    ?.substring(0, partes[2].indexOf(';'))
    ?.split('-')
    ?.reverse();
  return d ? d.join('/') : '';
};
