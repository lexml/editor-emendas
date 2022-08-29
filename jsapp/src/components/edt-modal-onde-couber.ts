import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { ondeCouberStyles } from './app.css';
@customElement('edt-modal-onde-couber')
export class EdtModalOndeCouber extends LitElement {
  @query('sl-dialog')
  private slDialog!: any;

  public show(): void {
    this.slDialog.show();
  }

  private emitirEvento(nomeEvento: string): void {
    this.dispatchEvent(
      new CustomEvent(nomeEvento, {
        composed: true,
        bubbles: true,
      })
    );
    this.slDialog.hide();
  }

  render(): TemplateResult {
    const tituloModal = 'Criar emenda "dispositivos onde couber"';

    return html`
      ${ondeCouberStyles}
      <sl-dialog label=${tituloModal}>
        <span>
          Orienta-se o uso preferencial de emendas padrão, com posicionamento
          dos novos dispositivos propostos, em vez de emendas de dispositivos
          onde couber.
        </span>

        <sl-button
          slot="footer"
          variant="default"
          @click=${(): void =>
            this.emitirEvento('nova-emenda-artigo-onde-couber')}
          >Continuar mesmo assim</sl-button
        >

        <sl-button
          slot="footer"
          variant="default"
          @click=${(): void => this.slDialog.hide()}
          >Cancelar</sl-button
        >

        <sl-button
          slot="footer"
          variant="primary"
          autofocus
          @click=${(): void => this.emitirEvento('nova-emenda-padrao')}
          >Nova emenda padrão</sl-button
        >
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-onde-couber': EdtModalOndeCouber;
  }
}
