import React, { useState, useEffect } from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const CharacterDetail = ({ id, characterStore }) => {
  const [character, setCharacter] = useState(``);

  useEffect(() => {
    characterStore.findById(id).then(data => setCharacter(data));
  }, [characterStore, id]);

  return (
    <>
      {character ? (
        <>
          <h3>{character.name}</h3>
          <p>{character.param1}</p>
          <p>{character.param2}</p>
          <p>{character.param3}</p>
          <p>{character.param4}</p>
          <p>{character.param5}</p>
        </>
      ) : null}
    </>
  );
};

CharacterDetail.propTypes = {
  characterStore: PropTypes.observableObject.isRequired
};

export default inject(`characterStore`)(observer(CharacterDetail));
