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
      <h1>Editor de Emendas</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-cabecalho': EdtCabecalho;
  }
}
