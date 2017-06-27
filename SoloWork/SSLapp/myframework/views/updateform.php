<div id="menu-background">

</div>

<section id="page-container" class="container">
  <h1>API UPDATE</h1>

    <?php
      var_dump($data);
     ?>

    <form action="/api/update/?id=<?= $data[0]['id'] ?>" method="post">
      <input type="text" name="name" value='<?= $data[0]["name"] ?>'>
      <input type="submit" value='update'>
    </form>


</section>
