import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const Characters = ({ characterStore }) => {
  const { characters } = characterStore;

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

  const handleUpdateCharacter = e => {
    e.preventDefault();
    characterStore.update({
      _id: e.currentTarget.children[0].value,
      name: e.currentTarget.children[1].value,
      param1: e.currentTarget.children[2].value,
      param2: e.currentTarget.children[3].value,
      param3: e.currentTarget.children[4].value,
      param4: e.currentTarget.children[5].value,
      param5: e.currentTarget.children[6].value
    });
  };

  const handleDeleteCharacter = e => {
    e.preventDefault();
    characterStore.delete(e.currentTarget.children[0].value);
  };

  return (
    <>
      <section>
        <form method="post" onSubmit={handleSubmitCharacter}>
          <div>
            <label>
              <span>Name:</span>
              <input type="text" name="name" ref={characterName} />
            </label>
          </div>
          <div>
            <label>
              <span>Param1:</span>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                defaultValue="50"
                ref={characterParam1}
                name="param1"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Param2:</span>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                defaultValue="50"
                ref={characterParam2}
                name="param2"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Param3:</span>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                defaultValue="50"
                ref={characterParam3}
                name="param3"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Param4:</span>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                defaultValue="50"
                ref={characterParam4}
                name="param4"
              />
            </label>
          </div>
          <div>
            <label>
              <span>Param5:</span>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                defaultValue="50"
                ref={characterParam5}
                name="param5"
              />
            </label>
          </div>
          <div>
            <button type="submit">Add character</button>
          </div>
        </form>
      </section>
      <section>
        <header>
          <h1>Characters</h1>
        </header>
        <ul>
          {characters.map(character => (
            <li key={character._id}>
              <article>
                <form method="post" onSubmit={handleUpdateCharacter}>
                  <input type="hidden" name="id" defaultValue={character._id} />
                  <input
                    type="text"
                    name="name"
                    defaultValue={character.name}
                  />
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="1"
                    name="param1"
                    defaultValue={character.param1}
                  />
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="1"
                    name="param2"
                    defaultValue={character.param2}
                  />
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="1"
                    name="param3"
                    defaultValue={character.param3}
                  />
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="1"
                    name="param4"
                    defaultValue={character.param4}
                  />
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="1"
                    name="param5"
                    defaultValue={character.param5}
                  />
                  <button type="submit">Update</button>
                </form>
                <form method="post" onSubmit={handleDeleteCharacter}>
                  <input type="hidden" name="id" defaultValue={character._id} />
                  <button type="submit">Delete</button>
                </form>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

Characters.propTypes = {
  characterStore: PropTypes.observableObject.isRequired
};

export default inject(`characterStore`)(observer(Characters));
