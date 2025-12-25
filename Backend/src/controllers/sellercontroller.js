const Book = require("../models/book");
const cloudinary = require("../config/cloudinary");

exports.sellBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      condition,
      price
    } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      );
      imageUrl = result.secure_url;
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
      book
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
