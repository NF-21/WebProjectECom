const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var ids = require('short-id');

const Product = new Schema({
  // productID: {
  //   type: String,
  //   required: false,
  // },
  productName: {
    type: String,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  status: {
    type: String,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
  },
  image:{
    type:String,
  }
});
module.exports = mongoose.model('Product', Product);
