/* eslint-disable @typescript-eslint/no-unused-vars */
import { customElement, property, query, state } from 'lit/decorators.js';
import { LitElement, html, css, TemplateResult } from 'lit';

@customElement('edt-modal-orientacoes')
export class EdtModalOrientacoes extends LitElement {
  @property({ type: Number }) private step = 1;
  @query('sl-dialog') private slDialog!: any;

  @query('edt-modal-ajuda')
  private modalAjuda!: any;

  @query('edt-app')
  private edtApp!: any;

  private stepsData = [
    { step: 1, title: 'Elementos do Editor de Emendas' },
    { step: 2, title: 'Cabeçalho' },
    { step: 3, title: 'Área de edição' },
    { step: 4, title: 'Painel de informações' },
    { step: 5, title: 'Rodapé' },
    { step: 6, title: 'Funcionalidades não suportadas' },
    { step: 7, title: 'Outros tipos de emenda' },
    { step: 8, title: 'Vídeos tutoriais' },
    // Adicione mais passos se necessário.
  ];

  static styles = css`
    sl-dialog::part(panel) {
      display: flex;
      flex-direction: column;
      height: 80vh;
      --width: 80vw;
      overflow: hidden;
    }

    .wizard-header {
      padding: 10px 15px;
      border-bottom: 1px solid #ccc;
      flex-shrink: 0;
    }

    .wizard-title {
      margin: 0;
      font-weight: bold;
      font-size: 1.2em;
    }

    .wizard-content {
      flex-grow: 1;
      overflow-y: auto;
      padding: 0 15px;
    }

    .wizard-step {
      display: none;
    }

    .wizard-step.active {
      display: block;
    }

    .wizard-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      border-top: 1px solid #ccc;
      flex-wrap: wrap; /* Para permitir que os itens se ajustem ao redimensionar a tela */
    }

    .wizard-controls {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    /* Media query para mobile */
    @media (max-width: 767px) {
      .wizard-footer {
        flex-direction: column;
        align-items: stretch;
      }

      .wizard-controls {
        justify-content: center;
        margin: 10px 0; /* Adiciona um espaço entre os controles e o switch */
      }
    }

    .image {
      width: 100%;
      height: auto;
    }

    /* Estilos para o sistema de grid */

    .row {
      display: flex;
      flex-wrap: wrap;
      margin-left: -15px;
      margin-right: -15px;
    }

    .col {
      flex: 1;
      padding: 0 15px;
    }

    @media (max-width: 767px) {
      .col {
        flex-basis: 100%;
        margin-bottom: 15px;
      }
      #col1 {
        order: 2;
      }
      #col2 {
        order: 1;
      }
    }

    .wizard-step li {
      margin-bottom: 10px;
    }
  `;

  public show(): void {
    const noShowAgain = localStorage.getItem('wizardOrientacoes');
    const noShowAgainSwitch = this.shadowRoot?.querySelector(
      '#noShowAgain'
    ) as any;
    if (noShowAgain && noShowAgainSwitch) {
      noShowAgainSwitch.checked = true;
    }
    this.slDialog.step = 1;
    this.slDialog.show();
  }

  private handleNextStep(): void {
    if (this.step < this.stepsData.length) {
      this.step++;
    } else {
      this.slDialog.hide();
    }
  }

