/* eslint-disable @typescript-eslint/no-unused-vars */
// import { getSigla, getNumero, getAno } from './../model/lexml/urnUtil';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert';
import { Proposicao } from '../model/proposicao';
import { buildContent, getUrn } from './../model/lexml/jsonixUtil';
import { getProposicaoJsonix } from './../servicos/proposicoes';
import { appStyles } from './app.css';

import { fileOpen, fileSave } from 'browser-fs-access';

@customElement('edt-app')
export class EdtApp extends LitElement {
  private tituloEmenda = '';
  private labelTipoEmenda = '';
  carregando = false;

  @query('lexml-emenda')
  private lexmlEmenda!: any;

  @query('edt-modal-nova-emenda')
  private modalNovaEmenda!: any;

  @query('edt-modal-visualizar-pdf')
  private modalVisualizarPdf!: any;

  @query('edt-modal-onde-couber')
  private modalOndeCouber!: any;

  private jsonixProposicao: any = {};

  @state()
  private modo = 'emenda';

  @state()
  private proposicao: Proposicao = {};

  private fileHandle: any;

  createRenderRoot(): LitElement {
    return this;
  }

  public toggleCarregando(): void {
    if (this.carregando === true) {
      document.querySelector('.overlay-carregando')!.classList.add('hidden');
      document.querySelector('edt-app')!.classList.remove('blured');
      this.carregando = false;
    } else {
      document.querySelector('.overlay-carregando')!.classList.remove('hidden');
      document.querySelector('edt-app')!.classList.add('blured');
      this.carregando = true;
    }
    console.log('Carregando...');
  }

  private isJsonixProposicaoLoaded(): boolean {
    return 'value' in this.jsonixProposicao;
  }

