import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const Characters = ({ characterStore }) => {
  return (
    <>
      <div>
        <h2>your character is</h2>
        <p>YOUR CHARACTER</p>
        <div>
          <div>
            <p>happy</p>
            <p>50</p>
          </div>
          <div>
            <p>smart</p>
            <p>300</p>
          </div>
          <div>
            <p>unicorn</p>
            <p>200</p>
          </div>
        </div>
      </div>
      <div>
        <h2>Possible characters</h2>
        <div>
          <h3>name</h3>
          <div>
            <div>
              <p>happy</p>
              <p>1</p>
            </div>
            <div>
              <p>smart</p>
              <p>2</p>
            </div>
            <div>
              <p>unicorn</p>
              <p>3</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Characters.propTypes = {
  characterStore: PropTypes.observableObject.isRequired
};

export default inject(`characterStore`)(observer(Characters));
