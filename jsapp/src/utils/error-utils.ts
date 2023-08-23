/*
No caso de vários .catch em promises encadeadas, caso o primeiro falhe, todos os demais são ativados.

As funções errorInPromise e getHttpError são usadas para simplificar o processo
de repasse do primeiro erro para um último .catch sem ser sobrescrevido pelos erros de outros .catch

Exemplo:

myPromise
.catch(err => {
  // Erro 1
  return Promise.reject(errorInPromise('Msg erro 1', err));
})
.then(...)
.catch(err => {
  // Erro 2
  return getHttpError('Msg erro 2', err).then(err => Promise.reject(err));
})
.then(...)
.catcherr => {
  // Erro 3 (Não precisa de Promise.reject por ser o último)
  errorInPromise('Msg erro 3', err, minhaFuncaoDeAlerta);
});

No caso acima, caso o erro 1 seja ativado, apesar de executar os 2 outros catches,
será ativado o alerta com a mensagem do erro 1. A mensagem de erro e o erro também
são logados no console quando é passada a função de alerta.

*/

class SimpleError {
  constructor(public msg: string, public err?: string, public ignore = false) {}
}

export const errorToBeIgnored = new SimpleError('IGNORAR', undefined, true);

export function errorInPromise(
  msg: string,
  err?: any,
  alertFunction?: (msg: string) => void
): SimpleError {
  const simpleErr =
    err instanceof SimpleError
      ? (err as SimpleError)
      : new SimpleError(msg, err);

  if (alertFunction && !simpleErr.ignore) {
    console.log(simpleErr.msg);
    if (simpleErr.err && simpleErr.msg !== simpleErr.err) {
      console.error(simpleErr.err);
    }
    alertFunction(simpleErr.msg);
  }

  return simpleErr;
}

export async function getHttpError(
  response: Response,
  defaultMessage?: string,
  alertFunction?: (msg: string) => void
): Promise<SimpleError> {
  return response.text().then(text => {
    if (response.status === 400) {
      return Promise.resolve(errorInPromise(text, text, alertFunction));
    } else if (response.status === 503) {
      return Promise.resolve(
        errorInPromise(
          'Ocorreu uma falha na conexão com o servidor.',
          text,
          alertFunction
        )
      );
    }
    return Promise.resolve(
      errorInPromise(defaultMessage || text, text, alertFunction)
    );
  });
}

export function isUserAbortException(err: any): boolean {
  if (err instanceof DOMException) {
    return (
      /cancel|abort|showSaveFilePicker|showOpenFilePicker/.test(err.message) ||
      err.name === 'NotAllowedError'
    );
  }
  return false;
}
