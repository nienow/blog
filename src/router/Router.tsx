import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {routeTest} from "router/route-test";

type IRoute = {
  path: string;
  element: JSX.Element,
  params?: any;
};

interface Params {
  basename: string;
  routes: IRoute[];
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
  // const [params, setParams] = useState({});
  const [current, setCurrent] = useState(() => {
    let params;
    return {
      ...routes.find(child => {
        params = routeTest(location.pathname, child.path, basename);
        return !!params;
      }),
      params
    };
  });
  const calcRoute = (newUrl) => {
    setUrl(newUrl);
    let params;
    const newRoute = routes.find(child => {
      params = routeTest(newUrl, child.path, basename);
      // setParams(result);
      return !!params;
    });
    setCurrent({
      ...newRoute,
      params
    });
  };

  const navigate = (newUrl) => {
    // window.history.pushState({}, null, basename + newUrl);
    // const fullUrl = basename + newUrl;
    // console.log('blog navigate: ' + fullUrl);
    // calcRoute(fullUrl);
    window.dispatchEvent(
      new CustomEvent("[child] navigate", {
        detail: basename + newUrl
      } as any)
    );
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
    window.addEventListener("[container] navigate", onContainerNavigate);
    return () => {
      window.removeEventListener("[container] navigate", onContainerNavigate)
    };
  }, [current]);

  // useEffect(() => {
  //   calcRoute(url);
  // }, []);

  return (
    <RouterContext.Provider value={{url, current, params: current.params, routes, navigate}}>{children}</RouterContext.Provider>
  );
}

export default Router
