<section>
  <?php
    if(!empty($_SESSION['user'])):
  ?>
  <header class="hidden"><h1>Logout</h1></header>
  <p><?php echo $_SESSION['user']['email'];?> - <a href="index.php?page=logout" class="logout-button">Logout</a></p>
  <?php
    endif;
  ?>
</section>
