import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Question from "./Question";
//import styles from "./Answers.module.css";

const Questions = ({ questionStore }) => {
  const { questions } = questionStore;

  return (
    <>
      <div>
        <h2>questions</h2>
        <form method="post">
          <input
            type="text"
            name="clientToken"
            id="clientToken"
            value="value"
          />
          <label for="clientToken">Client Token</label>
          <ul>
            {questions.map(question => (
              <Question key={question._id} question={question} />
            ))}
          </ul>
        </form>
      </div>
    </>
  );
};

Questions.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(Questions));
