import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { rodapeStyles } from './app.css';

@customElement('edt-rodape')
export class EdtRodape extends LitElement {
  @property()
  versao? = '';

  createRenderRoot(): LitElement {
    return this;
  }

  render(): TemplateResult {
    return html`
      ${rodapeStyles}
      <footer>
        <a href="https://www.congressonacional.leg.br/" target="_blank"> Congresso Nacional </a>
        <span class="">Versão ${this.versao}</span>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-rodape': EdtRodape;
  }
}
