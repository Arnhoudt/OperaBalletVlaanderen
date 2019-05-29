<h1>Awesome front page!</h1>
<div class="questions">
  <h2>questions</h2>
    <form class="update-form" method="post">
        <input type="text" class="hidden" name="clientToken" id="clientToken" value="<?php
        echo $clientToken;
        ?>">
        <label class="hidden" for="clientToken">Client Token</label>
  <?php foreach ($questions as $question) {?>
      <div class="question" number="<?php echo $question['id']; ?>">
          <h3 class="questionText"><?php echo $question['question']; ?></h3>
          <div class="controls">
              <?php if($question['answerType'] === "BOOL"): ?>
              <div class="radio-container">
                  <input class="answer" type="radio" name="question<?php echo $question['id']; ?>" id="optionsRadios1<?php echo $question['id']; ?>" value="true">
                  <label class="radio" for="optionsRadios1<?php echo $question['id']; ?>">
                      Yes
                  </label>
              </div>
              <div class="radio-container">
                  <input class="answer" type="radio" name="question<?php echo $question['id']; ?>" id="optionsRadios2<?php echo $question['id']; ?>" value="false">
                  <label class="radio" for="optionsRadios2<?php echo $question['id']; ?>">
                      No
                  </label>
              </div>
              <?php endif;
              if($question['answerType'] === "TEXT"): ?>
                  <input class="answer" type="text" name="question<?php echo $question['id']; ?>" id="optionsText2<?php echo $question['id']; ?>">
                  <label class="text" for="optionsText2<?php echo $question['id']; ?>">
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
    <?php foreach ($characters as $character): ?>
    <div class="character">
        <h3 class="characterName"><?php echo $character['name'] ?></h3>
        <div class="characterStats">
            <div class="stat">
                <p>happy</p>
                <p class="CharacterStatValueHappy"><?php echo $character['param1'] ?></p>
            </div>
            <div class="stat">
                <p>smart</p>
                <p class="CharacterStatValueSmart"><?php echo $character['param2'] ?></p>
            </div>
            <div class="stat">
                <p>unicorn</p>
                <p class="CharacterStatValueUnicorn"><?php echo $character['param3'] ?></p>
            </div>
        </div>
    </div>
    <?php endforeach; ?>
</div>