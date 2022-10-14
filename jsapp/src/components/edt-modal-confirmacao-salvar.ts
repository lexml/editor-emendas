// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, query } from 'lit/decorators.js';
import { LitElement, html, TemplateResult } from 'lit';

@customElement('edt-modal-confirmacao-salvar')
export class EdtModalConfirmacaoSalvar extends LitElement {
  @query('sl-dialog')
  private slDialog!: any;

  private opcaoSelecionada = 'cancelar';

  public show(): void {
    this.opcaoSelecionada = 'cancelar';
    this.slDialog.show();
  }

  private emitirEvento(): void {
    this.dispatchEvent(
      new CustomEvent('confirm-result', {
        composed: true,
        bubbles: true,
        detail: this.opcaoSelecionada,
      })
    );
  }

  private registrarOpcaoESair(opcao: string): void {
    this.opcaoSelecionada = opcao;
    this.slDialog.hide();
  }

  render(): TemplateResult {
    const tituloModal = 'Confirmação';

    return html`
      <sl-dialog label=${tituloModal} @sl-hide=${this.emitirEvento}>
        <span>Deseja salvar as alterações da emenda atual?</span>

        <sl-button
          slot="footer"
          variant="primary"
          @click=${(): void => this.registrarOpcaoESair('salvar')}
          >Salvar</sl-button
        >

        <sl-button
          slot="footer"
          variant="default"
          @click=${(): void => this.registrarOpcaoESair('nao-salvar')}
          >Não salvar</sl-button
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
    'edt-modal-confirmacao-salvar': EdtModalConfirmacaoSalvar;
  }
}
