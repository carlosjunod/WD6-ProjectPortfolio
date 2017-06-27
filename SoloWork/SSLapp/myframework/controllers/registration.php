<?php

  class registration extends AppController
  {

    public function __construct()
    {

    }


    public function index(){

      $this->getView('header', array('title' => 'Registration'));
      $this->getView('nav', array('home' => '/', 'api'=> '/api', 'contact'=>'/welcome/contact', 'modules'=>'/modules'), 'api');

        echo "<h1>you are in REGISTRATION</h1>";
        echo $_POST['username'];
      $this->getView('footer');
    }

    public function getFromForm(){
      var_dump($_REQUEST);
    }

    public function getFromAjax(){

      // var_dump($_REQUEST);

      if($_REQUEST['captcha'] != $_SESSION['captcha']){
        echo "\n- captcha is not valid\n";
      } else {
        echo "true";
      }
    }
  }


?>
