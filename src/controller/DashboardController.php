<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/AdminDAO.php';
require_once __DIR__ . '/../dao/DashboardDAO.php';

class DashboardController extends Controller {

  private $adminsDAO, $dashboardDAO;

  function __construct() {
    $this->adminsDAO = new AdminDAO();
    $this->dashboardDAO = new DashboardDAO();
  }

  public function loginView() {
    if(!empty($_SESSION['user'])) {
      header('Location: index.php?page=dashboard');
      exit();
    }
    $this->set('title', "Login");
  }

  public function registerView() {
    $this->set('title', "Register");
  }

  public function dashboard() {
    $questions = $this->dashboardDAO->selectAll();
    if(empty($_SESSION['user'])) {
      header('Location: index.php?page=loginView');
      exit();
    }
    if(!empty($_POST)) {
      if($_POST['action'] === 'question' && !empty($_POST['question'])) {
        $data = array(
          'question' => $_POST['question'],
          'param1' => $_POST['param1'],
          'param2' => $_POST['param2'],
          'param3' => $_POST['param3'],
          'param4' => $_POST['param4'],
          'param5' => $_POST['param5']
        );
        $insertedQuestion = $this->dashboardDAO->insert($data);
        if(!empty($insertedQuestion)) {
          $_SESSION['info'] = 'Question added!';
          $questions = $this->dashboardDAO->selectAll();
        } else {
          $_SESSION['error'] = 'Something went wrong!';
        }
      }
      if($_POST['action'] === 'update' && !empty($_POST['question'])) {
        $data = array(
          'question' => $_POST['question'],
          'param1' => $_POST['param1'],
          'param2' => $_POST['param2'],
          'param3' => $_POST['param3'],
          'param4' => $_POST['param4'],
          'param5' => $_POST['param5'],
          'answerType' => $_POST['answerType']
        );
        $updatedQuestion = $this->dashboardDAO->update($_POST['id'], $data);
        if(!empty($updatedQuestion)) {
          $_SESSION['info'] = 'Question updated!';
          $questions = $this->dashboardDAO->selectAll();
        } else {
          $_SESSION['error'] = 'Something went wrong!';
        }
      }
    }
    $this->set('title', "Dashboard");
    $this->set('questions', $questions);
  }

  public function login() {
    if(!empty($_POST)) {
      if(!empty($_POST['email']) && !empty($_POST['password'])) {
        $existing = $this->adminsDAO->selectByEmail($_POST['email']);
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
    if(!empty($_POST) && !empty($_SESSION['user'])) {
      $this->handleRegister();
    } else {
      $_SESSION['error'] = 'Something went wrong!';
      header('Location: index.php?page=loginView');
      exit();
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
      $existing = $this->adminsDAO->selectByEmail($_POST['email']);
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
      $inserteduser = $this->adminsDAO->insert($data);
      if(!empty($inserteduser)) {
        $_SESSION['info'] = 'Registration Successful!';
        header('Location: index.php?page=loginView');
        exit();
      } else {
        $this->set('errors', $this->adminsDAO->validate($data));
      }
    }
    $_SESSION['error'] = 'Registration Failed!';
    $this->set('errors', $errors);
  }
}
