import React, {useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import 'blog.scss';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';
import styled from "styled-components";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

const ArticleContainer = styled.div`
  background-color: white;
`;

const Article = () => {
  const {id} = useParams();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    fetch('../blogs/' + id + '.html').then(res => res.text()).then((html) => {
      if (ref.current) {
        ref.current.innerHTML = html;
      }
      document.querySelectorAll('pre code').forEach((el) => {
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
