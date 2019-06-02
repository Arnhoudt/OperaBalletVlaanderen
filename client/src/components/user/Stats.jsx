import React from "react";
//import styles from "./Answers.module.css";

const Stats = ({params}) => {
  return (
    <>
      {params.map((field, index) => {
        return (
          <div key={index}>
            <p>{index}</p>
            <p>{field}</p>
          </div>
        );
      })}
    </>
  );
};

export default Stats;
