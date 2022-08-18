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
          <table>
            <thead>
              <tr>
                <th>Proposição</th>
                <th>Ementa</th>
              </tr>
            </thead>
            <tbody>
              ${this.proposicoes.map(p => {
                return html`
                  <tr @click=${(): any => (this.proposicaoSelecionada = p)}>
                    <td>${p.nomeProposicao}</td>
                    <td>${p.ementa}</td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        `;
  }

  render(): TemplateResult {
    return html`
      <sl-dialog label="Selecionar proposição - nova emenda">
        <div>
          <select
            @input=${(ev: Event): any =>
              (this.sigla = (ev.target as HTMLInputElement).value)}
          >
            <option value="MPV" selected>MPV</option>
          </select>
          <input
            type="search"
            placeholder="Número"
            aria-label="Número"
            @input=${(ev: Event): any =>
              (this.numero = (ev.target as HTMLInputElement).value)}
          />
          <input
            type="search"
            placeholder="Ano"
            aria-label="Ano"
            required
            @input=${(ev: Event): any =>
              (this.ano = (ev.target as HTMLInputElement).value)}
          />
          <button
            id="btnPesquisar"
            type="button"
            @click=${(): any => this.pesquisar()}
            ?disabled=${!(this.sigla && this.ano)}
          >
            Pesquisar
          </button>

          <div>${this.renderProposicoes()}</div>
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
