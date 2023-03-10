/* eslint-disable @typescript-eslint/no-unused-vars */
import { EdtApp } from './edt-app';
import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { rodapeStyles } from './app.css';

// import

@customElement('edt-rodape')
export class EdtRodape extends LitElement {
  createRenderRoot(): LitElement {
    return this;
  }

  render(): TemplateResult {
    const versao = '0.3.0';
    return html`
      ${rodapeStyles}
      <footer>
        <a href="https://www.congressonacional.leg.br/" target="_blank">
          Congresso Nacional
        </a>
        <span class="">Versão ${versao}</span>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-rodape': EdtRodape;
  }
}
