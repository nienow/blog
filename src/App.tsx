import React from "react";
import Router from "Router";
import RouterOutlet from "RouterOutlet";


interface Params {
  basename: string;
  style: string;
}

const App = ({basename}: Params) => {


  return (
    <Router basename={basename}>
      <RouterOutlet/>
    </Router>
  );
}

export default App
