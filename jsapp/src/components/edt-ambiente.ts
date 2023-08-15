export enum Ambiente {
  DESENVOLVIMENTO,
  HOMOLOGACAO,
  PRODUCAO,
}

// TODO Criar mecanismo para obter ambiente do servidor
export const ambiente = location.host.includes('congressonacional.leg.br')
  ? Ambiente.PRODUCAO
  : location.host.includes('www6ghml.senado')
  ? Ambiente.HOMOLOGACAO
  : Ambiente.DESENVOLVIMENTO;
