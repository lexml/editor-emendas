/* eslint-disable @typescript-eslint/no-unused-vars */
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { landingPageStyles } from './app.css';
import { getVersao } from '../utils/versao-utils';

interface TouchedFields {
  name: boolean;
  email: boolean;
  message: boolean;
}

enum NameError {
  NameEmpty,
}

enum EmailError {
  EmailEmpty,
  EmailInvalid,
}

enum MessageError {
  MessageEmpty,
}

enum SubmitState {
  NotSubmitted,
  Submitted,
  Failed,
}

interface ContactFormErrors {
  name?: NameError;
  email?: EmailError;
  message?: MessageError;
}
@customElement('edt-landing-page')
export class EdtLandingPage extends LitElement {
  @state() versao = '';
  @state() name = '';
  @state() email = '';
  @state() message = '';
  @state() touched: TouchedFields = {
    name: false,
    email: false,
    message: false,
  };
  @state() errors: ContactFormErrors = {
    name: NameError.NameEmpty,
    email: EmailError.EmailEmpty,
    message: MessageError.MessageEmpty,
  };
  @state() submitEnabled = false;

  @state() submitState: SubmitState = SubmitState.NotSubmitted;

  @query('#name')
  private elName!: any;

  @query('#email')
  private elEmail!: any;

  @query('#message')
  private elMessage!: any;

  handleNameInput(event: Event): void {
    this.touched.name = true;
    const e = event.target as any;
    this.name = e.value;
    this.validateName();
  }

  validateName(): void {
    if (this.name === '') {
      this.errors.name = NameError.NameEmpty;
    } else {
      this.errors.name = undefined;
    }
    this.enableSubmit();
  }

  enableSubmit(): void {
    this.submitEnabled =
      this.nameValid() && this.emailValid() && this.messageValid();
  }

  nameValid(): boolean {
    return !this.touched.name || this.errors.name === undefined;
  }

  showNameRequired(): boolean {
    return this.touched.name && this.errors.name === NameError.NameEmpty;
  }

  emailValid(): boolean {
    return !this.touched.email || this.errors.email === undefined;
  }

  showEmailRequired(): boolean {
    return this.touched.email && this.errors.email === EmailError.EmailEmpty;
  }

  showEmailInvalid(): boolean {
    return this.touched.email && this.errors.email === EmailError.EmailInvalid;
  }

  messageValid(): boolean {
    return !this.touched.message || this.errors.message === undefined;
  }

  showMessageRequired(): boolean {
    return (
      this.touched.message && this.errors.message === MessageError.MessageEmpty
    );
  }

  handleNameBlur(): void {
    this.touched.name = true;
    this.validateName();
  }

  handleEmailInput(event: Event): void {
    this.touched.email = true;
    const e = event.target as any;
    this.email = e.value;
    this.validateEmail();
  }

  validateEmail(): void {
    if (this.email === '') {
      this.errors.email = EmailError.EmailEmpty;
    } else if (!this.validateEmailFormat(this.email)) {
      this.errors.email = EmailError.EmailInvalid;
    } else {
      this.errors.email = undefined;
    }
    this.enableSubmit();
  }

  tester =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  validateEmailFormat(email: string): boolean {
    if (!email) return false;

    const emailParts = email.split('@');

    if (emailParts.length !== 2) return false;

    const account = emailParts[0];
    const address = emailParts[1];

    if (account.length > 64) {
      return false;
    }

    if (address.length > 255) {
      return false;
    }

    const domainParts = address.split('.');

    const validDomains = domainParts.some(function (part) {
      return part.length > 63;
    });

    if (validDomains) {
      return false;
    }

    return this.tester.test(email);
  }

  handleEmailBlur(): void {
    this.touched.email = true;
    this.validateEmail();
  }

  handleMessageInput(event: Event): void {
    this.touched.message = true;
    const e = event.target as any;
    this.message = e.value;
    this.validateMessage();
  }

  validateMessage(): void {
    if (this.message === '') {
      this.errors.message = MessageError.MessageEmpty;
    } else {
      this.errors.message = undefined;
    }
    this.enableSubmit();
  }

  handleMessageBlur(): void {
    this.touched.message = true;
    this.validateMessage();
  }

  classForName(): string {
    if (!this.touched.name) {
      return 'form-control';
    }
    return this.errors.name === undefined
      ? 'form-control'
      : 'form-control is-invalid';
  }

  classForEmail(): string {
    if (!this.touched.email) {
      return 'form-control';
    }
    return this.errors.email === undefined
      ? 'form-control'
      : 'form-control is-invalid';
  }

