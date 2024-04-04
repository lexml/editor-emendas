import { html } from 'lit';

export const appStyles = html`
  <style>
    :host {
      background-color: var(--editor-emendas-background-color);
    }

    body,
    html {
      height: 100%;
      width: 100%;
      font-family: var(--sl-font-sans);
    }
    edt-app {
      height: 100%;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    #titulo {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    #titulo span {
      font-weight: normal;
      color: var(--sl-color-gray-50);
    }
    main {
      flex: auto;
      overflow: hidden;
      overflow-y: scroll;
    }
    .no-scroll {
      overflow-y: hidden;
    }
    .editor-emendas {
      height: calc(100% - 40px);
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .detalhe-emenda {
      padding: 9px 15px 5px 15px;
      background-color: #dfe9ff;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .detalhe-emenda--titulo {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      text-decoration: none;
      color: #1a2b42;
      font-size: var(--sl-font-size-small);
      height: 24px;
    }
    .detalhe-emenda--nome-proposicao {
      white-space: nowrap;
      font-weight: bold;
    }
    sl-tag::part(base) {
      box-sizing: border-box;
      pointer-events: none;
    }
    sl-tag::part(base) {
      box-sizing: border-box;
    }

    .detalhe-emenda--prazo::part(base) {
      padding: 6px;
    }

    .detalhe-emenda--prazo sl-icon {
      margin-top: 9px;
      font-size: 14px;
    }

    .detalhe-emenda--ementa {
      display: block;
      width: 100%;
      white-space: nowrap;
      overflow: scroll;
      padding-right: 30px;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      -webkit-mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%);
    }

    .detalhe-emenda--ementa::-webkit-scrollbar {
      display: none;
    }

    sl-split-panel {
      flex: auto;
    }
    edt-notas-versao {
      display: block;
      padding: 0 20px;
    }

    sl-split-panel {
      --divider-width: 15px !important;
    }

    sl-split-panel::part(divider) {
      background-color: #dfe9ff;
    }
    sl-radio-group::part(base) {
      margin-bottom: 80px;
    }

    .overflow-hidden {
      overflow: hidden;
      height: calc(100vh - 205px) !important;
    }

    .sl-toast-stack sl-alert::part(base) {
      background-color: white !important;
    }

    .sl-toast-stack sl-alert[variant='success']::part(base) {
      background-color: var(--sl-color-green-100) !important;
    }

    .sl-toast-stack sl-alert[variant='danger']::part(base) {
      background-color: var(--sl-color-red-100) !important;
    }

    @media (max-width: 768px) {
      sl-split-panel {
        --divider-width: 0px !important;
      }
    }

    #lx-eta-editor .ql-editor {
      min-height: 30px !important;
    }

    .emenda-status {
      height: 9px;
      width: 9px;
      border-radius: 50%;
      margin: 0 0 2px 4px;
      display: block;
    }

    .emenda-status--dirty {
      display: inline-block;
      background-color: var(--sl-color-neutral-50);
    }

    label {
      font-weight: bold;
    }

    .dialog-emenda {
      --width: 60vw;
    }

    @media (max-width: 768px) {
      .dialog-emenda {
        --width: 100vw;
      }
    }
  </style>
`;

export const cabecalhoStyles = html`
  <style>
    edt-cabecalho {
      display: flex;
      flex-direction: row;
      padding: 10px;
      background-color: #3b5998;
    }
    edt-cabecalho h1 {
      color: white;
      font-size: 1.1em;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      font-weight: bold;
      max-width: max-content;
      width: 100%;
    }
    edt-cabecalho a {
      color: white;
      text-decoration: none;
    }

    edt-cabecalho .titulo-editor {
      flex-grow: 1;
      display: flex;
      color: white;
      overflow: hidden;
      white-space: nowrap;
      align-items: center;
    }
    #titulo {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    sl-button.usuario {
      margin-left: 1rem;
    }

    sl-button.usuario::part(base) {
      /* Set design tokens for height and border width */
      --sl-input-height-medium: 48px;
      --sl-input-border-width: 0px;
      color: white;
      font-size: 0.8em;
      border-radius: 50px;
      background: linear-gradient(145deg, #355089, #3f5fa3);
      box-shadow: 0 -2px 10px rgb(96 131 204), 0 2px 4px rgb(25 47 91);
    }

    sl-button.usuario::part(base):hover {
      transform: scale(1.05);
    }

    sl-button.usuario::part(base):active {
    }

    sl-button.usuario::part(base):focus-visible {
      box-shadow: 0 0 0 3px var(--sl-color-primary-500);
    }
  </style>
`;

