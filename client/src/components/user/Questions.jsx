import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Question from './Question';
//import styles from "./Answers.module.css";


const Questions = ({ questionStore }) => {
    const { questions } = questionStore;
    console.log(questions.toArray());
  return (
      <>
          <div>
              <h2>questions</h2>
              <form method="post">
                  <input
                      type="text"
                      name="clientToken"
                      id="clientToken"
                      value="value"
                  />
                  <label for="clientToken">Client Token</label>
                  <ul>
                      {
                          //questions.map(question => <Question question={question}/>)
                          <Question question={questions}/>
                      }
                  </ul>
                  <div>
                      <input type="submit" name="action" value="Submit" />
                  </div>
              </form>
          </div>
      </>
  );
};

Questions.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(Questions));
