import { getProposicaoJsonix } from './../servicos/proposicoes';
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { appStyles } from './app.css';

@customElement('edt-app')
export class EdtApp extends LitElement {
  static styles = appStyles;

  @query('lexml-emenda')
  private lexmlEmenda!: any;

  @query('lexml-eta')
  private lexmlEta!: any;

  @query('lexml-emenda-comando')
  private lexmlComandoEmenda!: any;

  @state()
  private jsonixProposicao: any = {};

  createRenderRoot(): LitElement {
    return this;
  }

  private isJsonixProposicaoLoaded(): boolean {
    return 'value' in this.jsonixProposicao;
  }

  private onChange(): void {
    this.lexmlComandoEmenda.emenda = this.lexmlEta.getComandoEmenda();
  }

  private async loadMPV(): Promise<any> {
    this.jsonixProposicao = await getProposicaoJsonix('MPV', '1089', 2021);
  }

  private onItemMenuSelecionado(ev: CustomEvent): void {
    if (ev.detail.itemMenu === 'nova') {
      this.loadMPV();
    }
  }

  private renderNotasVersao(): TemplateResult {
    return this.isJsonixProposicaoLoaded()
      ? html``
      : html` <edt-notas-versao></edt-notas-versao> `;
  }

  private renderEditorEmenda(): TemplateResult {
    return html`
      <div
        class="editor-emendas"
        style=${this.isJsonixProposicaoLoaded() ? '' : 'display: none;'}
      >
        <lexml-emenda
          @onchange=${this.onChange}
          modo="emenda"
          .projetoNorma=${this.jsonixProposicao}
        ></lexml-emenda>
        <lexml-emenda-comando></lexml-emenda-comando>
      </div>
    `;
  }

  render(): TemplateResult {
    return html`
      <edt-cabecalho></edt-cabecalho>
      <edt-menu @item-selecionado=${this.onItemMenuSelecionado}></edt-menu>
      <hr />
      <main>${this.renderNotasVersao()} ${this.renderEditorEmenda()}</main>
      <edt-rodape></edt-rodape>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-app': EdtApp;
  }
}
