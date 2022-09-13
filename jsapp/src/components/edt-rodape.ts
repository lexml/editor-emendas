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
      <footer>
        <a href="https://www.congressonacional.leg.br/" target="_blank"
          >Congresso Nacional</a
        >
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-rodape': EdtRodape;
  }
}
