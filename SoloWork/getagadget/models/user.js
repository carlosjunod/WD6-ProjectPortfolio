 mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  email: {type:String, required:true},
  password: {type:String, required:true}
  // firstname: {type:String, required:true},
  // lastname: {type:String, required:true}
});

userSchema.methods.encryptPassword = function(password){
  console.log('🚫 encryptPassword');
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

userSchema.methods.validPassword  = function(password){
  console.log('🚫 validPassword');
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
