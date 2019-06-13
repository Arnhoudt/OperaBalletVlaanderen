import React from "react";
import styles from "./EditCharacter.module.css";

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
        <div className={styles.containerLabels}>
          <div className={styles.line} />
          <input className={styles.input} type="text" name="name" defaultValue={character.name} onChange={e => character.setName(e.target.value)} />
          <button type="submit" className={`${styles.button} ${styles.update}`}>
            Update
          </button>
          <button type="submit" onClick={handleDeleteCharacter} className={styles.button}>
            Delete
          </button>
        </div>
      </form>
    </>
  );
};
export default EditCharacter;
