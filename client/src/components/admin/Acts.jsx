import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const Acts = ({ actStore }) => {
  const { acts } = actStore;

  const actName = React.createRef();
  const actSpotifyPlaylist = React.createRef();
  const actParam1 = React.createRef();
  const actParam2 = React.createRef();
  const actParam3 = React.createRef();
  const actParam4 = React.createRef();
  const actParam5 = React.createRef();

  const handleSubmitAct = e => {
    e.preventDefault();
    actStore.create({
      name: actName.current.value,
      spotifyPlaylist: actSpotifyPlaylist.current.value,
      param1: actParam1.current.value,
      param2: actParam2.current.value,
      param3: actParam3.current.value,
      param4: actParam4.current.value,
      param5: actParam5.current.value
    });
  };

  const handleUpdateAct = e => {
    e.preventDefault();
    actStore.update({
      _id: e.currentTarget.children[0].value,
      name: e.currentTarget.children[1].value,
      spotifyPlaylist: e.currentTarget.children[2].value,
      param1: e.currentTarget.children[3].value,
      param2: e.currentTarget.children[4].value,
      param3: e.currentTarget.children[5].value,
      param4: e.currentTarget.children[6].value,
      param5: e.currentTarget.children[7].value
    });
  };

  const handleDeleteAct = e => {
    e.preventDefault();
    actStore.delete(e.currentTarget.children[0].value);
  };

  return (
    <>
      <section>
        <form method="post" onSubmit={handleSubmitAct}>
          <div>
            <label>
              <span>Naam:</span>
              <input type="text" name="name" ref={actName} />
            </label>
          </div>
          <div>
            <label>
              <span>Spotify playlist:</span>
              <input
                type="text"
                name="spotifyPlaylist"
                ref={actSpotifyPlaylist}
              />
            </label>
          </div>
          <div>
            <label>
              <span>Param1:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                defaultValue="50"
                ref={actParam1}
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
                max="100"
                step="1"
                defaultValue="50"
                ref={actParam2}
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
                max="100"
                step="1"
                defaultValue="50"
                ref={actParam3}
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
                max="100"
                step="1"
                defaultValue="50"
                ref={actParam4}
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
                max="100"
                step="1"
                defaultValue="50"
                ref={actParam5}
                name="param5"
              />
            </label>
          </div>
          <div>
            <button type="submit">Add act</button>
          </div>
        </form>
      </section>
      <section>
        <header>
          <h1>Acts</h1>
        </header>
        <ul>
          {acts.map(act => (
            <li key={act._id}>
              <article>
                <form method="post" onSubmit={handleUpdateAct}>
                  <input type="hidden" name="id" defaultValue={act._id} />
                  <input type="text" name="act" defaultValue={act.name} />
                  <input
                    type="text"
                    name="spotifyPlaylist"
                    defaultValue={act.spotifyPlaylist}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param1"
                    defaultValue={act.param1}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param2"
                    defaultValue={act.param2}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param3"
                    defaultValue={act.param3}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param4"
                    defaultValue={act.param4}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    name="param5"
                    defaultValue={act.param5}
                  />
                  <button type="submit">Update</button>
                </form>
                <form method="post" onSubmit={handleDeleteAct}>
                  <input type="hidden" name="id" defaultValue={act._id} />
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

Acts.propTypes = {
  actStore: PropTypes.observableObject.isRequired
};

export default inject(`actStore`)(observer(Acts));
