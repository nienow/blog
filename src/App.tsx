import React, {Suspense} from "react";
import Router from "router/Router";
import RouterOutlet from "router/RouterOutlet";
import {GlobalStyle} from "GlobalStyle";
import ArticleListVertical from "ArticleListVertical";
import ArticleList from "ArticleList";

interface Params {
  basename: string;
  style: string;
}

// lazy so highlightjs styles aren't loaded right away
const ArticleRoute = React.lazy(() => import('./Article'));

const ROUTES = [
  {path: '/:id', element: <Suspense><ArticleRoute/></Suspense>},
  {path: '/', element: <ArticleList/>}
];

const App = ({basename}: Params) => {
  if (basename === '/') {
    return <ArticleListVertical limit={5}/>;
  } else if (basename === '/blog') {
    return (
      <Router basename={basename} routes={ROUTES}>
        <GlobalStyle/>
        <RouterOutlet/>
      </Router>
    );
  }
}

export default App
