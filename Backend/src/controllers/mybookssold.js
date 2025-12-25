const Book = require("../models/book");

const mybookssold = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const books = await Book.find({
      sellerId: sellerId,
      status: "AVAILABLE"
    }).select("title author price image category condition");

    res.status(200).json({
      message: "Seller books fetched successfully",
      books
    });

  } catch (error) {
    console.error("Error fetching seller books:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = {mybookssold};
