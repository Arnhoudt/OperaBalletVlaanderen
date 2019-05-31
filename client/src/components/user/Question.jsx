import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
//import styles from "./Answers.module.css";

const Question = ({ uiStore, questionStore, answerStore, history }) => {
  const handleChangeBinaryQuestion = e => {
    let userId = null;
    if (uiStore.authUser) userId = uiStore.authUser._id;
    else userId = uiStore.randomUser._id;
    if (e.currentTarget.value === `yes`) {
      answerStore.create({
        questionId: questionStore.currentQuestion._id,
        value: true,
        userId: userId
      });
    } else {
      answerStore.create({
        questionId: questionStore.currentQuestion._id,
        value: false,
        userId: userId
      });
    }

    questionStore.nextIndex();
    if (questionStore.questions.length <= questionStore.getCurrentIndex()) {
      history.push(ROUTES.home);
    }
  };

  return (
    <>
      <h3>{questionStore.currentQuestion.value}</h3>
      <button onClick={handleChangeBinaryQuestion} value={`yes`}>
        YES
      </button>
      <button onClick={handleChangeBinaryQuestion} value={`no`}>
        NO
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
