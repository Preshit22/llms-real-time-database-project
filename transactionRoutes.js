const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/', async (req, res) => {
  const transactions = await Transaction.find().sort({ timestamp: -1 });
  res.json(transactions);
});

// POST a new transaction
router.post('/', async (req, res) => {
  const { user, amount, type } = req.body;

  const newTransaction = new Transaction({ user, amount, type });
  await newTransaction.save();

  // emit real-time update to frontend
  req.io.emit('newTransaction', newTransaction);

  res.status(201).json(newTransaction);
});

module.exports = router;
