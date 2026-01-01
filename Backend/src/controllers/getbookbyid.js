// controllers/bookController.js
const Book = require('../models/book');

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId)
      .populate('sellerId', 'name email')
      .select('-__v');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({
      id: book._id,
      title: book.title,
      author: book.author,
      category: book.category,
      description: book.description,
      condition: book.condition,
      price: book.price,
      image: book.image,
      status: book.status,
      createdAt: book.createdAt,
      seller: book.sellerId   // 👈 rename for frontend clarity
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getBookById };
