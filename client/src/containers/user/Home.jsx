import React from "react";
import { Link } from "react-router-dom";
import { inject, observer, PropTypes } from "mobx-react";
import { ROUTES } from "../../constants";
//import withAuthentication from "../../components/user/auth/WithAuthentication";
//import Characters from "../../components/user/Characters";
//import Stats from "../../components/user/Stats";
//import styles from "./Home.module.css";

const Home = ({ uiStore, history }) => {
  const handleClick = e => {
    uiStore.logoutUser();
    history.push(ROUTES.dashboard);
  };

  return (
    <>
      <h1>YeeY je zit nu op de home page</h1>
      <button onClick={handleClick}>Logout</button>
      <Link to={ROUTES.loginUser}>
        <button>Log in</button>
      </Link>
      <Link to={ROUTES.registerUser}>
        <button>Bewaar jouw gegevens</button>
      </Link>
    </>
  );
};

Home.propTypes = {
  uiStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`)(observer(Home));
