const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  orderItem: {
    type:String,
    required: true
  },
  sub_total: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true,
    minlength: 10
  }
  
});
const Order = mongoose.model('order', orderSchema);

module.exports = Order;