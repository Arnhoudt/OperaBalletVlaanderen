<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/DashboardDAO.php';

class DashboardController extends Controller {

  private $dashboardDAO;

  function __construct() {
    $this->dashboardDAO = new DashboardDAO();
  }

  public function loginView() {
    $this->set('title', "Login");
    if(!empty($_SESSION['user'])) {
      header('Location: index.php?page=dashboard');
      exit();
    }
  }

  public function registerView() {
    $this->set('title', "Register");
  }

  public function dashboard() {
    $this->set('title', "Dashboard");
    if(empty($_SESSION['user'])) {
      header('Location: index.php?page=loginView');
      exit();
    }
  }

  public function login() {
    if(!empty($_POST)) {
      if(!empty($_POST['email']) && !empty($_POST['password'])) {
        $existing = $this->dashboardDAO->selectByEmail($_POST['email']);
        if(!empty($existing)) {
          if (password_verify($_POST['password'], $existing['password'])) {
            $_SESSION['user'] = $existing;
            header('Location: index.php?page=dashboard');
            exit();
          } else {
            $_SESSION['error'] = 'Unknown username / password';
          }
        } else {
          $_SESSION['error'] = 'Unknown username / password';
        }
      } else {
        $_SESSION['error'] = 'Unknown username / password';
      }
    }
    header('Location: index.php?page=loginView');
    exit();
  }

  public function register() {
    if(!empty($_POST)) {
      $this->handleRegister();
    }
  }

  public function logout() {
    if(!empty($_SESSION['user'])) {
      unset($_SESSION['user']);
    }
    $_SESSION['info'] = 'Logged Out';
    header('Location: index.php?page=loginView');
    exit();
  }

  private function handleRegister() {
    if(empty($_POST['email'])) {
      $errors['email'] = 'Please enter your email';
    } else {
      $existing = $this->dashboardDAO->selectByEmail($_POST['email']);
      if(!empty($existing)) {
        $errors['email'] = 'Email address is already in use';
      }
    }
    if(empty($_POST['password'])) {
      $errors['password'] = 'Please enter a password';
    }
    if($_POST['confirm_password'] != $_POST['password']) {
      $errors['confirm_password'] = 'Passwords do not match';
    }
    if(empty($errors)) {
      $data = array(
        'email' => $_POST['email'],
        'password' => password_hash($_POST['password'], PASSWORD_BCRYPT)
      );
      $inserteduser = $this->dashboardDAO->insert($data);
      if(!empty($inserteduser)) {
        $_SESSION['info'] = 'Registration Successful!';
        header('Location: index.php?page=loginView');
        exit();
      } else {
        $this->set('errors', $this->dashboardDAO->validate($data));
      }
    }
    $_SESSION['error'] = 'Registration Failed!';
    $this->set('errors', $errors);
  }
}
