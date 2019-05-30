import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Question from "./Question";
//import styles from "./Answers.module.css";

const Questions = ({ questionStore }) => {
  return (
    <>
      <Question question={questionStore.currentQuestion} />
    </>
  );
};

Questions.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(Questions));
