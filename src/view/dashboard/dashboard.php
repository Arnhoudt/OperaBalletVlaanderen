<section>
  <?php
    if(!empty($_SESSION['user'])):
  ?>
  <header class="hidden"><h1>Logout</h1></header>
  <p><?php echo $_SESSION['user']['email'];?> - <a href="index.php?page=logout" class="logout-button">Logout</a></p>
  <?php
    endif;
  ?>

  <section>
    <form class="question-form" method="post">
      <input type="hidden" name="action" value="question" />
      <div class="input-container text">
        <label>
          <span class="form-label">Vraag:</span>
          <input type="text" name="question" class="form-input"<?php if(!empty($_POST['text'])) echo 'value="' . $_POST['text'] . '"';?> />
        </label>
      </div>
      <div class="input-container number">
        <label>
          <span class="form-label">Param1:</span>
          <input type="number" min="0" max="100" step="1" value="50" name="param1" class="form-input"<?php if(!empty($_POST['param1'])) echo 'value="' . $_POST['param1'] . '"';?> />
        </label>
      </div>
      <div class="input-container number">
        <label>
          <span class="form-label">Param2:</span>
          <input type="number" min="0" max="100" step="1" value="50" name="param2" class="form-input"<?php if(!empty($_POST['param2'])) echo 'value="' . $_POST['param2'] . '"';?> />
        </label>
      </div>
      <div class="input-container number">
        <label>
          <span class="form-label">Param3:</span>
          <input type="number" min="0" max="100" step="1" value="50" name="param3" class="form-input"<?php if(!empty($_POST['param3'])) echo 'value="' . $_POST['param3'] . '"';?> />
        </label>
      </div>
      <div class="input-container number">
        <label>
          <span class="form-label">Param4:</span>
          <input type="number" min="0" max="100" step="1" value="50" name="param4" class="form-input"<?php if(!empty($_POST['param4'])) echo 'value="' . $_POST['param4'] . '"';?> />
        </label>
      </div>
      <div class="input-container number">
        <label>
          <span class="form-label">Param5:</span>
          <input type="number" min="0" max="100" step="1" value="50" name="param5" class="form-input"<?php if(!empty($_POST['param5'])) echo 'value="' . $_POST['param5'] . '"';?> />
        </label>
      </div>
      <div>
        <button type="submit" class="form-submit">Add question</button>
      </div>
    </form>
  </section>
  <section>
    <ul class="menu">
      <?php foreach ($questions as $question) {?>
      <li>
        <article>
          <form class="update-form" method="post">
            <input type="hidden" name="action" value="update" />
            <input type="hidden" name="id" value="<?php echo $question['id']; ?>" />
            <input type="text" name="question" class="form-input" value="<?php echo $question['question']; ?>" />
            <input type="number" min="0" max="100" step="1" name="param1" class="form-input" value="<?php echo $question['param1']; ?>" />
            <input type="number" min="0" max="100" step="1" name="param2" class="form-input" value="<?php echo $question['param2']; ?>" />
            <input type="number" min="0" max="100" step="1" name="param3" class="form-input" value="<?php echo $question['param3']; ?>" />
            <input type="number" min="0" max="100" step="1" name="param4" class="form-input" value="<?php echo $question['param4']; ?>" />
            <input type="number" min="0" max="100" step="1" name="param5" class="form-input" value="<?php echo $question['param5']; ?>" />
            <button type="submit" class="form-submit">Update</button>
          </form>
        </article>
      </li>
      <?php } ?>
    </ul>
  </section>
  <form class="login-form" method="post" action="index.php?page=registerView">
    <button type="submit">Register</button>
  </form>
</section>
