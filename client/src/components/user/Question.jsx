import React, { useState, useEffect } from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
//import styles from "./Answers.module.css";

const Question = ({ uiStore, questionStore, answerStore, history }) => {
  const { questions } = questionStore;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    questionStore.findAll();
    document.addEventListener(`keyup`, handleKeyUp);
    return () => document.removeEventListener(`keyup`, handleKeyUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      answerStore.create({
        questionId: questions[currentIndex].id,
        value: value,
        userId: userId
      });
      if (questions.length <= currentIndex + 1) {
        history.push(ROUTES.home);
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleChangeBinaryQuestion = e => {
    answerStore.create({
      questionId: questions[currentIndex].id,
      value: e.currentTarget.value,
      userId: userId
    });
    if (questions.length <= currentIndex + 1) {
      history.push(ROUTES.home);
    }
    setCurrentIndex(currentIndex + 1);
  };

  const handleClickPrevious = e => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <>
      {questions.length > 0 ? (
        <>
          {questions[currentIndex] ? (
            <>
              <h3>{questions[currentIndex].value}</h3>
              <button onClick={handleChangeBinaryQuestion} value={true}>
                {questions[currentIndex].answer1}
              </button>
              <button onClick={handleChangeBinaryQuestion} value={false}>
                {questions[currentIndex].answer2}
              </button>
            </>
          ) : null}
          {currentIndex ? (
            <button onClick={handleClickPrevious}>PreviousQuestion</button>
          ) : null}
        </>
      ) : null}
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
