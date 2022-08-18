import { getSigla, getNumero, getAno } from './../model/lexml/urnUtil';
import { getUrn, buildContent } from './../model/lexml/jsonixUtil';
import { getProposicaoJsonix } from './../servicos/proposicoes';
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { appStyles } from './app.css';
import { Proposicao } from '../model/Proposicao';

@customElement('edt-app')
export class EdtApp extends LitElement {
  static styles = appStyles;

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

  @state()
  private jsonixProposicao: any = {};

  @state()
  private proposicao: Proposicao = {};

  createRenderRoot(): LitElement {
    return this;
  }

  private isJsonixProposicaoLoaded(): boolean {
    return 'value' in this.jsonixProposicao;
  }

  private onChange(): void {
    this.lexmlComandoEmenda.emenda = this.lexmlEta.getComandoEmenda();
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
      sigla: getSigla(urn),
      numero: getNumero(urn),
      ano: getAno(urn),
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
  }

  private onItemMenuSelecionado(ev: CustomEvent): void {
    if (ev.detail.itemMenu === 'nova') {
      this.modalNovaEmenda.show();
    } else if (ev.detail.itemMenu === 'visualizar') {
      this.modalVisualizarPdf.show();
    }
  }

  private renderEditorEmenda(): TemplateResult {
    return html`
      <div
        class="editor-emendas"
        style=${this.isJsonixProposicaoLoaded() ? '' : 'display: none;'}
      >
        <div class="detalhe-emenda">
          <div>
            <strong>${this.proposicao.nomeProposicao} - </strong>
            <span>${unsafeHTML(this.proposicao.ementa)}</span>
          </div>
          <div>
            <input type="text" placeholder="Digite o título para a emenda" />
          </div>
        </div>

        <lexml-emenda
          @onchange=${this.onChange}
          modo="emenda"
          .projetoNorma=${this.jsonixProposicao}
        ></lexml-emenda>
        <lexml-emenda-comando></lexml-emenda-comando>
      </div>

      <edt-modal-nova-emenda
        @nova-emenda=${(ev: CustomEvent): Promise<void> =>
          this.loadTextoProposicao(ev.detail.proposicao)}
      ></edt-modal-nova-emenda>

      <edt-modal-visualizar-pdf></edt-modal-visualizar-pdf>
    `;
  }

  render(): TemplateResult {
    return html`
      <edt-cabecalho></edt-cabecalho>
      <edt-menu @item-selecionado=${this.onItemMenuSelecionado}></edt-menu>
      <hr />
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
