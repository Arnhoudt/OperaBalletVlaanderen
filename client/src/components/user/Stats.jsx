import React from "react";
//import styles from "./Answers.module.css";

const Stats = ({ data }) => {
  return (
    <>
      {data.map(field => {
        return (
          <div key={field.parameter}>
            <p>{field.parameter}</p>
            <p>{field.value}</p>
          </div>
        );
      })}
    </>
  );
};

export default Stats;
