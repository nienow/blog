import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {routeTest} from "router/route-test";

type IRoutes = {
  path: string;
  element: JSX.Element
}[];

interface Params {
  basename: string;
  routes: IRoutes;
  children: ReactNode;
}

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
  routes: [],
  navigate: null
};

const RouterContext = createContext<IRouterContext>(GLOBAL_ROUTE_CONTEXT);

export const useRouter = () => {
  return useContext(RouterContext);
};

const Router = ({basename, routes, children}: Params) => {
  const [url, setUrl] = useState(location.pathname);
  const [params, setParams] = useState({});
  const [current, setCurrent] = useState(null);
  const calcRoute = (newUrl) => {
    setUrl(newUrl);
    setCurrent(routes.find(child => {
      const result = routeTest(newUrl, child.path);
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
    <RouterContext.Provider value={{url, params, current, routes, navigate}}>{children}</RouterContext.Provider>
  );
}

export default Router
