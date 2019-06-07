import React from "react";
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

const Dashboard = ({
  uiStore,
  actStore,
  answerStore,
  characterStore,
  questionStore,
  history
}) => {
  const handleClick = e => {
    uiStore.logoutAdmin();
    history.push(ROUTES.loginAdmin);
  };

  return (
    <>
      <h1 className={`${styles.title}`}>Welkom in het dashboard</h1>
      <Link to={ROUTES.registerAdmin}>
        <button>Wordt lid</button>
      </Link>
      <button onClick={handleClick}>Logout</button>
      <AddCharacter />
      {characterStore.characters.map(character => (
        <EditCharacter
          key={character.id}
          character={character}
          update={characterStore.update}
          remove={characterStore.delete}
        />
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
        <EditAct
          key={act.id}
          act={act}
          update={actStore.update}
          remove={actStore.delete}
        />
      ))}
      {answerStore.answers.map(answer => (
        <div key={answer.id}>
          <p>Question: {answer.question}</p>
          <p>Answer: {`${answer.answer}`}</p>
        </div>
      ))}
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

export default inject(
  `uiStore`,
  `actStore`,
  `answerStore`,
  `characterStore`,
  `questionStore`
)(withAuthentication(observer(Dashboard)));
