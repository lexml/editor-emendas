/* eslint-disable @typescript-eslint/no-unused-vars */
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cabecalhoStyles } from './app.css';
import { Usuario } from '../model/usuario';
@customElement('edt-cabecalho')
export class EdtCabecalho extends LitElement {
  @property({ type: Object })
  usuario?: Usuario;

  createRenderRoot(): LitElement {
    return this;
  }

  private emitirEvento(nomeEvento: string): void {
    this.dispatchEvent(
      new CustomEvent(nomeEvento, {
        composed: true,
        bubbles: true,
      })
    );
  }

  render(): TemplateResult {
    return html`
      ${cabecalhoStyles}
      <div class="titulo-editor">
        <h1><a id="titulo" href=".">Editor de Emendas</a></h1>
      </div>

      <div class="usuario-editor">
        <sl-button
          title="Informar usuário"
          size="small"
          @click=${(): void => this.emitirEvento('informar-usuario')}
        >
          <sl-icon slot="prefix" size="small" name="eye"></sl-icon>
          ${this.usuario?.nome || 'Usuário'}
        </sl-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-cabecalho': EdtCabecalho;
  }
}
