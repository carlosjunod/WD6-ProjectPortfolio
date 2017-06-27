<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>lalala</title>
  </head>
  <body>

    <?php
      include('image.php');
      $title = 'my title';

      $test = "Life is good";

      $arr = array('Mykah', 'Carlos', 'Jonathan');
      $link = 'http://google.com';
      $style = 'background-color:red;';

    ?>

    <h1><?php echo $title?></h1>
    <?php
    $myImage = new Images();
    // var_dump($test);
    //
    // $afterExplode = explode(' ', $test);
    // echo "</br>";
    // var_dump($afterExplode);

    $myURL= explode('/',ltrim(parse_url('http://127.0.0.1/welcome/contact/lalala/lalla', PHP_URL_PATH), '/'));
    var_dump($myURL);


    ?>
    <p>Lorem ipsum dolor sit amet, <a href="<?php echo $link ?>" style="<?php echo $style ?>"> consectetur </a> adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo <?php $myImage->displayImage(1000); ?>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

  </body>
</html>
