// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, query } from 'lit/decorators.js';
import { LitElement, html, TemplateResult } from 'lit';
import { ajudaStyles } from './app.css';

@customElement('edt-modal-ajuda')
export class EdtModalAjuda extends LitElement {
  @query('sl-dialog')
  private slDialog!: any;

  public show(): void {
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

  render(): TemplateResult {
    const tituloModal = 'Vídeos tutoriais';

    return html`
      ${ajudaStyles}
      <sl-dialog label=${tituloModal} @sl-hide=${this.emitirEvento}>
        <sl-tab-group placement="start">
          <sl-tab slot="nav" panel="video01">Introdução</sl-tab>
          <sl-tab slot="nav" panel="video02">Modificar dispositivo</sl-tab>
          <sl-tab slot="nav" panel="video03">Remover dispositivo</sl-tab>
          <sl-tab slot="nav" panel="video04">Adicionar dispositivo</sl-tab>
          <sl-tab slot="nav" panel="video05">Inciso de Caput</sl-tab>
          <sl-tab slot="nav" panel="video06">Dispositivo entre outros</sl-tab>
          <sl-tab slot="nav" panel="video07"
            >Artigo a partir de um capítulo</sl-tab
          >
          <sl-tab slot="nav" panel="video08">Dispositivos subordinados</sl-tab>
          <sl-tab slot="nav" panel="video09">Dispositivo à norma</sl-tab>
          <sl-tab slot="nav" panel="video10"
            >Dispositivo da norma vigente</sl-tab
          >

          <sl-tab-panel name="video01">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/mTlR7WCT2e0"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-tab-panel>
          <sl-tab-panel name="video02">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/S7pQXIhSdFo"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-tab-panel>
          <sl-tab-panel name="video03">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/OBU2uEVOX0s"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-tab-panel>
          <sl-tab-panel name="video04">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/N8LdGjc3UTs"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-tab-panel>
          <sl-tab-panel name="video05">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/vxTI0PO4le4"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-tab-panel>
          <sl-tab-panel name="video06">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/KdAQ1oki8kI"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-tab-panel>
          <sl-tab-panel name="video07">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/MnSQuDj000k"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-tab-panel>
          <sl-tab-panel name="video08">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/LXHlHaMvV-0"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-tab-panel>
          <sl-tab-panel name="video09">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/M8KZ_3zr28c"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-tab-panel>
          <sl-tab-panel name="video10">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/NOyXN08NG_M"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-tab-panel>
        </sl-tab-group>
        <div class="details-group-example">
          <sl-details summary="Introdução" open>
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/mTlR7WCT2e0"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-details>
          <sl-details summary="Modificar dispositivo">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/S7pQXIhSdFo"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-details>
          <sl-details summary="Remover dispositivo">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/OBU2uEVOX0s"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-details>
          <sl-details summary="Adicionar dispositivo">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/N8LdGjc3UTs"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-details>
          <sl-details summary="Inciso de Caput">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/vxTI0PO4le4"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-details>
          <sl-details summary="Dispositivo entre outros">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/KdAQ1oki8kI"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-details>
          <sl-details summary="Artigo a partir de um capítulo">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/MnSQuDj000k"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-details>
          <sl-details summary="Dispositivos subordinados">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/LXHlHaMvV-0"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-details>
          <sl-details summary="Dispositivo à norma">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/M8KZ_3zr28c"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-details>
          <sl-details summary="Dispositivo da norma vigente">
            <div class="video-container">
              <iframe
                tabindex="-1"
                src="https://www.youtube.com/embed/NOyXN08NG_M"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </sl-details>
        </div>
        <sl-button
          slot="footer"
          variant="primary"
          @click=${(): void => this.slDialog.hide()}
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
