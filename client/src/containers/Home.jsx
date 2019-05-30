import React from "react";
import Questions from "../components/user/Questions";
import Characters from "../components/user/Characters";
import Stats from "../components/user/Stats";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <h1 className={styles.title}>Jij bent als een zonnegod</h1>
      <h1>Awesome front page!</h1>
      <Questions />
      <Characters />
      <Stats />
      <div>
        <h2>questions</h2>
        <form method="post">
          <input
            type="text"
            name="clientToken"
            id="clientToken"
            value="value"
          />
          <label for="clientToken">Client Token</label>
          <div number="">
            <h3>text</h3>
            <div>
              <div>
                <input
                  type="radio"
                  name="question"
                  id="optionsRadios1"
                  value="true"
                />
                <label for="optionsRadios1">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="question"
                  id="optionsRadios2"
                  value="false"
                />
                <label for="optionsRadios2">No</label>
              </div>
              <input type="text" name="question" id="optionsText2" />
              <label for="optionsText2">Input</label>
            </div>
            <div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
          </div>
          <div>
            <input type="submit" name="action" value="Submit" />
          </div>
        </form>
      </div>
      <div>
        <h2>Stats</h2>
        <div>
          <p>happy</p>
          <p>0</p>
        </div>
        <div>
          <p>smart</p>
          <p>0</p>
        </div>
        <div>
          <p>unicorn</p>
          <p>0</p>
        </div>
      </div>
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

export default Home;
