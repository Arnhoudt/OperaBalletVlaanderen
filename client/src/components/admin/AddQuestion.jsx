import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const AddQuestion = ({ questionStore }) => {
  const questionValue = React.createRef();
  const questionParam1 = React.createRef();
  const questionParam2 = React.createRef();
  const questionParam3 = React.createRef();
  const questionParam4 = React.createRef();
  const questionParam5 = React.createRef();
  const questionAnswer1 = React.createRef();
  const questionAnswer2 = React.createRef();

  const handleSubmitQuestion = e => {
    e.preventDefault();
    questionStore.create({
      value: questionValue.current.value,
      param1: questionParam1.current.value,
      param2: questionParam2.current.value,
      param3: questionParam3.current.value,
      param4: questionParam4.current.value,
      param5: questionParam5.current.value,
      answer1: questionAnswer1.current.value,
      answer2: questionAnswer2.current.value
    });
  };

  return (
    <>
      <section>
        <form method="post" onSubmit={handleSubmitQuestion}>
          <div>
            <label>
              <span>Vraag:</span>
              <input type="text" name="question" ref={questionValue} />
            </label>
          </div>
          <div>
            <label>
              <span>Param1:</span>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                defaultValue="50"
                ref={questionParam1}
                name="param1"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Param2:</span>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                defaultValue="50"
                ref={questionParam2}
                name="param2"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Param3:</span>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                defaultValue="50"
                ref={questionParam3}
                name="param3"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Param4:</span>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                defaultValue="50"
                ref={questionParam4}
                name="param4"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Param5:</span>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                defaultValue="50"
                ref={questionParam5}
                name="param5"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Answer1:</span>
              <input type="text" name="answer1" ref={questionAnswer1} />
            </label>
          </div>
          <div>
            <label>
              <span>Answer2:</span>
              <input type="text" name="answer2" ref={questionAnswer2} />
            </label>
          </div>
          <div>
            <button type="submit">Add question</button>
          </div>
        </form>
      </section>
    </>
  );
};

AddQuestion.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(AddQuestion));
