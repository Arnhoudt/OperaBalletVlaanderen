import React from "react";
//import styles from "./Answers.module.css";

const Stats = ({ params }) => {
  const statNames = [`love`, `happy`, `cute`, `anger`, `dublin`];
  return (
    <>
      {params.map((field, index) => {
        return (
          <div key={statNames[index]}>
            <p>{statNames[index]}</p>
            <p>{field}</p>
          </div>
        );
      })}
    </>
  );
};

export default Stats;
