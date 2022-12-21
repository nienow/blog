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

    render() {
      console.debug('mount blog');
      const basename = this.getAttribute("basename") || '/';
      const style = this.getAttribute("style") || 'full';
      this.reactRoot.render(<App basename={basename} style={style}/>);
    }
  }

  window.customElements.define('randombits-blog', ExternalApp);
}
