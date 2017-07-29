var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  var succesMsg = req.flash('success')[0];
  console.log('✅',succesMsg);
  var products = Product.find((err, docs)=>{
    res.render('shop/index', { title: 'Express', products: docs, succesMsg: succesMsg});
  });
});

router.get('/add-to-cart/:id', (req,res,next)=>{
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});

  Product.findById(productId, (err, product)=>{
    if(err){
      return res.redirect('/');
    }
    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    return res.redirect('/');
  });
})

router.get('/shopping-cart', (req,res,next)=>{
  if (!req.session.cart) {
    res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
})

router.get('/checkout', (req,res,next)=>{
  if (!req.session.cart) {
    res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total:cart.totalPrice, errMsg: errMsg});
})

router.post('/checkout', (req,res,next)=>{
  if (!req.session.cart) {
    res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")(
    "sk_test_w2sGqfUruvQLnAo28hOWXoyC"
  );

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "test Charge"
  }, function(err, charge) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    console.log('✅ DONE!!!!!',);
    req.flash('success', 'Succesfully bought product!');

    req.session.cart = null;
    res.redirect('/');
  });


})


module.exports = router;
