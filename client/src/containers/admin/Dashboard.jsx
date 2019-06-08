import React, { useState } from "react";
import { Link } from "react-router-dom";
import { inject, observer, PropTypes } from "mobx-react";
import styles from "./Dashboard.module.css";
import withAuthentication from "../../components/admin/auth/WithAuthentication";
import { ROUTES } from "../../constants";
import AddCharacter from "../../components/admin/AddCharacter";
import EditCharacter from "../../components/admin/EditCharacter";
//import AddQuestion from "../../components/admin/AddQuestion";
//import EditQuestion from "../../components/admin/EditQuestion";
import AddAct from "../../components/admin/AddAct";
import EditAct from "../../components/admin/EditAct";

const Dashboard = ({ uiStore, actStore, answerStore, characterStore, questionStore, history }) => {
  const [tab, setTab] = useState(`Cijfers`);

  const handleClick = e => {
    uiStore.logoutAdmin();
    history.push(ROUTES.loginAdmin);
  };

  const handleClickTab = e => {
    if (e.currentTarget.value === `Cijfers`) {
      setTab(`Cijfers`);
    }
    if (e.currentTarget.value === `Resultaten`) {
      setTab(`Resultaten`);
    }
    if (e.currentTarget.value === `Content`) {
      setTab(`Content`);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerAdmin}>
          <Link to={ROUTES.registerAdmin} className={styles.register}>
            <button className={styles.admin}>
              <p>Maak nieuwe admin</p>
            </button>
          </Link>
          <button onClick={handleClick} className={styles.admin}>
            <p>Log uit</p>
          </button>
        </div>
        <h1 className={`${styles.title}`}>{tab}</h1>
        <div className={styles.containerTabs}>
          <button onClick={handleClickTab} className={`${styles.tab} ${tab === `Cijfers` ? styles.selected : styles.unselected}`} value="Cijfers">
            <p>Cijfers</p>
          </button>
          <button onClick={handleClickTab} className={`${styles.tab} ${tab === `Resultaten` ? styles.selected : styles.unselected}`} value="Resultaten">
            <p>Resultaten</p>
          </button>
          <button onClick={handleClickTab} className={`${styles.tab} ${tab === `Content` ? styles.selected : styles.unselected}`} value="Content">
            <p>Content</p>
          </button>
        </div>
        {tab === `Cijfers` ? (
          <></>
        ) : tab === `Resultaten` ? (
          <>
            {answerStore.answers.map(answer => (
              <div key={answer.id}>
                <p>Question: {answer.question}</p>
                <p>Answer: {`${answer.answer}`}</p>
              </div>
            ))}
          </>
        ) : tab === `Content` ? (
          <>
            <AddCharacter />
            {characterStore.characters.map(character => (
              <EditCharacter key={character.id} character={character} update={characterStore.update} remove={characterStore.delete} />
            ))}
            {/* <AddQuestion />
          {questionStore.questions.map(question => (
            <EditQuestion
              key={question.id}
              question={question}
              update={questionStore.update}
              remove={questionStore.delete}
            />
          ))} */}
            <AddAct />
            {actStore.acts.map(act => (
              <EditAct key={act.id} act={act} update={actStore.update} remove={actStore.delete} />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

Dashboard.propTypes = {
  uiStore: PropTypes.observableObject.isRequired,
  actStore: PropTypes.observableObject.isRequired,
  answerStore: PropTypes.observableObject.isRequired,
  characterStore: PropTypes.observableObject.isRequired,
  questionStore: PropTypes.observableObject.isRequired
};

export default inject(`uiStore`, `actStore`, `answerStore`, `characterStore`, `questionStore`)(withAuthentication(observer(Dashboard)));
