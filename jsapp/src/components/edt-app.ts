/* eslint-disable @typescript-eslint/no-unused-vars */
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert';
import { fileOpen, fileSave, FileWithHandle } from 'browser-fs-access';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { Proposicao } from '../model/proposicao';
import {
  errorInPromise,
  errorToBeIgnored,
  getHttpError,
  isUserAbortException,
} from '../utils/error-utils';
import { buildContent, getUrn } from './../model/lexml/jsonixUtil';
import {
  getProposicaoJsonix,
  pesquisarProposicoes,
  sendEmailMotivoEmendaTextoLivre,
} from './../servicos/proposicoes';
import { appStyles } from './app.css';
import { EdtMenu } from './edt-menu';
import { getVersao } from '../servicos/info-app';
import { Usuario } from '../model/usuario';
import { LexmlEmendaParametrosEdicao } from '../model/lexml/parametros';

@customElement('edt-app')
export class EdtApp extends LitElement {
  private tituloEmenda = '';
  private labelTipoEmenda = '';

  @state()
  private usuario: Usuario = {
    nome: 'Anônimo',
    sigla: undefined,
  };

  @state()
  private versao = '---';

  @query('lexml-emenda')
  private lexmlEmenda!: any;

  @query('edt-modal-nova-emenda')
  private modalNovaEmenda!: any;

  @query('edt-modal-visualizar-pdf')
  private modalVisualizarPdf!: any;

  @query('edt-modal-onde-couber')
  private modalOndeCouber!: any;

  @query('edt-modal-texto-livre')
  private modalTextoLivre!: any;

  @query('edt-menu')
  private edtMenu!: EdtMenu;

  @query('edt-modal-confirmacao-salvar')
  private modalConfirmacaoSalvar!: any;

  @query('edt-modal-ajuda')
  private modalAjuda!: any;

  @query('edt-modal-usuario')
  private modalUsuario!: any;

  @query('edt-modal-orientacoes')
  private modalOrientacoes!: any;

  @query('edt-modal-sufixos')
  private modalSufixos!: any;

  @query('edt-modal-emenda-sem-texto')
  private modalEmendaSemTexto!: any;

  private jsonixProposicao: any = {};

  private showEditor = false;

  @state()
  private modo = 'emenda';

  private motivo = '';

  @state()
  private proposicao: Proposicao = {};

  private fileHandle: any;

  private emendaComAlteracoesSalvas: any;

  @state()
  private isDirty = false;

  @state()
  private wasSaved = false;

  @state()
  private isOpenFile = false;

  constructor() {
    super();
    getVersao().then(versao => {
      this.versao = versao;
    });
    // TODO - Retirar no futuro
    localStorage.removeItem('versao');
  }

  private executarAcaoParametrizada(): void {
    const params = new URLSearchParams(document.location.search);
    const acao = params.get('acao');

    switch (acao) {
      case 'nova-emenda':
        this.novaEmenda(params);
        break;
    }
  }

  private limparParametros(): void {
    const url = location.protocol + '//' + location.host + location.pathname;
    window.history.replaceState({}, document.title, url);
  }

  private async novaEmenda(params: URLSearchParams): Promise<void> {
    const sigla = params.get('sigla');
    const numero = params.get('numero');
    const ano = params.get('ano');

    if (sigla && numero && ano) {
      const proposicao = await this.buscarProposicao(
        sigla,
        numero,
        Number(ano)
      );
      if (proposicao) {
        this.proposicao = proposicao;
        this.criarNovaEmendaPadrao(proposicao);
      }
    }
    this.limparParametros();
  }

  private async buscarProposicao(
    sigla: string,
    numero: string,
    ano: number
  ): Promise<Proposicao | undefined> {
    const proposicoes = await pesquisarProposicoes(sigla, numero, ano);
    return proposicoes?.length ? proposicoes[0] : undefined;
  }

  createRenderRoot(): LitElement {
    return this;
  }

  public toggleCarregando(mostrarCarregando?: boolean): void {
    if (mostrarCarregando === undefined) {
      mostrarCarregando = document
        .querySelector('.overlay-carregando')!
        .classList.contains('hidden');
    }
    if (mostrarCarregando) {
      document.querySelector('.overlay-carregando')!.classList.remove('hidden');
      document.querySelector('edt-app')!.classList.add('blured');
    } else {
      document.querySelector('.overlay-carregando')!.classList.add('hidden');
      document.querySelector('edt-app')!.classList.remove('blured');
    }
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
    const fileName = this.tituloEmenda;
    return `${fileName || 'nova'}.emenda.pdf`;
  }

