/* eslint-disable @typescript-eslint/no-unused-vars */
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, queryAll, state } from 'lit/decorators.js';
import SlInput from '@shoelace-style/shoelace/dist/components/input/input';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert';
import { Proposicao } from './../model/proposicao';
import {
  pesquisarProposicoes,
  pesquisarProposicoesEmTramitacao,
} from './../servicos/proposicoes';
import { novaEmendaStyles } from './app.css';
import { errorInPromise } from '../utils/error-utils';
import { toggleCarregando } from './edt-app';

@customElement('edt-modal-nova-emenda')
export class EdtModalNovaEmenda extends LitElement {
  @state()
  private sigla = 'MPV';

  @state()
  private numero = '';

  @state()
  private ano = new Date().getFullYear().toString();

  @state()
  private apenasEmTramitacao = true;

  @state()
  private idSdlegDocumentoItemDigital = '';

  @state()
  private proposicoes: Proposicao[] = [];

  @state()
  private proposicaoSelecionada?: Proposicao;

  @query('sl-dialog')
  private slDialog!: any;

  @queryAll('tr.proposicao')
  private trProposicoes!: HTMLElement[];

  public show(): void {
    this.numero = '';
    (this.shadowRoot?.querySelector('.numero-proposicao') as SlInput).value =
      '';
    this.pesquisar();
    this.slDialog.show();
  }

  private toggleApenasEmTramitacao(): void {
    this.apenasEmTramitacao = !this.apenasEmTramitacao;
    const numeroInput = this.shadowRoot?.querySelector('.numero-proposicao');
    this.numero = (numeroInput as SlInput).value = '';
    this.pesquisar();
  }

  private processarKeyup(evt: KeyboardEvent): void {
    if (!evt.ctrlKey && !evt.altKey && !evt.metaKey && evt.key === 'Enter') {
      this.pesquisar();
    }
  }

  private cliqueBotaoPesquisar(): void {
    this.apenasEmTramitacao = false;
    this.pesquisar();
  }

  private async pesquisar(): Promise<void> {
    try {
      this.proposicaoSelecionada = undefined;
      this.proposicoes = [];
      if (this.apenasEmTramitacao) {
        if (!this.sigla) {
          return;
        }
        this.proposicoes = await pesquisarProposicoesEmTramitacao(this.sigla);
      } else {
        if (!(this.sigla && this.ano)) {
          return;
        }
        this.proposicoes = await pesquisarProposicoes(
          this.sigla,
          this.numero,
          Number(this.ano)
        );
      }
    } catch (err) {
      errorInPromise(`Erro ao pesquisar as proposições : ${err}`, err, msg => {
        this.emitirAlerta(msg, 'danger');
        toggleCarregando();
      });
    }
  }

  private emitirEvento(): void {
    this.dispatchEvent(
      new CustomEvent('nova-emenda-padrao', {
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

  private duploCliqueProposicao(proposicao: Proposicao, evt: Event): void {
    this.selecionarProposicao(proposicao, evt);
    this.emitirEvento();
  }

  public emitirAlerta = function (
    message: string,
    variant: string,
    icon = 'info-circle',
    duration = 3000,
    closable = true
  ): Promise<void> {
    const alert = Object.assign(document.createElement('sl-alert') as SlAlert, {
      variant,
      closable,
      duration: duration,
      innerHTML: `
        <sl-icon name="${icon}" style="font-size:28px" slot="icon"></sl-icon>
        ${message}
      `,
    });

    document.body.append(alert);
    return alert.toast();
  };

  private renderProposicoes(): TemplateResult {
    return !this.proposicoes.length
      ? html` <div class="modal-nova-emenda--info">
          <sl-animation name="heartBeat" duration="1000" iterations="1" play>
            <sl-badge pill variant="primary"
              >Nenhuma proposição para exibir</sl-badge
            >
          </sl-animation>
        </div>`
      : html`
          <table>
            <thead>
              <tr>
                <th class="col-center">Proposição</th>
                <th class="col-2">Ementa</th>
              </tr>
            </thead>
            <tbody>
              ${this.proposicoes.map(p => {
                return html`
                  <tr
                    tabindex="0"
                    class="proposicao"
                    @click=${(evt: Event): any =>
                      this.selecionarProposicao(p, evt)}
                    @dblclick=${(evt: Event): any =>
                      this.duploCliqueProposicao(p, evt)}
                    disabled=${p.idSdlegDocumentoItemDigital ? false : true}
                  >
                    <td class="col-center">
                      ${p.sigla +
                      ' ' +
                      this.removerZerosEsquerda(p.numero) +
                      '/' +
                      p.ano}
                    </td>
                    <td class="col-2">
                      <span class="ementa">
                        ${p.idSdlegDocumentoItemDigital
                          ? p.ementa
                          : html`<sl-badge variant="neutral"
                                >Texto indisponível</sl-badge
                              >
                              ${p.ementa}`}
                      </span>
                    </td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        `;
  }

  private removerZerosEsquerda(numero: any): string {
    return numero.replace(/^0+/, '');
  }

  render(): TemplateResult {
    return html`
      ${novaEmendaStyles}
      <sl-dialog label="Selecionar texto">
        <div @keyup=${this.processarKeyup}>
          <div class="form-group">
            <sl-select
              class="tipo-proposicao"
              size="small"
              value="mpv"
              @sl-input=${(ev: Event): any =>
                (this.sigla = (ev.target as HTMLInputElement).value)}
            >
              <sl-menu-item value="mpv">MPV</sl-menu-item>
            </sl-select>
            <sl-input
              class="numero-proposicao"
              size="small"
              value=""
              placeholder="Número"
              max="99999"
              max-length="5"
              type="number"
              inputmode="numeric"
              enterkeyhint="enter"
              @sl-input=${(ev: Event): any =>
                (this.numero = (ev.target as HTMLInputElement).value)}
            ></sl-input>
            <sl-input
              class="ano-proposicao"
              size="small"
              placeholder="Ano"
              value=${new Date().getFullYear().toString()}
              max="9999"
              max-length="4"
              type="number"
              inputmode="numeric"
              enterkeyhint="enter"
              @sl-input=${(ev: Event): any =>
                (this.ano = (ev.target as HTMLInputElement).value)}
            ></sl-input>
            <sl-button
              id="pesquisarButton"
              variant="primary"
              size="small"
              class="button-pesquisar"
              autofocus
              @click=${this.cliqueBotaoPesquisar}
              ?disabled=${!(this.sigla && this.ano)}
            >
              <sl-icon slot="prefix" name="search"></sl-icon>
              Pesquisar
            </sl-button>
            <label>
              <input
                type="checkbox"
                id="chk-mostrar-todas"
                @change=${this.toggleApenasEmTramitacao}
                .checked=${this.apenasEmTramitacao}
              />
              apenas em tramitação
            </label>
          </div>
          <br />
          <div class="table-wrap">${this.renderProposicoes()}</div>
          <br />
          <div class="ementa">
            <label for="ementa"
              >Ementa
              ${this.proposicaoSelecionada?.sigla
                ? this.proposicaoSelecionada?.sigla +
                  ' ' +
                  this.removerZerosEsquerda(
                    this.proposicaoSelecionada?.numero
                  ) +
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
          >Selecionar</sl-button
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
