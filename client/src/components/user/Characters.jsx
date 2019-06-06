import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { Link } from "react-router-dom";
//import styles from "./Answers.module.css";

const Characters = ({ characterStore }) => {
  const { characters } = characterStore;

  return (
    <>
      <h2>Characters:</h2>
      {characters.map(character => (
        <Link key={character.id} to={`/characterDetail/${character.id}`}>
          <button>{character.name}</button>
        </Link>
      ))}
    </>
  );
};
Characters.propTypes = {
  characterStore: PropTypes.observableObject.isRequired
};
export default inject(`characterStore`)(observer(Characters));