<?php
include 'bin/app.php';
// echo "</br>router.php loaded";

class Router
{

  function __construct($urlPathParts, $config)
  {
    $this->App = new App($config);

    // 1 parameter is the controllers
    // 2 parameter is the methods
    // 3+ objects to use

    switch ($urlPathParts[0]) {
      case 'home':
        $this->App->startApp($urlPathParts);
        break;
      case 'api':
        $this->App->startApp($urlPathParts);
        break;
      case 'contact':
        $this->App->startApp($urlPathParts);
        break;
      default:
        $this->App->startApp($urlPathParts);
        break;

    }

  }
}


?>
