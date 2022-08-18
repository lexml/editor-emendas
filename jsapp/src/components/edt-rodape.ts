import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { rodapeStyles } from './app.css';
@customElement('edt-rodape')
export class EdtRodape extends LitElement {
  createRenderRoot(): LitElement {
    return this;
  }

  render(): TemplateResult {
    return html`
      ${rodapeStyles}
      <footer>Congresso Nacional</footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-rodape': EdtRodape;
  }
}
