import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import styles from "./App.module.css";

import Home from "./Home";
import { ROUTES } from "../constants";

class App extends Component {
  render() {
    return (
      <main className={styles.layout}>
        <Switch>
          <Route path={ROUTES.home} exact strict component={Home} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
