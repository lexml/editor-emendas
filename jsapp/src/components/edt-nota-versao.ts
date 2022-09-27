/* eslint-disable @typescript-eslint/no-unused-vars */
import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { notaVersaoStyles } from './app.css';
@customElement('edt-notas-versao')
export class EdtNotasVersao extends LitElement {
  createRenderRoot(): LitElement {
    return this;
  }

  private emitirEvento(botaoNotasVersao: string): void {
    this.dispatchEvent(
      new CustomEvent('botao-selecionado', {
        detail: { botaoNotasVersao },
        composed: true,
        bubbles: true,
      })
    );
  }

  render(): TemplateResult {
    return html`
      ${notaVersaoStyles}
      <sl-button
        class="botao-emenda"
        variant="primary"
        size="large"
        @click=${(): void => this.emitirEvento('nova')}
      >
        <sl-icon slot="prefix" name="file-earmark-plus"></sl-icon>
        Nova Emenda
      </sl-button>
      <sl-button
        class="botao-emenda"
        variant="default"
        outline
        size="large"
        @click=${(): void => this.emitirEvento('abrir')}
      >
        <sl-icon slot="prefix" name="folder2-open"></sl-icon>
        Abrir Emenda
      </sl-button>
      <div class="conteudo">
        <div class="conteudo-esquerdo">
          <h1 class="titulo">Nota de versão</h1>
          <span class="data-versao">Setembro 2022 - versão 1.0</span>
          <p>O que ainda não é possível fazer no editor:</p>
          <ul>
            <li>Emenda à anexos (inclusive de matérias orçamentárias);</li>
            <li>Adicionar agrupadores de artigo; e</li>
            <li>
              Enviar a emenda ao sistema de protocolo (Autenticador ou Sedol)
              diretamente pelo editor.
            </li>
          </ul>
          <h3>Principais funcionalidades</h3>
          <ul>
            <li>Criar uma nova emenda a medidas provisórias;</li>
            <li>Salvar a emenda localmente em PDF</li>
            <li>Abrir uma emenda em PDF gerada no editor;</li>
            <li>Editar a justificativa, com recursos básicos de formatação;</li>
            <li>
              Informar outros dados necessários a emenda, como data e autoria;
            </li>
            <li>Gerar automaticamente o comando de emenda;</li>
            <li>
              Impedir operações inválidas sobre a proposição, em acordo com as
              normas vigentes;
            </li>
            <li>Propor novos dispositivos a proposição;</li>
            <li>Prover menu de ações permitidas sobre um dispositivo;</li>
            <li>Validar a situação do dispositivo;</li>
            <li>
              Oferecer recursos que facilitam a identificação das operações
              efetuadas sobre a proposição;
            </li>
            <li>
              Permitir a criação de dispositivos automaticamente, à medida que o
              usuário for digitando, inclusive gerando automaticamente os
              rótulos de dispositivo:
              <ul>
                <li>
                  O uso dos dois pontos comanda o desdobramento dos dispositivos
                  em dispositivos subordinados;
                  <ul>
                    <li>
                      O uso de ponto indica continuação de sequência de
                      dispositivos do mesmo tipo quando se tratar de artigos e
                      parágrafos;
                    </li>
                    <li>
                      O uso de ponto e vírgula indica continuação de sequência
                      de dispositivos do mesmo tipo quando se tratar de incisos,
                      alíneas e itens.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              Permitir a mudança dos tipos de dispositivos (inciso em alínea,
              por exemplo), convertendo automaticamente os tipos dos
              dispositivos subordinados (Tab e Shift+Tab);
            </li>
            <li>
              Permitindo desfazer e refazer operações efetuadas durante a
              edição;
            </li>
            <li>
              Prover teclas de atalho que minimizam a necessidade do mouse
              durante a edição;
            </li>
            <li>Numeração automática de novos dispositivos;</li>
            <li>
              Informar numeração de dispositivos existentes na Norma em
              alteração;
            </li>
            <li>
              Definir estilos consistentes e protegidos contra alteração não
              intencional;
            </li>
            <li>Assistente para criação de Alteração a Norma existente;</li>
            <li>Manter referências a normas em alteração;</li>
            <li>Tratar automaticamente aspas e notas de alteração;</li>
            <li>Permitir edição do tipo de nota de redação (NR, AC);</li>
          </ul>
        </div>
        <div class="conteudo-direito">
          <div class="video-container">
            <a
              href="https://www.youtube.com/playlist?list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2"
              target="_blank"
            >
              <img
                class="video-container--thumb"
                src="./assets/jpg/tela-videos-ajuda.jpg"
              />
            </a>
          </div>
          <span class="legenda"
            >Canal com vídeos das principais funcionalidades do editor de
            emendas.
          </span>
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
