import React from "react";
import { Link } from "react-router-dom";
import { inject, observer, PropTypes } from "mobx-react";
import styles from "./Dashboard.module.css";
import withAuthentication from "../components/auth/WithAuthentication";
import { ROUTES } from "../constants";

const Dashboard = ({ uiStore, characterStore, questionStore, history }) => {
  const { characters } = characterStore;
  const characterName = React.createRef();
  const characterParam1 = React.createRef();
  const characterParam2 = React.createRef();
  const characterParam3 = React.createRef();
  const characterParam4 = React.createRef();
  const characterParam5 = React.createRef();

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

  return (
    <>
      <h1 className={`${styles.title}`}>Welkom in het dashboard</h1>
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
              <input type="text" name="name" className="form-input" />
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
                    ref={characterName}
                    className="form-input"
                    value={character.name}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param1"
                    ref={characterParam1}
                    className="form-input"
                    value={character.param1}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param2"
                    ref={characterParam2}
                    className="form-input"
                    value={character.param2}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param3"
                    ref={characterParam3}
                    className="form-input"
                    value={character.param3}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param4"
                    ref={characterParam4}
                    className="form-input"
                    value={character.param4}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param5"
                    ref={characterParam5}
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
    </>
  );
};

Dashboard.propTypes = {
  uiStore: PropTypes.observableObject.isRequired,
  characterStore: PropTypes.observableObject.isRequired,
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`, `characterStore`, `questionStore`)(
  withAuthentication(observer(Dashboard))
);
