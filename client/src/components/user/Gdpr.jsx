import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";

const Gdpr = ({ uiStore, answerStore, history }) => {
  const getAllUserData = () => {};

  const deleteAllUserData = () => {
    uiStore.deleteUser().then(history.push(ROUTES.home));
  };

  return (
    <>
      <button onClick={getAllUserData}>Get all your data</button>
      <button onClick={deleteAllUserData}>Delete all your data</button>
    </>
  );
};

Gdpr.propTypes = {
  uiStore: PropTypes.observableObject.isRequired,
  answerStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`, `answerStore`)(withRouter(observer(Gdpr)));
