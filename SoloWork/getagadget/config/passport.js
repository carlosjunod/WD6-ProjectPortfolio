var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done){
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  })
});


//SING UP Strategy
passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){

  // validation request
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});

  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(error=>{
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({'email':email}, function(err, user){
    console.log('!!!!!!!! 🤓 🤓 !!!!! Im HERE!!!');

    if (err){
      console.log('🚫 findOne error:', err);
      return done(err);
    }
    if (user){
      console.log('🚫 findOne email:', err);
      return done(null, false, {message: 'Email is already in use'});
    }

    var newUser = new User();
    newUser.local.email = email;
    newUser.local.password = newUser.encryptPassword(password);

    newUser.save(function(err, result){
      if (err){
        console.log('🚫 saving error:', err);
        return done(err);
      }
      return done(null, newUser);
    });

  });
}));

// SING IN Strategy
passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done)=>{

  // validation request
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(error=>{
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({'email':email}, function(err, user){

    if (err){
      console.log('🚫 findOne error:', err);
      return done(err);
    }
    if (!user){
      console.log('🚫 findOne email:', err);
      return done(null, false, {message: 'No user found'});
    }
    if(!user.validPassword(password)){
      return done(null, false, {message: 'wrong password'});
    }

    return done(null, user);

  });

}));

// facebook Strategy

passport.use('facebook', new FacebookStrategy({
  clientID: '293091091157155',
  clientSecret: '4512e621694252210dfd208b76bd2518',
  callbackURL: "http://localhost:3000/user/facebook/callback",
  profileFields: ['email', 'name', 'id']
},
// facebook will send back the token and profile
function(token, refreshToken, profile, done) {


  // asynchronous
  process.nextTick(function() {

    // console.log('!!!!!!HERE!!!!!!!! 😾😾', profile.email);
    // console.log('!!!!!!HERE!!!!!!!! 😾😾', token);



    // find the user in the database based on their facebook id
    User.findOne({
      'facebook.id': profile.id
    }, function(err, user) {

      // if there is an error, stop everything and return that
      // ie an error connecting to the database
      if (err)
        return done(err);

      // if the user is found, then log them in
      if (user) {
        return done(null, user); // user found, return that user
      } else {
        // if there is no user found with that facebook id, create them
        var newUser = new User();

        // console.log('-----------------------------');
        // console.log('-----------------------------');
        // console.log('profile.id:', profile.id);
        // console.log('token:', token);
        // console.log('profile.name.givenName:', profile.name.givenName);
        // console.log('profile.name.familyName:', profile.name.familyName);
        // console.log('profile.emails:', profile.emails);
        // // console.log('profile:', profile);
        //
        //
        // console.log('-----------------------------');
        // console.log('-----------------------------');


        // set all of the facebook information in our user model
        newUser.local.name =  profile.name.givenName + ' ' + profile.name.familyName;
        newUser.local.email =  profile.emails[0].value;
        newUser.local.password =  newUser.encryptPassword(token);


        newUser.facebook.id = profile.id; // set the users facebook id
        newUser.facebook.token = token; // we will save the token that facebook provides to the user
        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first


        // console.log('NEW USER 💀💀💀💀💀', newUser);

        // save our user to the database
        newUser.save(function(err) {
          if (err)
            console.log(err);

          // if successful, return the new user
          return done(null, newUser);
        });
      }

    });
  });

}));
