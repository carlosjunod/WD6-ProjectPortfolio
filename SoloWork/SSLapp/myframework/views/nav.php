<nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
            </button>
            <a class="navbar-brand page-scroll" href="#page-top">Start Bootstrap</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <?php
                  // var_dump($data);
                 ?>

                <?php foreach ($data as $key => $value): ?>
                  <li>
                        <a class="page-scroll <?=@ $key == $currentpage ? 'active':''?>" href="<?= $value; ?>">
                          <?= $key;  ?>
                        </a>
                  </li>
                <?php endforeach; ?>



                  <? if(@$_SESSION['loggedin'] && @$_SESSION['loggedin'] == 1) { ?>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/auth/logout">logout</a></li>
                  <? } else {?>
                    <li>
                      <form id="login-header" action="/auth/login" method="post">
                        <input type="text" name="username" value="" placeholder="username"  id="username" required/>
                        <input type="password" name="password" value=""  id="password" placeholder="password" required/>
                        <!-- <input type="file" name="file" value=""> -->
                        <button type="submit" name="button" class="btn btn-primary" id="login">Log In</button>
                      </form>
                    </li>
                  <? }?>

                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
</nav>
