import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query, queryAll } from 'lit/decorators.js';
import { ondeCouberStyles } from './app.css';

@customElement('edt-modal-texto-livre')
export class EdtModalTextoLivre extends LitElement {
  private ID_OUTRO_MOTIVO = 9999;

  private motivos: { id: number; desc: string }[] = [];

  private idMotivo = 0;

  private descMotivo = '';

  @query('#desc-motivo')
  private inputMotivo!: HTMLInputElement;

  @query('sl-alert')
  private alerta!: any;

  @query('sl-dialog')
  private slDialog!: any;

  @queryAll('#radioMotivo sl-radio')
  private radioMotivo!: HTMLInputElement[];

  connectedCallback(): void {
    const elLexmlEmenda = this.parentElement?.querySelector('lexml-emenda') as any;
    if (elLexmlEmenda) {
      this.motivos = elLexmlEmenda
        .getRestricoesConhecidas()
        .map((s: string, i: number) => ({ id: i + 1, desc: s }))
        .concat({ id: this.ID_OUTRO_MOTIVO, desc: 'Outro motivo:' });
    }
    super.connectedCallback();
  }

  public show(): void {
    this.hideAlerta();
    this.idMotivo = 0;
    this.descMotivo = '';
    this.inputMotivo.value = '';
    this.radioMotivo.forEach((r: HTMLInputElement) => (r.checked = false));
    this.slDialog.show();
    const radio = this.radioMotivo[0];
    setTimeout(() => {
      radio.click();
      radio.focus();
    }, 100);
  }

  private showAlerta(mensagem: string): void {
    const span = this.alerta.getElementsByTagName('strong')[0];
    span.textContent = mensagem;
    this.alerta.show();
  }

  private hideAlerta(): void {
    this.alerta.hide();
  }

  private getMotivo(): string {
    const motivo = this.motivos.find(m => m.id === this.idMotivo);
    if (!motivo) {
      return '';
    }

    if (this.idMotivo === this.ID_OUTRO_MOTIVO) {
      return `${motivo.desc} ${this.descMotivo}`;
    }
    return motivo.desc;
  }

  private emitirEvento(nomeEvento: string): void {
    this.dispatchEvent(
      new CustomEvent(nomeEvento, {
        detail: { motivo: this.getMotivo() },
        composed: true,
        bubbles: true,
      })
    );
    this.slDialog.hide();
  }

  continuar(): void {
    this.hideAlerta();
    if (!this.idMotivo) {
      this.showAlerta('Selecione um motivo');
    } else if (this.idMotivo === this.ID_OUTRO_MOTIVO && !this.descMotivo) {
      this.showAlerta('Especifique o Motivo');
    } else {
      this.emitirEvento('nova-emenda-texto-livre');
    }
  }

  render(): TemplateResult {
    const tituloModal = 'Criar emenda de texto livre';

    return html`
      ${ondeCouberStyles}
      <sl-dialog label=${tituloModal}>
        <p>
          A emenda de texto livre deve ser utilizada apenas quando não for possível fazer a emenda no formato padrão do editor ou como emenda de
          dispositivo onde couber.
        </p>
        <p>Selecione o motivo da opção pela emenda de texto livre:</p>
        <sl-radio-group id="radioMotivo" label="Selecione um motivo" @click=${(e: any): any => (this.idMotivo = parseInt(e.target.value))}>
          ${this.motivos.map(m => html`<sl-radio value=${m.id}>${m.desc}</sl-radio>`)}
        </sl-radio-group>
        <br />
        <sl-input
          id="desc-motivo"
          placeholder="Especifique o motivo"
          size="small"
          clearable
          .value=${this.descMotivo}
          @sl-input=${(ev: Event): any => (this.descMotivo = (ev.target as HTMLInputElement).value)}
        ></sl-input>
        <br />

        <sl-alert variant="warning" closable class="alert-closable">
          <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
          <strong>Revise os dados informados.</strong>
        </sl-alert>

        <sl-button slot="footer" variant="default" @click=${this.continuar}>Continuar</sl-button>
        <sl-button slot="footer" variant="primary" @click=${(): void => this.slDialog.hide()}>Cancelar</sl-button>
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-texto-livre': EdtModalTextoLivre;
  }
}
