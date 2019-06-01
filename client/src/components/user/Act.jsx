import React from "react";
//import styles from "./Answers.module.css";

const Act = ({ act }) => {
  return (
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
  );
};

export default Act;
