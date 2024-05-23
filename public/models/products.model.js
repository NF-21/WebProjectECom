const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var ids = require('short-id');

const Product = new Schema({
  productID: {
    type: String,
  },
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

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


Product.pre('save', function() {
  if(this.isNew)
      this.productID = makeid(8);
});



module.exports = mongoose.model('Product', Product);
