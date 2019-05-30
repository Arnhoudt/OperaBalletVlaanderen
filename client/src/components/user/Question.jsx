import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const Questions = ({ questionStore }) => {

    const handleChangeBinaryQuestion = e => {
        questionStore.nextIndex();
    };

  return (
    <>
        <h3>{questionStore.currentQuestion.question}</h3>
        <button onClick={handleChangeBinaryQuestion}>Yes</button>
        <button onClick={handleChangeBinaryQuestion}>No</button>
    </>
  );
};

Questions.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(Questions));
