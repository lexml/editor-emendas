import { getVersao } from '../servicos/info-app';

const CHAVE = 'versao';

export function getVersaoFromLocalStorage(): string {
  const versaolocalStorage = localStorage.getItem(CHAVE);
  return versaolocalStorage ? versaolocalStorage : '???';
}

function setVersao(versao: string): void {
  localStorage.setItem(CHAVE, versao);
}

export function verificaVersao(): void {
  getVersao().then(versao => {
    if (versao !== getVersaoFromLocalStorage()) {
      console.log('Atualizando para versão ' + versao);
      setVersao(versao);
      window.location.reload();
    }
  });
}
