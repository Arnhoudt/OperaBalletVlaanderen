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
                <div>
                  <span>Question:</span>
                  <p>{answer.question}</p>
                </div>
                <p>{answer.answerBool}</p>
                <p>{answer.answerText}</p>
                <div>
                  <span>UserId:</span>
                  <p>{answer.userId}</p>
                </div>
                <div>
                  <span>date:</span>
                  <p>{answer.createdAt}</p>
                </div>
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
