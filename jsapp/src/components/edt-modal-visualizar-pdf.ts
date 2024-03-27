import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert';
import { visualizarPdfStyles } from './app.css';

@customElement('edt-modal-visualizar-pdf')
export class EdtModalVisualizarPdf extends LitElement {
  @state()
  private pdfUrl = '';

  @property({ type: String }) tituloEmenda = '';

  @property({ type: Object }) emenda = {};

  @query('sl-dialog')
  private slDialog!: any;

  public show(): void {
    this.pdfUrl = '';
    this.slDialog.show();
  }

  private async atualizaEmendaEmPDF(): Promise<void> {
    try {
      const resp = await fetch('api/emenda/json2pdfFile', {
        method: 'POST',
        body: JSON.stringify(this.emenda),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
      const fileName = await resp.text();
      console.log(fileName);
      this.pdfUrl = `/api/emenda/pdfFile/${fileName}`;
      //this.pdfUrl = `http://localhost:8000/assets/exemplo.pdf`;
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
  private emitirAlerta(message: string, variant = 'primary', icon = 'info-circle', duration = 3000): Promise<void> {
    const alert = Object.assign(document.createElement('sl-alert') as SlAlert, {
      variant,
      closable: true,
      duration,
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
      <sl-dialog label=${`Visualizar ${tituloModal}`}>
        <div class="pdf-area">
          <iframe src="${'./assets/pdfjs/web/viewer.html?file=' + this.pdfUrl}" width="100%" height="100%"></iframe>
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
