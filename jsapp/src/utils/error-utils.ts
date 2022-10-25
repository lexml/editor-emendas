/*
No caso de vários .catch em promises encadeadas, caso o primeiro falhe, todos os demais são ativados.

As funções handleErrorInPromise e handleHttpError in promise são usadas para simplificar o processo
de repasse do primeiro erro para um último .catch sem ativar erros de outros .catch

Exemplo:

myPromise
.catch(err => {
  // Erro 1
  // Utilize .then(Promise.reject) para o Typescript não considerar o parâmetro
  // do .then seguinte como possivelmente undefined.
  return handleHttpErrorInPromise('Msg erro 1', err).then(Promise.reject);
})
.then(...)
.catch(err => {
  // Erro 2
  return handleHttpErrorInPromise('Msg erro 2', err).then(Promise.reject);
})
.then(...)
.catcherr => {
  // Erro 3
  handleHttpErrorInPromise('Msg erro 3', err, minhaFuncaoDeAlerta });
});

No caso acima, caso o erro 1 seja ativado, apesar de executar os 2 outros catches,
será ativado o alerta com a mensagem do erro 1. A mensagem de erro e o erro também
são logados no console quando é passada a função de alerta.

*/

export interface SimpleError {
  msg: string;
  err?: string;
}

export function handleErrorInPromise(
  msg: string,
  err?: any,
  alertFunction?: (msg: string) => void
): Promise<SimpleError> {
  const simpleErr: SimpleError = err?.msg ? (err as SimpleError) : { msg, err };

  if (alertFunction) {
    if (simpleErr.msg !== simpleErr.err) {
      console.error(simpleErr.msg);
    }
    console.error(simpleErr.err);
    alertFunction(simpleErr.msg);
  }

  return Promise.reject(simpleErr);
}

export function handleHttpErrorInPromise(
  response: Response,
  defaultMessage?: string,
  alertFunction?: (msg: string) => void
): Promise<SimpleError> {
  return response.text().then(text => {
    if (response.status === 400) {
      return handleErrorInPromise(text, text, alertFunction);
    } else if (response.status === 503) {
      return handleErrorInPromise(
        'Ocorreu uma falha na conexão com o servidor.',
        text,
        alertFunction
      );
    }
    return handleErrorInPromise(defaultMessage || text, text, alertFunction);
  });
}
