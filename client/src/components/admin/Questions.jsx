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
  let questionAnswerType = `BOOL`;
  let questionUpdateAnswerType = `BOOL`;

  const handleSubmitQuestion = e => {
    e.preventDefault();
    questionStore.create({
      questionValue: questionName.current.value,
      param1: questionParam1.current.value,
      param2: questionParam2.current.value,
      param3: questionParam3.current.value,
      param4: questionParam4.current.value,
      param5: questionParam5.current.value,
      answerType: questionAnswerType
    });
  };

  const handleUpdateQuestion = e => {
    e.preventDefault();
    questionStore.update({
      _id: e.currentTarget.children[0].value,
      question: e.currentTarget.children[1].value,
      param1: e.currentTarget.children[2].value,
      param2: e.currentTarget.children[3].value,
      param3: e.currentTarget.children[4].value,
      param4: e.currentTarget.children[5].value,
      param5: e.currentTarget.children[6].value,
      answerType: questionUpdateAnswerType
    });
  };

  const handleDeleteQuestion = e => {
    e.preventDefault();
    questionStore.delete(e.currentTarget.children[0].value);
  };

  const checkChangeAnswerType = e => {
    questionAnswerType = e.currentTarget.value;
  };

  const checkChangeUpdateAnswerType = e => {
    questionUpdateAnswerType = e.currentTarget.value;
  };

  const checked = (type, answerType) => {
    if (type === answerType) return true;
    else return false;
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
                max="100"
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
                max="100"
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
                max="100"
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
                max="100"
                step="1"
                defaultValue="50"
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
                defaultValue="BOOL"
                onChange={checkChangeAnswerType}
                defaultChecked
              />
            </label>
            <label>
              <span>Text:</span>
              <input
                type="radio"
                name="answerType"
                defaultValue="TEXT"
                onChange={checkChangeAnswerType}
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
          {questions.map(question => (
            <li key={question._id}>
              <article>
                <form method="post" onSubmit={handleUpdateQuestion}>
                  <input type="hidden" name="id" defaultValue={question._id} />
                  <input
                    type="text"
                    name="question"
                    defaultValue={question.question}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param1"
                    defaultValue={question.param1}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param2"
                    defaultValue={question.param2}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param3"
                    defaultValue={question.param3}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param4"
                    defaultValue={question.param4}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param5"
                    defaultValue={question.param5}
                  />
                  <input
                    type="radio"
                    name="answerType"
                    defaultValue="BOOL"
                    onChange={checkChangeUpdateAnswerType}
                    defaultChecked={checked(`BOOL`, question.answerType)}
                  />
                  <input
                    type="radio"
                    name="answerType"
                    defaultValue="TEXT"
                    onChange={checkChangeUpdateAnswerType}
                    defaultChecked={checked(`TEXT`, question.answerType)}
                  />
                  <button type="submit">Update</button>
                </form>
                <form method="post" onSubmit={handleDeleteQuestion}>
                  <input type="hidden" name="id" defaultValue={question._id} />
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
