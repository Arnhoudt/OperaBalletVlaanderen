<?php

require_once( __DIR__ . '/DAO.php');

class HomeDAO extends DAO {

  public function selectById($id){
    $sql = "SELECT * FROM `players` WHERE `Id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }


}
