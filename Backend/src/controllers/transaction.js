const Book = require('../models/book');
const Transaction = require('../models/transaction');

// Seller lists a book for sale (marks as available)
exports.sellBook = async (req, res) => {
    try {
        const { bookId, sellerId } = req.body;
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        if (book.sellerId.toString() !== sellerId) return res.status(403).json({ message: 'Not authorized' });
        book.isAvailable = true;
        await book.save();
        res.status(200).json({ message: 'Book listed for sale', book });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Buyer purchases a book (creates transaction and deletes book)
exports.purchaseBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        // req.user._id should be set by auth middleware
        const buyerId = req.user && req.user._id ? req.user._id : null;
        if (!buyerId) return res.status(401).json({ message: 'Unauthorized: No buyer ID' });
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        if (book.isSold) return res.status(400).json({ message: 'Book not available' });
        // Create transaction
        const transaction = new Transaction({
            bookId: book._id,
            sellerId: book.seller,
            buyerId: buyerId
        });
        await transaction.save();
        // Mark book as sold
        book.isSold = true;
        await book.save();
        res.status(200).json({ message: 'Book purchased successfully', transaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// List transactions for a seller
exports.listSellerTransactions = async (req, res) => {
    try {
        const { sellerId } = req.params;
        const transactions = await Transaction.find({ sellerId }).populate('bookId buyerId');
        res.status(200).json({ transactions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// List transactions for a buyer
exports.listBuyerTransactions = async (req, res) => {
    try {
        const { buyerId } = req.params;
        const transactions = await Transaction.find({ buyerId }).populate('bookId sellerId');
        res.status(200).json({ transactions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
