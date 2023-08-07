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
          class="usuario"
          title="Informar o nome do usuário e sigla"
          size="small"
          @click=${(): void => this.emitirEvento('informar-usuario')}
        >
          <sl-icon slot="prefix" size="small" name="person-circle"></sl-icon>

          ${this.usuario?.nome.split(' ')[0] || 'Usuário'}
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
