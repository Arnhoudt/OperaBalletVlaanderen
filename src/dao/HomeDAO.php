<?php

require_once( __DIR__ . '/DAO.php');

class HomeDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `questions`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    $answer = $stmt->fetch(PDO::FETCH_ASSOC);
    return $answer;
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `questions` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }


}
