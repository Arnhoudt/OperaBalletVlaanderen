import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { Link } from "react-router-dom";
//import styles from "./Acts.module.css";

const Acts = ({ actStore }) => {
  const { acts } = actStore;

  return (
    <>
      {acts.map(act => (
        <Link key={act._id} to={`/actDetail/${act._id}`}>
          <button>{act.name}</button>
        </Link>
      ))}
    </>
  );
};

Acts.propTypes = {
  actStore: PropTypes.observableObject.isRequired
};

export default inject(`actStore`)(observer(Acts));
