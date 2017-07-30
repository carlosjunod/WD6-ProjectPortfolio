var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var Wishlist = require('../models/wishlist');


/* GET home page. */
router.get('/', function(req, res, next) {
  var succesMsg = req.flash('success')[0];
  var products = Product.find((err, docs)=>{
    res.render('shop/index', { title: 'Express', products: docs, succesMsg: succesMsg});
  });
});

// ADDING TO CART
router.get('/add-to-cart/:id', function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});

  Product.findById(productId, (err, product)=>{
    if(err){
      console.log('-------------------- 🛒', err);
      return res.redirect('/');
    }
    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart);
    return res.redirect('/');
  });
})

// REDUCE BY 1 PRODUCT FROM CART
router.get('/reduce/:id', (req,res,next)=>{
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
})

// REMOVE PRODUCT FROM CART
router.get('/remove/:id', (req,res,next)=>{
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart: {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
})

// SHOPPING CART
router.get('/shopping-cart', (req,res,next)=>{
  if (!req.session.cart || req.session.cart.totalQty == 0) {
    res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);

  res.render('shop/shopping-cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
})

//CHECKOUT GET
router.get('/checkout', isLoggedIn, (req,res,next)=>{
  console.log('-------💵', req.session.cart.totalQty);
  if (!req.session.cart || req.session.cart.totalQty == 0) {
    res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total:cart.totalPrice, errMsg: errMsg});
})

//CHECKOUT POST
router.post('/checkout', isLoggedIn, (req,res,next)=>{
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

    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    })

    order.save((err, result)=>{
      if (err){
        console.log('💀', err);
      }

      console.log('🙃 saving order!!!', result);
      req.flash('success', 'Succesfully bought product!');
      req.session.cart = null;
      res.redirect('/');
    })


  });


})

// Adding to Wishlist
router.get('/add-whishlist/:id', isLoggedIn, (req,res,next)=>{
  var productId = req.params.id;


  Product.findById(productId, (err, pro)=>{
    if(err){
      console.log('ERRRRRRRRRR 🛒 WISH LIST', err);
      return res.redirect('/');
    }

      Wishlist.findOne({products: pro, user: req.user}).populate('products').exec( (err, result) => {

        if (result) {
          console.log('------no saved 💔--------');
          return res.redirect('/');
        }

        var myWishlist = new Wishlist({
          user: req.user,
          products: pro
        })
        console.log('myWishlist 💥💥💥💥💥💥💥💥', myWishlist);

        myWishlist.save((err, result)=>{
          if (err){
            console.log('💀 ERROR WISHLIST ❤️', err);
          }
          console.log('🙃 saving WISHLIST ❤️!!!', result);
          res.redirect('/');
        });

     })

  });



})




module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
