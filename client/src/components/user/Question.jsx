import React, { useState, useEffect } from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
//import styles from "./Answers.module.css";

const Question = ({ uiStore, questionStore, answerStore, history }) => {
  let { questions } = questionStore;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(``);

  useEffect(() => {
    questionStore.findAll().then(data => setCurrentQuestion(data[0]));
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
        questionId: currentQuestion.id,
        value: value,
        userId: userId
      });
      setCurrentIndex(currentIndex + 1);
      setCurrentQuestion(questions[currentIndex]);
      if (questions.length <= currentIndex) {
        history.push(ROUTES.home);
      }
    }
  };

  const handleChangeBinaryQuestion = e => {
    answerStore.create({
      questionId: currentQuestion.id,
      value: e.currentTarget.value,
      userId: userId
    });
    setCurrentIndex(currentIndex + 1);
    setCurrentQuestion(questions[currentIndex]);
    if (questions.length <= currentIndex) {
      history.push(ROUTES.home);
    }
  };

  const handleClickPrevious = e => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <>
      <h3>{currentQuestion.value}</h3>
      {currentIndex > 0 ? (
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
