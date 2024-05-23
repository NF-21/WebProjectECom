const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
// var ids = require('short-id');

const User = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  is_admin: {
    type: Boolean,
    default:false
  },
  cart: [
    {
      productId: String ,
      quantity: Number
    },
  
  ],
});

User.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

User.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};




module.exports = mongoose.model('Users', User);
