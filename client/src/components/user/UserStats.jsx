import React, {useState, useEffect} from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Stats from "./Stats";
import { withRouter } from "react-router-dom";
const UserStats = ({ questionStore, answerStore }) => {
  const [param1, setParam1] = useState(0);
  const [param2, setParam2] = useState(0);
  const [param3, setParam3] = useState(0);
  const [param4, setParam4] = useState(0);
  const [param5, setParam5] = useState(0);
  let answersCount = 0;

  useEffect(() => {
    answerStore.getAllByUser().then(answers => {
      questionStore.findAll().then(questions => {
        answers.forEach(answer => {
          questions.forEach(question => {
            if (question._id === answer.questionId) {
              answersCount+=1;
              if(answer.value){
                setParam1(param1+90);
                setParam2(param2+question.param2);
                setParam3(param3+question.param3);
                setParam4(param4+question.param4);
                setParam5(param5+question.param5);
                console.log(param1);
              }
            }
          });
        });
      });
    });
    return () => ``;
  }, [questionStore, answerStore]);

  return (
      <>
        <h2>Stats</h2>
        <Stats params={[param1, param2, param3, param4, param5]} />
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
