export const getUrn = (projetoNorma: any): string => {
  return projetoNorma?.value?.metadado?.identificacao?.urn;
};

const montaReferencia = (value: any): string => {
  return `<a href="${value.href}"> ${value.content[0]} </a>`;
};

export const buildContent = (content: any): string => {
  let texto = '';
  content?.forEach((element: any) => {
    if (element.value) {
      texto += montaReferencia(element.value);
    } else {
      let elementTexto = element;
      elementTexto = elementTexto.replace(/"(?=\w|$)/g, '&#8220;');
      elementTexto = elementTexto.replace(/(?=[\w,.?!\-")]|^)"/g, '&#8221;');
      texto += elementTexto;
    }
  });
  return texto;
};
