import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import NotFound from "./pages/NotFound";
import "./main.css";

export default props => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/todos">Todos</NavLink>
        </li>
      </ul>

      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home name="Alligator.io" {...props} />}
        />
        <Route path="/todos" component={Todos} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
