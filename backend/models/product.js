const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming store manager is a user
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: String,
  quantity: {
    type: Number,
    required: true,
  },
  price: Number,
  discountedPrice: Number,
  expiryDate: {
    type: Date,
    required: true,
  },
  reserved: {
    type: Boolean,
    default: false,
  },
  reservedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  default: null,
},
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
