import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const BinaryQuestion = ({ questionStore }) => {
  const handleChangeBinaryQuestion = e => {
    questionStore.nextIndex();
  };

  return (
    <div>
      <button onClick={handleChangeBinaryQuestion}>Yes</button>
      <button onClick={handleChangeBinaryQuestion}>No</button>
    </div>
  );
};

BinaryQuestion.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(BinaryQuestion));
