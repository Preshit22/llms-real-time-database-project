const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: String,
  amount: Number,
  type: String, // credit or debit
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
