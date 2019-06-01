import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Act from "../../components/user/Act";
//import styles from "./Questions.module.css";

const Acts = ({ actStore }) => {
  const { acts } = actStore;

  return (
    <>
      {acts.map(act => (
        <Act key={act._id} act={act} />
      ))}
    </>
  );
};

Acts.propTypes = {
  actStore: PropTypes.observableObject.isRequired
};

export default inject(`actStore`)(observer(Acts));
