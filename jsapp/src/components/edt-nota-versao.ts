import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { notaVersaoStyles } from './app.css';
@customElement('edt-notas-versao')
export class EdtNotasVersao extends LitElement {
  createRenderRoot(): LitElement {
    return this;
  }

  render(): TemplateResult {
    return html`
      ${notaVersaoStyles}
      <div class="conteudo">
        <div class="conteudo-esquerdo">
          <h1 class="titulo">Nota de versão</h1>
          <span class="data-versao">Setembro 2022 - v1.0</span>
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
          <sl-button
            class="botao-emenda"
            variant="primary"
            size="large"
            @click=${(): void => console.log('Nova emenda')}
          >
            <sl-icon slot="prefix" name="plus-square"></sl-icon>
            Nova Emenda
          </sl-button>
          <sl-button
            class="botao-emenda"
            variant="primary"
            size="large"
            @click=${(): void => console.log('Nova emenda')}
          >
            <sl-icon slot="prefix" name="box-arrow-up-right"></sl-icon>
            Abrir Emenda
          </sl-button>
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
