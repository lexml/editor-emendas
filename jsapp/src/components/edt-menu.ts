// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, state, query } from 'lit/decorators.js';
import { html, LitElement, TemplateResult } from 'lit';
import { menuStyles } from './app.css';

@customElement('edt-menu')
export class EdtMenu extends LitElement {
  createRenderRoot(): LitElement {
    return this;
  }

  @state()
  private proposicao: any = {};

  @query('#btn-save')
  btnSave: any;

  private emitirEvento(itemMenu: string): void {
    this.dispatchEvent(
      new CustomEvent('item-selecionado', {
        detail: { itemMenu },
        composed: true,
        bubbles: true,
      })
    );
  }

  render(): TemplateResult {
    return html`
      ${menuStyles}

      <sl-button
        title="Nova emenda"
        size="small"
        variant="default"
        @click=${(): void => this.emitirEvento('nova')}
      >
        <sl-icon slot="prefix" size="small" name="file-earmark-plus"></sl-icon>
        Nova
      </sl-button>
      <sl-button
        title="Abrir emenda"
        size="small"
        @click=${(): void => this.emitirEvento('abrir')}
      >
        <sl-icon slot="prefix" size="small" name="folder2-open"></sl-icon>
        Abrir
      </sl-button>
      ${Object.keys(this.proposicao).length > 0
        ? html`
            <sl-button
              id="btn-save"
              title="Salvar emenda"
              size="small"
              @click=${(): void => this.emitirEvento('salvar')}
            >
              <sl-icon slot="prefix" size="small" name="save"></sl-icon>
              Salvar
            </sl-button>
            <sl-button
              title="Salvar emenda com outro nome"
              size="small"
              @click=${(): void => this.emitirEvento('salvarComo')}
            >
              <sl-icon
                slot="prefix"
                size="small"
                name="box-arrow-up-right"
              ></sl-icon>
              Salvar como
            </sl-button>
            <sl-button
              title="Visualizar emenda"
              size="small"
              @click=${(): void => this.emitirEvento('visualizar')}
            >
              <sl-icon slot="prefix" size="small" name="eye"></sl-icon>
              Visualizar
            </sl-button>
            <sl-dropdown>
              <sl-button
                title="Outros tipos de emenda"
                size="small"
                slot="trigger"
                caret
              >
                <sl-icon slot="prefix" size="small" name="card-text"></sl-icon>
                Outros tipos
              </sl-button>
              <sl-menu>
                <sl-menu-item
                  @click=${(): void => this.emitirEvento('onde-couber')}
                >
                  Onde couber
                </sl-menu-item>
              </sl-menu>
            </sl-dropdown>
          `
        : ''}

      <sl-dropdown>
        <sl-button title="Ajuda" size="small" slot="trigger" caret>
          <sl-icon slot="prefix" size="small" name="question-lg"></sl-icon>
          Ajuda
        </sl-button>
        <sl-menu>
          <sl-menu-item @click=${(): void => this.emitirEvento('videos')}>
            V??deos tutoriais
          </sl-menu-item>
          <sl-menu-item @click=${(): void => this.emitirEvento('wiki')}>
            Wiki do projeto
          </sl-menu-item>
        </sl-menu>
      </sl-dropdown>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-menu': EdtMenu;
  }
}
