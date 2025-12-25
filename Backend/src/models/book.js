const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    author: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    condition: {
      type: String,
      enum: ["new", "used"],
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    image: {
      type: String // Cloudinary URL
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "SOLD"],
      default: "AVAILABLE"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
