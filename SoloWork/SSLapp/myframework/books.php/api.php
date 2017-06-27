<?php

  class api extends AppController
  {

    public function __construct($parent)
    {
      $this->parent = $parent;
    }

    public function index(){
      $this->getView('header', array('title' => 'api'));
      $this->getView('nav', array('home' => '/', 'api'=> '/api', 'contact'=>'/welcome/contact', 'modules'=>'/modules'), 'api');

      $this->showList();
      // echo "you are in api";
      $this->getView('footer');
    }

    public function showList(){
      $data = $this->parent->getModel('fruits')->dbSelect('select * from fruit_table');
      $this->getView('header', array('title' => 'api'));
      $this->getView('nav', array('home' => '/', 'api'=> '/api', 'contact'=>'/welcome/contact', 'modules'=>'/modules'), 'api');

      $this->getView('api', $data);
      $this->getView('footer');
    }

    public function edit(){
      $this->getView('header', array('title' => 'api'));
      $data = $this->parent->getModel('fruits')->dbSelect('SELECT * FROM fruit_table WHERE id = :id', array(':id'=>$this->parent->urlPathParts[2]));

      $this->getView('nav', array('home' => '/', 'api'=> '/api', 'contact'=>'/welcome/contact', 'modules'=>'/modules'), 'api');
      $this->getView('updateform', $data);


      $this->getView('footer');
    }

    public function addFruit(){
      $this->getView('header', array('title' => 'api'));
      $this->getView('nav', array('home' => '/', 'api'=> '/api', 'contact'=>'/welcome/contact', 'modules'=>'/modules'), 'api');
      $this->getView('addfruit');


      $this->getView('footer');
    }

    public function update(){
      $this->parent->getModel('fruits')->dbSelect('UPDATE fruit_table SET name = :name WHERE id= :id ', array(':name' => $_POST['name'], ':id' => $_GET['id']));
      header('location:/api');
    }

    public function add(){
      // var_dump($_POST);

      $this->parent->getModel('fruits')->dbInsert('INSERT INTO fruit_table (name) VALUES (:name)', array(':name' => $_POST['name']));
      header('location:/api');
    }

    public function delete(){
      // var_dump($_POST);

      $this->parent->getModel('fruits')->dbDelete('DELETE FROM fruit_table WHERE id = :id', array(':id' => $this->parent->urlPathParts[2]));
      header('location:/api');
    }
  }


?>
