const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');
const authMiddleware = require('../../middleware/authMiddleware');


// Seller lists a book for sale
router.post('/sell', authMiddleware(['seller']), transactionController.sellBook);

// Buyer purchases a book
router.post('/purchase', authMiddleware(['buyer']), transactionController.purchaseBook);

// Seller views their sold books
router.get('/seller/:sellerId', authMiddleware(['seller']), transactionController.listSellerTransactions);

// Buyer views their purchased books
router.get('/buyer/:buyerId', authMiddleware(['buyer']), transactionController.listBuyerTransactions);

module.exports = router;
