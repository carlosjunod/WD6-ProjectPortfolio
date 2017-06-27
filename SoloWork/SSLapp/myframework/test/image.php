<?php

class Images
{

  function __construct()
  {

  }

  public function displayImage($size){

    if ($size == 500) {
      echo "<img src='http://placehold.it/500x500' alt=''>";
      # code...
    } else if($size == 1000) {
      echo "<img src='http://placehold.it/1000x1000' alt=''>";

    }
  }
}


?>
