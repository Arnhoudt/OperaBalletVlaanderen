import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const Answers = ({ answerStore }) => {
  const { answers } = answerStore;
  return (
    <>
      <section>
        <header>
          <h1>Answers</h1>
        </header>
        <ul>
          {answers.map(answer => (
            <li key={answer._id}>
              <article>
                <p>Question: {answer.question.value}</p>
                <p>Answer: {`${answer.value}`}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

Answers.propTypes = {
  answerStore: PropTypes.observableObject.isRequired
};

export default inject(`answerStore`)(observer(Answers));