export const menuStyles = html`
  <style>
    edt-menu {
      display: flex;
      flex-direction: row;
      padding: 0px 5px;
      background: var(--sl-color-gray-100);
      border-bottom: 1px solid var(--sl-color-gray-200);
      flex-flow: wrap;
      gap: 0;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }

    edt-menu sl-button {
    }
    edt-menu sl-button:hover {
      background-color: var(--sl-color-gray-200);
    }

    edt-menu sl-button sl-icon {
      font-size: 18px;
    }

    .botao-emenda sl-icon {
      font-size: 26px;
    }

    edt-menu sl-button::part(label) {
      /* border: 1px solid green; */
    }

    edt-menu sl-button::part(base) {
      --sl-input-height-small: 36px;
      background-color: transparent;
      border-color: transparent;
      color: var(--sl-color-neutral-700);
    }

    edt-notas-versao edt-menu sl-icon {
      font-size: 28px;
    }

    @media (max-width: 870px) {
      edt-menu sl-button:nth-last-child(-n + 4) sl-icon {
        padding: 0 13px 0 5px;
      }

      edt-menu sl-button[caret]:nth-last-child(-n + 4) sl-icon {
        padding: 0 2px 0 5px;
      }

      edt-menu sl-button[caret]:nth-last-child(-n + 4)::part(base) {
        padding: 0 6px 0 1px;
      }

      edt-menu sl-button:nth-last-child(-n + 4)::part(label) {
        display: none;
      }
    }

    @media (max-width: 560px) {
      edt-menu sl-button:nth-last-child(-n + 7) sl-icon {
        padding: 0 11px 0 3px;
      }

      edt-menu sl-button[caret]:nth-last-child(-n + 7) sl-icon {
        padding: 0 2px 0 3px;
      }

      edt-menu sl-button[caret]:nth-last-child(-n + 7)::part(base) {
        padding: 0 3px 0 1px;
      }
      edt-menu sl-button:nth-last-child(-n + 7)::part(label) {
        display: none;
      }
    }
  </style>
`;

export const rodapeStyles = html`
  <style>
    edt-rodape {
      color: white;
      display: block;
      padding: 0.5rem;
      background: #3b5998;
    }

    edt-rodape a {
      color: white;
      text-decoration: none;
    }

    edt-rodape span {
      float: right;
      font-size: 0.8em;
      padding: 2px 14px;
      border-radius: 50px;
      background: linear-gradient(145deg, #355089, #3f5fa3);
      box-shadow: 0 -2px 10px rgb(96 131 204), 0 2px 4px rgb(25 47 91);
      position: absolute;
      right: 10px;
    }
  </style>
`;

