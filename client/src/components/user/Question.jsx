import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";
import BinaryQuestion from "./BinaryQuestion"

const Question = ({ question }) => {
  return (
      <div>
          <h3>{question.question}</h3>
          <BinaryQuestion/>
      </div>
  );
};

export default Question;
