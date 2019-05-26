
<h1>Awesome front page!</h1>
<div class="questions">
  <h2>questions</h2>
    <form class="update-form" method="post">
  <?php foreach ($questions as $question) {?>
      <div class="queston" number="<?php echo $question['id']; ?>">
          <h2><?php echo $question['question']; ?></h2>
          <div class="controls">
              <?php if($question['answerType'] === "BOOL"): ?>
              <input class="answer" type="radio" name="radio<?php echo $question['id']; ?>" id="optionsRadios1" value="true">
              <label class="radio" for="optionsRadios1">
                  Yes
              </label>
              <input class="answer" type="radio" name="radio<?php echo $question['id']; ?>" id="optionsRadios2" value="false">
              <label class="radio" for="optionsRadios2">
                  No
              </label>
              <?php endif;
              if($question['answerType'] === "TEXT"): ?>
                  <input class="answer" type="text" name="text" id="optionsText2">
                  <label class="text" for="optionsText2">
                      Input
                  </label>
              <?php endif; ?>
          </div>
          <div class="questionValues">
              <div class="valueHappy"><?php echo $question['param1']; ?></div>
              <div class="valueSmart"><?php echo $question['param2']; ?></div>
              <div class="valueUnicorn"><?php echo $question['param3']; ?></div>
              <div class="valueUnicorn"><?php echo $question['param4']; ?></div>
              <div class="valueUnicorn"><?php echo $question['param5']; ?></div>

          </div>
      </div>
  <?php } ?>
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