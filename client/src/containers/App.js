import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import styles from "./App.module.css";

import Questions from "./user/Questions";
import Home from "./user/Home";
import LoginAdmin from "./admin/Login";
import RegisterAdmin from "./admin/Register";
import LoginUser from "./user/Login";
import RegisterUser from "./user/Register";
import Dashboard from "./admin/Dashboard";
import { ROUTES } from "../constants";

const App = () => {
  return (
    <main className={styles.layout}>
      <Switch>
        <Route path={ROUTES.questions} exact strict component={Questions} />
        <Route path={ROUTES.home} component={Home} />
        <Route path={ROUTES.loginAdmin} component={LoginAdmin} />
        <Route path={ROUTES.registerAdmin} component={RegisterAdmin} />
        <Route path={ROUTES.loginUser} component={LoginUser} />
        <Route path={ROUTES.registerUser} component={RegisterUser} />
        <Route path={ROUTES.dashboard} component={Dashboard} />
      </Switch>
    </main>
  );
};

export default withRouter(App);
