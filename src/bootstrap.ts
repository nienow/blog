import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import yaml from 'highlight.js/lib/languages/yaml';
import 'highlight.js/styles/github.css';
import './blog.scss';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);

const {HOST} = process.env;

if (!window.customElements.get('randombits-markdown')) {
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

  window.customElements.define('randombits-markdown', ExternalApp);
}
