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
  const questionUpdateId = React.createRef();
  const questionUpdateName = React.createRef();
  const questionUpdateParam1 = React.createRef();
  const questionUpdateParam2 = React.createRef();
  const questionUpdateParam3 = React.createRef();
  const questionUpdateParam4 = React.createRef();
  const questionUpdateParam5 = React.createRef();
  const questionUpdateAnswerType = React.createRef();

  const handleSubmitQuestion = e => {
    e.preventDefault();
    questionStore.create({
      questionValue: questionName.current.value,
      param1: questionParam1.current.value,
      param2: questionParam2.current.value,
      param3: questionParam3.current.value,
      param4: questionParam4.current.value,
      param5: questionParam5.current.value,
      answerType: questionAnswerType.current.value
    });
  };

  const handleUpdateQuestion = e => {
    e.preventDefault();
    questionStore.update({
      _id: questionUpdateId.current.value,
      question: questionUpdateName.current.value,
      param1: questionUpdateParam1.current.value,
      param2: questionUpdateParam2.current.value,
      param3: questionUpdateParam3.current.value,
      param4: questionUpdateParam4.current.value,
      param5: questionUpdateParam5.current.value,
      answerType: questionUpdateAnswerType.current.value
    });
  };

  const handleDeleteQuestion = e => {
    e.preventDefault();
    questionStore.delete(e.currentTarget.children[0].value);
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
                ref={questionAnswerType}
                defaultChecked
              />
            </label>
            <label>
              <span>Text:</span>
              <input
                type="radio"
                name="answerType"
                defaultValue="TEXT"
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
          {questions.map(question => (
            <li key={question._id}>
              <article>
                <form method="post" onSubmit={handleUpdateQuestion}>
                  <input
                    type="hidden"
                    name="id"
                    defaultValue={question._id}
                    ref={questionUpdateId}
                  />
                  <input
                    type="text"
                    name="question"
                    defaultValue={question.question}
                    ref={questionUpdateName}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param1"
                    defaultValue={question.param1}
                    ref={questionUpdateParam1}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param2"
                    defaultValue={question.param2}
                    ref={questionUpdateParam2}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param3"
                    defaultValue={question.param3}
                    ref={questionUpdateParam3}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param4"
                    defaultValue={question.param4}
                    ref={questionUpdateParam4}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param5"
                    defaultValue={question.param5}
                    ref={questionUpdateParam5}
                  />
                  <input
                    type="radio"
                    name="answerType"
                    defaultValue="BOOL"
                    ref={questionUpdateAnswerType}
                  />
                  <input
                    type="radio"
                    name="answerType"
                    defaultValue="TEXT"
                    ref={questionUpdateAnswerType}
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
