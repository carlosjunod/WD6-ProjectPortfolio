 mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  local          :{
    name         : String,
    email        : {type:String, required:true},
    password     : {type:String, required:true}
  },
  facebook       : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }

});

userSchema.methods.encryptPassword = function(password){
  console.log('🚫 encryptPassword');
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

userSchema.methods.validPassword  = function(password){
  console.log('🚫 validPassword');
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);
