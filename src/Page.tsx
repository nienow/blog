import React, {useEffect, useRef} from 'react';
import 'blog.scss';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import yaml from 'highlight.js/lib/languages/yaml';
import 'highlight.js/styles/github.css';
import styled from "styled-components";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);

const PageContainer = styled.div`
`;

const {HOST} = process.env;
const Page = ({id}) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    fetch(`${HOST}/pages/${id}.html`).then(res => res.text()).then((html) => {
      html = html.replace(/src="\/(.+?)"/g, `src="${HOST}$1"`);
      if (ref.current) {
        ref.current.innerHTML = html;
      }
      ref.current.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el as HTMLElement);
      });
    }).catch(() => {
      console.error('Not found: ' + id);
    });
  }, []);

  return (
    <PageContainer>
      <div className="article" ref={ref}></div>
    </PageContainer>
  );
}

export default Page
