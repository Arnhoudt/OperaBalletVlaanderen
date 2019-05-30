import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import styles from "./App.module.css";

import Home from "./user/Home";
import Login from "./admin/Login";
import Register from "./admin/Register";
import Dashboard from "./admin/Dashboard";
import { ROUTES } from "../constants";

const App = () => {
  return (
    <main className={styles.layout}>
      <Switch>
        <Route path={ROUTES.home} exact strict component={Home} />
        <Route path={ROUTES.login} component={Login} />
        <Route path={ROUTES.register} component={Register} />
        <Route path={ROUTES.dashboard} component={Dashboard} />
      </Switch>
    </main>
  );
};

export default withRouter(App);
