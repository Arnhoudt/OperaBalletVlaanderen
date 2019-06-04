import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Question from "../../components/user/Question";
//import styles from "./Questions.module.css";

const Questions = ({ pixiTest }) => {
  return (
    <>
      {pixiTest.showPikachu()}
      {/* <h1>Awesome front page!</h1>
      <Question /> */}
    </>
  );
};

Questions.propTypes = {};

export default inject(`pixiTest`)(observer(Questions));
