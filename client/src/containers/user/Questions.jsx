import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Question from "../../components/user/Question";
//import Characters from "../../components/user/Characters";
//import Stats from "../../components/user/Stats";

//import styles from "./Home.module.css";

const Questions = ({ uiStore }) => {
  let name = ``;
  if (uiStore.randomUser) name = uiStore.randomUser.name;
  return (
    <>
      <h1>Awesome front page!</h1>
      <p>{name}</p>
      <Question />
    </>
  );
};

Questions.propTypes = {
  uiStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`)(observer(Questions));
