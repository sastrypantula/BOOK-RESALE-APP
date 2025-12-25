import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const fetchMyBooks = async () => {
    try {
      const res = await axiosClient.get("/seller/books/mybooks");
      setBooks(res.data.books || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axiosClient.delete(`/seller/books/${id}`);
      fetchMyBooks(); // refresh list
    } catch (err) {
      alert("Failed to delete book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
        My Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="aspect-[4/3] bg-gray-100 rounded overflow-hidden mb-3">
  <img
    src={book.image || "https://via.placeholder.com/150"}
    alt={book.title}
    className="w-full h-full object-fill"
  />
</div>
            <h3 className="font-semibold">{book.title}</h3>
            <p className="text-gray-700">₹{book.price}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/admin/update/${book._id}`)}
                className="flex-1 bg-blue-600 text-white py-1 rounded"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(book._id)}
                className="flex-1 bg-red-600 text-white py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBooks;
