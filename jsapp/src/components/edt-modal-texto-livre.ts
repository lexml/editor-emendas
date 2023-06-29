/* eslint-disable @typescript-eslint/no-unused-vars */
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { ondeCouberStyles } from './app.css';
@customElement('edt-modal-texto-livre')
export class EdtModalTextoLivre extends LitElement {
  private motivos = [
    { id: 1, desc: 'Emendamento ou adição de pena, penalidade etc.' },
    {
      id: 2,
      desc: 'Emendamento ou adição de especificação temática do dispositivo (usado para nome do tipo penal e outros).',
    },
    { id: 3, desc: 'Alteração de anexo de MP de crédito extraordinário.' },
    { id: 4, desc: 'Emendamento ou adição de anexos.' },
    {
      id: 5,
      desc: 'Alteração do texto da proposição e proposta de adição de dispositivos onde couber na mesma emenda.',
    },
    {
      id: 6,
      desc: 'Alteração de norma que não segue a LC nº 95 de 98 (ex: norma com alíneas em parágrafos).',
    },
    {
      id: 7,
      desc: 'Casos especiais de numeração de parte (PARTE GERAL, PARTE ESPECIAL e uso de numeral ordinal por extenso);',
    },
    { id: 8, desc: 'Tabelas e imagens no texto da proposição.' },
    { id: 9, desc: 'Outro motivo:' },
  ];

  private idMotivo = null;
  private descMotivo = '';

  @query('sl-alert')
  private alerta!: any;

  @query('sl-dialog')
  private slDialog!: any;

  @query('#radioMotivo')
  private radioMotivo!: any;

  public show(): void {
    this.slDialog.show();
  }

  private showAlerta(mensagem: string): void {
    const span = this.alerta.getElementsByTagName('span')[0];
    span.textContent = mensagem;
    this.alerta.show();
  }

  private hideAlerta(): void {
    this.alerta.hide();
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

  continuar(): void {
    this.hideAlerta();
    if (!this.idMotivo) {
      this.showAlerta('Selecione um motivo');
    } else if (parseInt(this.idMotivo) === 9 && !this.descMotivo) {
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
        <span>
          A emenda de texto livre deve ser utilizada apenas quando não for
          possível fazer a emenda no formato padrão do editor ou como emenda de
          dispositivo onde couber.
        </span>
        <br />
        <br />
        <sl-radio-group
          id="radioMotivo"
          label="Selecione um motivo"
          @click=${(e: any) => (this.idMotivo = e.target.value)}
        >
          ${this.motivos.map(
            m => html`<sl-radio value=${m.id}>${m.desc}</sl-radio>`
          )}
        </sl-radio-group>
        <br />
        <sl-input
          id="desc-motivo"
          .value=${this.descMotivo}
          placeholder="Especifique o motivo"
          size="small"
          clearable
        ></sl-input>
        <br />

        <sl-alert variant="warning" closable class="alert-closable">
          <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
          <strong>Dados inválidos.</strong><br />
          <span>Revise os dados informados.</span>
        </sl-alert>

        <sl-button slot="footer" variant="default" @click=${this.continuar}
          >Continuar</sl-button
        >
        <sl-button
          slot="footer"
          variant="primary"
          @click=${(): void => this.slDialog.hide()}
          >Cancelar</sl-button
        >
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-texto-livre': EdtModalTextoLivre;
  }
}
