import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const Stats = ({ questionStore }) => {
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

Stats.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(Stats));
