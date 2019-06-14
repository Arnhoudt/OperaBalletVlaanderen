import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import styles from "./App.module.css";

import LoginAdmin from "./admin/auth/Login";
import RegisterAdmin from "./admin/auth/Register";
import Dashboard from "./admin/Dashboard";
import ThreeScene from "./user/ThreeScene";
import { ROUTES } from "../constants";

const App = () => {
  useEffect(() => {
    let element = document.getElementById(`loading_root`);
    element.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.layout}>
      <Switch>
        <Route path={ROUTES.threeScene} exact strict component={ThreeScene} />
        <Route path={ROUTES.loginAdmin} component={LoginAdmin} />
        <Route path={ROUTES.registerAdmin} component={RegisterAdmin} />
        <Route path={ROUTES.dashboard} component={Dashboard} />
      </Switch>
    </main>
  );
};

export default withRouter(App);
