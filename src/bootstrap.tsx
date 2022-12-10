import {h, render} from "preact";
import App from "App";

// render(<div>Blog</div>, document.body);

export const mount = (rootEl) => {
  console.log('mount blog');
  render(
    <App/>, rootEl
  );
};

// if (!window.customElements.get('my-blog')) {
//   class ExternalApp extends HTMLElement {
//     connectedCallback() {
//       render(
//         <App/>, this
//       );
//
//     }
//   }
//
//   window.customElements.define('my-blog', ExternalApp);
// }
