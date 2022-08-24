import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('edt-modal-onde-couber')
export class EdtModalOndeCouber extends LitElement {
  @query('sl-dialog')
  private slDialog!: any;

  public show(): void {
    this.slDialog.show();
  }

  render(): TemplateResult {
    const tituloModal = 'Criar emenda onde couber';

    return html`
      <sl-dialog label=${tituloModal}>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          congue, dui vel efficitur ultrices, magna leo ultricies ligula, sed
          mattis nibh dui sollicitudin diam. Nam blandit nisi ut ligula sodales,
          id molestie turpis mattis. Proin consectetur magna ut semper cursus.
          Sed mattis ullamcorper velit in porta. Quisque non elit sapien.
          Integer vitae ipsum ac ante egestas mollis vitae semper nunc. Duis
          pellentesque metus id feugiat consequat. Donec ac auctor lacus.
          Vivamus at lorem a nibh vulputate posuere. Nullam bibendum a est vitae
          lacinia. Praesent et dui faucibus sapien elementum lobortis vel nec
          metus. Praesent aliquam massa neque, at vulputate justo sodales in.
          Duis facilisis eget ante sed faucibus. Nulla facilisi. Quisque dictum
          venenatis lectus nec porta. Donec bibendum, lectus vitae accumsan
          feugiat, quam nisl facilisis est, a iaculis velit metus vel urna. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Nulla hendrerit, ipsum in facilisis euismod, felis ante
          vestibulum magna, non consequat nisl orci sed odio.
        </span>

        <sl-button
          slot="footer"
          variant="default"
          @click=${(): void => this.slDialog.hide()}
          >Criar emenda</sl-button
        >

        <sl-button
          slot="footer"
          variant="primary"
          autofocus
          @click=${(): void => this.slDialog.hide()}
          >Cancelar</sl-button
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
