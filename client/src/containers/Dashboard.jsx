import React from "react";
import { Link } from "react-router-dom";
import { inject, observer, PropTypes } from "mobx-react";
import styles from "./Dashboard.module.css";
import withAuthentication from "../components/auth/WithAuthentication";
import { ROUTES } from "../constants";
import Answers from "../components/admin/Answers";
import Characters from "../components/admin/Characters";
import Questions from "../components/admin/Questions";

const Dashboard = ({ uiStore, history }) => {
  const handleClick = e => {
    uiStore.logout();
    history.push(ROUTES.login);
  };

  return (
    <>
      <h1 className={`${styles.title}`}>Welkom in het dashboard</h1>
      <Link to={ROUTES.register}>
        <button>Wordt lid</button>
      </Link>
      <button onClick={handleClick}>Logout</button>
      <Characters />
      <Questions />
      <Answers />
    </>
  );
};

Dashboard.propTypes = {
  uiStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`)(withAuthentication(observer(Dashboard)));
