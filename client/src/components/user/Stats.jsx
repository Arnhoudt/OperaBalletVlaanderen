import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const Questions = ({ questionStore }) => {
  const { questions } = questionStore;

  const questionName = React.createRef();
  const questionParam1 = React.createRef();
  const questionParam2 = React.createRef();
  const questionParam3 = React.createRef();
  const questionParam4 = React.createRef();
  const questionParam5 = React.createRef();
  let questionAnswerType = `BOOL`;
  const questionUpdateId = React.createRef();
  const questionUpdateName = React.createRef();
  const questionUpdateParam1 = React.createRef();
  const questionUpdateParam2 = React.createRef();
  const questionUpdateParam3 = React.createRef();
  const questionUpdateParam4 = React.createRef();
  const questionUpdateParam5 = React.createRef();
  let questionUpdateAnswerType = `BOOL`;

  const handleSubmitQuestion = e => {
    e.preventDefault();
    questionStore.create({
      questionValue: questionName.current.value,
      param1: questionParam1.current.value,
      param2: questionParam2.current.value,
      param3: questionParam3.current.value,
      param4: questionParam4.current.value,
      param5: questionParam5.current.value,
      answerType: questionAnswerType
    });
  };

  const handleUpdateQuestion = e => {
    e.preventDefault();
    questionStore.update({
      _id: questionUpdateId.current.value,
      questionValue: questionUpdateName.current.value,
      param1: questionUpdateParam1.current.value,
      param2: questionUpdateParam2.current.value,
      param3: questionUpdateParam3.current.value,
      param4: questionUpdateParam4.current.value,
      param5: questionUpdateParam5.current.value,
      answerType: questionUpdateAnswerType
    });
  };

  const handleDeleteQuestion = e => {
    e.preventDefault();
    questionStore.delete(e.currentTarget.children[0].value);
  };

  const checkChangeAnswerType = e => {
    questionAnswerType = e.currentTarget.value;
  };

  const checkChangeUpdateAnswerType = e => {
    questionUpdateAnswerType = e.currentTarget.value;
  };

  const checked = (type, answerType) => {
    if (type === answerType) return true;
    else return false;
  };

  return (
    <>
        <div>
            <h2>Stats</h2>
            <div>
                <p>happy</p>
                <p>0</p>
            </div>
            <div>
                <p>smart</p>
                <p>0</p>
            </div>
            <div>
                <p>unicorn</p>
                <p>0</p>
            </div>
        </div>
    </>
  );
};

Questions.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(Questions));
