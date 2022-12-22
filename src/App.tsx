import React, {Suspense} from "react";
import Router from "router/Router";
import RouterOutlet from "router/RouterOutlet";
import ArticleListVertical from "ArticleListVertical";
import ArticleList from "ArticleList";
import Page from "Page";

interface Params {
  basename: string;
  page: string;
}

// lazy so highlightjs styles aren't loaded right away
const ArticleRoute = React.lazy(() => import('./Article'));

const ROUTES = [
  {path: '/:id', element: <Suspense><ArticleRoute/></Suspense>},
  {path: '/', element: <ArticleList/>}
];

const App = ({basename, page}: Params) => {
  if (page) {
    return <Page page={page}/>;
  } else if (basename === '/') {
    return <ArticleListVertical limit={5}/>;
  } else if (basename === '/articles') {
    return (
      <Router basename={basename} routes={ROUTES}>
        <RouterOutlet/>
      </Router>
    );
  } else {
    return <div>Error</div>
  }
}

export default App
