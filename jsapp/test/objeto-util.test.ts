import { expect } from '@open-wc/testing';
import { objetosIguais } from '../src/utils/objeto-util.js';
import { EMENDA_BACKEND, EMENDA_BACKEND2, EMENDA_BACKEND3, EMENDA_PDF } from './emenda-objeto.js';

describe('Testando objetosIguais', () => {
  it('Deve retornar true para objetos iguais', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 } };
    const obj2 = { a: 1, b: { c: 2, d: 3 } };
    expect(objetosIguais(obj1, obj2)).to.equal(true);
  });

  it('Deve retornar false para objetos diferentes', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 } };
    const obj2 = { a: 1, b: { c: 2, d: 4 } };
    expect(objetosIguais(obj1, obj2)).to.equal(false);
  });

  it('Deve retornar true para objetos nulos ou indefinidos', () => {
    const obj1 = null;
    const obj2 = undefined;
    expect(objetosIguais(obj1, obj2)).to.equal(true);
  });

  it('Testa emendas iguais (sem alteração)', () => {
    const obj1 = EMENDA_PDF;
    const obj2 = EMENDA_BACKEND;
    expect(objetosIguais(obj1, obj2)).to.equal(true);
  });

  it('Testa emendas reais (com alteração)', () => {
    const obj1 = EMENDA_PDF;
    const obj2 = EMENDA_BACKEND2;
    expect(objetosIguais(obj1, obj2)).to.equal(false);
  });

  it('Testa emendas iguais (com a estrutura do objeto alterada)', () => {
    const obj1 = EMENDA_PDF;
    const obj2 = EMENDA_BACKEND3;
    expect(objetosIguais(obj1, obj2)).to.equal(true);
  });

  // Adicione mais casos de teste conforme necessário
});
