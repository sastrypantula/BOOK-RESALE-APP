import React, { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

function SellBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    condition: "used",
    price: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("condition", formData.condition);
      data.append("price", formData.price);

      if (image) {
        data.append("image", image);
      }

      await axiosClient.post("/seller/books/add", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Book added successfully!");
      navigate("/admin");

    } catch (error) {
      console.error("Add book error:", error);
      alert(
        error?.response?.data?.message || "Failed to add book"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Sell a Book
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Book Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category (DSA, ML, etc)"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default SellBook;