  private handlePreviousStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  private handleNoShowAgainChange(event: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      localStorage.setItem('wizardOrientacoes', 'false');
    } else {
      localStorage.removeItem('wizardOrientacoes');
    }
  }

  private emitirEvento(nomeEvento: string): void {
    this.dispatchEvent(new CustomEvent(nomeEvento, {}));
  }

  render(): TemplateResult {
    const currentStepData = this.stepsData.find(s => s.step === this.step);

    return html`
      <sl-dialog
        label="Orientações (${this.step}/${this.stepsData
          .length}) - ${currentStepData?.title}"
      >
        <div class="wizard-content">
          <div class="wizard-step ${this.step === 1 ? 'active' : ''}">
            <div class="row">
              <div class="col" id="col1">
                <p>
                  Bem-vindo(a) ao nosso editor! Projetamos essas orientações
                  iniciais para tornar o processo de edição mais intuitivo.
                  Vamos dar uma olhada rápida nas principais áreas do editor:
                </p>

                <ol>
                  <li>
                    <strong>Cabeçalho:</strong> Aqui você encontrará o Número e
                    ano da MPV, o sinalizador que indica se a emenda não foi
                    salva e o nome do usuário.
                  </li>
                  <li>
                    <strong>Editor:</strong> Esse é a principal área do editor,
                    contendo abas como Texto e Justificativa, onde você fará a
                    maior parte de suas edições.
                  </li>
                  <li>
                    <strong>Informações da Emenda:</strong> Um painel com
                    comandos da emenda, dicas e atalhos para facilitar sua
                    experiência.
                  </li>
                  <li>
                    <strong>Rodapé:</strong> Mantenha-se informado com a versão
                    atual do aplicativo.
                  </li>
                </ol>
              </div>
              <div class="col" id="col2">
                <img
                  class="image"
                  src="/assets/jpg/orientacoes-1.jpg"
                  alt="Elementos da interface do editor de emendas"
                />
              </div>
            </div>
          </div>
          <div class="wizard-step ${this.step === 2 ? 'active' : ''}">
            <div class="row">
              <div class="col" id="col1">
                <p>
                  O <strong>Cabeçalho</strong> serve como sua primeira
                  orientação no editor. Nele, você encontrará:
                </p>
                <ul>
                  <li>
                    <strong>Número e ano da MPV:</strong> Uma identificação
                    rápida da Medida Provisória que você está editando.
                  </li>
                  <li>
                    <strong>Sinalizador de arquivo não salvo:</strong>
                    Indica quando a emenda tem alterações que não foram salvas.
                    <br />
                    <img
                      class="image"
                      style="margin-top: 5px;"
                      src="/assets/jpg/orientacoes-2-1.jpg"
                      alt="Sinalizador de arquivo não salvo"
                    />
                  </li>
                  <li>
                    <strong>Menu e Usuário:</strong> Acessos rápidos para opções
                    adicionais e informações do usuário.
                  </li>
                </ul>
              </div>
              <div class="col" id="col2">
                <img
                  class="image"
                  src="/assets/jpg/orientacoes-2.jpg"
                  alt="Elementos da interface do editor de emendas"
                />
              </div>
            </div>
          </div>
          <div class="wizard-step ${this.step === 3 ? 'active' : ''}">
            <div class="row">
              <div class="col" id="col1">
                <p>
                  Ná <strong>área de edição</strong>, você encontrará abas
                  distintas para diferentes propósitos:
                </p>
                <ol>
                  <li>
                    <strong>Texto:</strong> A principal área de edição, equipada
                    com ferramentas e um editor visual.
                  </li>
                  <li>
                    <strong>Justificação:</strong> Um espaço dedicado para
                    elaborar a justificativa da sua emenda.
                  </li>
                  <li>
                    <strong>Destino, Data, Autoria e Impressão:</strong>
                    Informações adicionais da emenda.
                  </li>
                  <li>
                    <strong>Avisos:</strong> Área com alertas de erros nas
                    alterações realizadas.
                  </li>
                  <li>
                    <strong>Menu de contexto:</strong> Opções de acordo com o
                    tipo de dispositivo.
                  </li>
                  <li>
                    <strong>Marcas de revisão:</strong> Opção para
                    ativar/desativar o modo de revisão. (Só aparecerá quando
                    existirem revisões na emenda)
                  </li>
                  <li>
                    <strong>Ações de revisão:</strong> Botões para ações
                    relacionadas com as marcas de revisão.
                  </li>
                </ol>
              </div>
              <div class="col" id="col2">
                <img
                  class="image"
                  src="/assets/jpg/orientacoes-3.jpg"
                  alt="Elementos da interface do editor de emendas"
                />
              </div>
            </div>
          </div>
          <div class="wizard-step ${this.step === 4 ? 'active' : ''}">
            <div class="row">
              <div class="col" id="col1">
                <p>
                  À direita, o painel de
                  <strong>Informações da Emenda</strong> lhe oferece detalhes e
                  funcionalidades adicionais:
                </p>
                <ul>
                  <li>
                    <strong>Comando da emenda:</strong> Indicações precisas
                    sobre ações sugeridas para a emenda.
                  </li>
                  <li>
                    <strong>Dicas:</strong> Sugestões do que você pode fazer com
                    o dispositivo selecionado.
                  </li>
                  <li>
                    <strong>Atalhos:</strong> Teclas de atalho para acelerar sua
                    edição.
                  </li>
                </ul>
              </div>
              <div class="col" id="col2">
                <img
                  class="image"
                  src="/assets/jpg/orientacoes-4.jpg"
                  alt="Elementos da interface do editor de emendas"
                />
              </div>
            </div>
          </div>
          <div class="wizard-step ${this.step === 5 ? 'active' : ''}">
            <div class="row">
              <div class="col" id="col1">
                <p>
                  Por fim, o <strong>Rodapé</strong> oferece informações sobre a
                  versão atual do aplicativo.
                </p>
              </div>
              <div class="col" id="col2">
                <img
                  class="image"
                  src="/assets/jpg/orientacoes-5.jpg"
                  alt="Elementos da interface do editor de emendas"
                />
              </div>
            </div>
          </div>
          <div class="wizard-step ${this.step === 6 ? 'active' : ''}">
            <p>
              Estamos sempre trabalhando para melhorar e expandir as capacidades
              do editor. No entanto, existem algumas ações que, no momento, não
              são suportadas. Aqui está um exemplo:
            </p>
            <ul>
              <li><strong>Emenda substitutiva global:</strong> Em breve!</li>
            </ul>
            <p>
              Agradecemos sua compreensão e esperamos atender suas necessidades
              em futuras atualizações!
            </p>
          </div>
          <div class="wizard-step ${this.step === 7 ? 'active' : ''}">
            <div class="row">
              <div class="col" id="col1">
                <p>
                  Além das emendas padrão, que são aquelas feitas diretamente
                  sobre o texto original da MPV, nosso editor fornece
                  alternativas para outras situações, tais como:
                </p>

                <ol>
                  <li>
                    <strong>"Onde couber":</strong>
                    <p>
                      Esse tipo de emenda permite propor alterações sem
                      especificar a localização exata na MPV. No entanto,
                      orienta-se o uso preferencial de emendas padrão, com
                      posicionamento dos novos dispositivos propostos, em vez de
                      emendas de dispositivos "onde couber".
                    </p>
                  </li>

                  <li>
                    <strong>Emenda de texto livre:</strong>
                    <p>
                      A emenda de texto livre deve ser utilizada apenas quando
                      não for possível fazer a emenda no formato padrão do
                      editor ou como emenda de dispositivo "onde couber". Ao
                      optar por uma emenda de texto livre, é essencial
                      especificar o motivo:
                    </p>
                    <ul>
                      <li>Emendamento ou adição de pena, penalidade etc.</li>
                      <li>
                        Emendamento ou adição de especificação temática do
                        dispositivo (usado para nome do tipo penal e outros).
                      </li>
                      <li>
                        Alteração de anexo de MP de crédito extraordinário.
                      </li>
                      <li>Emendamento ou adição de anexos.</li>
                      <li>
                        Alteração do texto da proposição e proposta de adição de
                        dispositivos "onde couber" na mesma emenda.
                      </li>
                      <li>
                        Alteração de norma que não segue a LC nº 95 de 98 (ex:
                        norma com alíneas em parágrafos).
                      </li>
                      <li>
                        Casos especiais de numeração de parte (PARTE GERAL,
                        PARTE ESPECIAL e uso de numeral ordinal por extenso).
                      </li>
                      <li>Tabelas e imagens no texto da proposição.</li>
                      <li>Outro motivo.</li>
                    </ul>
                  </li>
                </ol>
              </div>
              <div class="col" id="col2">
                <img
                  class="image"
                  src="/assets/jpg/orientacoes-7.jpg"
                  alt="Elementos da interface do editor de emendas"
                />
              </div>
            </div>
          </div>
          <div class="wizard-step ${this.step === 8 ? 'active' : ''}">
            <div class="row">
              <div class="col" id="col1">
                <p>Fique por dentro do editor de emendas</p>
                <p>
                  Assista a vídeos curtos e aprenda as funcionalidades do editor
                  de emendas com demonstrações rápidas.
                </p>
                <sl-button
                  variant="primary"
                  @click=${(): void => this.emitirEvento('open-modal-videos')}
                >
                  Acessar os vídeos tutoriais
                </sl-button>
              </div>
              <div class="col" id="col2">
                <a
                  href="#"
                  id="video-tutoriais"
                  @click=${(): void => this.emitirEvento('open-modal-videos')}
                >
                  <img
                    class="image"
                    src="/assets/jpg/orientacoes-8.jpg"
                    alt="Imagem de uma mão segurando um celular com o editor de emendas aberto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="wizard-footer" slot="footer">
          <!-- Switch alinhado à esquerda -->
          <sl-switch @sl-change=${this.handleNoShowAgainChange} id="noShowAgain"
            >Não mostrar novamente</sl-switch
          >

          <!-- Botões de controle (Voltar e Avançar) centralizados -->
          <div class="wizard-controls">
            <sl-button
              @click=${this.handlePreviousStep}
              ?disabled=${this.step === 1}
            >
              Voltar
            </sl-button>
            ${this.step} / ${this.stepsData.length}
            <sl-button
              @click=${this.handleNextStep}
              ?disabled="${this.step === this.stepsData.length}"
            >
              Avançar
            </sl-button>
          </div>

          <!-- Botão de fechar à direita -->
          <sl-button
            slot="footer"
            variant="default"
            @click=${(): void => this.slDialog.hide()}
            >Fechar</sl-button
          >
        </div>
      </sl-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-modal-orientacoes': EdtModalOrientacoes;
  }
}