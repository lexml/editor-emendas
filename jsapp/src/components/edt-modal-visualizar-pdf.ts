/* eslint-disable @typescript-eslint/no-unused-vars */
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { blobToBase64 } from './../servicos/blobUtil';
import { visualizarPdfStyles } from './app.css';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert';

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
    this.slDialog.addEventListener('sl-request-close', (event: any) => {
      this.pdfBase64 = '';
    });
  }

  private async atualizaEmendaEmPDF(): Promise<void> {
    try {
      const resp = await fetch('api/emenda/json2pdf', {
        method: 'POST',
        body: JSON.stringify(this.emenda),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
      const pdf = await resp.blob();
      this.pdfBase64 = await blobToBase64(pdf);
    } catch (err) {
      console.log(err);
      this.emitirAlerta(`Erro inesperado ao gerar o PDF`);
    }
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
