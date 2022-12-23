import App from "App";
import React from 'react';
import {createRoot, Root} from "react-dom/client";

if (!window.customElements.get('randombits-blog')) {
  class ExternalApp extends HTMLElement {
    private reactRoot: Root = null;
    private attrType: string = 'article';
    private attrId: string = '';

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

    static get observedAttributes() {
      return ["name"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue) {
        this.render();
      }
    }

    render() {
      console.debug('mount blog');
      const type = this.getAttribute("type");
      const id = this.getAttribute("name");
      this.reactRoot.render(<App key={new Date().getTime()} type={type} id={id}/>);
    }
  }

  window.customElements.define('randombits-blog', ExternalApp);
}
