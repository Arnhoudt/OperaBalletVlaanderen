import React, { useEffect } from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { Link } from "react-router-dom";
//import styles from "./Acts.module.css";

const Acts = ({ actStore }) => {
  const { acts } = actStore;

  useEffect(() => {
    actStore.findAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>Acts:</h2>
      {acts.map(act => (
        <Link key={act.id} to={`/actDetail/${act.id}`}>
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
