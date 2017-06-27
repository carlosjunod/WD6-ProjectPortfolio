<?php
include 'appcontroller.php';
// echo "</br>app.php loaded";

class App
{
  public function __construct($config)
  {
    $this->config = $config;
    // echo "</br>CLASS App created";
  }

  public function startApp($params){
    // var_dump($params);
    $AppController = new AppController($params, $this->config);
  }

}


?>