export const novaEmendaStyles = html`
  <style>
    :host {
      font-size: var(--sl-font-size-small);
    }

    .hidden {
      display: none;
      border: 1px solid red;
    }

    .form-group {
      display: flex;
      flex-direction: row;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }

    .table-wrap {
      height: 50vh;
      overflow-x: hidden;
      overflow-y: auto;
      border: 1px solid #ccc;
      -webkit-overflow-scrolling: touch;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: -1px;
      width: calc(100% + 2px);
    }

    thead th {
      position: sticky;
      top: 0;
    }
    thead tr {
      border-bottom: 3px solid var(--sl-color-neutral-400);
    }

    html {
      box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
      position: relative;
    }

    body {
      padding: 20px;
      -webkit-font-smoothing: antialiased;
    }

    th,
    td {
      border: 1px solid #ccc;
      padding: 0.5rem;
      font: caption;
      outline-offset: -1px;
    }

    th {
      font-weight: 700;
      z-index: 1;
    }

    th:after {
      content: '';
      display: block;
      position: absolute;
      background-color: var(--sl-color-neutral-100);
      top: -1px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      outline: 1px solid #ccc;
    }

    tr:nth-of-type(even) {
      background-color: whitesmoke;
    }
    */ .table-wrap::-webkit-scrollbar {
      -webkit-appearance: none;
      border-left: 1px solid #ccc;
      background-image: linear-gradient(to top, whitesmoke, white);
    }

    .table-wrap::-webkit-scrollbar:vertical {
      width: 0.6rem;
    }

    .table-wrap::-webkit-scrollbar:horizontal {
      width: 0.6rem;
    }

    .table-wrap::-webkit-scrollbar-thumb {
      border-radius: 0.8rem;
      background-color: rgba(51, 51, 51, 0.5);
    }

    tr[disabled='true'] {
      cursor: auto;
      pointer-events: none;
      color: var(--sl-color-neutral-400);
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    tr[selected] {
      background-color: #f7ff9c;
    }

    tr[selected]:hover {
      background-color: #f7ff9c;
    }

    tbody tr:hover {
      background-color: #fcffdd;
    }

    .modal-nova-emenda--info {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 584px) {
      .table-wrap {
        max-height: 200px;
      }
    }

    .col-center {
      width: 120px;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
    }
    td.col-2 {
      vertical-align: baseline;
    }
    .ementa {
      overflow: clip;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      pointer-events: none;
    }
    .tipo-proposicao,
    .numero-proposicao,
    .ano-proposicao {
      width: 120px;
      transition: all 0.5s ease-out;
    }
    #ementa {
      width: 100%;
      font-family: var(--sl-font-size-small);
    }
    label {
      font-weight: bold;
    }
    sl-dialog {
      --width: 80vw;
    }
    sl-badge[variant='neutral']::part(base) {
      background-color: var(--sl-color-neutral-100);
      color: var(--sl-color-neutral-500);
      border-color: var(--sl-color-neutral-300);
    }
    @media (max-width: 768px) {
      sl-dialog {
        --width: 100vw;
      }
    }
    @media (max-width: 584px) {
      .tipo-proposicao,
      .numero-proposicao,
      .ano-proposicao {
        width: 77px;
      }
    }
    @media (max-width: 480px) {
      .button-pesquisar::part(label) {
        display: none;
      }
      .button-pesquisar sl-icon {
        padding: 0 9px 0 0;
        font-size: 16px;
      }
      .form-group {
        gap: 2px;
      }
      .numero-proposicao,
      .ano-proposicao {
        width: 60px;
      }
      .col-center {
        width: 80px;
        font-size: 14px;
        white-space: break-spaces;
      }
      .ementa {
        font-size: 14px;
      }
      sl-dialog::part(title) {
        padding: 10px 20px;
      }
    }
  </style>
`;

export const notaVersaoStyles = html`
  <style>
    :host {
      font-size: var(--sl-font-size-medium);
    }
    .titulo {
      margin: 10px 0 0 0;
      font-size: var(--sl-font-size-2x-large);
      color: var(--sl-color-gray-900);
    }
    .data-versao {
      color: var(--sl-color-gray-500);
    }
    .conteudo {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-gap: 30px;
    }
    .conteudo-direito {
      padding: 20px 0 5px 0;
    }
    .conteudo-esquerdo {
      padding: 0 0 20px 0;
    }
    .botao-emenda {
      margin: 30px 20px 20px 0;
    }
    .video-container {
      box-shadow: var(--sl-shadow-x-large);
    }
    .video-container a {
      cursor: pointer;
      pointer-events: auto;
    }
    .video-container--thumb {
      width: 100%;
      height: auto;
      border-radius: 0.25rem;
    }
    .legenda {
      font-size: var(--sl-font-size-small);
      color: var(--sl-color-neutral-500);
    }
    @media (max-width: 768px) {
      .titulo {
        margin: 0;
      }
      .conteudo {
        display: flex;
        flex-direction: column-reverse;
        grid-gap: 10px;
      }
      .video-container {
        margin: 20px 0 0 0;
      }
      .video-container a {
        cursor: pointer;
        pointer-events: auto;
      }
      .conteudo-direito {
        padding: 0 0 5px 0;
      }
      .botao-emenda {
        width: auto;
        margin-right: var(--sl-spacing-x-small);
        margin-bottom: 0;
      }
    }
    @media (max-width: 480px) {
      .botao-emenda {
        width: 100%;
        margin-top: var(--sl-spacing-medium);
        margin-right: 0;
      }
    }
  </style>
`;

