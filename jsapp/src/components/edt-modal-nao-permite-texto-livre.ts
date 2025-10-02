import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('edt-modal-nao-permite-texto-livre')
export class EdtModalNaoPermiteTextoLivre extends LitElement {
  @query('sl-dialog')
  private slDialog!: any;

  public show(): void {
    this.slDialog.show();
  }

  render(): TemplateResult {
    const tituloModal = 'Atenção';

    return html`
      <sl-dialog label=${tituloModal}>
        <div>
          A opção do tipo de emenda de "Texto livre" somente é habilitada para os casos de exceção e não está disponível para esta matéria
          legislativa. Utilize o tipo <b>"Emenda padrão"</b> ou o tipo <b>"Onde couber"</b>, se for este o caso.<br />
        </div>

        <sl-button slot="footer" variant="default" @click=${(): void => this.slDialog.hide()}>Fechar</sl-button>
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-nao-permite-texto-livre': EdtModalNaoPermiteTextoLivre;
  }
}