  abrirPdf(): void {
    let tempFileData: FileWithHandle;

    fileOpen({
      description: 'Arquivos PDF',
      mimeTypes: ['application/pdf'],
      extensions: ['.pdf'],
      multiple: false,
    })
      .catch(err => {
        if (isUserAbortException(err)) {
          return Promise.reject(errorToBeIgnored);
        }
        return Promise.reject(
          errorInPromise('Ocorreu uma falha na abertura do arquivo.', err)
        );
      })
      .then((fileData: FileWithHandle) => {
        tempFileData = fileData;

        this.toggleCarregando();

        return fetch('api/emenda/pdf2json-novo/', {
          method: 'POST',
          body: fileData,
          headers: {
            'Content-Type': 'application/pdf;charset=UTF-8',
          },
        });
      })
      .catch(err => {
        return Promise.reject(
          errorInPromise(
            'Falha na conexão com servidor. Por favor, tente mais tarde.',
            err
          )
        );
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return getHttpError(
          response,
          'Ocorreu um erro inesperado na abertura da emenda.'
        ).then(err => Promise.reject(err));
      })
      .then(emenda => {
        this.modo = emenda.modoEdicao;

        if (
          this.modo !== 'emendaArtigoOndeCouber' &&
          this.modo !== 'emendaTextoLivre' &&
          this.modo !== 'emendaSubstituicaoTermo'
        ) {
          return this.loadTextoProposicao(emenda.proposicao).then(() => emenda);
        } else {
          return this.buildProposicaoMPSemArticulacao(emenda.proposicao).then(
            () => emenda
          );
        }
      })
      .then(async emenda => {
        const { sigla, numero, ano } = emenda.proposicao;
        this.proposicao =
          (await this.buscarProposicao(sigla, numero, Number(ano))) ??
          this.proposicao;
        this.labelTipoEmenda = this.getTipoEmenda(this.modo);
        this.proposicao.ementa = emenda.proposicao.ementa;
        this.lexmlEmenda.inicializarEdicao({
          modo: this.modo,
          projetoNorma: this.jsonixProposicao,
          emenda,
        });
        this.updateStateElements(tempFileData.name);
        this.fileHandle = tempFileData.handle;
        this.tituloEmenda = this.removeExtensoesPadrao(tempFileData.name);
        //this.emendaComAlteracoesSalvas = undefined;
        this.emendaComAlteracoesSalvas = JSON.parse(JSON.stringify(emenda));
        this.isDirty = false;
        this.isOpenFile = true;
      })
      .catch(err => {
        errorInPromise(
          'Ocorreu um erro inesperado na abertura da emenda.',
          err,
          msg => {
            this.emitirAlerta(msg, 'danger');
          }
        );
      })
      .finally(() => {
        this.toggleCarregando(false);
      });
  }

  private async buildProposicaoMPSemArticulacao(
    proposicao: any
  ): Promise<void> {
    this.proposicao =
      (await this.buscarProposicao(
        proposicao.sigla,
        proposicao.numero,
        Number(proposicao.ano)
      )) ?? this.proposicao;

    this.tituloEmenda =
      'Emenda ' + this.proposicao.nomeProposicao!.replace('/', ' ');
    //this.lexmlEmenda.projetoNorma = this.jsonixProposicao;
    this.showEditor = true;
    this.atualizarTituloEditor();
  }

