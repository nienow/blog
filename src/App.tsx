import React from "react";
import Router from "router/Router";
import RouterOutlet from "router/RouterOutlet";
import Article from "Article";
import ArticleList from "ArticleList";


interface Params {
  basename: string;
  style: string;
}

const ROUTES = [
  {path: '/blog/article/:id', element: <Article/>},
  {path: '/blog', element: <ArticleList/>}
];

const App = ({basename}: Params) => {


  return (
    <Router basename={basename} routes={ROUTES}>
      <RouterOutlet/>
    </Router>
  );
}

export default App
