import React, {Suspense} from "react";
import Page from "Page";

interface Params {
  type: string;
  id: string;
}

// lazy so highlightjs styles aren't loaded right away
const ArticleRoute = React.lazy(() => import('./Article'));

// const ROUTES = [
//   {path: '/:id', element: <Suspense><ArticleRoute/></Suspense>},
//   {path: '/', element: <ArticleList/>}
// ];

const App = ({type, id}: Params) => {
  if (type === 'page') {
    return <Page page={id}/>;
  } else if (type === 'article') {
    return <Suspense><ArticleRoute id={id}/></Suspense>;
  } else {
    return <div>Error</div>
  }
}

export default App
