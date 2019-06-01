import React, { useState, useEffect } from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const ActDetail = ({ id, actStore }) => {
  const [act, setAct] = useState(``);

  useEffect(() => {
    actStore.findById(id).then(d => setAct(d));
    return () => ``;
  }, [actStore, id]);

  return (
    <>
      {act ? (
        <>
          <h3>{act.name}</h3>
          <iframe
            title="music"
            src={`https://embed.spotify.com/?uri=spotify:user:operaballetvlaanderen:playlist:${
              act.spotifyPlaylist
            }`}
            width="300"
            height="380"
            allowtransparency="true"
          />
        </>
      ) : null}
    </>
  );
};

ActDetail.propTypes = {
  actStore: PropTypes.observableObject.isRequired
};

export default inject(`actStore`)(observer(ActDetail));
