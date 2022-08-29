import { blobToBase64, downloadBase64 } from './../servicos/blobUtil';
import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { visualizarPdfStyles } from './app.css';

@customElement('edt-modal-visualizar-pdf')
export class EdtModalVisualizarPdf extends LitElement {
  @state()
  private pdfBase64: any = '';

  @state()
  private nomeProposicao?: string;

  // @state()
  // private tituloEmenda?: string;

  @property({ type: String }) tituloEmenda = '';
  @property({ type: Object }) emenda = {};

  @query('sl-dialog')
  private slDialog!: any;

  public show(nomeProposicao?: string): void {
    this.nomeProposicao = nomeProposicao;
    this.slDialog.show();
  }

  protected async firstUpdated(): Promise<void> {
    if (Object.keys(this.emenda).length > 0) {
      const apiURL = 'api/';
      const resp = await fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify(this.emenda),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
      const pdf = await resp.blob();
      this.pdfBase64 = await blobToBase64(pdf);
    }
  }

  protected async updated(changedProperties: PropertyValues): Promise<void> {
    if (this.hasChangedEmenda(changedProperties)) {
      const apiURL = 'api/';
      const resp = await fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify(this.emenda),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
      const pdf = await resp.blob();
      this.pdfBase64 = await blobToBase64(pdf);
    }
  }

  private hasChangedEmenda(changedProperties: PropertyValues): boolean {
    return changedProperties.has('emenda') && changedProperties.get('emenda');
  }

  private async download(): Promise<void> {
    // const newHandle = await (window as any).showSaveFilePicker();
    // const writableStream = await newHandle.createWritable();
    // await writableStream.write(base64ToBlob(this.pdfBase64, 'application/pdf'));
    // await writableStream.close();
    downloadBase64(this.pdfBase64, 'teste123.pdf');
    // this.slDialog.hide();
  }

  render(): TemplateResult {
    const tituloModal = [this.nomeProposicao, this.tituloEmenda]
      .filter(Boolean)
      .join(' - ');

    return html`
      ${visualizarPdfStyles}
      <sl-dialog label=${'Visualizar ' + tituloModal} style="--width: 80vw">
        <div class="pdf-area">
          <embed
            src=${this.pdfBase64}
            type="application/pdf"
            frameborder="0"
            width="100%"
          />
        </div>

        <!-- <sl-button
          slot="footer"
          variant="default"
          @click=${(): void => this.slDialog.hide()}
          >Fechar</sl-button
        >
        <sl-button
          slot="footer"
          variant="primary"
          @click=${(): any => this.download()}
          >Download</sl-button
        >
        <sl-button
          slot="footer"
          variant="primary"
          @click=${(): void => this.slDialog.hide()}
          >Imprimir</sl-button
        > -->
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-visualizar-pdf': EdtModalVisualizarPdf;
  }
}
