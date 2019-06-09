import React from "react";
import styles from "./EditAct.module.css";

const EditAct = ({ act, update, remove }) => {
  const handleUpdateAct = e => {
    e.preventDefault();
    update(act);
  };

  const handleDeleteAct = e => {
    e.preventDefault();
    remove(act);
  };

  return (
    <>
      <form method="post" onSubmit={handleUpdateAct}>
        <div className={styles.containerLabels}>
          <div className={styles.line} />
          <input className={styles.input} type="text" name="act" defaultValue={act.name} onChange={e => act.setName(e.target.value)} />
          <input
            className={styles.input}
            type="text"
            name="spotifyPlaylist"
            defaultValue={act.spotifyPlaylist}
            onChange={e => act.setSpotifyPlaylist(e.target.value)}
          />
          <input
            className={`${styles.input} ${styles.param}`}
            type="number"
            min="0"
            max="50"
            step="1"
            name="param1"
            defaultValue={act.param1}
            onChange={e => act.setParam1(e.target.value)}
          />
          <input
            className={`${styles.input} ${styles.param}`}
            type="number"
            min="0"
            max="50"
            step="1"
            name="param2"
            defaultValue={act.param2}
            onChange={e => act.setParam2(e.target.value)}
          />
          <input
            className={`${styles.input} ${styles.param}`}
            type="number"
            min="0"
            max="50"
            step="1"
            name="param3"
            defaultValue={act.param3}
            onChange={e => act.setParam3(e.target.value)}
          />
          <input
            className={`${styles.input} ${styles.param}`}
            type="number"
            min="0"
            max="50"
            step="1"
            name="param4"
            defaultValue={act.param4}
            onChange={e => act.setParam4(e.target.value)}
          />
          <input
            className={`${styles.input} ${styles.param}`}
            type="number"
            min="0"
            max="50"
            step="1"
            name="param5"
            defaultValue={act.param5}
            onChange={e => act.setParam5(e.target.value)}
          />
          <button type="submit" className={`${styles.button} ${styles.update}`}>
            Update
          </button>
          <button type="submit" onClick={handleDeleteAct} className={styles.button}>
            Delete
          </button>
        </div>
      </form>
    </>
  );
};

export default EditAct;
