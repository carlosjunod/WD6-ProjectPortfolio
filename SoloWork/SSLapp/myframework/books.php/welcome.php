<?php

class welcome extends AppController
{

  public function checkLogin(){

  }


  public function __construct()
  {

  }

  public function index(){
    $this->getView('header', array('title' => 'welcome'));
    $this->getView('nav', array('home' => '/', 'api'=> '/api', 'contact'=>'/welcome/contact', 'modules'=>'/modules'), 'home');

    $this->getView('welcome', array('code' => $this->getRandomText()));
    $this->getView('footer');
  }

  public function contact(){

    $this->getView('header', array('title' => 'contact'));
    $this->getView('nav', array('home' => '/', 'api'=> '/api', 'contact'=>'/welcome/contact', 'modules'=>'/modules'), 'contact');

    $this->getView('contact');
    $this->getView('footer');
  }

  function getRandomText(){
    $string = '';

    for ($i = 0; $i < 7; $i++) {
        $string .= chr(rand(97, 122));
    }

    $_SESSION['captcha'] = $string;
    return $string;
  }

  public function addForm(){
    $this->getView('header', array('title' => 'api'));
    $this->getView('addform');
  }


  public function addAction(){
    var_dump($_REQUEST);
  }


  public function listFruits(){

  }

}

?>
