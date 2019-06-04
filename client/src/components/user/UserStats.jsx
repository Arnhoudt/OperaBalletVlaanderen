import React, { useState, useEffect } from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Stats from "./Stats";
import { withRouter } from "react-router-dom";
//import Character from "./Character";
const UserStats = ({ questionStore, answerStore }) => {
  const [param1, setParam1] = useState(0);
  const [param2, setParam2] = useState(0);
  const [param3, setParam3] = useState(0);
  const [param4, setParam4] = useState(0);
  const [param5, setParam5] = useState(0);
  const [answersCount, setAnswersCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const f = async () => {
      let answerCount = 0;
      let parameterArray = [0, 0, 0, 0, 0];
      const answers = await answerStore.findAllByUser();
      const questions = await questionStore.findAll();
      if (answers && questions) {
        answers.forEach(answer => {
          answerCount += 1;
          questions.forEach(question => {
            if (question._id === answer.questionId) {
              setAnswersCount(answersCount + 1);
              let sign = -1;
              if (answer.value) {
                sign = 1;
              }
              parameterArray[0] += 50 + sign * question.param1;
              parameterArray[1] += 50 + sign * question.param2;
              parameterArray[2] += 50 + sign * question.param3;
              parameterArray[3] += 50 + sign * question.param4;
              parameterArray[4] += 50 + sign * question.param5;
            }
          });
          setParam1(param1 + parameterArray[0] / answerCount);
          setParam2(param2 + parameterArray[1] / answerCount);
          setParam3(param3 + parameterArray[2] / answerCount);
          setParam4(param4 + parameterArray[3] / answerCount);
          setParam5(param5 + parameterArray[4] / answerCount);
        });
        setLoaded(true);
      }
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loaded ? (
        <>
          <h2>Stats</h2>
          <Stats params={[param1, param2, param3, param4, param5]} />
          {/* <Character params={[param1, param2, param3, param4, param5]} /> */}
        </>
      ) : (
        <p>Je karakter wordt berekend</p>
      )}
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
