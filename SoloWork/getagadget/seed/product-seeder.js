var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/getagadget');


var product = [
  new Product({
    imagePath: 'https://cdn.vox-cdn.com/thumbor/JBPZf10nFHjS9eEdKParS1O5r5Y=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/53742289/jbareham_1492_170228_0024.0.0.jpg',
    title: 'Nintendo switch',
    description: 'ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 299
  }),
  new Product({
    imagePath: 'https://i5.walmartimages.com/asr/5a7ef1a4-f3e4-414c-86b1-cb30c2771fc0_1.8e31fd98d9f562901046d0a55b58abc9.jpeg',
    title: 'Nintendo Wii U',
    description: 'ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 199
  }),
  new Product({
    imagePath: 'https://static.giantbomb.com/uploads/original/2/29735/2497631-5830458890-13710.png',
    title: 'PlayStation 4',
    description: 'ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 399
  }),
];


var done = 0;
for (let i = 0; i < product.length; i++) {
  product[i].save(function(err,result){
    if (done==product.length) {
      done++;
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
