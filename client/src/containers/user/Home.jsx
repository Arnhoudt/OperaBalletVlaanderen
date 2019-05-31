import React from "react";

import { Link } from "react-router-dom";
import { inject, observer, PropTypes } from "mobx-react";
import { ROUTES } from "../../constants";
import Gdpr from "../../components/user/Gdpr";
//import Characters from "../../components/user/Characters";
import UserStats from "../../components/user/UserStats";
//import styles from "./Home.module.css";

const Home = ({ uiStore, history }) => {
  const handleClick = e => {
    uiStore.logoutUser();
    history.push(ROUTES.home);
  };
  return (
    <>
      <h1>YeeY je zit nu op de home page</h1>
        <UserStats />
      {uiStore.authUser ? (
        <>
          <Gdpr />
          <button onClick={handleClick}>Logout</button>
        </>
      ) : (
        <>
          <Link to={ROUTES.loginUser}>
            <button>Log in</button>
          </Link>
          <Link to={ROUTES.registerUser}>
            <button>Bewaar jouw gegevens</button>
          </Link>
        </>
      )}
    </>
  );
};

Home.propTypes = {
  uiStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`)(observer(Home));
