<div id="menu-background">

</div>

<section id="page-container" class="container">
  <h1>API</h1>

  <a class="btn btn-default" href="api/addFruit">ADD NEW FRUIT </a><br/>

  <?php
    foreach ($data as $fruit) {
      echo $fruit['name'].' <a href="/api/edit/'.$fruit['id'].'" />EDIT</a> <a href="/api/delete/'.$fruit['id'].'" / style="color:red;">DELETE</a> </br>';
    }
  ?>

</section>
