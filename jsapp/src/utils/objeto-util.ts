const isNullOrUndefined = (obj: any): boolean => {
  return obj === undefined || obj === null;
};

export const objetosIguais = (obj1: any, obj2: any): boolean => {
  // Verifica se ambos são objetos
  if (isNullOrUndefined(obj1) && isNullOrUndefined(obj2)) {
    return true;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  // Obtém as chaves dos objetos
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length > 0) {
    keys1 = keys1.sort();
  }

  if (keys2.length > 0) {
    keys2 = keys2.sort();
  }

  // Verifica se o número de chaves é o mesmo
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Itera sobre as chaves e compara os valores
  for (const key of keys1) {
    // Se o valor for um objeto, chama recursivamente a função de comparação
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!objetosIguais(obj1[key], obj2[key])) {
        return false;
      }
    } else {
      // Compara os valores diretamente
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }

  // Se todas as comparações passaram, os objetos são iguais
  return true;
};
