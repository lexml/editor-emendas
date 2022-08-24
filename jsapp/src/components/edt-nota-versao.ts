import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('edt-notas-versao')
export class EdtNotasVersao extends LitElement {
  createRenderRoot(): LitElement {
    return this;
  }

  render(): TemplateResult {
    return html`
      <style>
        :host {
          font-size: var(--sl-font-size-medium);
        }
        .titulo {
          margin-block-end: 0;
          font-size: var(--sl-font-size-2x-large);
        }
        .conteudo {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-gap: 30px;
        }
        .video-container {
          position: relative;
          padding-bottom: 56.25%;
          padding-top: 30px;
          height: 0;
          overflow: hidden;
          margin: 15px 0 5px 0;
        }
        .video-container iframe,
        .video-container object,
        .video-container embed {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .legenda {
          font-size: var(--sl-font-size-small);
          color: var(--sl-color-neutral-500);
        }
        @media (max-width: 768px) {
          .conteudo {
            display: flex;
            flex-direction: column-reverse;
          }
          .video-container {
            margin: 20px 0 5px 0;
          }
        }
      </style>
      <h1 class="titulo">Nota de versão</h1>
      <span class="data-versao">Setembro 2022 - v1.0</span>
      <div class="conteudo">
        <div class="conteudo-esquerdo">
          <p>
            A autoria de normas jurídicas pode se beneficiar de uma solução que
            codifique as regras de técnica legislativa estabelecidas em normas
            jurídicas como também as regras convencionadas pela tradição
            legislativa do Brasil.
          </p>
          <p>
            Uma norma jurídica se expressa por meio de textos e outros elementos
            visuais, sendo todos eles manifestados em edições de algum periódico
            oficial. Além de texto hierárquico e articulado, a norma jurídica
            pode se manifestar por outros meios, tais como fórmulas, figuras,
            tabelas, texto corrido não articulado e partitura.
          </p>
          <p>Principais funcionalidades:</p>
          <ul>
            <li>
              Apresentar o texto articulado em consonância com padrões previstos
              em normas vigentes (LC 95 e Decreto 9.191/2017, entre outros);
            </li>
            <li>
              Permitir que sejam utilizadas mais de uma instância do editor para
              a edição de textos articulados;
            </li>
            <li>
              Oferecer recursos de navegação com o teclado, de maneira similar
              ao que ocorre em processadores de texto;
            </li>
            <li>
              Permitir a criação e edição do texto articulado em consonância com
              as normas vigentes (LC 95) e a especificação contida no padrão
              LexML;
            </li>
            <li>
              Oferecer recursos básicos de formatação de dispositivo, quando
              isso for permitido;
            </li>
            <li>
              Numerar automaticamente os dispositivos do texto articulado que
              estejam em consonância com as normas vigentes;
            </li>
            <li>
              Permitir a numeração manual do dispositivo quando se tratar de
              alteração de norma existente;
            </li>
          </ul>
        </div>
        <div class="conteudo-direito">
          <div class="video-container">
            <iframe
              src="https://www.youtube.com/embed/isJpwhicJX8"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <span class="legenda"
            >Vídeo com os principais funcionalidades do editor de textos
            articulados.</span
          >
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-notas-versao': EdtNotasVersao;
  }
}
