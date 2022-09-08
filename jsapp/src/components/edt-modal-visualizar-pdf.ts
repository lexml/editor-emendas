/* eslint-disable @typescript-eslint/no-unused-vars */
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { blobToBase64 } from './../servicos/blobUtil';
import { visualizarPdfStyles } from './app.css';

@customElement('edt-modal-visualizar-pdf')
export class EdtModalVisualizarPdf extends LitElement {
  @state()
  private pdfBase64: any = '';

  @property({ type: String }) tituloEmenda = '';
  @property({ type: Object }) emenda = {};

  @query('sl-dialog')
  private slDialog!: any;

  public show(): void {
    this.slDialog.show();
  }

  private async atualizaEmendaEmPDF(): Promise<void> {
    const resp = await fetch('./api/emenda/json2pdf', {
      method: 'POST',
      body: JSON.stringify(this.emenda),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
    const pdf = await resp.blob();
    this.pdfBase64 = await blobToBase64(pdf);
  }

  protected firstUpdated(): void {
    if (this.emenda && Object.keys(this.emenda).length > 0) {
      this.atualizaEmendaEmPDF();
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    if (this.hasChangedEmenda(changedProperties)) {
      this.atualizaEmendaEmPDF();
    }
  }

  private hasChangedEmenda(changedProperties: PropertyValues): boolean {
    return changedProperties.has('emenda') && changedProperties.get('emenda');
  }

  render(): TemplateResult {
    const tituloModal = !this.tituloEmenda ? 'emenda' : this.tituloEmenda;

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
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-visualizar-pdf': EdtModalVisualizarPdf;
  }
}
