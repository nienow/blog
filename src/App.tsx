import React from "react";
import Router from "router/Router";
import RouterOutlet from "router/RouterOutlet";
import Article from "Article";
import "./index.scss";
import {GlobalStyle} from "GlobalStyle";
import ArticleListVertical from "ArticleListVertical";
import ArticleList from "ArticleList";

interface Params {
  basename: string;
  style: string;
}

const ROUTES = [
  {path: '/article/:id', element: <Article/>},
  {path: '/', element: <ArticleList/>}
];

const App = ({basename}: Params) => {
  if (basename === '/') {
    return <ArticleListVertical limit={5}/>;
  } else {
    return (
      <Router basename={basename} routes={ROUTES}>
        <GlobalStyle/>
        <RouterOutlet/>
      </Router>
    );
  }
}

export default App
