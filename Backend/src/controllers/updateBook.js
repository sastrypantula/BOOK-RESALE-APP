const Book = require("../models/book");
const cloudinary = require("../../config/cloudinary");

const updateBook = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // ownership check
    if (book.sellerId.toString() !== sellerId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // update fields
    const {
      title,
      author,
      description,
      category,
      condition,
      price
    } = req.body;

    if (title) book.title = title;
    if (author) book.author = author;
    if (description) book.description = description;
    if (category) book.category = category;
    if (condition) book.condition = condition;
    if (price) book.price = price;

    // optional image update
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "book-resale-app" }
      );
      book.image = uploadResult.secure_url;
    }

    await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      book
    });

  } catch (error) {
    console.error("Update book error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {updateBook};
