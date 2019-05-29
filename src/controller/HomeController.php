<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/QuestionDAO.php';
require_once __DIR__ . '/../dao/AnswerDAO.php';
require_once __DIR__ . '/../dao/UserDAO.php';
require_once __DIR__ . '/../dao/CharacterDAO.php';

class HomeController extends Controller {

  private $questionDAO;
  private $answerDAO;
  private $userDAO;
  private $characterDAO;
  private $userId;


  function __construct() {
  $cookie_name = "clientToken";
  if(isset($_COOKIE[$cookie_name])) {
    $cookie_value = $_COOKIE[$cookie_name];
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
  }else{
    $date = new DateTime();
    $cookie_value = $clientToken = sha1(mt_rand(1, 16000000). $date->getTimestamp() . 'sodium chloride');
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
  }
    $this->questionDAO = new QuestionDAO();
    $this->answerDAO = new AnswerDAO();
    $this->userDAO = new UserDAO();
    $this->characterDAO = new CharacterDAO();

    $userId = $this->userDAO->getUserByToken($cookie_value);
    if(empty($userId['Id'])){
      $data['token'] = $cookie_value;
      $this->userDAO->insert($data);
      $userId = $this->userDAO->getUserByToken($cookie_value);
    }
    //echo "user id = ".$userId['Id'];
    $this->set('userId', $userId['Id']);
    $this->userId = $userId['Id'];
  }

  public function index() {
    $this->set('questions', $this->questionDAO->selectAll());
    $this->set('characters', $this->characterDAO->selectAll());
    $this->set('title', "Home");
    if(!empty($_POST)) {
      $data = array();
        foreach ($this->questionDAO->selectAll() as $question) {
          if(!empty($_POST['question'.$question['id']])) {
            if($_POST['question'.$question['id']]==='true'||$_POST['question'.$question['id']]==='false'){
              if($_POST['question'.$question['id']]==='true'){
                $data["AnswerBool"] = 1;
              }else{
                $data["AnswerBool"] = 0;
              }
              $data["AnswerText"] = null;
            }else{
              $data["AnswerBool"] = null;
              $data["AnswerText"] = $_POST['question'.$question['id']];
            }
            $data["QuestionId"] = $question['id'];
            $data["UserId"] = $this->userId;

            $this->answerDAO->insert($data);

        }else{
            echo "something wrong";
          }
      }
    }
  }

}
