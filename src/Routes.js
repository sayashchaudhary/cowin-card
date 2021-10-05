import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Process from "./Pages/Process";

const Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ App }/>
          <Route path="/covid19-card" exact component={ Process }/>
        </Switch>
    </BrowserRouter>
  )
}

export default Routes;
