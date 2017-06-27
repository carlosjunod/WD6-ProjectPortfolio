<?php

echo "<h1>Hello World</h1>";

//
// $url = 'http://127.0.0.1/week1/activity1-1.php';
//
// var_dump(parse_url($url, PHP_URL_PATH));
//
// echo "</br>-------------</br>";
// $a = $_SERVER['REQUEST_URI'];
// var_dump($a);
// echo "</br>-------------</br>";


////// 1 ////////
class MyClass{
  function __construct($name, $age){
    $this->name = $name;
    $this->age = $age;
  }

  public function setName($newName)
  {
    $this->name = $newName;
    print("<br/> The name changed to: " .$this->name);

  }

  public function getName()
  {
    return $this->name;
  }

  public function setAge($newAge)
  {
    $this->age = $newAge;
    print("<br/> The age was changed to:" .$this->age);

  }

  public function getAge()
  {
    return $this->age;
  }

}


$me = new MyClass('Carlos', 31);
$me->setName('Carlos Junod');

////// 2 ////////
$person = array($me->getName(), $me->getAge(), ["name"=>$me->getName(), "age"=>$me->getAge()]);
echo "</br>";
// print_r($person);

echo '"'.$me->getName().' - '.$me->getAge().'"</br>';
echo "'".$me->getName()." - ".$me->getAge()."' </br>";
echo "My Name is ".$person[0]." and my age is ". $person[1]."</br>";
echo "My Name is ".$person[2]['name']." and my age is ". $person[2]['age']."</br>";

echo "---------------------</br>";
$me->age = NULL;
echo "Using NULL: ".$me->getAge();

unset($me->name);
echo "Using unset(): ".$me->getName();
echo "</br>---------------------";


////// 3////////
echo "</br><h2>Part 3</h2></br>";
function getGrade($input)
{
  $input = round($input);
  // echo $input;

  if($input>101) {
    return "you are really smart";
  } elseif ($input<=100 && $input>=90) {
    return "A";
  } elseif ($input<=89 && $input>=80) {
    return "B";
  } elseif ($input<=79 && $input>=70) {
    return "C";
  } elseif ($input<=69 && $input>=0) {
    return "F";
  } elseif ($input<0) {
    return "ups!";
  }
}

echo "grade for 94: ".getGrade(94). "</br>";
echo "grade for 54: ".getGrade(54). "</br>";
echo "grade for 89.9: ".getGrade(89.9). "</br>";
echo "grade for 60.01: ".getGrade(60.01). "</br>";
echo "grade for 102.1: ".getGrade(102.1). "</br>";

////// 4 ////////
echo "</br><h2>Part 4 - Array of Colors</h2>";
echo "<p>source: <a href='https://en.wikipedia.org/wiki/List_of_colors_by_shade' target='_blank'>https://en.wikipedia.org/wiki/List_of_colors_by_shade</a></p>";

$myColors = array(0=>'Red', 1=>'Amaranth', 2=> 'Brown', 3=>'Seal brown', 4=>'Orange', 5=>'Tangerine', 6=>'Yellow', 7=>'Gold', 8=>'Green', 9=>'Lime', 10=>'Cyan', 11=>'Aquamarine');

for ($i=0; $i < count($myColors); $i++) {
  echo  "Color ".$i." is ".$myColors[$i]. "</br>";
}





?>
