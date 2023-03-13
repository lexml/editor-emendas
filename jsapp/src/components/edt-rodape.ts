/* eslint-disable @typescript-eslint/no-unused-vars */
import { EdtApp } from './edt-app';
import { LitElement, html, TemplateResult, PropertyValueMap } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { rodapeStyles } from './app.css';
import { getVersao } from '../utils/versao-utils';

@customElement('edt-rodape')
export class EdtRodape extends LitElement {
  @state() versao = '';

  createRenderRoot(): LitElement {
    return this;
  }

  protected firstUpdated(): void {
    this.versao = getVersao();
  }

  render(): TemplateResult {
    return html`
      ${rodapeStyles}
      <footer>
        <a href="https://www.congressonacional.leg.br/" target="_blank">
          Congresso Nacional
        </a>
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
