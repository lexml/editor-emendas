export const getProposicaoJsonix = async (
  sigla: string,
  numero: string,
  ano: number
): Promise<any> => {
  const resp = await fetch(
    `https://emendas-api.herokuapp.com/proposicao/texto-lexml/json?sigla=${sigla}&numero=${numero}&ano=${ano}`
  );
  return await resp.json();
};
