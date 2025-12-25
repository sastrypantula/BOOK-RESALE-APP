const Book = require("../models/book");

const deleteBook = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const bookId = req.params.id;

    // 1. Find book
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    // 2. Check ownership
    if (book.sellerId.toString() !== sellerId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this book"
      });
    }

    // 3. Only allow delete if not sold
    if (book.status === "SOLD") {
      return res.status(400).json({
        message: "Sold books cannot be deleted"
      });
    }

    // 4. Delete book
    await Book.findByIdAndDelete(bookId);

    return res.status(200).json({
      message: "Book deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = {deleteBook};
