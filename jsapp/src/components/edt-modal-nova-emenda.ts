import { pesquisarProposicoes } from './../servicos/proposicoes';
import { Proposicao } from './../model/proposicao';
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query, queryAll, state } from 'lit/decorators.js';

@customElement('edt-modal-nova-emenda')
export class EdtModalNovaEmenda extends LitElement {
  @state()
  private sigla = 'MPV';

  @state()
  private numero = '';

  @state()
  private ano = new Date().getFullYear().toString();

  @state()
  private proposicoes: Proposicao[] = [];

  @state()
  private proposicaoSelecionada?: Proposicao;

  @query('sl-dialog')
  private slDialog!: any;

  @queryAll('tr.proposicao')
  private trProposicoes!: HTMLElement[];

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

  private selecionarProposicao(proposicao: Proposicao, evt: Event): void {
    this.proposicaoSelecionada = proposicao;
    this.trProposicoes.forEach(tr => tr.removeAttribute('selected'));
    (evt.target as HTMLElement).parentElement!.setAttribute('selected', 'true');
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
                  <tr
                    class="proposicao"
                    @click=${(evt: Event): any =>
                      this.selecionarProposicao(p, evt)}
                  >
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
        :host {
          font-size: var(--sl-font-size-small);
        }
        table {
          border-spacing: 0;
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
          padding: 0.5rem;
          border-top: 1px solid #ddd;
        }
        th {
          height: 30px;
          border-top: 1px solid #ddd;
        }
        tr {
          cursor: pointer;
        }
        tr[selected] {
          background-color: #f7ff9c;
        }
        tr:hover {
          background-color: #fcffdd;
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
        #ementa {
          width: 100%;
          font-family: var(--sl-font-size-small);
        }
        label {
          font-weight: bold;
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
            value=${new Date().getFullYear().toString()}
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
            <label for="ementa"
              >Ementa
              ${this.proposicaoSelecionada?.sigla
                ? this.proposicaoSelecionada?.sigla +
                  ' ' +
                  this.proposicaoSelecionada?.numero +
                  '/' +
                  this.proposicaoSelecionada?.ano
                : ''}</label
            >
            <textarea id="ementa" cols="40" rows="3" disabled>
${this.proposicaoSelecionada?.ementa ?? ''}</textarea
            >
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
