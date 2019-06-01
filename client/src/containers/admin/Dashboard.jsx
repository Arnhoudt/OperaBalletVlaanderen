import React from "react";
import { Link } from "react-router-dom";
import { inject, observer, PropTypes } from "mobx-react";
import styles from "./Dashboard.module.css";
import withAuthentication from "../../components/admin/auth/WithAuthentication";
import { ROUTES } from "../../constants";
import Answers from "../../components/admin/Answers";
import Characters from "../../components/admin/Characters";
import Questions from "../../components/admin/Questions";
import Acts from "../../components/admin/Acts";

const Dashboard = ({ uiStore, history }) => {
  const handleClick = e => {
    uiStore.logoutAdmin();
    history.push(ROUTES.loginAdmin);
  };

  return (
    <>
      <h1 className={`${styles.title}`}>Welkom in het dashboard</h1>
      <Link to={ROUTES.registerAdmin}>
        <button>Wordt lid</button>
      </Link>
      <button onClick={handleClick}>Logout</button>
      <Characters />
      <Questions />
      <Acts />
      <Answers />
    </>
  );
};

Dashboard.propTypes = {
  uiStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`)(withAuthentication(observer(Dashboard)));
