import { LitElement, html, TemplateResult } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, query } from 'lit/decorators.js';
import { usuarioStyles } from './app.css';
import { Usuario } from '../model/usuario';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input';

@customElement('edt-modal-usuario')
export class EdtModalUsuario extends LitElement {
  @property({ type: Object })
  usuario?: Usuario;

  @query('sl-dialog')
  private slDialog!: any;

  @query('#btnSalvar')
  private btnSalvar!: any;

  @query('#nomeUsuario')
  private nomeUsuarioInput!: SlInput;

  @query('#siglaUsuario')
  private siglaUsuarioInput!: SlInput;

  public show(): void {
    if (this.usuario) {
      this.nomeUsuarioInput.value = this.usuario.nome;
      this.siglaUsuarioInput.value = this.usuario.sigla || '';
    }

    this.btnSalvar.disabled = !this.usuario?.nome;

    this.slDialog.show();
  }

  private emitirEvento(nomeEvento: string): void {
    const nome = this.nomeUsuarioInput.value;
    const sigla = this.siglaUsuarioInput.value;

    this.dispatchEvent(
      new CustomEvent(nomeEvento, {
        composed: true,
        bubbles: true,
        detail: { usuario: { nome, sigla } },
      })
    );
    this.slDialog.hide();
  }

  render(): TemplateResult {
    const tituloModal = 'Informar nome e sigla do usuário';

    return html`
      ${usuarioStyles}
      <sl-dialog label=${tituloModal}>
        <div>
          <sl-input
            id="nomeUsuario"
            label="Nome"
            autofocus
            @sl-input=${(ev: Event): any =>
              (this.btnSalvar.disabled = !(ev.target as HTMLInputElement)
                .value)}
            required
          ></sl-input>
        </div>
        <br />
        <div>
          <sl-input id="siglaUsuario" label="Sigla"></sl-input>
        </div>

        <sl-button
          id="btnSalvar"
          slot="footer"
          variant="primary"
          @click=${(): void => this.emitirEvento('atualizar-usuario')}
          >Salvar</sl-button
        >

        <sl-button
          slot="footer"
          variant="default"
          @click=${(): void => this.slDialog.hide()}
          >Cancelar</sl-button
        >
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-usuario': EdtModalUsuario;
  }
}
