var express = require('express');
var router = express.Router();
var Product = require('../models/product');


/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find((err, docs)=>{
    console.log(err);
    res.render('shop/index', { title: 'Express', products: docs });
  });


});

module.exports = router;
