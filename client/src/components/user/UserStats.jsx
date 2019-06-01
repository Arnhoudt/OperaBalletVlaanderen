import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Stats from "./Stats";
import { withRouter } from "react-router-dom";
const UserStats = ({ questionStore, answerStore }) => {
    let answers = [];
    let params = {
        param1:0,
        param2:0,
        param3:0,
        param4:0,
        param5:0
    }
  answerStore.getAllByUser().then(answers => {
      questionStore.getAllQuestions().then(questions => {
          answers.map(answer=>{
              console.log(questions);
              questions.map(question =>{
                  if(question._id === answer.questionId){
                      console.log(question.value);
                  }
              })
          })
      })
  });
  console.log(answers);

  let data = [
    { parameter: `param1`, value: 10 },
    { parameter: `param2`, value: 20 },
    { parameter: `param3`, value: 30 },
    { parameter: `param4`, value: 40 },
    { parameter: `param5`, value: 50 }
  ];
  return (
    <>
      <h2>Stats</h2>
      <Stats data={data} />
    </>
  );
};

UserStats.propTypes = {
  questionStore: PropTypes.observableObject.isRequired,
  answerStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`, `answerStore`)(
  withRouter(observer(UserStats))
);
