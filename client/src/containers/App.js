import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import styles from "./App.module.css";

import Questions from "./user/Questions";
import Home from "./user/Home";
import Login from "./admin/Login";
import Register from "./admin/Register";
import Dashboard from "./admin/Dashboard";
import { ROUTES } from "../constants";

const App = () => {
  return (
    <main className={styles.layout}>
      <Switch>
        <Route path={ROUTES.questions} exact strict component={Questions} />
        <Route path={ROUTES.home} component={Home} />
        <Route path={ROUTES.login} component={Login} />
        <Route path={ROUTES.register} component={Register} />
        <Route path={ROUTES.dashboard} component={Dashboard} />
      </Switch>
    </main>
  );
};

export default withRouter(App);
