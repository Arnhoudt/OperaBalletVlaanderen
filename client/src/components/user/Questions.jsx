import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const Questions = ({ questionStore }) => {
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
          <div number="3">
            <h3>text</h3>
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
        </form>
      </div>
    </>
  );
};

Questions.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(Questions));