export const visualizarPdfStyles = html`
  <style>
    .pdf-area,
    embed {
      width: 100%;
      height: 80vh;
      min-height: 480px;
    }
    sl-dialog {
      --body-spacing: 0;
      border: 1px solid red;
    }
  </style>
`;

export const ondeCouberStyles = html`
  <style>
    sl-dialog {
      --width: 50vw;
    }
    @media (max-width: 1032px) {
      sl-dialog {
        --width: 70vw;
      }
    }
    @media (max-width: 768px) {
      sl-dialog {
        --width: 100vw;
      }
    }
    @media (max-width: 576px) {
      sl-dialog {
        --width: 100vw;
      }
      sl-button {
        margin-left: 0;
        width: 100%;
        margin-bottom: var(--sl-spacing-x-small);
      }
    }
  </style>
`;

export const landingPageStyles = html`
  <!-- Bootstrap Icons-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
  <!-- Google fonts-->
  <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="./assets/css/styles-landing-page.css" />
  <!-- SimpleLightbox plugin CSS-->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css" rel="stylesheet" />
  <style>
    :root {
      --edt-opacity-overlay: 0.3;
      --edt-color-overlay-button: #fff;
    }
    edt-cabecalho,
    edt-menu,
    edt-rodape {
      display: none !important;
    }

    .links-header .link-externo {
      color: #fff;
      text-decoration: none;
    }

    .links-header .link-externo:nth-child(1):hover {
      text-decoration: underline;
    }

    .overlay-play-button {
      /* Used to position the overlay */
      position: relative;
    }

    .overlay-play-button__play {
      font-size: 5rem;
      opacity: var(--edt-opacity-overlay);
      color: var(--edt-color-overlay-button);
      filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.5));
      -webkit-filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.5));
      transition: all 0.1s ease-in-out;
    }

    .overlay-play-button__overlay {
      left: 0;
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      align-items: center;
      display: flex;
      justify-content: center;
      background-color: rgba(0, 0, 0, var(--edt-opacity-overlay));
      transition: all 0.1s ease-in-out;
      cursor: pointer;
    }

    .overlay-play-button__overlay:hover {
      background-color: rgba(255, 255, 255, 0.05);
      --edt-opacity-overlay: 0.9;
      --edt-color-overlay-button: #f00;
      box-shadow: 0 0 2rem rgba(255, 255, 255, 0.5);
    }

    .funcionalidades--link {
      display: block;
      color: var(--bs-body-color);
      text-decoration: none;
      border-radius: 1rem;
      padding: 2rem 0.5rem;
      transition: all 0.3s;
    }

    .funcionalidades--link:visited {
      color: var(--sl-color-gray-400);
    }

    .funcionalidades--link:hover {
      color: #f4623a;
      outline: 1px solid var(--sl-color-gray-300);
      box-shadow: var(--sl-shadow-x-large);
    }

    .funcionalidades--link:active {
      color: #f4623a;
      outline: 1px solid var(--sl-color-blue-900);
      box-shadow: none;
    }

    .js-vlibras {
      padding: 0 0 0 10px;
    }

    #groupOrigem {
      margin-top: 5px;
      text-align: center;
    }

    #groupOrigem span {
      margin-left: 5px;
      margin-right: 5px;
      white-space: nowrap;
    }

    #groupOrigem span label {
      font-weight: normal;
    }
  </style>
`;

export const ajudaStyles = html`
  <style>
    sl-dialog {
      --width: 720px;
      height: 80vh;
    }

    .fullscreen-btn {
      display: none;
    }

    @media (max-width: 1024px) {
      sl-dialog {
        --width: 70vw;
      }
    }
    @media (max-width: 768px) {
      sl-dialog {
        --width: 100vw;
      }
    }
    @media (max-width: 576px) {
      sl-dialog {
        --width: 100vw;
      }
      .fullscreen-btn {
        display: block;
      }
    }

    .video-container {
      position: relative;
      top: 0;
      width: 100%;
    }

    .video-container::after {
      padding-top: 56.25%;
      display: block;
      content: '';
    }

    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1; /* This ensures the iframe stays on top */
    }

    .fullscreen-content {
      display: flex;
      justify-content: center;
      margin: 10px 0;
    }

    .fullscreen-btn {
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px 15px;
      border: none;
      cursor: pointer;
      border-radius: 20px;
    }
  </style>
`;

export const usuarioStyles = html`<style></style>`;
