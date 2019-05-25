<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/HomeDAO.php';

class HomeController extends Controller {

  private $todoDAO;

  function __construct() {
    $this->playerDAO = new HomeDAO();
  }

  public function index() {
      $this->set('title', "Home");
  }

}
