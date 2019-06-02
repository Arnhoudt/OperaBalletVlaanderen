import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const AddAct = ({ actStore }) => {
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
                max="50"
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
                max="50"
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
                max="50"
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
                max="50"
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
                max="50"
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
    </>
  );
};

AddAct.propTypes = {
  actStore: PropTypes.observableObject.isRequired
};

export default inject(`actStore`)(observer(AddAct));
