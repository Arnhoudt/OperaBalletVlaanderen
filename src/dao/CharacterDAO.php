<?php

require_once( __DIR__ . '/DAO.php');

class CharacterDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `characters`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `characters` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->validate($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `characters` (`name`, `param1`, `param2`, `param3`, `param4`, `param5`) VALUES (:name, :param1, :param2, :param3, :param4, :param5)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':param1', $data['param1']);
      $stmt->bindValue(':param2', $data['param2']);
      $stmt->bindValue(':param3', $data['param3']);
      $stmt->bindValue(':param4', $data['param4']);
      $stmt->bindValue(':param5', $data['param5']);
      if($stmt->execute()) {
        $insertedId = $this->pdo->lastInsertId();
        return $this->selectById($insertedId);
      }
    }
    return false;
  }

  public function update($id, $data) {
    $errors = $this->validate($data);
    if(empty($errors)) {
      $sql = "UPDATE `characters` SET `name` = :name, `param1` = :param1, `param2` = :param2, `param3` = :param3, `param4` = :param4, `param5` = :param5 WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':param1', $data['param1']);
      $stmt->bindValue(':param2', $data['param2']);
      $stmt->bindValue(':param3', $data['param3']);
      $stmt->bindValue(':param4', $data['param4']);
      $stmt->bindValue(':param5', $data['param5']);
      $stmt->bindValue(':id', $id);
      if($stmt->execute()) {
        return $this->selectById($id);
      }
    }
    return false;
  }

  public function delete($id) {
    $sql = "DELETE FROM `characters` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    return $stmt->execute();
  }

  public function validate($data) {
    $errors = array();
    if(empty($data['name'])) {
      $errors['name'] = 'please enter name';
    }
    return $errors;
  }
}
