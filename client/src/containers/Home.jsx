import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <h1 className={styles.title}>Jij bent als een zonnegod</h1>
        <h1>Awesome front page!</h1>
        <div class="questions">
            <h2>questions</h2>
            <form class="update-form" method="post">
                <input type="text" class="hidden" name="clientToken" id="clientToken" value="value"/>
                    <label class="hidden" for="clientToken">Client Token</label>
                    <div class="question" number="">
                        <h3 class="questionText">text</h3>
                        <div class="controls">
                            <div class="radio-container">
                                <input class="answer" type="radio" name="question" id="optionsRadios1" value="true"/>
                                    <label class="radio" for="optionsRadios1">
                                        Yes
                                    </label>
                            </div>
                            <div class="radio-container">
                                <input class="answer" type="radio" name="question" id="optionsRadios2" value="false"/>
                                    <label class="radio" for="optionsRadios2">
                                        No
                                    </label>
                            </div>
                            <input class="answer" type="text" name="question" id="optionsText2"/>
                                <label class="text" for="optionsText2">
                                    Input
                                </label>
                        </div>
                        <div class="questionValues">
                            <div class="valueHappy">1</div>
                            <div class="valueSmart">2</div>
                            <div class="valueUnicorn">3</div>
                            <div class="valueUnicorn">4</div>
                            <div class="valueUnicorn">5</div>

                        </div>
                    </div>
                    <div>
                        <input type="submit" name="action" value="Submit" class="form-submit" />
                    </div>
            </form>
        </div>
        <div>
            <h2>Stats</h2>
            <div class="stat">
                <p>happy</p>
                <p class="statValueHappy">0</p>
            </div>
            <div class="stat">
                <p>smart</p>
                <p class="statValueSmart">0</p>
            </div>
            <div class="stat">
                <p>unicorn</p>
                <p class="statValueUnicorn">0</p>
            </div>
        </div>
        <div class="yourCharacter">
            <h2>your character is</h2>
            <p class="yourCharacterName">YOUR CHARACTER</p>
            <div class="yourCharacterStats">
                <div class="yourCharacterStat">
                    <p>happy</p>
                    <p class="yourCharacterStatValueHappy">50</p>
                </div>
                <div class="yourCharacterStat">
                    <p>smart</p>
                    <p class="yourCharacterStatValueSmart">300</p>
                </div>
                <div class="yourCharacterStat">
                    <p>unicorn</p>
                    <p class="yourCharacterStatValueUnicorn">200</p>
                </div>
            </div>
        </div>
        <div>
            <h2>Possible characters</h2>
            <div class="character">
                <h3 class="characterName">name</h3>
                <div class="characterStats">
                    <div class="stat">
                        <p>happy</p>
                        <p class="CharacterStatValueHappy">1</p>
                    </div>
                    <div class="stat">
                        <p>smart</p>
                        <p class="CharacterStatValueSmart">2</p>
                    </div>
                    <div class="stat">
                        <p>unicorn</p>
                        <p class="CharacterStatValueUnicorn">3</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Home;
