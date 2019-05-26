<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/HomeDAO.php';

class HomeController extends Controller {

  private $questionDAO;

  function __construct() {
    $this->questionDAO = new HomeDAO();
  }

  public function index() {
    $this->set('questions', $this->questionDAO->selectAll());
    $this->set('title', "Home");
  }

}
