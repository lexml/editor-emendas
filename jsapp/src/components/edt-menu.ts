import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

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
      <nav>
        <ul>
          <li @click=${(): void => this.emitirEvento('nova')}>Nova</li>
          <li>Abrir</li>
          <li>Salvar</li>
          <li>Visualizar</li>
          <li>Outros tipos</li>
          <li>Ajuda</li>
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-menu': EdtMenu;
  }
}
