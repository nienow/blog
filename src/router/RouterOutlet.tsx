import React from "react";
import {useRouter} from "router/Router";


const RouterOutlet = () => {
  const {current} = useRouter();
  const el = current ? current.element : <div>Route not found (blog)</div>;
  return (
    <div id="outlet">{el}</div>
  );
}

export default RouterOutlet
