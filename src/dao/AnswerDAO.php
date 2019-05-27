<?php

require_once( __DIR__ . '/DAO.php');

class AnswerDAO extends DAO {


  public function insert($data) {
    $errors = $this->validate($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `answers` (`QuestionId`, `AnswerBool`, `AnswerText`, `UserId`) VALUES (:QuestionId, :AnswerBool, :AnswerText, :UserId)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':QuestionId', $data['QuestionId']);
      $stmt->bindValue(':AnswerBool', $data['AnswerBool']);
      $stmt->bindValue(':AnswerText', $data['AnswerText']);
      $stmt->bindValue(':UserId', $data['UserId']);
      $stmt->execute();
    }
    return false;
  }

  public function validate($data) {
    $errors = array();
    if(empty($data['QuestionId'])) {
      $errors['QuestionId'] = 'please enter a QuestionId';
    }
    return $errors;
  }
}
