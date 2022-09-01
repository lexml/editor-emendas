import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { menuStyles } from './app.css';
@customElement('edt-menu')
export class EdtMenu extends LitElement {
  createRenderRoot(): LitElement {
    return this;
  }

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

      <sl-dropdown>
        <sl-button class="menu-toggle" slot="trigger" size="small">
          <sl-icon name="list" label="Menu"></sl-icon>
        </sl-button>
        <sl-menu>
          <sl-menu-item @click=${(): void => this.emitirEvento('nova')}>
            Nova
          </sl-menu-item>
          <sl-menu-item @click=${(): void => this.emitirEvento('abrir')}
            >Abrir</sl-menu-item
          >
          <sl-menu-item @click=${(): void => this.emitirEvento('salvar')}>
            Salvar
          </sl-menu-item>
          <sl-menu-item @click=${(): void => this.emitirEvento('visualizar')}>
            Visualizar
          </sl-menu-item>
          <sl-divider></sl-divider>
          <sl-menu-item disabled> Outros tipos</sl-menu-item>
          <sl-menu-item @click=${(): void => this.emitirEvento('onde-couber')}>
            <sl-icon slot="prefix" name=""></sl-icon>
            Onde Couber
          </sl-menu-item>
          <sl-divider></sl-divider>
          <sl-menu-item> Ajuda </sl-menu-item>
        </sl-menu>
      </sl-dropdown>

      <sl-button size="small" @click=${(): void => this.emitirEvento('nova')}
        >Nova</sl-button
      >
      <sl-button size="small" @click=${(): void => this.emitirEvento('abrir')}
        >Abrir</sl-button
      >
      <sl-button size="small" @click=${(): void => this.emitirEvento('salvar')}
        >Salvar</sl-button
      >
      <sl-button
        size="small"
        @click=${(): void => this.emitirEvento('visualizar')}
        >Visualizar</sl-button
      >
      <sl-dropdown>
        <sl-button size="small" slot="trigger" caret>Outros tipos</sl-button>
        <sl-menu>
          <sl-menu-item @click=${(): void => this.emitirEvento('onde-couber')}
            >Onde couber</sl-menu-item
          >
        </sl-menu>
      </sl-dropdown>
      <sl-button size="small">Ajuda</sl-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-menu': EdtMenu;
  }
}
