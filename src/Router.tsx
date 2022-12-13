import React, {createContext, useContext, useEffect, useState} from "react";
import ArticleList from "ArticleList";
import Article from "Article";
import {routeTest} from "route-test";

// const RouteNotFound = () => <div>Route not found</div>;


const ROUTES = [
  {path: '/blog/article/:id', element: () => <Article/>},
  // {path: '/blog/.*', element: () => <Blog/>},
  {path: '/blog', element: () => <ArticleList/>}
];

interface IRouterContext {
  url: string;
  params: any;
  current: any;
  routes: { path: string, element: any }[];
  navigate: (newUrl) => void;
}

const GLOBAL_ROUTE_CONTEXT = {
  url: location.pathname,
  params: {},
  current: null,
  routes: ROUTES,
  navigate: null
};

const RouterContext = createContext<IRouterContext>(GLOBAL_ROUTE_CONTEXT);

export const useRouter = () => {
  return useContext(RouterContext);
};


const Router = ({basename, children}) => {
  // console.log(basename);
  const [url, setUrl] = useState(location.pathname);
  const [params, setParams] = useState({});
  const [current, setCurrent] = useState(null);
  const calcRoute = (newUrl) => {
    setUrl(newUrl);
    setCurrent(ROUTES.find(child => {
      // return new RegExp('^' + child.path + '$').test(url);
      const result = routeTest(newUrl, child.path, {});
      setParams(result);
      return !!result;
    }));
  };

  const navigate = (newUrl) => {
    window.history.pushState({}, null, basename + '/' + newUrl);
    const fullUrl = basename + '/' + newUrl;
    console.log('blog navigate: ' + fullUrl);
    calcRoute(fullUrl);
  };

  // const current = cloneElement(children.find(child => child.props.path === url) || <div>No route found</div>);
  // console.log(current);

  // const onPopState = () => {
  //   console.log('blog pop: ' + location.pathname);
  //   calcRoute(location.pathname);
  // };

  const onContainerNavigate = (event) => {
    const url = (event as any).detail;
    if (!url.startsWith(basename)) {
      return;
    }
    console.log('blog event: ' + url);
    calcRoute(url);
  };

  useEffect(() => {
    calcRoute(url);
    // window.addEventListener('popstate', onPopState);
    window.addEventListener("[container] navigated", onContainerNavigate);
    return () => {
      // window.removeEventListener('popstate', onPopState)
      window.removeEventListener("[container] navigated", onContainerNavigate)
    };
  }, []);

  return (
    <RouterContext.Provider value={{url, params, current, routes: ROUTES, navigate}}>{children}</RouterContext.Provider>
  );
}

export default Router
