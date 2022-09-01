// import { getSigla, getNumero, getAno } from './../model/lexml/urnUtil';
import { getUrn, buildContent } from './../model/lexml/jsonixUtil';
import { getProposicaoJsonix } from './../servicos/proposicoes';
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { appStyles } from './app.css';
import { Proposicao } from '../model/proposicao';

@customElement('edt-app')
export class EdtApp extends LitElement {
  // static styles = appStyles;

  @property({ type: String }) tituloEmenda = '';
  @property({ type: String }) labelTipoEmenda = '';
  @property({ type: Object }) emenda = {};

  @query('lexml-emenda')
  private lexmlEmenda!: any;

  @query('lexml-eta')
  private lexmlEta!: any;

  @query('lexml-emenda-comando')
  private lexmlComandoEmenda!: any;

  @query('edt-modal-nova-emenda')
  private modalNovaEmenda!: any;

  @query('edt-modal-visualizar-pdf')
  private modalVisualizarPdf!: any;

  @query('edt-modal-onde-couber')
  private modalOndeCouber!: any;

  @state()
  private jsonixProposicao: any = {};

  @state()
  private modo = 'emenda';

  @state()
  private proposicao: Proposicao = {};

  createRenderRoot(): LitElement {
    return this;
  }

  private isJsonixProposicaoLoaded(): boolean {
    return 'value' in this.jsonixProposicao;
  }

  private async salvarPdf(): Promise<void> {
    this.emenda = this.lexmlEmenda.getEmenda();
    if (this.emenda) {
      const response = await fetch('api/emenda/json2pdf', {
        method: 'POST',
        body: JSON.stringify(this.emenda),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
      const content = await response.blob();
      const fileName = `${this.tituloEmenda || 'nova'}.emenda.pdf`;
      const objectUrl = URL.createObjectURL(content);
      const a = document.createElement('a');

      a.href = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
    }
  }

  private async loadTextoProposicao(proposicao: Proposicao): Promise<void> {
    const { sigla, numero, ano } = proposicao;
    this.jsonixProposicao = await getProposicaoJsonix(
      sigla!,
      numero!,
      Number(ano)
    );
    const urn = getUrn(this.jsonixProposicao);
    this.proposicao = {
      urn,
      sigla, //sigla: getSigla(urn),
      numero, //numero: getNumero(urn),
      ano, //ano: getAno(urn),
      ementa: buildContent(
        this.jsonixProposicao?.value?.projetoNorma?.norma?.parteInicial?.ementa
          .content
      ),
    };
    this.proposicao.nomeProposicao =
      this.proposicao.sigla +
      ' ' +
      this.proposicao.numero +
      '/' +
      this.proposicao.ano;
    if (this.modo === 'emendaArtigoOndeCouber') {
      this.tituloEmenda =
        'Emenda dispositivos onde couber à ' + this.proposicao.nomeProposicao;
      this.labelTipoEmenda = 'Emenda onde couber';
    } else if (this.modo === 'emenda') {
      this.tituloEmenda = 'Emenda padrão à ' + this.proposicao.nomeProposicao;
      this.labelTipoEmenda = 'Emenda padrão';
    }
  }

  private onItemMenuSelecionado(ev: CustomEvent): void {
    if (ev.detail.itemMenu === 'nova') {
      this.modalNovaEmenda.show();
    } else if (ev.detail.itemMenu === 'visualizar') {
      this.loadEmenda();
      this.modalVisualizarPdf.show();
    } else if (ev.detail.itemMenu === 'onde-couber') {
      this.modalOndeCouber.show();
    } else if (ev.detail.itemMenu === 'salvar') {
      this.salvarPdf();
    }
  }

  private criarNovaEmendaPadrao(proposicao: Proposicao): void {
    this.modo = 'emenda';
    this.tituloEmenda = 'Emenda padrão à ' + this.proposicao.nomeProposicao;
    this.labelTipoEmenda = 'Emenda padrão';
    this.loadTextoProposicao(proposicao);
  }

  private criarNovaEmendaArtigoOndeCouber(): void {
    this.modo = 'emendaArtigoOndeCouber';
    this.tituloEmenda =
      'Emenda dispositivos onde couber à ' + this.proposicao.nomeProposicao;
    this.labelTipoEmenda = 'Emenda onde couber';
    this.jsonixProposicao = { ...this.jsonixProposicao };
  }

  private atualizarTituloEmenda(evt: Event): void {
    this.tituloEmenda = (evt.target as HTMLInputElement).value;
  }

  private loadEmenda(): void {
    this.emenda = this.lexmlEmenda.getEmenda();
  }

  private renderEditorEmenda(): TemplateResult {
    return html`
      ${appStyles}
      <div
        class="editor-emendas"
        style=${this.isJsonixProposicaoLoaded() ? '' : 'display: none;'}
      >
        <div class="detalhe-emenda">
          <a
            href="#"
            onclick="document.querySelector('.dialog-emenda').show();"
            class="detalhe-emenda--titulo"
            aria-label="Expandir ementa"
            title="Expandir ementa"
          >
            <span class="detalhe-emenda--nome-proposicao">
              ${this.proposicao.nomeProposicao} -
            </span>
            <sl-tag variant="primary" size="small" pill
              >${this.labelTipoEmenda}</sl-tag
            >
            <span class="detalhe-emenda--ementa">
              ${unsafeHTML(this.proposicao.ementa)}
            </span>
            <span aria-label="Expandir ementa" title="Expandir ementa">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrows-angle-expand"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"
                />
              </svg>
            </span>
          </a>
          <div>
            <sl-input
              id="titulo-emenda"
              .value=${this.tituloEmenda.toString()}
              @input=${(ev: Event): void => this.atualizarTituloEmenda(ev)}
              placeholder="Emenda à ${this.proposicao.nomeProposicao}"
              size="small"
              clearable
            ></sl-input>
          </div>
          <sl-dialog
            label="${this.proposicao.nomeProposicao} - Ementa"
            class="dialog-emenda"
          >
            ${unsafeHTML(this.proposicao.ementa)}
            <sl-button
              slot="footer"
              autofocus
              onclick="document.querySelector('.dialog-emenda').hide()"
              variant="primary"
              >Fechar
            </sl-button>
          </sl-dialog>
        </div>
        <lexml-emenda
          modo=${this.modo}
          .projetoNorma=${this.jsonixProposicao}
        ></lexml-emenda>
      </div>

      <edt-modal-nova-emenda
        @nova-emenda-padrao=${(ev: CustomEvent): void =>
          this.criarNovaEmendaPadrao(ev.detail.proposicao)}
      >
      </edt-modal-nova-emenda>
      <edt-modal-visualizar-pdf
        tituloEmenda=${this.tituloEmenda}
        .emenda=${this.emenda}
      ></edt-modal-visualizar-pdf>
      <edt-modal-onde-couber
        @nova-emenda-padrao=${(): any =>
          this.criarNovaEmendaPadrao({ ...this.proposicao })}
        @nova-emenda-artigo-onde-couber=${this.criarNovaEmendaArtigoOndeCouber}
      ></edt-modal-onde-couber>
    `;
  }

  render(): TemplateResult {
    return html`
      <edt-cabecalho></edt-cabecalho>
      <edt-menu @item-selecionado=${this.onItemMenuSelecionado}></edt-menu>
      <main>
        ${this.isJsonixProposicaoLoaded()
          ? ''
          : html`<edt-notas-versao></edt-notas-versao>`}
        ${this.renderEditorEmenda()}
      </main>
      <edt-rodape></edt-rodape>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-app': EdtApp;
  }
}
