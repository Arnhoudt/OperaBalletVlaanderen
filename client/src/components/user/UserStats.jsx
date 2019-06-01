import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Stats from "./Stats";
import { withRouter } from "react-router-dom";
const UserStats = ({ questionStore, answerStore }) => {
  answerStore.getAllByUser().then(data => console.log(data));
  questionStore.findAll();
  console.log(questionStore.questions);

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
