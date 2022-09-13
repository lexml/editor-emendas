export const downloadBase64 = (b64Data: string, fileName = 'teste'): void => {
  const a = document.createElement('a');
  a.setAttribute('href', b64Data);
  a.setAttribute('download', fileName);
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const blobToBase64 = (
  blob: any
): Promise<string | ArrayBuffer | null> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = (): any => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const base64ToBlob = (
  b64Data: string,
  contentType: string,
  sliceSize = 512
): any => {
  const base64 = b64Data.startsWith('data:') ? b64Data.split(',')[1] : b64Data;
  const byteCharacters = window.atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};