  classForMessage(): string {
    if (!this.touched.message) {
      return 'form-control';
    }
    return this.errors.message === undefined
      ? 'form-control'
      : 'form-control is-invalid';
  }

  classForSubmitButton(): string {
    return this.submitState !== SubmitState.Submitted ? 'd-grid' : 'd-none';
  }

  classForSubmittedMessage(): string {
    return this.submitState === SubmitState.Submitted ? 'd-block' : 'd-none';
  }

  classForFailedMessage(): string {
    return this.submitState === SubmitState.Failed ? 'd-block' : 'd-none';
  }

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

  async submitMensagem(evento: any): Promise<any> {
    evento.preventDefault();

    const msg = {
      nome: this.elName.value,
      email: this.elEmail.value,
      mensagem: this.elMessage.value,
    };

    try {
      const result = await fetch('api/contato', {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      this.elName.value = '';
      this.elEmail.value = '';
      this.elMessage.value = '';

      this.submitState = SubmitState.Submitted;

      return result;
    } catch (error) {
      this.submitState = SubmitState.Failed;
      return Promise.reject(error);
    }
  }

  protected firstUpdated(): void {
    this.versao = getVersao();
  }

  render(): TemplateResult {
    return html`
      ${landingPageStyles}

      <a class="sr-only" href="#iniciar">Ir para conteúdo principal</a>
      <div class="cn-topo">
        <div class="container px-4 px-lg-5">
          <div class="row cn-vertical-align">
            <div class="col-4">
              <a
                href="https://www.congressonacional.leg.br"
                title="Ir para o Portal do Congresso Nacional"
              >
                <img
                  class="cn-topo-logo"
                  src="./assets/img/logo_cn.png"
                  th:src="@{/img/logo_cn.png}"
                  alt="Logo Congresso Nacional"
                />
              </a>
            </div>
            <div class="col-8 text-end">
              <a
                href="https://www.congressonacional.leg.br/fale-conosco"
                class="pull-right d-none d-none d-sm-inline px-3"
                >Fale conosco</a
              >
              <a href="#" id="link_vlibras" class="js-vlibras">
                <img
                  src="./assets/img/icon_libras.png"
                  th:src="@{/img/icon_libras.png}"
                  class="img_libras"
                  alt="Libras"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Vlibras -->
      <div vw class="enabled">
        <div vw-access-button class="active" style="display: none;"></div>
        <div vw-plugin-wrapper>
          <div class="vw-plugin-top-wrapper"></div>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg navbar-light py-3" id="mainNav">
        <div class="container px-4 px-lg-5">
          <a
            class="navbar-brand navbar-brand--long fs-6 d-none d-md-none d-lg-block"
            href="#page-top"
            >Editor de Emendas a Medidas Provisórias</a
          >
          <a
            class="navbar-brand navbar-brand--short fs-6 d-md-block d-lg-none"
            href="#page-top"
            >Editor de Emendas a MPs</a
          >
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto my-2 my-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#iniciar">Iniciar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#funcionalidades">Funcionalidades</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#ajuda">Ajuda</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contato">Reportar erro</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header class="masthead" id="iniciar">
        <div class="container px-4 px-lg-5 h-100">
          <div
            class="row gx-4 gx-lg-5 h-100 d-flex align-items-center justify-content-center"
          >
            <div class="col-lg-6 text-center text-lg-start">
              <h1 class="font-weight-bold fs-1">
                Elabore emendas de forma fácil e precisa
              </h1>
              <p class="mb-4 fs-4 text-muted">
                Crie emendas compatíveis com a técnica legislativa utilizando
                qualquer dispositivo eletrônico.
              </p>
              <div class="row gx-4 justify-content-center">
                <div class="col-sm-6 text-center py-4 py-sm-0">
                  <i class="bi-file-earmark-plus fs-2 text-primary"></i>
                  <h2 class="mt-0 fs-5">Criar emenda</h2>
                  <p class="mb-3 text-muted fs-5">
                    Pesquise medidas provisórias recentes e comece a editar.
                  </p>
                  <button
                    class="btn btn-primary btn-md rounded-pill px-4"
                    @click=${(): void => this.emitirEvento('nova')}
                  >
                    Selecionar Medida Provisória
                  </button>
                </div>
                <div class="col-sm-6 text-center py-4 py-sm-0">
                  <i class="bi-pen fs-2 text-primary"></i>
                  <h2 class="mt-0 fs-5">Abrir emenda</h2>
                  <p class="mb-3 text-muted fs-5">
                    Abra emendas em PDF do seu celular ou computador.
                  </p>
                  <button
                    class="btn btn-secondary btn-md rounded-pill px-4"
                    @click=${(): void => this.emitirEvento('abrir')}
                  >
                    Abrir emenda do seu local
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <img
                class="py-5"
                src="./assets/svg/dispositivos.svg"
                alt="Ilustração com diferentes tipos de dispositivos eletrônicos"
              />
            </div>
          </div>
        </div>
      </header>
      <section class="page-section py-0" id="funcionalidades">
        <div class="container px-4 px-lg-5">
          <h2 class="text-center my-0">Principais funcionalidades</h2>
          <div class="text-center text-muted">Versão ${this.versao}</div>
          <hr class="divider mt-2" />
          <div class="row gx-4 gx-lg-5">
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2"><i class="bi-files fs-1 text-muted"></i></div>
                <h3 class="h4 mb-2 text-muted">Emenda a anexos</h3>
                <span class="badge bg-success">Em breve</span>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-send-check fs-1 text-muted"></i>
                </div>
                <h3 class="h4 mb-2 text-muted">Enviar ao protocolo</h3>
                <span class="badge bg-success">Em breve</span>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-collection fs-1"></i>
                </div>
                <h3 class="h4 mb-2">Inclusão de agrupadores de artigo</h3>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-file-earmark-plus fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Criar emenda</h3>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-file-pdf fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Salvar emenda</h3>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2"><i class="bi-pen fs-1 text-primary"></i></div>
                <h3 class="h4 mb-2">Editar emenda</h3>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-justify fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Justificar a emenda</h3>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-person fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Informar data e autoria</h3>
              </div>
            </div>
          </div>
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="row gx-4 gx-lg-5">
                    <div class="col-lg-3 col-md-6 text-center">
                      <div class="mt-5">
                        <div class="mb-2">
                          <i class="bi-code fs-1 text-primary"></i>
                        </div>
                        <h3 class="h4 mb-2">Comando de emenda</h3>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                      <div class="mt-5">
                        <div class="mb-2">
                          <i
                            class="bi-file-earmark-check fs-1 text-primary"
                          ></i>
                        </div>
                        <h3 class="h4 mb-2">Verificar texto da emenda</h3>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                      <div class="mt-5">
                        <div class="mb-2">
                          <i class="bi-list-nested fs-1 text-primary"></i>
                        </div>
                        <h3 class="h4 mb-2">Transformar dispositivos</h3>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                      <div class="mt-5">
                        <div class="mb-2">
                          <i class="bi-window-fullscreen fs-1 text-primary"></i>
                        </div>
                        <h3 class="h4 mb-2">Alterar norma vigente</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                aria-label="Mostrar mais funcionalidades"
                title="Mostrar mais funcionalidades"
              ></button>
            </div>
          </div>
        </div>
      </section>
      <section class="page-section py-5">
        <div class="container text-center">
          <h2 class="text-center mt-0">Recursos</h2>
          <div class="row">
            <div class="col-md-12 col-lg-8 offset-lg-2 text-center">
              <div class="table-responsive mb-5">
                <table class="table text-center">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <th scope="row" class="text-start">
                        Elaborar emendas a anexos
                      </th>
                      <td>
                        <span class="badge rounded-pill bg-success"
                          >Em breve</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Enviar emenda ao sistema de protocolo
                      </th>
                      <td>
                        <span class="badge rounded-pill bg-success"
                          >Em breve</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Emenda substitutiva global
                      </th>
                      <td>
                        <span class="badge rounded-pill bg-success"
                          >Em breve</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Alteração de normas que não seguem a N95
                      </th>
                      <td>
                        <span class="badge rounded-pill bg-success"
                          >Em breve</span
                        >
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th scope="row" class="text-start">Criar emenda</th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Salvar emenda em PDF
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Editar justificativa da emenda
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Informar data e autoria
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Gerar o comando de emenda
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Validar alterações na emenda conforme a N95
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Adicionar, modificar e suprimir dispositivos
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Adicionar agrupadores de artigos
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Alterar norma vigente
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Utilizar recursos de formatação de texto
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Desfazer ou refazer operações de edição
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Utilizar teclas de atalho
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Numerar novos dispositivos automaticamente
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Tratar aspas e notas de alteração (NR, AC)
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Manter referências às normas alteradas
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                    <tr>
                      <th scope="row" class="text-start">
                        Integração com o quadro de emendas da MPV (<a
                          href="https://emendas.camara.leg.br"
                          target="_blank"
                          >emendas.camara.leg.br</a
                        >)
                      </th>
                      <td><i class="bi bi-check-lg"></i></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Call to action-->
      <section class="page-section bg-primary text-white" id="ajuda">
        <div class="container px-4 px-lg-5 text-center">
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-lg-7 align-middle px-5 text-center text-lg-start">
              <h2>Fique por dentro do editor de emendas</h2>
              <p class="text-white-75 mb-4 fs-4">
                Assista a vídeos curtos e aprenda as funcionalidades do editor
                de emendas com demonstrações rápidas.
              </p>
              <a
                class="btn btn-light btn-xl mb-4"
                href="https://www.youtube.com/watch?v=Y_N2Azkg_cw&list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2"
                target="_blank"
                >ACESSAR O CANAL</a
              >
            </div>
            <div class="col-lg-5">
              <div class="tutorial container text-center my-5 ratio ratio-16x9">
                <iframe
                  class="shadow-lg"
                  src="https://www.youtube.com/embed/Y_N2Azkg_cw"
                  allowfullscreen
                >
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="page-section" id="contato">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-lg-8 col-xl-6 text-center">
              <h2 class="mt-0">Reporte um erro</h2>
              <hr class="divider" />
              <p class="text-muted mb-5">
                Descreva o erro encontrado e envie prints ou vídeos para o
                email:
                <a href="mailto:editoremenda@camara.leg.br"
                  >editoremenda@camara.leg.br</a
                >.
              </p>
            </div>
          </div>
          <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
            <div class="col-lg-6">
              <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                <div class="form-floating mb-3">
                  <input
                    class=${this.classForName()}
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    data-sb-validations="required"
                    @input=${this.handleNameInput}
                    @blur=${this.handleNameBlur}
                    .value=${this.name}
                  />
                  <label for="name">Nome completo</label>
                  <div
                    class="invalid-feedback"
                    style="display: block"
                    data-sb-feedback="name:required"
                  >
                    ${this.showNameRequired() ? 'O nome é requerido.' : ''}
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <input
                    class=${this.classForEmail()}
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    data-sb-validations="required,email"
                    @input=${this.handleEmailInput}
                    @blur=${this.handleEmailBlur}
                    .value=${this.email}
                  />
                  <label for="email">Endereço de email</label>
                  <div
                    class="invalid-feedback"
                    style="display: block"
                    data-sb-feedback="email:required"
                  >
                    ${this.showEmailRequired() ? 'Um e-mail é requerido.' : ''}
                  </div>
                  <div
                    class="invalid-feedback"
                    style="display: block"
                    data-sb-feedback="email:email"
                  >
                    ${this.showEmailInvalid() ? 'Email não é válido.' : ''}
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <textarea
                    class=${this.classForMessage()}
                    id="message"
                    type="text"
                    placeholder="Enter your message here..."
                    style="height: 10rem"
                    data-sb-validations="required"
                    @input=${this.handleMessageInput}
                    @blur=${this.handleMessageBlur}
                  >
${this.message}</textarea
                  >
                  <label for="message">Mensagem</label>
                  <div
                    class="invalid-feedback"
                    style="display: block"
                    data-sb-feedback="message:required"
                  >
                    ${this.showMessageRequired()
                      ? 'Uma mensagem é requerida.'
                      : ''}
                  </div>
                </div>
                <div
                  class=${this.classForSubmittedMessage()}
                  id="submitSuccessMessage"
                >
                  <div class="text-center mb-3">
                    <div class="fw-bolder">Mensagem enviada com sucesso!</div>
                  </div>
                </div>
                <div
                  class=${this.classForFailedMessage()}
                  id="submitErrorMessage"
                >
                  <div class="text-center text-danger mb-3">
                    Ocorreu um erro no envio da mensagem!
                  </div>
                </div>
                <div class=${this.classForSubmitButton()}>
                  <button
                    class="btn btn-primary btn-xl"
                    id="submitButton"
                    type="submit"
                    .disabled=${!this.submitEnabled}
                    @click=${this.submitMensagem}
                  >
                    Reportar erro
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <!-- Footer-->
      <div class="cn-rodape">
        <div class="container">
          <div class="row cn-vertical-align">
            <div
              class="col-md-6 cn-rodape-logo text-center text-md-end pt-4 pt-md-0"
            >
              <a href="https://www.congressonacional.leg.br"
                ><img
                  src="./assets/img/logo_cn.png"
                  th:src="@{/img/logo_cn.png}"
              /></a>
            </div>
            <div class="col-md-6 cn-rodape-txt">
              <i class="icon-globe icon-white"></i> Praça dos Três Poderes -
              Brasília, DF - CEP 70160-900 <br />
              <i class="icon-headphones icon-white"></i> Fale com o Senado: 0800
              612 211 <br />
              <i class="icon-headphones icon-white"></i> Disque Câmara: 0800 619
              619
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-landing-page': EdtLandingPage;
  }
}
