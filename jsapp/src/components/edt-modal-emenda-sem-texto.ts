import { customElement, query, state } from 'lit/decorators.js';
import { LitElement, html, css, TemplateResult } from 'lit';
import { Proposicao } from '../model/proposicao';

@customElement('edt-modal-emenda-sem-texto')
export class EdtModalEmendaSemTexto extends LitElement {
  @query('sl-dialog') private slDialog!: any;

  @state()
  private proposicaoSelecionada?: Proposicao;

  static styles = css`
    .footer-container {
      display: flex;
      justify-content: flex-end;
      align-items: stretch;
      flex-wrap: wrap; /* Quebra de linha no mobile ou quando o espaço for insuficiente */
    }
    .btn {
      padding: 5px;
    }
    sl-dialog {
      --width: 640px;
    }

    sl-dialog::part(body) {
      padding: 0 var(--body-spacing);
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
    const { sigla, numero, ano } = this.proposicaoSelecionada || {};
    return html`
      <sl-dialog data-cy="dialog-emenda-sem-texto">
        <span slot="label">${`${sigla} ${numero?.replace(/^0*/, '')}/${ano}`} - Texto indisponível para emenda padrão</span>

        <div>
          <p>O sistema ainda não possui o texto desta proposição preparado para emendamento no formato padrão do editor.</p>
          <p>
            Você deseja criar uma emenda de dispositivo "onde couber", uma emenda de substituição de termo ou uma emenda no formato de texto livre?
          </p>
        </div>

        <div slot="footer" class="footer-container">
          <sl-button data-cy="btnOndeCouber" class="btn" variant="primary" @click=${(): void => this.emitirEvento('cria-artigo-onde-couber')}>
            Onde couber
          </sl-button>
          <sl-button
            data-cy="btnSubstituicaoTermo"
            class="btn"
            variant="secondary"
            @click=${(): void => this.emitirEvento('cria-substituicao-termo')}
          >
            Substituição de Termo
          </sl-button>
          <sl-button data-cy="btnTextoLivre" class="btn" variant="secondary" @click=${(): void => this.emitirEvento('cria-texto-livre')}>
            Texto livre
          </sl-button>
          <sl-button data-cy="btnFechar" class="btn" variant="default" @click=${(): void => this.slDialog.hide()}> Fechar </sl-button>
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
