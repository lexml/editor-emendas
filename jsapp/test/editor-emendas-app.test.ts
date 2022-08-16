import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import { EdtApp } from '../src/components/edt-app.js';

describe('EdtApp', () => {
  let element: EdtApp;
  beforeEach(async () => {
    element = await fixture(html`<editor-emendas-app></editor-emendas-app>`);
  });

  it('renders a h2', () => {
    const h2 = element.shadowRoot!.querySelector('h2')!;
    expect(h2).to.exist;
    expect(h2.textContent).to.equal('Editor de Emendas');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
