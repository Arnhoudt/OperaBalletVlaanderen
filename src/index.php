<?php
session_start();
ini_set('display_errors', true);
error_reporting(E_ALL);

$routes = array(
  'home' => array(
    'controller' => 'Home',
    'action' => 'index'
  ),
  'login' => array(
    'controller' => 'Dashboard',
    'action' => 'login'
  ),
  'register' => array(
    'controller' => 'Dashboard',
    'action' => 'register'
  ),
  'logout' => array(
    'controller' => 'Dashboard',
    'action' => 'logout'
  ),
  'loginView' => array(
    'controller' => 'Dashboard',
    'action' => 'loginView'
  ),
  'registerView' => array(
    'controller' => 'Dashboard',
    'action' => 'registerView'
  ),
  'dashboard' => array(
    'controller' => 'Dashboard',
    'action' => 'dashboard'
  )
);

if(empty($_GET['page'])) {
  $_GET['page'] = 'home';
}
if(empty($routes[$_GET['page']])) {
  header('Location: index.php');
  exit();
}

$route = $routes[$_GET['page']];
$controllerName = $route['controller'] . 'Controller';

require_once __DIR__ . '/controller/' . $controllerName . ".php";

$controllerObj = new $controllerName();
$controllerObj->route = $route;
$controllerObj->filter();
$controllerObj->render();
