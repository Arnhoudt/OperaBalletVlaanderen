import React, { useState } from "react";
import { Link } from "react-router-dom";
import { inject, observer, PropTypes } from "mobx-react";
import styles from "./Dashboard.module.css";
import withAuthentication from "../../components/admin/auth/WithAuthentication";
import { ROUTES } from "../../constants";
import AddCharacter from "../../components/admin/AddCharacter";
import EditCharacter from "../../components/admin/EditCharacter";
import AddAct from "../../components/admin/AddAct";
import EditAct from "../../components/admin/EditAct";
import Answers from "../../components/admin/Answers";

const Dashboard = ({ uiStore, actStore, answerStore, characterStore, questionStore, history }) => {
  const [tab, setTab] = useState(`Content`);

  const handleClick = e => {
    uiStore.logoutAdmin();
    history.push(ROUTES.loginAdmin);
  };

  const handleClickTab = e => {
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
          <button onClick={handleClickTab} className={`${styles.tab} ${tab === `Content` ? styles.selected : styles.unselected}`} value="Content">
            <p>Content</p>
          </button>
          <button onClick={handleClickTab} className={`${styles.tab} ${tab === `Resultaten` ? styles.selected : styles.unselected}`} value="Resultaten">
            <p>Resultaten</p>
          </button>
        </div>
        {tab === `Resultaten` ? (
          <Answers />
        ) : tab === `Content` ? (
          <>
            <h2 className={styles.subtitle}>__ Characters</h2>
            <AddCharacter />
            {characterStore.characters.map(character => (
              <EditCharacter key={character.id} character={character} update={characterStore.update} remove={characterStore.delete} />
            ))}
            <h2 className={styles.subtitle}>__ Acts</h2>
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
