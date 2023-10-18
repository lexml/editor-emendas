/* eslint-disable @typescript-eslint/no-unused-vars */
import { customElement, query } from 'lit/decorators.js';
import { LitElement, html, css, TemplateResult } from 'lit';
import { Proposicao } from '../model/proposicao';

@customElement('edt-modal-emenda-sem-texto')
export class EdtModalEmendaSemTexto extends LitElement {
  @query('sl-dialog') private slDialog!: any;
  private proposicaoSelecionada?: Proposicao;

  static styles = css`
    .footer-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap; /* Quebra de linha no mobile ou quando o espaço for insuficiente */
    }
  `;

  public show(proposicaoSelecionada: Proposicao): void {
    this.proposicaoSelecionada = proposicaoSelecionada;
    this.slDialog.show();
  }

  private emitirEvento(nomeEvento: string): void {
    this.dispatchEvent(
      new CustomEvent(nomeEvento, {
        composed: true,
        bubbles: true,
        detail: {
          proposicaoSelecionada: this.proposicaoSelecionada,
          motivo: 'Texto indisponível para emenda padrão',
        },
      })
    );
    this.slDialog.hide();
  }

  render(): TemplateResult {
    return html`
      <sl-dialog>
        <span slot="label">Texto indisponível para emenda padrão</span>

        <div>
          <p>
            O sistema não possui o texto desta proposição preparado para
            emendamento no formato padrão do editor.
          </p>
          <p>
            Você deseja criar uma emenda de dispositivo onde couber ou no
            formato de texto livre?
          </p>
        </div>

        <!-- <sl-radio-group id="rdgTipoEmenda" name="tipoEmenda">
          <sl-radio class="tipo-emenda" id="ondeCouber" value="1" checked>Onde Couber</sl-radio>
          <sl-radio class="tipo-emenda" id="textoLivre" value="2" >Texto Livre</sl-radio>
        </sl-radio-group>           -->

        <div slot="footer" class="footer-container">
          <sl-button
            variant="primary"
            @click=${(): void => this.emitirEvento('cria-artigo-onde-couber')}
          >
            Onde couber
          </sl-button>
          <sl-button
            variant="primary"
            @click=${(): void => this.emitirEvento('cria-texto-livre')}
          >
            Texto livre
          </sl-button>
          <sl-button
            variant="default"
            @click=${(): void => this.slDialog.hide()}
          >
            Fechar
          </sl-button>
        </div>
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-emenda-sem-texto': EdtModalEmendaSemTexto;
  }
}
