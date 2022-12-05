import React from 'react';

import blogs from 'generated/blog-list.json';
import styled from "styled-components";

const ArticleListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ArticleContainer = styled.a`
  box-sizing: border-box;
  max-width: 350px;
  height: 300px;
  margin: 10px;
  border-radius: 5px;
  text-decoration: none;
  color: #333;
  padding: 20px;
  background-color: #eee;


  &:hover {
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5) inset;
  }
`;

const ArticleTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: #333;
`;

const ArticleQuick = styled.div`
  font-size: 16px;
  margin: 20px 0;
  font-weight: 400;
  -webkit-line-clamp: 5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const ArticleSummary = ({blog}) => {
  const url = `article/${blog.id}`;
  return <ArticleContainer href={url}>
    <ArticleTitle>{blog.title}</ArticleTitle>
    <ArticleQuick>
      {blog.summary}
    </ArticleQuick>
    <div>
      Read more -&gt;
    </div>
  </ArticleContainer>;
};

const ArticleList = () => {
  return (
    <div>
      <h1>Article List</h1>
      <ArticleListContainer>
        {
          blogs.map(blog => <ArticleSummary blog={blog}/>)
        }
      </ArticleListContainer>
    </div>
  );
}

export default ArticleList
