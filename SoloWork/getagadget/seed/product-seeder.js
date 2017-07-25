var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/getagadget');


var product = [
  new Product({
    imagePath: 'https://a-static.mlcdn.com.br/1500x1500/console-nintendo-switch-joy-con-azul-joy-con-vermelho-nintendo/ncgames/3188/47cf7b4d89e01a2f63632afbc2b8fb4c.jpg',
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

  new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/81f2Sm5hVYL._AC_SL1500_.jpg',
    title: 'NES Classic',
    description: 'ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 99
  }),

  new Product({
    imagePath: 'http://cdn.gamer-network.net/2017/usgamer/snes-classic.jpg',
    title: 'SNES Classic',
    description: 'ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 199
  })
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
