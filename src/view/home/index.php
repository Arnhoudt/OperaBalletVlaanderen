
<h1>Awesome front page!</h1>
<div class="questions">
  <h2>questions</h2>
  <?php foreach ($questions as $question){
      var_dump($questions);
  };?>
  <div class="queston" number="1">
    <h2>Are you a <span class="unicorn">unicorn</span>?</h2>
    <div class="controls">
          <input class="answer" type="radio" name="radio1" id="optionsRadios1" value="true">
        <label class="radio" for="optionsRadios1">
          Yes
        </label>
          <input class="answer" type="radio" name="radio1" id="optionsRadios2" value="false">
        <label class="radio" for="optionsRadios2">
          No
        </label>
      </div>
      <div class="questionValues">
          <div class="valueHappy">100</div>
          <div class="valueSmart">100</div>
          <div class="valueUnicorn">100</div>
      </div>
  </div>
  <div class="question" number="2">
    <h2>Do you like <span class="unicorn">unicorns</span></h2>
    <div class="controls">
          <input class="answer" type="radio" name="radio2" id="optionsRadios1" value="true">
        <label class="radio" for="optionsRadios1">
          Yes
        </label>
          <input class="answer" type="radio" name="radio2" id="optionsRadios2" value="false">
        <label class="radio" for="optionsRadios2">
          No
        </label>
      </div>
      <div class="questionValues">
          <div class="valueHappy">100</div>
          <div class="valueSmart">100</div>
          <div class="valueUnicorn">100</div>
      </div>
  </div>
  <div class="question" number="3">
    <h2>Are you kind</h2>
    <div class="controls">
          <input class="answer" type="radio" name="radio3" id="optionsRadios1" value="true">
        <label class="radio" for="optionsRadios1">
          Yes
        </label>
          <input class="answer" type="radio" name="radio3" id="optionsRadios2" value="false">
        <label class="radio" for="optionsRadios2">
          No
        </label>
      </div>
      <div class="questionValues">
          <div class="valueHappy">0</div>
          <div class="valueSmart">100</div>
          <div class="valueUnicorn">100</div>
      </div>
  </div>
  <div class="question" number="4">
    <h2>Are you happy</h2>
    <div class="controls">
          <input class="answer" type="radio" name="radio4" id="optionsRadios1" value="true">
        <label class="radio" for="optionsRadios1">
          Yes
        </label>
          <input class="answer" type="radio" name="radio4" id="optionsRadios2" value="false">
        <label class="radio" for="optionsRadios2">
          No
        </label>
      </div>
      <div class="questionValues">
          <div class="valueHappy">100</div>
          <div class="valueSmart">-50</div>
          <div class="valueUnicorn">100</div>
      </div>
  </div>
  <div class="question" number="5">
    <h2>Are you smart</h2>
    <div class="controls">
          <input class="answer" type="radio" name="radio5" id="optionsRadios1" value="true">
        <label class="radio" for="optionsRadios1">
          Yes
        </label>
          <input class="answer" type="radio" name="radio5" id="optionsRadios2" value="false">
        <label class="radio" for="optionsRadios2">
          No
        </label>
      </div>
      <div class="questionValues">
          <div class="valueHappy">-20</div>
          <div class="valueSmart">100</div>
          <div class="valueUnicorn">100</div>
      </div>
  </div>
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
        <h3 class="characterName">Elon Musk</h3>
        <div class="characterStats">
            <div class="stat">
                <p>happy</p>
                <p class="CharacterStatValueHappy">50</p>
            </div>
            <div class="stat">
                <p>smart</p>
                <p class="CharacterStatValueSmart">300</p>
            </div>
            <div class="stat">
                <p>unicorn</p>
                <p class="CharacterStatValueUnicorn">200</p>
            </div>
        </div>
    </div>
    <div class="character">
        <h3 class="characterName">Donald Trump</h3>
        <div class="characterStats">
            <div class="stat">
                <p>happy</p>
                <p class="CharacterStatValueHappy">100</p>
            </div>
            <div class="stat">
                <p>smart</p>
                <p class="CharacterStatValueSmart">50</p>
            </div>
            <div class="stat">
                <p>unicorn</p>
                <p class="CharacterStatValueUnicorn">0</p>
            </div>
        </div>
    </div>
    <div class="character">
        <h3 class="characterName">Mickey Mouse</h3>
        <div class="characterStats">
            <div class="stat">
                <p>happy</p>
                <p class="CharacterStatValueHappy">300</p>
            </div>
            <div class="stat">
                <p>smart</p>
                <p class="CharacterStatValueSmart">0</p>
            </div>
            <div class="stat">
                <p>unicorn</p>
                <p class="CharacterStatValueUnicorn">300</p>
            </div>
        </div>
    </div>
</div>