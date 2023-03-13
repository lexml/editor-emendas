export const getVersao = async (): Promise<any> => {
  const resp = await fetch('api/versao');
  return await resp.text();
};
