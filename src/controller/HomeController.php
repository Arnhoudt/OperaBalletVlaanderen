<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/QuestionDAO.php';
require_once __DIR__ . '/../dao/AnswerDAO.php';


class HomeController extends Controller {

  private $questionDAO;
  private $answerDAO;

  function __construct() {
    $this->questionDAO = new QuestionDAO();
    $this->answerDAO = new AnswerDAO();
  }

  public function index() {
    $this->set('questions', $this->questionDAO->selectAll());
    $this->set('title', "Home");
    if(!empty($_POST)) {
      $data = array();
        foreach ($this->questionDAO->selectAll() as $question) {
          if(!empty($_POST['question'.$question['id']])) {
            if($_POST['question'.$question['id']]==='true'||$_POST['question'.$question['id']]==='false'){
              $data["AnswerBool"] = $_POST['question'.$question['id']]==='true';
              $data["AnswerText"] = null;
            }else{
              $data["AnswerBool"] = null;
              $data["AnswerText"] = $_POST['question'.$question['id']];
            }
            $data["QuestionId"] = $question['id'];
            $data["UserId"] = 1;

            $this->answerDAO->insert($data);

        }else{
            echo "something wrong";
          }
      }

    }
  }

}
