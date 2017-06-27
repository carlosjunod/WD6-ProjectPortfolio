<?php

$config = array(
  'defaultController' => 'welcome',
  'dbname' => 'fruits',
  'dbpass' => 'root',
  'dbuser' => 'root',
  'baseurl' => 'http://127.0.0.1'
);

$str = $config['baseurl']."/".$_SERVER['REQUEST_URI'];
$urlPathParts = explode('/', ltrim(parse_url($str, PHP_URL_PATH), '/'));

// echo $str;
$extention = pathinfo($str);
// var_dump($extention['extension']);

include 'router.php';
//
// if ($urlPathParts[1] == 'assets') {
//
// } else {
  $route = new router($urlPathParts,$config);

// }

// $route = new router($urlPathParts,$config);

?>