  private async downloadPdf(): Promise<void> {
    const emenda = this.lexmlEmenda.getEmenda();
    if (emenda) {
      const response = await fetch('api/emenda/json2pdf', {
        method: 'POST',
        body: JSON.stringify(emenda),
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

  getFileName(): string {
    const fileName = this.tituloEmenda.replace(/[.].*$/, '');
    return `${fileName || 'nova'}.emenda.pdf`;
  }

  async abrirPdf() {
    const fileData = await fileOpen({
      description: 'Arquivos PDF',
      mimeTypes: ['application/pdf'],
      extensions: ['.pdf'],
      multiple: false,
    });

    this.fileHandle = fileData.handle;

    const response = await fetch('api/emenda/pdf2json/', {
      method: 'POST',
      body: fileData,
      headers: {
        'Content-Type': 'application/pdf;charset=UTF-8',
      },
    });
    const content = await response.json();

    this.lexmlEmenda.resetaEmenda();

    await this.loadTextoProposicao(content.proposicao);
    this.lexmlEmenda.setEmenda(content);

    return fileData;
  }

  private async salvarPdf(): Promise<void> {
    this.toggleCarregando();

    const emenda = this.lexmlEmenda.getEmenda();
    if (emenda) {
      const response = await fetch('api/emenda/json2pdf', {
        method: 'POST',
        body: JSON.stringify(emenda),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      try {
        const options = {
          fileName: this.getFileName(),
          extensions: ['.pdf'],
          id: 'editor-emendas',
          excludeAcceptAllOption: true,
        };

        const content = await response.blob();

        this.fileHandle = await fileSave(
          content,
          options,
          this.fileHandle,
          true
        );
      } catch (err) {
        console.log(err);
        this.emitirAlerta(`Erro ao salvar o arquivo: ${err}`);
      } finally {
        this.toggleCarregando();
      }
    }
  }

  private async salvarPdfComo(): Promise<void> {
    this.toggleCarregando();
    const pickerOptions = {
      suggestedName: this.getFileName(),
      types: [
        {
          description: 'Arquivos de Emenda',
          accept: {
            'application/pdf': ['.pdf'],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    };

    const emenda = this.lexmlEmenda.getEmenda();
    if (emenda) {
      let writableStream;
      let fileHandle;
      try {
        const response = await fetch('api/emenda/json2pdf', {
          method: 'POST',
          body: JSON.stringify(emenda),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        });
        const content = await response.blob();

        fileHandle = await (window as any).showSaveFilePicker(pickerOptions);
        this.tituloEmenda = await fileHandle.name;
        writableStream = await fileHandle.createWritable();
        await writableStream.write(content);
        this.fileHandle = fileHandle;
      } catch (err) {
        if (
          !(err as any)['message'].includes('cancel') &&
          !(err as any)['message'].includes('abort')
        ) {
          console.log(err);
          this.emitirAlerta(
            `Erro ao salvar o arquivo: ${(err as any).message}`
          );
        }
      } finally {
        this.toggleCarregando();

        if (writableStream) {
          await writableStream.close();
        }
      }
    }
  }

  private abrirVideos(): void {
    window.open(
      'https://www.youtube.com/playlist?list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2'
    );
    const gtag = window.dataLayer.gtag || [];
    gtag.push(gtag, 'event', 'Abrir videos', {
      event_category: 'Videos',
      event_label: 'AbrirVideos',
    });
    console.log('gtag', gtag);
  }

  private abrirWiki(): void {
    window.open('https://github.com/lexml/editor-emendas/wiki/Ajuda');
  }

  // Emite notificação de erro como toast
  private emitirAlerta(
    message: string,
    variant = 'primary',
    icon = 'info-circle',
    duration = 3000
  ) {
    const alert = Object.assign(document.createElement('sl-alert') as SlAlert, {
      variant,
      closable: true,
      duration: duration,
      innerHTML: `
        <sl-icon name="${icon}" slot="icon"></sl-icon>
        ${message}
      `,
    });

    document.body.append(alert);
    return alert.toast();
  }

  private getEmentaSemTags(texto: string): string {
    return texto.replace(/(<([^>]+)>)/gi, '');
  }

  private async loadTextoProposicao(proposicao: Proposicao): Promise<void> {
    this.toggleCarregando();
    try {
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
          this.jsonixProposicao?.value?.projetoNorma?.norma?.parteInicial
            ?.ementa.content
        ),
      };
      this.proposicao.nomeProposicao =
        this.proposicao.sigla +
        ' ' +
        (/[\d]+/.test(this.proposicao.numero!)
          ? +this.proposicao.numero!
          : this.proposicao.numero) +
        '/' +
        this.proposicao.ano;
      this.tituloEmenda =
        'Emenda ' + (this.proposicao.nomeProposicao ?? '').replace('/', ' ');
    } catch (err) {
      console.log(err);
      this.emitirAlerta('Não se trata de um PDF gerado pelo Editor de Emendas');
    } finally {
      this.toggleCarregando();
    }
  }

  private onItemMenuSelecionado(ev: CustomEvent): void {
    if (ev.detail.itemMenu === 'nova') {
      this.fileHandle = undefined;
      this.modalNovaEmenda.show();
    } else if (ev.detail.itemMenu === 'visualizar') {
      this.modalVisualizarPdf.emenda = this.lexmlEmenda.getEmenda();
      this.modalVisualizarPdf.show();
    } else if (ev.detail.itemMenu === 'onde-couber') {
      this.fileHandle = undefined;
      this.modalOndeCouber.show();
    } else if (ev.detail.itemMenu === 'download') {
      this.downloadPdf();
    } else if (ev.detail.itemMenu === 'salvar') {
      this.salvarPdf();
    } else if (ev.detail.itemMenu === 'salvarComo') {
      this.salvarPdfComo();
    } else if (ev.detail.itemMenu === 'abrir') {
      this.fileHandle = undefined;
      this.abrirPdf();
    } else if (ev.detail.itemMenu === 'videos') {
      this.abrirVideos();
    } else if (ev.detail.itemMenu === 'wiki') {
      this.abrirWiki();
    }
  }

  private onBotaoNotasVersaoSelecionado(ev: CustomEvent): void {
    if (ev.detail.botaoNotasVersao === 'nova') {
      this.modalNovaEmenda.show();
    } else if (ev.detail.botaoNotasVersao === 'abrir') {
      this.abrirPdf();
    }
  }

  private criarNovaEmendaPadrao(proposicao: Proposicao): void {
    this.modo = 'emenda';
    this.tituloEmenda = 'Emenda ' + this.proposicao.nomeProposicao;
    this.labelTipoEmenda = 'Emenda padrão';
    this.lexmlEmenda.resetaEmenda();
    this.loadTextoProposicao(proposicao);
  }

  private criarNovaEmendaArtigoOndeCouber(): void {
    this.modo = 'emendaArtigoOndeCouber';
    this.tituloEmenda = 'Emenda ' + this.proposicao.nomeProposicao;
    this.labelTipoEmenda = 'Emenda onde couber';
    this.lexmlEmenda.resetaEmenda();
    this.jsonixProposicao = { ...this.jsonixProposicao };
  }

  private atualizarTituloEmenda(evt: Event): void {
    this.tituloEmenda = (evt.target as HTMLInputElement).value;
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

            ${this.modo === 'emendaArtigoOndeCouber'
              ? html`<sl-tag variant="primary" size="small" pill
                  >${this.labelTipoEmenda}</sl-tag
                >`
              : ''}

            <span class="detalhe-emenda--ementa">
              ${this.getEmentaSemTags(this.proposicao.ementa ?? '')}
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
              style="display: none"
            ></sl-input>
          </div>
          <sl-dialog
            label="${this.proposicao.nomeProposicao} - Ementa"
            class="dialog-emenda"
          >
            ${this.getEmentaSemTags(this.proposicao.ementa ?? '')}
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
      <edt-menu
        .proposicao=${this.proposicao}
        @item-selecionado=${this.onItemMenuSelecionado}
      ></edt-menu>
      <main class="${this.isJsonixProposicaoLoaded() ? 'no-scroll' : ''}">
        ${this.isJsonixProposicaoLoaded()
          ? ''
          : html` <edt-notas-versao
              @botao-selecionado=${this.onBotaoNotasVersaoSelecionado}
            ></edt-notas-versao>`}
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
  interface Window {
    dataLayer: any;
  }
}
