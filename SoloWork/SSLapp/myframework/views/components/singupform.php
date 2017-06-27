<form class="form" id="sign-up-form" action="/registration/getFromForm" enctype="text/plain">
  <div class="form-group">
    <label for="username">Name</label>
    <input type="text" name="name" value="" placeholder="Username" class="form-control" id="name_reg" required/>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" name="password" value="" placeholder="Password" class="form-control" id="password_reg" required/>
  </div>


  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name="email" class="form-control" id="email_reg" placeholder="Email" required>
  </div>

  <div class="checkbox">
    <label>
    <input type="checkbox" name="spam" required> Send me spam
    </label>
  </div>
  <div class="form-group">
    <label for="bio">Bio</label>
    <textarea class="form-control" rows="3" name="bio" id="bio" required></textarea>
  </div>

  <div class="form-group">
    <label class="radio-inline">
      <input type="radio" name="gender" id="inlineRadio1" value="Male"> Male
    </label>
    <label class="radio-inline">
      <input type="radio" name="gender" id="inlineRadio2" value="Female"> Female
    </label>
    <label class="radio-inline">
      <input type="radio" name="gender" id="inlineRadio3" value="Other"> Other
    </label>
  </div>

  <div class="form-group">
    <div class="form-group">
      <label for="Country">Country</label>
      <select class="form-control" name="country">
        <option>Chile</option>
        <option>US</option>
        <option>Colombia</option>
        <option>Other</option>
      </select>
    </div>
  </div>

  <?
  function generateCaptcha(){
    $dir = './assets/fonts/';


    $image = imagecreatetruecolor(170, 60);
    $black = imagecolorallocate($image, 0, 0, 0);
    $color = imagecolorallocate($image, 200, 100, 90); // red
    $white = imagecolorallocate($image, 255, 255, 255);
    $linecolor = imagecolorallocate($image, 64, 64, 64);
    $pixelcolor = imagecolorallocate($image, 0, 0, 255);

    imagefilledrectangle($image,0,0,399,99,$white);
    imagettftext ($image, 70, 5, 20, 40, $color, $dir."ImogenAgnes.woff", $_SESSION['captcha']);

    for ($i=0; $i < 3; $i++) {
      imageline($image, 0, rand() % 50, 200, rand() % 50, $linecolor);
    }
    for ($i=0; $i < 1000; $i++) {
      imagesetpixel($image, rand() % 200, rand() % 50, $pixelcolor);
    }
    // var_dump($image);

    imagepng($image, './assets/img/captcha.png');
  }

  generateCaptcha(); ?>

  <img src="./assets/img/captcha.png" />

  <div class="form-group">
    <label for="exampleInputEmail1">Please write the text that appear in image above</label>
    <input type="text" name="captcha" class="form-control" id="captcha_reg" required>
  </div>


  <button id="registration"  class="btn btn-default" type="submit">Submit</button>
</form>
