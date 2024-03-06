import { customElement, query, state } from 'lit/decorators.js';
import { LitElement, html, TemplateResult } from 'lit';
import { ajudaStyles } from './app.css';

class Video {
  constructor(public titulo: string, public codigo: string) {}
}

const videos: Array<Video> = [
  new Video('Introdução', 'Y_N2Azkg_cw'),
  new Video('Modificar dispositivo', 'S7pQXIhSdFo'),
  new Video('Remover dispositivo', 'OBU2uEVOX0s'),
  new Video('Adicionar dispositivo', 'N8LdGjc3UTs'),
  new Video('Inciso de Caput', 'vxTI0PO4le4'),
  new Video('Dispositivo entre outros', 'KdAQ1oki8kI'),
  new Video('Artigo a partir de um capítulo', 'MnSQuDj000k'),
  new Video('Dispositivos subordinados', 'LXHlHaMvV-0'),
  new Video('Dispositivo à norma', 'M8KZ_3zr28c'),
  new Video('Dispositivo da norma vigente', 'NOyXN08NG_M'),
  new Video('Copiar e colar dispositivos existentes - Introdução', 'tP8zgonhQtk'),
  new Video('Copiar e colar dispositivos existentes - 2º tutorial', 'K-w-At7hv_k'),
  new Video('Agrupadores de artigos', 'Mt1ppqAIsNk'),
  new Video('Marcas de revisão', 'Zvv0oPVREz0'),
  new Video('Emenda de texto livre', '_i1jDNEBNRw'),
  new Video('Uso de linhas pontilhadas ao colar dispositivos', 'uYXsH-F-AQM'),
];

@customElement('edt-modal-ajuda')
export class EdtModalAjuda extends LitElement {
  @query('sl-dialog')
  private slDialog!: any;

  @query('.details-group')
  private detailsGroup!: any;

  @state()
  private visivel = false;

  @state()
  private selecionado = 0;

  protected firstUpdated(): void {
    this.slDialog.addEventListener('sl-request-close', () => {
      this.visivel = false;
    });

    this.detailsGroup.addEventListener('sl-after-show', (e: CustomEvent) => {
      if (e.target) {
        [...this.detailsGroup.querySelectorAll('sl-details')].forEach((details, i) => {
          details.open = e.target === details;
          if (details.open) {
            setTimeout(() => {
              details.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 0);
            this.selecionado = i;
          }
        });
      }
    });
  }

  private toggleFullscreen(index: number): void {
    const iframe = this.shadowRoot?.querySelector(`#youtube-player-${index}`);
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen();
    }
  }

  public show(): void {
    this.visivel = true;
    this.slDialog.show();
  }

  private emitirEvento(): void {
    this.dispatchEvent(
      new CustomEvent('confirm-result', {
        composed: true,
        bubbles: true,
      })
    );
  }

  private videoTemplate(video: Video, index: number): any {
    return html`
      <div class="video-container">
        <iframe
          id="youtube-player-${index}"
          class="youtube-player-iframe"
          tabindex="-1"
          src="https://www.youtube.com/embed/${video.codigo}?enablejsapi=1&version=3&playerapiid=ytplayer"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      </div>
    `;
  }

  private detailsVideoTemplate(video: Video, i: number): any {
    return html`
      <sl-details summary="${video.titulo}" name="video${i}" .open=${this.selecionado === i}>
        ${this.selecionado === i ? this.videoTemplate(video, i) : ``}
      </sl-details>
    `;
  }

  render(): TemplateResult {
    const tituloModal = 'Vídeos tutoriais';

    return html`
      ${ajudaStyles}
      <sl-dialog label=${tituloModal} @sl-hide=${this.emitirEvento}>
        <div class="details-group">${this.visivel ? videos.map((v, i) => this.detailsVideoTemplate(v, i)) : html``}</div>
        <sl-button
          slot="footer"
          variant="primary"
          @click=${(): void => {
            this.slDialog.hide();
            this.visivel = false;
          }}
          >Fechar</sl-button
        >
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-ajuda': EdtModalAjuda;
  }
}
