import {render, h} from "preact";
import App from "App";

// render(<div>Blog</div>, document.body);



if (!window.customElements.get('my-blog')) {
  class ExternalApp extends HTMLElement {
    connectedCallback() {
      render(
        <App/>, this
      );

    }
  }

  window.customElements.define('my-blog', ExternalApp);
}

export {};
