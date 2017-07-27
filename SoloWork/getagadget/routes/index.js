var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find((err, docs)=>{
    res.render('shop/index', { title: 'Express', products: docs });
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

module.exports = router;
