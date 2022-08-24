import { html } from 'lit';
export const appStyles = html`
  <style>
    :host {
      /* min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center; */
      background-color: var(--editor-emendas-background-color);
    }

    /* * {
      height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
    } */

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
      height: calc(100% - 100px);
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .detalhe-emenda {
      padding: 10px;
      background-color: #dfe9ff;
      margin: 10px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .detalhe-emenda--titulo {
      display: flex;
      flex-direction: row;
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
  </style>
`;

export const menuStyles = html`
  <style>
    edt-menu {
      display: flex;
      flex-direction: row;
      padding: 0.5rem;
      background: #eee;
      flex-flow: wrap;
    }

    edt-menu sl-button {
      display: flex;
      row-gap: 10px;
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
  </style>
`;
