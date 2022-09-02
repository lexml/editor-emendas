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
    main {
      flex: auto;
      overflow: hidden;
      overflow-y: scroll;
    }
    .editor-emendas {
      height: calc(100% - 84px);
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .detalhe-emenda {
      padding: 9px 15px 14px 15px;
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
    }
    .detalhe-emenda--nome-proposicao {
      white-space: nowrap;
      font-weight: bold;
    }
    .detalhe-emenda--ementa {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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

    @media (max-width: 768px) {
      sl-split-panel {
        --divider-width: 0px !important;
      }
    }
  </style>
`;

export const cabecalhoStyles = html`
  <style>
    edt-cabecalho {
      display: block;
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
    }
    edt-cabecalho a {
      color: white;
      text-decoration: none;
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
      display: flex;
    }

    edt-menu sl-icon {
      font-size: 28px;
    }

    edt-menu sl-button::part(base) {
      background-color: transparent;
      border-color: transparent;
      color: var(--sl-color-neutral-700);
    }
    .menu-toggle {
      display: none;
      cursor: pointer;
    }
    @media (max-width: 576px) {
      .menu-toggle {
        display: flex;
      }
      edt-menu sl-button::part(label) {
        padding: 0 4px;
      }
      edt-menu sl-button {
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
  </style>
`;

export const novaEmendaStyles = html`
  <style>
    :host {
      font-size: var(--sl-font-size-small);
    }
    .form-group {
      display: flex;
      flex-direction: row;
      gap: 10px;
      flex-wrap: wrap;
    }
    table {
      border-spacing: 0;
    }
    thead tr {
      display: flex;
      flex-direction: row;
      border-bottom: 2px solid #000;
    }
    tbody {
      height: 280px;
      overflow: hidden;
      overflow-y: scroll;
      display: block;
      table-layout: fixed;
    }
    td {
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
    }
    th {
      padding: 0.5rem;
    }
    tr {
      cursor: pointer;
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
    .col-1 {
      width: 120px;
      text-align: center;
      white-space: nowrap;
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
    @media (max-width: 768px) {
      tbody {
        height: 250px;
      }
      sl-dialog {
        --width: 100vw;
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
      position: relative;
      padding-bottom: 56.25%;
      padding-top: 30px;
      height: 0;
      overflow: hidden;
      box-shadow: var(--sl-shadow-x-large);
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
