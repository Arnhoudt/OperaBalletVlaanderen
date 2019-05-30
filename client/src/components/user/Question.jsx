import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";
import BinaryQuestion from "./BinaryQuestion"

const Question = ({ question }) => {
  return (
      <li key={question._id}>
          <div number={question._id}>
              <h3>{question.question}</h3>
              <BinaryQuestion/>
          </div>
      </li>
  );
};

export default Question;
