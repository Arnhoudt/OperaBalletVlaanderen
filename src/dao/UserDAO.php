<?php

require_once( __DIR__ . '/DAO.php');

class UserDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `users`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `users` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectByToken($token) {
    $sql = "SELECT * FROM `users` WHERE `UserToken` = :token";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':token', $token);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->validate($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `users` (`UserToken`) VALUES (:token)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':token', $data['token']);
      if($stmt->execute()) {
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectById($insertedId);
      }
    }
    return false;
  }

  public function getUserByToken($token) {
    $sql = "SELECT * FROM `users` WHERE `UserToken` = :token";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':token', $token);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function delete($id) {
    $sql = "DELETE FROM `users` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    return $stmt->execute();
  }

  public function validate($data) {
    $errors = array();
    if(empty($data['token'])) {
      $errors['email'] = 'please enter a client token';
    }
    return $errors;
  }
}
