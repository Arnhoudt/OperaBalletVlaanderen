import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import styles from "./App.module.css";

import LoginAdmin from "./admin/auth/Login";
import RegisterAdmin from "./admin/auth/Register";
import LoginUser from "./user/auth/Login";
import RegisterUser from "./user/auth/Register";
import Dashboard from "./admin/Dashboard";
import ThreeScene from "./user/ThreeScene";
import { ROUTES } from "../constants";

const App = () => {
  return (
    <main className={styles.layout}>
      <Switch>
        <Route path={ROUTES.threeScene} exact strict component={ThreeScene} />
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
