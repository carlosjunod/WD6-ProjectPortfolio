<div id="menu-background">

</div>

<section id="page-container" class="container">
  <h1>Profile</h1>
  <?
  if(isset($_SESSION['bio'])){
    echo $_SESSION['bio'];
  }
  ?>

  <form action="/profile/update" method="post" enctype="multipart/form-data">

    <div class="card">
      <label for="img"> Browse
        <input type="file" name="img">
      </label>
      <input type="submit" name="" value="Update" class="btn btn-primary">
    </div>

  </form>

</section>
