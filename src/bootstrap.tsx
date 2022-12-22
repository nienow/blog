import App from "App";
import React from 'react';
import {createRoot, Root} from "react-dom/client";

if (!window.customElements.get('randombits-blog')) {
  class ExternalApp extends HTMLElement {
    private reactRoot: Root = null;

    connectedCallback() {
      this.reactRoot = createRoot(this);
      this.render();
    }

    disconnectedCallback() {
      setTimeout(() => {
        console.debug('unmount blog');
        this.reactRoot.unmount();
        this.reactRoot = null;
      })
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log('attribute change: ', name, oldValue, newValue);
    }

    render() {
      console.debug('mount blog');
      const basename = this.getAttribute("basename") || '/';
      const page = this.getAttribute("page");
      this.reactRoot.render(<App basename={basename} page={page}/>);
    }
  }

  window.customElements.define('randombits-blog', ExternalApp);
}
