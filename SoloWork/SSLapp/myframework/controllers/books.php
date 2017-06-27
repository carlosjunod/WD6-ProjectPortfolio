<?php

  class books extends AppController
  {

    public function __construct()
    {



    }

    public function index(){
      $this->getView('header', array('title' => 'api', 'style' => '../assets/css/components.css'));
      $this->getView('nav', array('home' => '/', 'api'=> '/api', 'contact'=>'/welcome/contact', 'modules'=>'/modules'), 'modules');

      $this->getView('books');

      $this->getView('footer');
    }

    public function ajaxBook(){
      $query = $_REQUEST['query'];
      // echo $query;

      $url = 'https://www.googleapis.com/books/v1/volumes?q='.$query.'=lite&key=AIzaSyBUiHCeRGYU4v9wZpK-Rn39Sved22hlNeo';

      $ch = curl_init();
        curl_setopt_array($ch, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST =>2
        ));

        $result = curl_exec($ch);
        curl_close($ch);
        // json_decode($result);
        echo $result;

    }
  }


?>
