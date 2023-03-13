const INTERVALO = 1000;
const INTERVALO_VERIFICACAO = 1000 * 60 * 60;
const CHAVE = 'versao';
const MAX_TENTATIVAS = 10;

export function getVersao(tentativas = 0): string {
  const versaolocalStorage = localStorage.getItem(CHAVE);
  if (versaolocalStorage === null && tentativas < MAX_TENTATIVAS) {
    setTimeout(() => getVersao(++tentativas), INTERVALO);
  }
  return versaolocalStorage ? versaolocalStorage : '';
}

export function setVersao(versao: string): void {
  localStorage.setItem(CHAVE, versao);
}

export function clearVersao(): void {
  localStorage.removeItem(CHAVE);
}

export function verificaVersao(funcaoGetVersao: () => Promise<any>): void {
  const _verificacao = (): void => {
    funcaoGetVersao().then(versao => {
      if (versao !== getVersao()) {
        window.location.reload();
      }
    });
  };

  _verificacao();

  setInterval(() => _verificacao, INTERVALO_VERIFICACAO);
}
