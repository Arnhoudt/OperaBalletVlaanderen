import React from "react";
//import styles from "./Answers.module.css";

const EditCharacter = ({ character, update, remove }) => {
  const handleUpdateCharacter = e => {
    e.preventDefault();
    update(character);
  };

  const handleDeleteCharacter = e => {
    e.preventDefault();
    remove(character);
  };

  return (
    <>
      <form method="post" onSubmit={handleUpdateCharacter}>
        <input
          type="text"
          name="name"
          defaultValue={character.name}
          onChange={e => character.setName(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          name="param1"
          defaultValue={character.param1}
          onChange={e => character.setParam1(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          name="param2"
          defaultValue={character.param2}
          onChange={e => character.setParam2(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          name="param3"
          defaultValue={character.param3}
          onChange={e => character.setParam3(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          name="param4"
          defaultValue={character.param4}
          onChange={e => character.setParam4(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          name="param5"
          defaultValue={character.param5}
          onChange={e => character.setParam5(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      <form method="post" onSubmit={handleDeleteCharacter}>
        <button type="submit">Delete</button>
      </form>
    </>
  );
};

export default EditCharacter;
