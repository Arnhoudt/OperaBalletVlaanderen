import React from "react";
import Questions from "../components/user/Questions";
import Characters from "../components/user/Characters";
import Stats from "../components/user/Stats";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
        <h1>Awesome front page!</h1>
        <Questions/>
        <Characters/>
        <stats />
    </>
  );
};

export default Home;
