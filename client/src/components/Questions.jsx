import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const Questions = ({ questionStore }) => {
  const { questions } = questionStore;

  const questionName = React.createRef();
  const questionParam1 = React.createRef();
  const questionParam2 = React.createRef();
  const questionParam3 = React.createRef();
  const questionParam4 = React.createRef();
  const questionParam5 = React.createRef();
  const questionAnswerType = React.createRef();
  const questionUpdateName = React.createRef();
  const questionUpdateParam1 = React.createRef();
  const questionUpdateParam2 = React.createRef();
  const questionUpdateParam3 = React.createRef();
  const questionUpdateParam4 = React.createRef();
  const questionUpdateParam5 = React.createRef();
  const questionUpdateAnswerType = React.createRef();

  const handleSubmitQuestion = e => {
    e.preventDefault();
  };

  const handleUpdateQuestion = e => {
    e.preventDefault();
  };

  const handleDeleteQuestion = e => {
    e.preventDefault();
  };

  return (
    <>
      <section>
        <form method="post" onSubmit={handleSubmitQuestion}>
          <div>
            <label>
              <span>Vraag:</span>
              <input type="text" name="question" ref={questionName} />
            </label>
          </div>
          <div>
            <label>
              <span>Param1:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
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
                max="100"
                step="1"
                value="50"
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
                max="100"
                step="1"
                value="50"
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
                max="100"
                step="1"
                value="50"
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
                max="100"
                step="1"
                value="50"
                ref={questionParam5}
                name="param5"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Bool:</span>
              <input
                type="radio"
                name="answerType"
                value="BOOL"
                ref={questionAnswerType}
                checked
              />
            </label>
            <label>
              <span>Text:</span>
              <input
                type="radio"
                name="answerType"
                value="TEXT"
                ref={questionAnswerType}
              />
            </label>
          </div>
          <div>
            <button type="submit">Add question</button>
          </div>
        </form>
      </section>
      <section>
        <header>
          <h1>Questions</h1>
        </header>
        <ul>
          {questions.filter(question => (
            <li>
              <article>
                <form method="post" onSubmit={handleUpdateQuestion}>
                  <input
                    type="hidden"
                    name="id"
                    value="<?php echo $question['id']; ?>"
                  />
                  <input
                    type="text"
                    name="question"
                    value="<?php echo $question['question']; ?>"
                    ref={questionUpdateName}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param1"
                    value="<?php echo $question['param1']; ?>"
                    ref={questionUpdateParam1}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param2"
                    value="<?php echo $question['param2']; ?>"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param3"
                    value="<?php echo $question['param3']; ?>"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param4"
                    value="<?php echo $question['param4']; ?>"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param5"
                    value="<?php echo $question['param5']; ?>"
                  />
                  <input type="radio" name="answerType" value="BOOL" />
                  <input type="radio" name="answerType" value="TEXT" />
                  <button type="submit">Update</button>
                </form>
                <form method="post" onSubmit={handleDeleteQuestion}>
                  <input type="hidden" name="action" value="delete" />
                  <input
                    type="hidden"
                    name="id"
                    value="<?php echo $question['id']; ?>"
                  />
                  <button type="submit">Delete</button>
                </form>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

Questions.propTypes = {
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(Questions));
