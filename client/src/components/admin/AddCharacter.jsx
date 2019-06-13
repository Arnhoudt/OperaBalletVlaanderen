import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import styles from "./AddCharacter.module.css";

const AddCharacter = ({ characterStore }) => {
  const characterName = React.createRef();

  const handleSubmitCharacter = e => {
    e.preventDefault();
    characterStore.create({
      name: characterName.current.value
    });
  };

  return (
    <>
      <section>
        <form method="post" onSubmit={handleSubmitCharacter}>
          <div className={styles.containerLabels}>
            <label className={styles.label}>
              <span>Name:</span>
              <input className={styles.input} type="text" name="name" ref={characterName} />
            </label>
            <div>
              <button type="submit" className={styles.add}>
                <p>Add character</p>
              </button>
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
