import React from "react";
//import styles from "./Answers.module.css";

const EditQuestion = ({ question, update, remove }) => {
  const handleUpdateQuestion = e => {
    e.preventDefault();
    update(question);
  };

  const handleDeleteQuestion = e => {
    e.preventDefault();
    remove(question);
  };

  return (
    <>
      <form method="post" onSubmit={handleUpdateQuestion}>
        <input type="text" name="question" defaultValue={question.value} onChange={e => question.setValue(e.target.value)} />
        <input type="number" min="0" max="50" step="1" name="param1" defaultValue={question.param1} onChange={e => question.setParam1(e.target.value)} />
        <input type="number" min="0" max="50" step="1" name="param2" defaultValue={question.param2} onChange={e => question.setParam2(e.target.value)} />
        <input type="number" min="0" max="50" step="1" name="param3" defaultValue={question.param3} onChange={e => question.setParam3(e.target.value)} />
        <input type="number" min="0" max="50" step="1" name="param4" defaultValue={question.param4} onChange={e => question.setParam4(e.target.value)} />
        <input type="number" min="0" max="50" step="1" name="param5" defaultValue={question.param5} onChange={e => question.setParam5(e.target.value)} />
        <button type="submit">Update</button>
      </form>
      <form method="post" onSubmit={handleDeleteQuestion}>
        <button type="submit">Delete</button>
      </form>
    </>
  );
};
export default EditQuestion;
