import React from "react";
import { Link } from "react-router-dom";
import { inject, observer, PropTypes } from "mobx-react";
import styles from "./Dashboard.module.css";
import withAuthentication from "../components/auth/WithAuthentication";
import { ROUTES } from "../constants";

const Dashboard = ({
  uiStore,
  characterStore,
  questionStore,
  answerStore,
  history
}) => {
  const { characters } = characterStore;
  const { questions } = questionStore;
  const { answers } = answerStore;
  const characterName = React.createRef();
  const characterParam1 = React.createRef();
  const characterParam2 = React.createRef();
  const characterParam3 = React.createRef();
  const characterParam4 = React.createRef();
  const characterParam5 = React.createRef();

  const questionName = React.createRef();
  const questionParam1 = React.createRef();
  const questionParam2 = React.createRef();
  const questionParam3 = React.createRef();
  const questionParam4 = React.createRef();
  const questionParam5 = React.createRef();

  const handleClick = e => {
    uiStore.logout();
    history.push(ROUTES.login);
  };

  const handleSubmitCharacter = e => {
    e.preventDefault();
  };

  const handleUpdateCharacter = e => {
    e.preventDefault();
  };

  const handleDeleteCharacter = e => {
    e.preventDefault();
  };

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
      <h1 className={styles.title}>Welkom in het dashboard</h1>
      <Link to={ROUTES.register}>
        <button>Wordt lid</button>
      </Link>
      <button onClick={handleClick}>Logout</button>
      <section>
        <form
          className="question-form"
          method="post"
          onSubmit={handleSubmitCharacter}
        >
          <div className="input-container text">
            <label>
              <span className="form-label">Name:</span>
              <input
                type="text"
                name="name"
                ref={characterName}
                className="form-input"
              />
            </label>
          </div>
          <div className="input-container number">
            <label>
              <span className="form-label">Param1:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
                ref={characterParam1}
                name="param1"
                className="form-input"
              />
            </label>
          </div>
          <div className="input-container number">
            <label>
              <span className="form-label">Param2:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
                ref={characterParam2}
                name="param2"
                className="form-input"
              />
            </label>
          </div>
          <div className="input-container number">
            <label>
              <span className="form-label">Param3:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
                ref={characterParam3}
                name="param3"
                className="form-input"
              />
            </label>
          </div>
          <div className="input-container number">
            <label>
              <span className="form-label">Param4:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
                ref={characterParam4}
                name="param4"
                className="form-input"
              />
            </label>
          </div>
          <div className="input-container number">
            <label>
              <span className="form-label">Param5:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
                ref={characterParam5}
                name="param5"
                className="form-input"
              />
            </label>
          </div>
          <div>
            <button type="submit" className="form-submit">
              Add character
            </button>
          </div>
        </form>
      </section>
      <section>
        <header className="hidden">
          <h1>Characters</h1>
        </header>
        <ul className="menu">
          {characters.filter(character => (
            <li>
              <article>
                <form
                  className="update-form"
                  method="post"
                  onSubmit={handleUpdateCharacter}
                >
                  <input type="hidden" name="id" value={character._id} />
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={character.name}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param1"
                    className="form-input"
                    value={character.param1}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param2"
                    className="form-input"
                    value={character.param2}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param3"
                    className="form-input"
                    value={character.param3}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param4"
                    className="form-input"
                    value={character.param4}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param5"
                    className="form-input"
                    value={character.param5}
                  />
                  <button type="submit" className="form-submit">
                    Update
                  </button>
                </form>
                <form
                  className="update-form"
                  method="post"
                  onSubmit={handleDeleteCharacter}
                >
                  <input type="hidden" name="action" value="delete" />
                  <input type="hidden" name="id" value={character._id} />
                  <button type="submit" className="form-submit">
                    Delete
                  </button>
                </form>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <form
          className="question-form"
          method="post"
          onSubmit={handleSubmitQuestion}
        >
          <div className="input-container text">
            <label>
              <span className="form-label">Vraag:</span>
              <input type="text" name="question" className="form-input" />
            </label>
          </div>
          <div className="input-container number">
            <label>
              <span className="form-label">Param1:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
                name="param1"
                className="form-input"
              />
            </label>
          </div>
          <div className="input-container number">
            <label>
              <span className="form-label">Param2:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
                name="param2"
                className="form-input"
              />
            </label>
          </div>
          <div className="input-container number">
            <label>
              <span className="form-label">Param3:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
                name="param3"
                className="form-input"
              />
            </label>
          </div>
          <div className="input-container number">
            <label>
              <span className="form-label">Param4:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
                name="param4"
                className="form-input"
              />
            </label>
          </div>
          <div className="input-container number">
            <label>
              <span className="form-label">Param5:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value="50"
                name="param5"
                className="form-input"
              />
            </label>
          </div>
          <div className="input-container answer">
            <label>
              <span className="form-label">Bool:</span>
              <input
                type="radio"
                name="answerType"
                className="form-input"
                value="BOOL"
                checked
              />
            </label>
            <label>
              <span className="form-label">Text:</span>
              <input
                type="radio"
                name="answerType"
                className="form-input"
                value="TEXT"
              />
            </label>
          </div>
          <div>
            <button type="submit" className="form-submit">
              Add question
            </button>
          </div>
        </form>
      </section>
      <section>
        <header className="hidden">
          <h1>Questions</h1>
        </header>
        <ul className="menu">
          {questions.filter(question => (
            <li>
              <article>
                <form
                  className="update-form"
                  method="post"
                  onSubmit={handleUpdateQuestion}
                >
                  <input type="hidden" name="action" value="update" />
                  <input
                    type="hidden"
                    name="id"
                    value="<?php echo $question['id']; ?>"
                  />
                  <input
                    type="text"
                    name="question"
                    className="form-input"
                    value="<?php echo $question['question']; ?>"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param1"
                    className="form-input"
                    value="<?php echo $question['param1']; ?>"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param2"
                    className="form-input"
                    value="<?php echo $question['param2']; ?>"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param3"
                    className="form-input"
                    value="<?php echo $question['param3']; ?>"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param4"
                    className="form-input"
                    value="<?php echo $question['param4']; ?>"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param5"
                    className="form-input"
                    value="<?php echo $question['param5']; ?>"
                  />
                  <input
                    type="radio"
                    name="answerType"
                    className="form-input"
                    value="BOOL"
                  />
                  <input
                    type="radio"
                    name="answerType"
                    className="form-input"
                    value="TEXT"
                  />
                  <button type="submit" className="form-submit">
                    Update
                  </button>
                </form>
                <form
                  className="update-form"
                  method="post"
                  onSubmit={handleDeleteQuestion}
                >
                  <input type="hidden" name="action" value="delete" />
                  <input
                    type="hidden"
                    name="id"
                    value="<?php echo $question['id']; ?>"
                  />
                  <button type="submit" className="form-submit">
                    Delete
                  </button>
                </form>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <header className="hidden">
          <h1>Answers</h1>
        </header>
        <ul className="menu">
          {answers.filter(answer => (
            <li>
              <article>
                <div>
                  <span className="form-label">Question:</span>
                  <p>{answer.question}</p>
                </div>
                <p>{answer.answerBool}</p>
                <p>{answer.answerText}</p>
                <div>
                  <span className="form-label">UserId:</span>
                  <p>{answer.userId}</p>
                </div>
                <div>
                  <span className="form-label">date:</span>
                  <p>{answer.createdAt}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

Dashboard.propTypes = {
  uiStore: PropTypes.observableObject.isRequired,
  characterStore: PropTypes.observableObject.isRequired,
  questionStore: PropTypes.observableObject.isRequired,
  answerStore: PropTypes.observableObject.isRequired
};

export default inject(
  `uiStore`,
  `characterStore`,
  `questionStore`,
  `answerStore`
)(withAuthentication(observer(Dashboard)));
