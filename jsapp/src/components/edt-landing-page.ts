/* eslint-disable @typescript-eslint/no-unused-vars */
import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { landingPageStyles } from './app.css';
@customElement('edt-landing-page')
export class EdtLandingPage extends LitElement {
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
      ${landingPageStyles}
      <nav
        class="navbar navbar-expand-lg navbar-light fixed-top py-3"
        id="mainNav"
      >
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
          <h2 class="text-center mt-0">Principais funcionalidades</h2>
          <hr class="divider" />
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
                  <i class="bi-collection fs-1 text-muted"></i>
                </div>
                <h3 class="h4 mb-2 text-muted">
                  Inclusão de agrupadores de artigo
                </h3>
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
                  <i class="bi-file-earmark-plus fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Criar emenda</h3>
                <a
                  class="btn btn-primary btn-sm py-1 px-3 my-3 rounded-pill"
                  href="https://www.youtube.com/watch?v=mTlR7WCT2e0&list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2"
                  target="_blank"
                  >Assista ao tutorial</a
                >
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-file-pdf fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Salvar emenda</h3>
                <a
                  class="btn btn-primary btn-sm py-1 px-3 my-3 rounded-pill"
                  href="https://youtu.be/mTlR7WCT2e0?list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2&t=133"
                  target="_blank"
                  >Assista ao tutorial</a
                >
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2"><i class="bi-pen fs-1 text-primary"></i></div>
                <h3 class="h4 mb-2">Editar emenda</h3>
                <a
                  class="btn btn-primary btn-sm py-1 px-3 my-3 rounded-pill"
                  href="https://youtu.be/S7pQXIhSdFo?list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2"
                  target="_blank"
                  >Assista ao tutorial</a
                >
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-justify fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Justificar a emenda</h3>
                <a
                  class="btn btn-primary btn-sm py-1 px-3 my-3 rounded-pill"
                  href="https://youtu.be/mTlR7WCT2e0?list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2&t=40"
                  target="_blank"
                  >Assista ao tutorial</a
                >
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="mt-5">
                <div class="mb-2">
                  <i class="bi-person fs-1 text-primary"></i>
                </div>
                <h3 class="h4 mb-2">Informar data e autoria</h3>
                <a
                  class="btn btn-primary btn-sm py-1 px-3 my-3 rounded-pill"
                  href="https://youtu.be/mTlR7WCT2e0?list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2&t=44"
                  target="_blank"
                  >Assista ao tutorial</a
                >
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
                        <a
                          class="btn btn-primary btn-sm py-1 px-3 my-3 rounded-pill"
                          href="https://youtu.be/mTlR7WCT2e0?list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2&t=108"
                          target="_blank"
                          >Assista ao tutorial</a
                        >
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
                        <a
                          class="btn btn-primary btn-sm py-1 px-3 my-3 rounded-pill"
                          href="#"
                          target="_blank"
                          >Assista ao tutorial</a
                        >
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                      <div class="mt-5">
                        <div class="mb-2">
                          <i class="bi-list-nested fs-1 text-primary"></i>
                        </div>
                        <h3 class="h4 mb-2">Transformar dispositivos</h3>
                        <a
                          class="btn btn-primary btn-sm py-1 px-3 my-3 rounded-pill"
                          href="https://www.youtube.com/watch?v=M8KZ_3zr28c&list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2&index=9"
                          target="_blank"
                          >Assista ao tutorial</a
                        >
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                      <div class="mt-5">
                        <div class="mb-2">
                          <i class="bi-window-fullscreen fs-1 text-primary"></i>
                        </div>
                        <h3 class="h4 mb-2">Alterar norma vigente</h3>
                        <a
                          class="btn btn-primary btn-sm py-1 px-3 my-3 rounded-pill"
                          href="https://www.youtube.com/watch?v=NOyXN08NG_M&list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2&index=10"
                          target="_blank"
                          >Assista ao tutorial</a
                        >
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
                        Adicionar agrupadores de artigos
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
                href="https://www.youtube.com/watch?v=mTlR7WCT2e0&list=PL359nhvnb6z4xKIgmVr2GdFWOssLQ2-b2"
                target="_blank"
                >ACESSAR O CANAL</a
              >
            </div>
            <div class="col-lg-5">
              <div class="tutorial container text-center my-5 ratio ratio-16x9">
                <iframe
                  class="shadow-lg"
                  src="https://www.youtube.com/embed/mTlR7WCT2e0"
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
          <div class="row gx-4 gx-lg-5 justify-content-center mb-5 d-none">
            <div class="col-lg-6">
              <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    data-sb-validations="required"
                  />
                  <label for="name">Nome completo</label>
                  <div
                    class="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    O nome é requerido.
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    data-sb-validations="required,email"
                  />
                  <label for="email">Endereço de email</label>
                  <div
                    class="invalid-feedback"
                    data-sb-feedback="email:required"
                  >
                    Um e-mail é requerido.
                  </div>
                  <div class="invalid-feedback" data-sb-feedback="email:email">
                    Email não é válido.
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <textarea
                    class="form-control"
                    id="message"
                    type="text"
                    placeholder="Enter your message here..."
                    style="height: 10rem"
                    data-sb-validations="required"
                  ></textarea>
                  <label for="message">Mensagem</label>
                  <div
                    class="invalid-feedback"
                    data-sb-feedback="message:required"
                  >
                    Uma mensagem é requerida.
                  </div>
                </div>
                <div class="d-none" id="submitSuccessMessage">
                  <div class="text-center mb-3">
                    <div class="fw-bolder">Mensagem enviada com sucesso!</div>
                  </div>
                </div>
                <div class="d-none" id="submitErrorMessage">
                  <div class="text-center text-danger mb-3">
                    Ocorreu um erro no envio da mensagem!
                  </div>
                </div>
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-xl disabled"
                    id="submitButton"
                    type="submit"
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
      <footer class="bg-primary">
        <div class="container text-white pt-3 pb-4">
          <b>Congresso Nacional</b>
          <br />Praça dos Três Poderes - Brasília, DF - CEP 70165-900 <br />Fale
          com o Senado: 0800 0 612 211 / Disque Câmara: 0800 0 619 619
          <div class="d-flex flex-row">
            <div class="pr-2">
              <a
                class="text-white"
                href="https://www.congressonacional.leg.br/fale-conosco"
                >Fale conosco</a
              >
              |
            </div>
            <div class="px-2">
              <a href="https://www12.senado.leg.br/hpsenado" target="_blank">
                <img
                  src="https://www.congressonacional.leg.br/congresso-theme/images/_topo_senado_ico.png"
                  alt="Senado"
                />
              </a>
            </div>
            <div class="px-2">
              <a href="https://www2.camara.leg.br/" target="_blank">
                <img
                  src="https://www.congressonacional.leg.br/congresso-theme/images/_topo_camara_ico.png"
                  alt="Câmara"
                />
              </a>
            </div>
            <div class="px-1">
              <a
                href="https://portal.tcu.gov.br/inicio/index.htm"
                target="_blank"
              >
                <img
                  src="https://www.congressonacional.leg.br/congresso-theme/images/icon-tcu.svg"
                  alt="TCU"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-landing-page': EdtLandingPage;
  }
}
