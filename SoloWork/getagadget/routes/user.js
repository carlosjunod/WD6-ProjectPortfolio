var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');


var csrfProtection = csrf();
router.use(csrfProtection);

var Order = require('../models/order');
var Cart = require('../models/cart');
var Wishlist = require('../models/wishlist');



router.get('/profile', isLoggedIn, (req,res,next)=>{

  var list=[];
  Wishlist.find({user:req.user}, (err, el)=>{
    console.log(el);
    list.push(el);
  })

  console.log('MY LISTT!!!! ❤️📝', list);



  Order.find({user: req.user}, (err, orders)=>{
    if(err){
      return res.write('🤕 ERROR!');
    }

    var cart;
    orders.forEach(order=>{
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    })


    res.render('user/profile', {orders: orders, user: req.user, wishlist: list});

  });
  // res.render('user/profile');
});


router.get('/logout', isLoggedIn, (req,res,next)=>{
  req.logout();
  res.redirect('/');
})

router.use('/', notLoggedIn, (req,res,next)=>{
  next();
});

router.get('/signup', function(req,res,next){
  var messages = req.flash('error');
  res.render('user/signup', {crfToken: req.csrfToken(), messages: messages});
});

router.post('/signup', passport.authenticate('local.signup', {
  failureRedirect:'/user/signup',
  failureFlash: true
}), (req, res, next)=>{
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('user/profile');
  }
});


router.get('/signin', (req,res,next)=>{
  var messages = req.flash('error');
  res.render('user/signin', {crfToken: req.csrfToken(), messages: messages});
});

router.post('/signin', passport.authenticate('local.signin', {
  failureRedirect:'/user/signin',
  failureFlash: true
}), (req, res, next)=>{
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('user/profile');
  }
});

// FACEBOOK
router.get('/login-facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));

router.get('/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/user/profile',
			failureRedirect : '/'
		}));

module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
