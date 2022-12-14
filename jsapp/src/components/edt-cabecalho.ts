/* eslint-disable @typescript-eslint/no-unused-vars */
import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cabecalhoStyles } from './app.css';
@customElement('edt-cabecalho')
export class EdtCabecalho extends LitElement {
  createRenderRoot(): LitElement {
    return this;
  }

  render(): TemplateResult {
    return html`
      ${cabecalhoStyles}
      <h1><a id="titulo" href=".">Editor de Emendas</a></h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-cabecalho': EdtCabecalho;
  }
}
