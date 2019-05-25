<section>
  <header class="hidden"><h1>Login</h1></header>
  <form class="login-form" method="post" action="index.php?page=login">
    <input type="hidden" name="action" value="login" />
    <div class="input-container text">
      <label>
        <span class="form-label hidden">Email:</span>
        <input type="text" name="email" placeholder="email" class="form-input" />
      </label>
    </div>
    <div class="input-container text">
      <label>
        <span class="form-label hidden">Password:</span>
        <input type="password" name="password" placeholder="password" class="form-input" />
      </label>
    </div>
    <div class="input-container submit">
      <button type="submit" class="form-submit">Login</button>
    </div>
  </form>
  <form method="post" action="index.php?page=registerView">
    <button>Register</button>
  </form>
</section>
