import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Question from './Question';
//import styles from "./Answers.module.css";


const Questions = ({ questionStore }) => {
    const { questions } = questionStore;
    return (
      <>
          {questions.map((question, index) => {
              if(index === questionStore.getCurrentQuestion()){
                  return(<Question question={question}/>);
              }})}
      </>
  );
};

Questions.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(Questions));
