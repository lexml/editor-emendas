const isNullOrUndefined = (obj: any): boolean => {
  return obj === undefined || obj === null;
};

export const objetosIguais = (obj1: any, obj2: any): boolean => {
  if (isNullOrUndefined(obj1) && isNullOrUndefined(obj2)) {
    return true;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length > 0) {
    keys1 = keys1.sort();
  }

  if (keys2.length > 0) {
    keys2 = keys2.sort();
  }

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!objetosIguais(obj1[key], obj2[key])) {
        return false;
      }
    } else {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }

  return true;
};
