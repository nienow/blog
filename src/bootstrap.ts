import hljs from 'highlight.js/lib/core';

const {HOST} = process.env;

if (!window.customElements.get('randombits-blog')) {
  class ExternalApp extends HTMLElement {

    connectedCallback() {
      this.render();
    }

    disconnectedCallback() {
      // TODO: something
    }

    static get observedAttributes() {
      return ['page', 'article'];
    }

    attributeChangedCallback(name, oldValue) {
      if (oldValue) {
        this.render();
      }
    }

    render() {
      console.debug('mount blog');
      const pageId = this.getAttribute('page');
      const articleId = this.getAttribute('article');
      let url;
      if (pageId) {
        url = `${HOST}/pages/${pageId}.html`;
      } else if (articleId) {
        url = `${HOST}/articles/${articleId}.html`;
      }
      if (url) {
        fetch(url).then(res => res.text()).then((html) => {
          html = html.replace(/src="\/(.+?)"/g, `src="${HOST}$1"`);
          this.innerHTML = html;
          this.querySelectorAll('pre code').forEach((el) => {
            hljs.highlightElement(el as HTMLElement);
          });
        }).catch(() => {
          console.error('Not found: ' + url);
        });
      }
    }
  }

  window.customElements.define('randombits-blog', ExternalApp);
}
