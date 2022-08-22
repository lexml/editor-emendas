import { blobToBase64, downloadBase64 } from './../servicos/blobUtil';
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

@customElement('edt-modal-visualizar-pdf')
export class EdtModalVisualizarPdf extends LitElement {
  @state()
  private pdfBase64: any = '';

  @state()
  private nomeProposicao?: string;

  @state()
  private tituloEmenda?: string;

  @query('sl-dialog')
  private slDialog!: any;

  public show(nomeProposicao?: string, tituloEmenda?: string): void {
    this.nomeProposicao = nomeProposicao;
    this.tituloEmenda = tituloEmenda;
    this.slDialog.show();
  }

  protected async firstUpdated(): Promise<void> {
    const resp = await fetch('/assets/exemplo.pdf');
    const pdf = await resp.blob();
    this.pdfBase64 = await blobToBase64(pdf);
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
      <sl-dialog label=${'Visualizar ' + tituloModal} style="--width: 80vw">
        <div class="pdf-area">
          <style>
            .pdf-area,
            embed {
              width: 100%;
              height: 80vh;
              min-height: 480px;
            }
            sl-dialog {
              --body-spacing: 0;
              border: 1px solid red;
            }
          </style>

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
