import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const Question = ({ question }) => {
  return (
      <li key={question._id}>
          <div number={question._id}>
              <h3>{question.question}</h3>
              <div>
                  <div>
                      <input
                          type="radio"
                          name="question"
                          id="optionsRadios1"
                          value="true"
                      />
                      <label for="optionsRadios1">Yes</label>
                  </div>
                  <div>
                      <input
                          type="radio"
                          name="question"
                          id="optionsRadios2"
                          value="false"
                      />
                      <label for="optionsRadios2">No</label>
                  </div>
                  <input type="text" name="question" id="optionsText2" />
                  <label for="optionsText2">Input</label>
              </div>
              <div>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
              </div>
          </div>
          <div>
              <input type="submit" name="action" value="Submit" />
          </div>
      </li>
  );
};

export default Question;
