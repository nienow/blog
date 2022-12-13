import App from "App";
import React from 'react';
import {createRoot, Root} from "react-dom/client";

// export const mount = (rootEl) => {
//   createRoot(rootEl).render(
//     <App/>,
//   );
// };

if (!window.customElements.get('my-blog')) {
  class ExternalApp extends HTMLElement {
    private reactRoot: Root = null;

    connectedCallback() {
      console.log('mount blog');
      const basename = this.getAttribute("basename") || '/';
      const style = this.getAttribute("style") || 'full';
      this.reactRoot = createRoot(this);
      this.reactRoot.render(<App basename={basename} style={style}/>);
    }

    disconnectedCallback() {
      setTimeout(() => {
        console.log('unmount blog');
        this.reactRoot.unmount();
        this.reactRoot = null;
      })

    }
  }

  window.customElements.define('my-blog', ExternalApp);
}
