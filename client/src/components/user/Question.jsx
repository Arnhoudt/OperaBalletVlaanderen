import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withRouter } from "react-router-dom";
import {ROUTES} from "../../constants";
//import styles from "./Answers.module.css";

const Question = ({ questionStore, answerStore, history }) => {

const handleChangeBinaryQuestion = e => {
    if (e.currentTarget.value === `yes`) {
        answerStore.save({value: true, index: questionStore.getCurrentIndex(), user: 1});
    } else {
        answerStore.save({value: false, index: questionStore.getCurrentIndex(), user: 1});
    }
    //answerStore.create()
    questionStore.nextIndex();
    if (questionStore.questions.length <= questionStore.getCurrentIndex()) {
        history.push(ROUTES.home);
    }
};

    return (
        <>
            <h3>{questionStore.currentQuestion.question}</h3>
            <button onClick={handleChangeBinaryQuestion} value={`yes`}>Yes</button>
            <button onClick={handleChangeBinaryQuestion} value={`no`}>No</button>
        </>
    );
};


Question.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`, `answerStore`)(withRouter(observer(Question)));
