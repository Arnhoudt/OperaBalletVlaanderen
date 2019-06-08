import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import styles from "./AddCharacter.module.css";

const AddCharacter = ({ characterStore }) => {
  const characterName = React.createRef();
  const characterParam1 = React.createRef();
  const characterParam2 = React.createRef();
  const characterParam3 = React.createRef();
  const characterParam4 = React.createRef();
  const characterParam5 = React.createRef();

  const handleSubmitCharacter = e => {
    e.preventDefault();
    characterStore.create({
      name: characterName.current.value,
      param1: characterParam1.current.value,
      param2: characterParam2.current.value,
      param3: characterParam3.current.value,
      param4: characterParam4.current.value,
      param5: characterParam5.current.value
    });
  };

  return (
    <>
      <section>
        <form method="post" onSubmit={handleSubmitCharacter}>
          <div className={styles.containerLabels}>
            <label className={styles.label}>
              <span>Name:</span>
              <input type="text" name="name" ref={characterName} />
            </label>
            <label className={`${styles.label} ${styles.param}`}>
              <span>Param1:</span>
              <input type="number" min="0" max="100" step="1" defaultValue="100" ref={characterParam1} name="param1" />
            </label>
            <label className={`${styles.label} ${styles.param}`}>
              <span>Param2:</span>
              <input type="number" min="0" max="100" step="1" defaultValue="100" ref={characterParam2} name="param2" />
            </label>
            <label className={`${styles.label} ${styles.param}`}>
              <span>Param3:</span>
              <input type="number" min="0" max="100" step="1" defaultValue="100" ref={characterParam3} name="param3" />
            </label>
            <label className={`${styles.label} ${styles.param}`}>
              <span>Param4:</span>
              <input type="number" min="0" max="100" step="1" defaultValue="100" ref={characterParam4} name="param4" />
            </label>
            <label className={`${styles.label} ${styles.param}`}>
              <span>Param5:</span>
              <input type="number" min="0" max="100" step="1" defaultValue="100" ref={characterParam5} name="param5" />
            </label>
            <div>
              <button type="submit">Add character</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
AddCharacter.propTypes = {
  characterStore: PropTypes.observableObject.isRequired
};
export default inject(`characterStore`)(observer(AddCharacter));
