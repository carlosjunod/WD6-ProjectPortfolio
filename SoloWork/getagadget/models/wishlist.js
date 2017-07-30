var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref:'User'},
  products: {type: Object, required:true, unique: true}
})


module.exports = mongoose.model('Wishlist', schema);