  private async salvarPdf(salvarComo = false): Promise<void> {
    const emenda = this.lexmlEmenda.getEmenda();

    if (emenda) {
      this.toggleCarregando();

      fetch('api/emenda/json2pdf', {
        method: 'POST',
        body: JSON.stringify(emenda),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.blob();
          }
          return getHttpError(
            response,
            'Ocorreu um erro ao salvar o arquivo.'
          ).then(err => Promise.reject(err));
        })
        .then(content => {
          const options = {
            fileName: this.getFileName(),
            extensions: ['.pdf'],
            id: 'editor-emendas',
            excludeAcceptAllOption: true,
          };

          if (salvarComo) {
            return fileSave(content, options, null, true);
          } else {
            return fileSave(content, options, this.fileHandle, true);
          }
        })
        .then(fileHandle => {
          this.fileHandle = fileHandle;
          this.emendaComAlteracoesSalvas = JSON.parse(JSON.stringify(emenda));
          this.isDirty = false;
          this.wasSaved = true;
          this.updateStateElements(fileHandle!.name);
          this.emitirAlerta('Arquivo salvo com sucesso!', 'success');
        })
        .catch(err => {
          if (!isUserAbortException(err)) {
            errorInPromise(`Erro ao salvar o arquivo: ${err}`, err, msg => {
              this.emitirAlerta(msg, 'danger');
            });
          }
        })
        .finally(() => {
          this.toggleCarregando();
        });
    }
  }

  private async salvarPdfComo(): Promise<void> {
    this.salvarPdf(true);
  }

  private abrirVideos(): void {
    if (this.modalAjuda !== null) {
      this.modalAjuda.show();
    }
  }

  private abrirOrientacoes(): void {
    this.modalOrientacoes.show();
  }

  private checkAndShowSufixos(): void {
    const orientationShown = localStorage.getItem('naoMostrarExplicacaoSufixo');
    if (!orientationShown) {
      this.modalSufixos.show();
    }
  }

  private showModalSufixos(): void {
    if (this.modalSufixos !== null) {
      this.modalSufixos.show();
    }
  }

  private showModalEmendaSemTexto(proposicaoSelecionada: Proposicao): void {
    if (this.modalEmendaSemTexto !== null) {
      this.modalEmendaSemTexto.show(proposicaoSelecionada);
    }
  }

  private abrirWiki(): void {
    window.open('https://github.com/lexml/editor-emendas/wiki/Ajuda');
  }

  private abrirQuadroDeEmendas(): void {
    if (this.proposicao) {
      window.open(
        'quadro-emendas.html?sigla=' +
          this.proposicao.sigla +
          '&numero=' +
          this.proposicao.numero +
          '&ano=' +
          this.proposicao.ano +
          '&exibir=quadro'
      );
    }
  }

  private abrirPaginaMP(): void {
    if (this.proposicao) {
      window.open(
        `https://www.congressonacional.leg.br/materias/medidas-provisorias/-/mpv/${this
          .proposicao.codMateriaMigradaMATE!}`
      );
    }
  }

  // Emite notificação de erro como toast
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
        ...this.proposicao,
        urn,
        sigla, //sigla: getSigla(urn),
        numero, //numero: getNumero(urn),
        ano, //ano: getAno(urn),
        ementa: buildContent(
          this.jsonixProposicao?.value?.projetoNorma?.norma?.parteInicial
            ?.ementa.content
        ),
      };

      this.tituloEmenda =
        'Emenda ' + (this.proposicao.nomeProposicao ?? '').replace('/', ' ');
      this.lexmlEmenda.projetoNorma = this.jsonixProposicao;
      this.showEditor = true;
    } catch (err) {
      console.log(err);
      this.emitirAlerta(
        'Não se trata de um PDF gerado pelo Editor de Emendas',
        'primary'
      );
    } finally {
      this.atualizarTituloEditor();
      this.toggleCarregando();
      this.checkAndShowOrientacoes();
    }
  }

  private removeExtensoesPadrao(nomeArquivo: string): string {
    return nomeArquivo.replace(/\.emenda/g, '').replace(/\.pdf/g, '');
  }

  private atualizarTituloEditor(tituloEmenda = ''): void {
    if (tituloEmenda) {
      this.tituloEmenda = this.removeExtensoesPadrao(tituloEmenda);
      document.title = this.tituloEmenda + ' - Editor de Emendas';
    }

    const titulo = document.querySelector('#titulo');

    if (titulo) {
      titulo.innerHTML =
        'Editor de Emendas - <span>' +
        this.tituloEmenda +
        '</span>' +
        (this.isDirty
          ? ' <span class="emenda-status emenda-status--dirty" aria-label="As alterações não foram salvas" title="As alterações não foram salvas"></span>'
          : '');
    }
  }

  private resizeObserver(): void {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const height = entry.contentRect.height - 260;
        const editor = document.querySelector('#lx-eta-editor');
        const justificativa = document.querySelector('#editor-justificativa');

        if (editor) {
          editor.setAttribute('style', `height: ${height}px`);
        }
        if (justificativa) {
          justificativa.setAttribute('style', `height: ${height}px`);
        }
      }
    });
    resizeObserver.observe(this);
  }

  private novaEmendaPadrao(): void {
    this.fileHandle = undefined;
    this.modalNovaEmenda.show();
  }

  private novaEmendaOndeCouber(): void {
    this.fileHandle = undefined;
    this.modalOndeCouber.show();
  }

  private novaEmendaSubstituicaoTermo(): void {
    this.fileHandle = undefined;

    if (this.emendaSemTexto()) {
      this.criarNovaEmendaSubstituicaoTermoSemTexto(this.proposicao);
    } else {
      this.criarNovaEmenda({ ...this.proposicao }, 'emendaSubstituicaoTermo');
    }
  }

  private emendaSemTexto(): boolean {
    return (
      this.proposicao.idSdlegDocumentoItemDigital === undefined ||
      this.proposicao.idSdlegDocumentoItemDigital === null
    );
  }

  private novaEmendaTextoLivre(): void {
    this.fileHandle = undefined;
    this.modalTextoLivre.show();
  }

  private abrirEmenda(): void {
    this.abrirPdf();
  }

  private nextFunctionAfterConfirm?: any;
  private checkDirtyAndExecuteNextFunction(nextFunction: any): void {
    if (this.isDirty) {
      this.modalConfirmacaoSalvar.show();
      this.nextFunctionAfterConfirm = nextFunction;
    } else {
      nextFunction();
    }
  }

  private async processarResultadoConfirmacao(evt: CustomEvent): Promise<void> {
    if (evt.detail === 'salvar') {
      await this.salvarPdf();
      this.nextFunctionAfterConfirm();
    } else if (evt.detail === 'nao-salvar') {
      this.nextFunctionAfterConfirm();
    }
    this.nextFunctionAfterConfirm = undefined;
  }

  public onItemMenuSelecionado(ev: CustomEvent): void {
    if (ev.detail.itemMenu === 'nova') {
      this.checkDirtyAndExecuteNextFunction(() => this.novaEmendaPadrao());
    } else if (ev.detail.itemMenu === 'visualizar') {
      this.toggleCarregando();
      this.modalVisualizarPdf.emenda = this.lexmlEmenda.getEmenda();
      this.modalVisualizarPdf.show();
      this.toggleCarregando();
    } else if (ev.detail.itemMenu === 'onde-couber') {
      this.checkDirtyAndExecuteNextFunction(() => this.novaEmendaOndeCouber());
    } else if (ev.detail.itemMenu === 'substituicao-termo') {
      this.checkDirtyAndExecuteNextFunction(() =>
        this.novaEmendaSubstituicaoTermo()
      );
    } else if (ev.detail.itemMenu === 'texto-livre') {
      this.checkDirtyAndExecuteNextFunction(() => this.novaEmendaTextoLivre());
    } else if (ev.detail.itemMenu === 'download') {
      this.downloadPdf();
    } else if (ev.detail.itemMenu === 'salvar') {
      this.salvarPdf();
    } else if (ev.detail.itemMenu === 'salvarComo') {
      this.salvarPdfComo();
    } else if (ev.detail.itemMenu === 'abrir') {
      this.checkDirtyAndExecuteNextFunction(() => this.abrirEmenda());
    } else if (ev.detail.itemMenu === 'orientacoes') {
      this.abrirOrientacoes();
    } else if (ev.detail.itemMenu === 'videos') {
      this.abrirVideos();
    } else if (ev.detail.itemMenu === 'wiki') {
      this.abrirWiki();
    } else if (ev.detail.itemMenu === 'quadroEmendas') {
      this.abrirQuadroDeEmendas();
    } else if (ev.detail.itemMenu === 'sufixos') {
      this.abreModalSufixos();
    }
    // else if (ev.detail.itemMenu === 'emendaSemTexto') {
    //   this.showModalEmendaSemTexto();
    // }
  }

  private abreModalSufixos(): void {
    this.lexmlEmenda.openModalSufixos();
  }

  private onBotaoNotasVersaoSelecionado(ev: CustomEvent): void {
    if (ev.detail.botaoNotasVersao === 'nova') {
      this.modalNovaEmenda.show();
    } else if (ev.detail.botaoNotasVersao === 'abrir') {
      this.abrirEmenda();
    } else if (ev.detail.botaoNotasVersao === 'videos') {
      this.abrirVideos();
    }
  }

  private async criarNovaEmendaPadrao(proposicao: Proposicao): Promise<void> {
    this.criarNovaEmenda(proposicao, 'emenda');
  }

  private async criarNovaEmendaTextoLivre(
    proposicao: Proposicao,
    motivo: string
  ): Promise<void> {
    if (this.emendaSemTexto()) {
      this.criarNovaEmendaTextoLivreSemTexto(proposicao);
    } else {
      this.criarNovaEmenda(proposicao, 'emendaTextoLivre', motivo);
    }
    sendEmailMotivoEmendaTextoLivre(motivo);
  }

  private async criarNovaEmendaTextoLivreSemTexto(
    proposicaoSelecionada?: Proposicao
  ): Promise<void> {
    this.modo = 'emendaTextoLivre';

    setTimeout(() => {
      if (
        proposicaoSelecionada &&
        proposicaoSelecionada.sigla &&
        proposicaoSelecionada.numero &&
        proposicaoSelecionada.ano &&
        proposicaoSelecionada.ementa
      ) {
        const params = new LexmlEmendaParametrosEdicao();
        params.modo = this.modo;
        // this.tituloEmenda =
        //   'Emenda ' +
        //   (proposicaoSelecionada.nomeProposicao ?? '').replace('/', ' ');
        params.proposicao = {
          sigla: proposicaoSelecionada.sigla!,
          numero: proposicaoSelecionada.numero!,
          ano: proposicaoSelecionada.ano!,
          ementa: proposicaoSelecionada.ementa!,
        };

        this.proposicao = { ...proposicaoSelecionada };

        this.tituloEmenda =
          'Emenda ' + this.proposicao.nomeProposicao!.replace('/', ' ');
        params.motivo = 'Medida provisória sem articulação';
        this.showEditor = true;
        this.lexmlEmenda.inicializarEdicao(params);
        sendEmailMotivoEmendaTextoLivre(params.motivo);
        //this.lexmlEmenda.style.display = 'block';

        this.atualizarTituloEditor();
        setTimeout(() => {
          this.emendaComAlteracoesSalvas = JSON.parse(
            JSON.stringify(this.lexmlEmenda.getEmenda())
          );
          this.isDirty = false;
          this.isOpenFile = false;
          this.wasSaved = false;
          this.updateStateElements();
        }, 0);
      }
    }, 0);
  }

  private async criarNovaEmendaSubstituicaoTermoSemTexto(
    proposicaoSelecionada?: Proposicao
  ): Promise<void> {
    this.modo = 'emendaSubstituicaoTermo';

    setTimeout(() => {
      if (
        proposicaoSelecionada &&
        proposicaoSelecionada.sigla &&
        proposicaoSelecionada.numero &&
        proposicaoSelecionada.ano &&
        proposicaoSelecionada.ementa
      ) {
        const params = new LexmlEmendaParametrosEdicao();
        params.modo = this.modo;
        params.proposicao = {
          sigla: proposicaoSelecionada.sigla!,
          numero: proposicaoSelecionada.numero!,
          ano: proposicaoSelecionada.ano!,
          ementa: proposicaoSelecionada.ementa!,
        };

        this.proposicao = { ...proposicaoSelecionada };

        this.tituloEmenda =
          'Emenda ' + this.proposicao.nomeProposicao!.replace('/', ' ');
        this.showEditor = true;
        this.lexmlEmenda.inicializarEdicao(params);
        //this.lexmlEmenda.style.display = 'block';

        this.atualizarTituloEditor();
        setTimeout(() => {
          this.emendaComAlteracoesSalvas = JSON.parse(
            JSON.stringify(this.lexmlEmenda.getEmenda())
          );
          this.isDirty = false;
          this.isOpenFile = false;
          this.wasSaved = false;
          this.updateStateElements();
        }, 0);
      }
    }, 0);
  }
  private getTipoEmenda(modo: string): string {
    switch (modo) {
      case 'emendaArtigoOndeCouber':
        return 'Emenda onde couber';
      case 'emenda':
        return 'Emenda padrão';
      case 'emendaTextoLivre':
        return 'Emenda texto livre';
      case 'emendaSubstituicaoTermo':
        return 'Emenda substituição de termo';
    }

    return '';
  }

  private async criarNovaEmenda(
    proposicao: Proposicao,
    modo: string,
    motivo = ''
  ): Promise<void> {
    this.proposicao = proposicao;
    this.modo = modo;
    this.motivo = motivo;
    this.tituloEmenda = 'Emenda ' + proposicao.nomeProposicao;
    this.labelTipoEmenda = this.getTipoEmenda(this.modo); //'Emenda padrão';
    await this.loadTextoProposicao(proposicao);

    this.lexmlEmenda.inicializarEdicao({
      modo: this.modo,
      projetoNorma: this.jsonixProposicao,
      motivo: this.motivo,
    });
    setTimeout(() => {
      this.emendaComAlteracoesSalvas = JSON.parse(
        JSON.stringify(this.lexmlEmenda.getEmenda())
      );
      this.isDirty = false;
      this.isOpenFile = false;
      this.wasSaved = false;
      this.updateStateElements();
    }, 200);
  }

  private criarNovaEmendaArtigoOndeCouber(
    proposicaoSelecionada?: Proposicao
  ): void {
    this.modo = 'emendaArtigoOndeCouber';
    this.tituloEmenda = 'Emenda ' + this.proposicao.nomeProposicao;
    this.labelTipoEmenda = this.getTipoEmenda(this.modo); //'Emenda onde couber';

    setTimeout(() => {
      if (
        proposicaoSelecionada &&
        proposicaoSelecionada.sigla &&
        proposicaoSelecionada.numero &&
        proposicaoSelecionada.ano &&
        proposicaoSelecionada.ementa
      ) {
        const params = new LexmlEmendaParametrosEdicao();
        params.modo = this.modo;

        params.proposicao = {
          sigla: proposicaoSelecionada.sigla!,
          numero: proposicaoSelecionada.numero!,
          ano: proposicaoSelecionada.ano!,
          ementa: proposicaoSelecionada.ementa!,
        };

        this.proposicao = { ...proposicaoSelecionada };

        this.tituloEmenda =
          'Emenda ' + this.proposicao.nomeProposicao!.replace('/', ' ');

        this.showEditor = true;
        this.lexmlEmenda.inicializarEdicao(params);
        //this.lexmlEmenda.style.display = 'block';
      } else {
        this.lexmlEmenda.inicializarEdicao({
          modo: this.modo,
          projetoNorma: this.jsonixProposicao,
        });
      }
      this.atualizarTituloEditor();
      setTimeout(() => {
        this.emendaComAlteracoesSalvas = JSON.parse(
          JSON.stringify(this.lexmlEmenda.getEmenda())
        );
        this.isDirty = false;
        this.isOpenFile = false;
        this.wasSaved = false;
        this.updateStateElements();
      }, 0);
    }, 0);
  }

  private atualizarTituloEmenda(evt: Event): void {
    this.tituloEmenda = (evt.target as HTMLInputElement).value;
    this.atualizarTituloEditor();
  }

  protected firstUpdated(): void {
    this.toggleCarregando(false);
    window.onbeforeunload = (): any => (this.isDirty ? '---' : undefined);
    this.executarAcaoParametrizada();
  }

  private onChange(): void {
    if (!this.emendaComAlteracoesSalvas) {
      this.emendaComAlteracoesSalvas = this.lexmlEmenda.getEmenda();
      this.isDirty = false;
    } else {
      this.isDirty = this.checarAlteracoesNaEmenda();
    }
    this.updateStateElements();
  }

  private onRevisao(evt: CustomEvent): void {
    if (evt.detail?.emRevisao && this.usuario.nome === 'Anônimo') {
      this.informarUsuario();
    }
  }

  private updateStateElements(tituloEmenda?: string): void {
    setTimeout(() => {
      if (this.edtMenu.btnSave !== null) {
        this.edtMenu.btnSave.disabled = !this.isDirty;
        this.edtMenu.btnSaveAs.disabled = !this.wasSaved && !this.isOpenFile;
      }
      this.atualizarTituloEditor(tituloEmenda ?? this.tituloEmenda);
    }, 0);
  }

  private checarAlteracoesNaEmenda(): boolean {
    const emendaComAlteracoesSalvas = {
      ...this.emendaComAlteracoesSalvas,
      dataUltimaModificacao: null,
    };
    const emenda = {
      ...this.lexmlEmenda.getEmenda(),
      dataUltimaModificacao: null,
    };

    // return JSON.stringify(emendaOriginal) !== JSON.stringify(emenda)
    const _isDirty =
      JSON.stringify(emendaComAlteracoesSalvas) !== JSON.stringify(emenda);

    return _isDirty;
  }

  private informarUsuario(): void {
    this.modalUsuario.usuario = this.usuario;
    this.modalUsuario.show();
  }

  private atualizarUsuario(usuario: Usuario): void {
    this.usuario = usuario;
    this.lexmlEmenda.setUsuario(usuario);
  }

  private checkAndShowOrientacoes(): void {
    const orientationShown = localStorage.getItem('wizardOrientacoes');

    if (!orientationShown) {
      this.modalOrientacoes.step = 1;
      this.modalOrientacoes.show();
    }
  }

  private getDataPrazoEmenda(proposicao: Proposicao): string | undefined {
    return proposicao?.dataLimiteRecebimentoEmendas
      ?.split('-')
      .reverse()
      .join('/');
  }
  private getTextoComplementarPrazoEmenda(
    proposicao: Proposicao
  ): string | undefined {
    if (!proposicao) return undefined;
    if (proposicao.labelPrazoRecebimentoEmendas?.match(/^\d+\/\d+\/\d+/)) {
      return proposicao.labelPrazoRecebimentoEmendas?.substring(11);
    } else {
      return proposicao.labelPrazoRecebimentoEmendas;
    }
  }
  private renderEditorEmenda(): TemplateResult {
    return html`
      ${appStyles}
      <div
        class="editor-emendas"
        style=${this.showEditor ? '' : 'display: none;'}
      >
        <div class="detalhe-emenda">
          <a
            href="#"
            onclick="document.querySelector('.dialog-emenda').show();"
            class="detalhe-emenda--titulo"
            aria-label="Expandir ementa"
            title="Expandir ementa"
          >
            <sl-tag
              class="detalhe-emenda--nome-proposicao"
              variant="primary"
              size="small"
              pill
            >
              ${this.proposicao.nomeProposicao}
            </sl-tag>

            <sl-tooltip id="detalhe-emenda--tooltip" placement="bottom">
              <div slot="content">
                <div>
                  <b>Prazo de emenda:</b> ${this.getDataPrazoEmenda(
                    this.proposicao
                  ) +
                  ' (' +
                  this.getTextoComplementarPrazoEmenda(this.proposicao) +
                  ')'}
                </div>
                <div>
                  <b>Tramitação:</b> ${this.proposicao.labelTramitacao ?? ''}
                </div>
              </div>
              <sl-tag
                class="detalhe-emenda--prazo"
                variant="primary"
                size="small"
                title=""
                pill
                ><sl-icon name="alarm"></sl-icon>
              </sl-tag>
            </sl-tooltip>

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
              .value=${this.tituloEmenda}
              @input=${(ev: Event): void => this.atualizarTituloEmenda(ev)}
              placeholder="Emenda à ${this.proposicao.nomeProposicao}"
              size="small"
              clearable
              style="display: none"
            ></sl-input>
          </div>
          ${this.renderDialogProposicao()}
        </div>
        <lexml-emenda
          modo=${this.modo}
          @onchange=${this.onChange}
          @onrevisao=${this.onRevisao}
          @onmodalsufixos=${() => this.showModalSufixos()}
        ></lexml-emenda>
      </div>

      <edt-modal-nova-emenda
        @nova-emenda-padrao=${(ev: CustomEvent): any =>
          this.criarNovaEmendaPadrao(ev.detail.proposicao)}
        @abrir-modal-emenda-sem-texto=${(ev: CustomEvent): any =>
          this.showModalEmendaSemTexto(ev.detail.proposicao)}
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

      <edt-modal-texto-livre
        @nova-emenda-texto-livre=${(ev: CustomEvent): any =>
          this.criarNovaEmendaTextoLivre(
            { ...this.proposicao },
            ev.detail.motivo
          )}
      ></edt-modal-texto-livre>

      <edt-modal-confirmacao-salvar
        @confirm-result=${this.processarResultadoConfirmacao}
      ></edt-modal-confirmacao-salvar>

      <edt-modal-usuario
        @atualizar-usuario=${(ev: CustomEvent): any =>
          this.atualizarUsuario(ev.detail.usuario)}
      ></edt-modal-usuario>

      <edt-modal-orientacoes @open-modal-videos=${() => this.abrirVideos()}>
      </edt-modal-orientacoes>
      <edt-modal-sufixos></edt-modal-sufixos>
      <edt-modal-emenda-sem-texto
        @cria-artigo-onde-couber=${(ev: CustomEvent): any =>
          this.criarNovaEmendaArtigoOndeCouber({
            ...ev.detail.proposicaoSelecionada,
          })}
        @cria-texto-livre=${(ev: CustomEvent): any =>
          this.criarNovaEmendaTextoLivreSemTexto({
            ...ev.detail.proposicaoSelecionada,
          })}
        @cria-substituicao-termo=${(ev: CustomEvent): any =>
          this.criarNovaEmendaSubstituicaoTermoSemTexto({
            ...ev.detail.proposicaoSelecionada,
          })}
      >
      </edt-modal-emenda-sem-texto>
    `;
  }

  renderDialogProposicao(): TemplateResult {
    return html`
      <sl-dialog
        label="${this.proposicao.nomeProposicao} - Ementa"
        class="dialog-emenda"
      >
        ${this.getEmentaSemTags(this.proposicao.ementa ?? '')}
        <br /><br />
        <label>Prazo para apresentar emenda:</label>
        ${this.getDataPrazoEmenda(this.proposicao)}
        <sl-badge
          title="${this.getDataPrazoEmenda(this.proposicao)}"
          variant="neutral"
          >${this.getTextoComplementarPrazoEmenda(this.proposicao)}</sl-badge
        >
        <br /><br />
        <label>Tramitação:</label>
        <sl-badge variant="neutral" title="${this.proposicao?.labelTramitacao}"
          >${this.proposicao?.labelTramitacao}</sl-badge
        >
        <br /><br />
        <sl-button
          href=""
          variant="primary"
          outline
          @click=${(): void => this.abrirQuadroDeEmendas()}
        >
          <sl-icon slot="prefix" size="small" name="table"></sl-icon>
          Acessar quadro de emendas
        </sl-button>
        <sl-button
          href=""
          variant="primary"
          outline
          @click=${(): void => this.abrirPaginaMP()}
        >
          <sl-icon slot="prefix" size="small" name="table"></sl-icon>
          Acessar página da MP
        </sl-button>
        <sl-button
          slot="footer"
          autofocus
          onclick="document.querySelector('.dialog-emenda').hide()"
          variant="primary"
          >Fechar
        </sl-button>
      </sl-dialog>
    `;
  }

  render(): TemplateResult {
    // altera classe do body para 'no-scroll' quando jsonix é carregado
    if (this.showEditor) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return html`
      <edt-cabecalho
        .usuario=${this.usuario}
        @informar-usuario=${this.informarUsuario}
      ></edt-cabecalho>
      <edt-menu
        .proposicao=${this.proposicao}
        @item-selecionado=${this.onItemMenuSelecionado}
      ></edt-menu>
      <main class="${this.showEditor ? 'no-scroll' : ''}">
        ${!this.showEditor
          ? html` <edt-landing-page
              versao="${this.versao}"
              @botao-selecionado=${this.onBotaoNotasVersaoSelecionado}
            >
            </edt-landing-page>`
          : ''}
        ${this.renderEditorEmenda()}
        <edt-modal-ajuda></edt-modal-ajuda>
      </main>
      <edt-rodape versao="${this.versao}"></edt-rodape>
    `;
  }
}

export function toggleCarregando(): void {
  const edtApp = document.querySelector('edt-app') as EdtApp;
  edtApp.toggleCarregando();
}
declare global {
  interface HTMLElementTagNameMap {
    'edt-app': EdtApp;
  }
  interface Window {
    dataLayer: any;
  }
}
