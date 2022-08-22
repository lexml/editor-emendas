import { pesquisarProposicoes } from './../servicos/proposicoes';
import { Proposicao } from './../model/proposicao';
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

@customElement('edt-modal-nova-emenda')
export class EdtModalNovaEmenda extends LitElement {
  @state()
  private sigla = 'MPV';

  @state()
  private numero = '';

  @state()
  private ano = '';

  @state()
  private proposicoes: Proposicao[] = [];

  @state()
  private proposicaoSelecionada?: Proposicao;

  @query('#btnPesquisar')
  private btnPesquisar!: HTMLButtonElement;

  @query('sl-dialog')
  private slDialog!: any;

  public show(): void {
    this.slDialog.show();
  }

  private async pesquisar(): Promise<void> {
    this.proposicoes = await pesquisarProposicoes(
      this.sigla,
      this.numero,
      Number(this.ano)
    );
  }

  private emitirEvento(): void {
    this.dispatchEvent(
      new CustomEvent('nova-emenda', {
        detail: { proposicao: this.proposicaoSelecionada },
        composed: true,
        bubbles: true,
      })
    );
    this.slDialog.hide();
  }

  protected firstUpdated(): void {
    this.btnPesquisar.disabled = true;
  }

  private renderProposicoes(): TemplateResult {
    return !this.proposicoes.length
      ? html``
      : html`
          <table class="lista-proposicao">
            <thead>
              <tr>
                <th class="col-1">Proposição</th>
                <th class="col-2">Ementa</th>
              </tr>
            </thead>
            <tbody>
              ${this.proposicoes.map(p => {
                return html`
                  <tr @click=${(): any => (this.proposicaoSelecionada = p)}>
                    <td class="col-1">${p.nomeProposicao}</td>
                    <td class="col-2">${p.ementa}</td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        `;
  }

  render(): TemplateResult {
    return html`
      <style>
        table,
        span {
          font-size: var(--sl-font-size-small);
        }
        thead {
          display: block;
          table-layout: fixed;
        }
        tbody {
          height: 280px;
          overflow: hidden;
          overflow-y: scroll;
          display: block;
          table-layout: fixed;
        }
        td {
          border-top: 1px solid #ddd;
        }
        th {
          height: 30px;
          border-top: 1px solid #ddd;
        }
        .col-1 {
          width: 130px;
          white-space: nowrap;
        }
        .col-2 {
        }
        .tipo-proposicao,
        .numero-proposicao,
        .ano-proposicao {
          width: 120px;
          display: inline-block;
        }
      </style>
      <sl-dialog
        label="Selecionar proposição - nova emenda"
        style="--width: 80vw;"
      >
        <div style="min-height: 50vh;">
          <sl-select
            class="tipo-proposicao"
            size="small"
            value="mpv"
            @input=${(ev: Event): any =>
              (this.sigla = (ev.target as HTMLInputElement).value)}
          >
            <sl-menu-item value="mpv">MPV</sl-menu-item>
            <sl-menu-item value="...">...</sl-menu-item>
          </sl-select>
          <sl-input
            class="numero-proposicao"
            size="small"
            placeholder="Número"
            clearable
            @input=${(ev: Event): any =>
              (this.numero = (ev.target as HTMLInputElement).value)}
          ></sl-input>
          <sl-input
            class="ano-proposicao"
            size="small"
            placeholder="Ano"
            clearable
            @input=${(ev: Event): any =>
              (this.ano = (ev.target as HTMLInputElement).value)}
          ></sl-input>
          <sl-button
            variant="primary"
            size="small"
            @click=${(): any => this.pesquisar()}
            ?disabled=${!(this.sigla && this.ano)}
            >Pesquisar</sl-button
          >
          <br />
          <div>${this.renderProposicoes()}</div>
          <br />
          <div class="ementa">
            <span>Ementa</span>
            <div id="ementa">${this.proposicaoSelecionada?.ementa ?? ''}</div>
          </div>
        </div>

        <sl-button
          slot="footer"
          variant="default"
          @click=${(): void => this.slDialog.hide()}
          >Cancelar</sl-button
        >
        <sl-button
          slot="footer"
          variant="primary"
          @click=${(): void => this.emitirEvento()}
          ?disabled=${!this.proposicaoSelecionada}
          >Ok</sl-button
        >
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-nova-emenda': EdtModalNovaEmenda;
  }
}
