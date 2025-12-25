const Book = require('../models/book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ status: "AVAILABLE" })
      .select("title author price image category condition");
    for (const book of books) {
  console.log(book.title, book.price);
}
    res.status(200).json({ books });
  } catch (err) {
    console.error("Get all books error:", err);
    res.status(500).json({ message: "Error getting books" });
  }
};

module.exports = getAllBooks;
