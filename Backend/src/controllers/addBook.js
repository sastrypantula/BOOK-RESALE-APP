const Book = require("../models/book");
const cloudinary = require("../../config/cloudinary");

/**
 * Add new book (Seller)
 * Route: POST /seller/books/add
 */
const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      condition,
      price
    } = req.body;

    // basic validation
    if (!title || !author || !category || !condition || !price) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    let imageUrl = "";

    // upload image to cloudinary (if exists)
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "book-resale-app"
        }
      );

      imageUrl = uploadResult.secure_url;
    }

    const book = await Book.create({
      title,
      author,
      description,
      category,
      condition,
      price,
      image: imageUrl,
      sellerId: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      book
    });

  } catch (error) {
    console.error("Add book error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding book"
    });
  }
};

module.exports = addBook;
