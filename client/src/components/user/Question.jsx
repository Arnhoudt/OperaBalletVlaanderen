import React, { useEffect } from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
//import styles from "./Answers.module.css";

const Question = ({ uiStore, questionStore, answerStore, history }) => {
  const { currentQuestion, questions } = questionStore;
  let userId = null;
  if (uiStore.authUser) {
    userId = uiStore.authUser._id;
  }
  if (uiStore.randomUser) {
    userId = uiStore.randomUser._id;
  }

  const handleKeyUp = e => {
    const key = String.fromCharCode(e.keyCode);
    if (key === `A` || key === `B`) {
      let value = ``;
      if (key === `A`) {
        value = true;
      }
      if (key === `B`) {
        value = false;
      }
      answerStore
        .create({
          questionId: currentQuestion._id,
          value: value,
          userId: userId
        })
        .then(() => {
          questionStore.nextIndex();
          if (questions.length <= questionStore.getCurrentIndex()) {
            history.push(ROUTES.home);
          }
        });
    }
  };

  useEffect(() => {
    document.addEventListener(`keyup`, handleKeyUp);
    return () => document.removeEventListener(`keyup`, handleKeyUp);
  });

  const handleChangeBinaryQuestion = e => {
    answerStore
      .create({
        questionId: currentQuestion._id,
        value: e.currentTarget.value,
        userId: userId
      })
      .then(() => {
        questionStore.nextIndex();
        if (questions.length <= questionStore.getCurrentIndex()) {
          history.push(ROUTES.home);
        }
      });
  };

  const handleClickPrevious = e => {
    questionStore.previousIndex();
  };

  return (
    <>
      <h3>{currentQuestion.value}</h3>
      {questionStore.getCurrentIndex() > 0 ? (
        <button onClick={handleClickPrevious}>PreviousQuestion</button>
      ) : null}
      <button onClick={handleChangeBinaryQuestion} value={true}>
        {currentQuestion.answer1}
      </button>
      <button onClick={handleChangeBinaryQuestion} value={false}>
        {currentQuestion.answer2}
      </button>
    </>
  );
};

Question.propTypes = {
  uiStore: PropTypes.observableObject.isRequired,
  questionStore: PropTypes.observableObject.isRequired,
  answerStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`, `questionStore`, `answerStore`)(
  withRouter(observer(Question))
);
