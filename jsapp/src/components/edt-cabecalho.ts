import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('edt-cabecalho')
export class EdtCabecalho extends LitElement {
  createRenderRoot(): LitElement {
    return this;
  }

  render(): TemplateResult {
    return html`
      <header>
        <h2>Editor de Emendas</h2>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-cabecalho': EdtCabecalho;
  }
}
