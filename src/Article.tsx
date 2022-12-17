import React, {useEffect, useRef} from 'react';
import 'blog.scss';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import yaml from 'highlight.js/lib/languages/yaml';
import 'highlight.js/styles/github.css';
import styled from "styled-components";
import {useRouter} from "router/Router";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);
hljs.configure({
  noHighlightRe: /blah/
})

const ArticleContainer = styled.div`
`;

const {HOST} = process.env;
const Article = () => {
  const {params} = useRouter();
  const {id} = params;
  // console.log(params);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    fetch(`${HOST}/blogs/${id}.html`).then(res => res.text()).then((html) => {
      html = html.replace(/src="\/(.+?)"/g, `src="${HOST}$1"`);
      if (ref.current) {
        ref.current.innerHTML = html;
      }
      // document.querySelectorAll('img').forEach((el) => {
      //   console.log(el.src);
      //   // el.src = `${HOST}${el.src}`;
      //   console.log(el.src);
      // });
      ref.current.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el as HTMLElement);
      });
    }).catch(() => {
      console.error('Not found: ' + id);
    });
  }, []);

  return (
    <ArticleContainer>
      <div className="article" ref={ref}></div>
    </ArticleContainer>
  );
}

export default Article
