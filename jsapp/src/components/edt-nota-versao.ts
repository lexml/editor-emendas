import { LitElement, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('edt-notas-versao')
export class EdtNotasVersao extends LitElement {
  createRenderRoot(): LitElement {
    return this;
  }

  render(): TemplateResult {
    return html`
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          congue, dui vel efficitur ultrices, magna leo ultricies ligula, sed
          mattis nibh dui sollicitudin diam. Nam blandit nisi ut ligula sodales,
          id molestie turpis mattis. Proin consectetur magna ut semper cursus.
          Sed mattis ullamcorper velit in porta. Quisque non elit sapien.
          Integer vitae ipsum ac ante egestas mollis vitae semper nunc. Duis
          pellentesque metus id feugiat consequat. Donec ac auctor lacus.
          Vivamus at lorem a nibh vulputate posuere. Nullam bibendum a est vitae
          lacinia. Praesent et dui faucibus sapien elementum lobortis vel nec
          metus. Praesent aliquam massa neque, at vulputate justo sodales in.
          Duis facilisis eget ante sed faucibus. Nulla facilisi. Quisque dictum
          venenatis lectus nec porta. Donec bibendum, lectus vitae accumsan
          feugiat, quam nisl facilisis est, a iaculis velit metus vel urna. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Nulla hendrerit, ipsum in facilisis euismod, felis ante
          vestibulum magna, non consequat nisl orci sed odio. Vivamus commodo,
          erat vitae rhoncus hendrerit, nulla diam congue ligula, sed facilisis
          est ipsum vitae urna. Mauris placerat, enim tincidunt ultricies
          congue, ex sem commodo lorem, eu convallis metus purus sed mauris.
          Fusce felis dui, tempus non condimentum a, hendrerit ut erat. Maecenas
          a mi sit amet libero molestie laoreet. Nullam maximus quis arcu vel
          congue. Donec luctus, orci id condimentum varius, tellus quam varius
          libero, a viverra sapien orci quis magna. Sed ullamcorper mi vitae
          lorem sodales tincidunt. Donec vehicula facilisis viverra. Etiam
          venenatis et eros ac pretium. In hac habitasse platea dictumst. Ut
          tempus sagittis turpis, sed rhoncus purus pretium sit amet.
        </p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edt-notas-versao': EdtNotasVersao;
  }
}
