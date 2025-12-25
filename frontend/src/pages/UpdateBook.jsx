import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

function UpdateBook() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  // fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosClient.get("/seller/books/mybooks");
        const book = res.data.books.find(b => b._id === id);

        if (!book) {
          alert("Book not found");
          navigate("/admin/mybooks");
          return;
        }

        setFormData({
          title: book.title,
          author: book.author,
          description: book.description || "",
          category: book.category,
          condition: book.condition,
          price: book.price
        });

        setLoading(false);
      } catch (err) {
        alert("Failed to load book");
        navigate("/admin/mybooks");
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach(key =>
        data.append(key, formData[key])
      );

      if (image) {
        data.append("image", image);
      }

      await axiosClient.put(`/seller/books/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Book updated successfully");
      navigate("/admin/mybooks");

    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Update Book
        </h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
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
          value={formData.price}
          onChange={handleChange}
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateBook;
