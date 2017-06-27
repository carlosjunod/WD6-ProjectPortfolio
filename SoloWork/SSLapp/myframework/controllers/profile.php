<?php

  class profile extends AppController
  {

    public function __construct()
  {
      // var_dump($_SESSION['loggedin']);
      if (!empty($_SESSION['loggedin'] && $_SESSION['loggedin']==1)) {

      } else {
        header("Location:/welcome");
      }

    }
    public function index(){
      $this->getView('header', array('title' => 'Profile'));
      $this->getView('nav', array('home' => '/', 'api'=> '/api', 'contact'=>'/welcome/contact', 'modules'=>'/modules'), 'profile');
      $this->getView('profile');

      $this->getView('footer');
    }

    public function update(){

      var_dump($_FILES);

      if($_FILES['img']['name'] != ''){
        $imageFileType = pathinfo('assets/'.$_FILES['img']['name'], PATHINFO_EXTENSION);

        if(file_exists('assets/'.$_FILES['img']['name'])){
          echo "file exist";
          header('location:/profile?msg=This file exist');

        } else {
          if($imageFileType != 'jpg' && $imageFileType !='png'){
            echo "this kind is file is not allowed";
          } else {
            if(move_uploaded_file($_FILES['img']['tmp_name'], 'assets/'.$_FILES['img']['name'])){
              echo "file uploaded";
              header('location:/profile?msg=File Uploaded');
            } else {
              echo "error uploading";
            }
          }
        }

      }




    }
  }


?>
