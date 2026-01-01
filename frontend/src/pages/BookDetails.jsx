import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosClient.get(`/buyer/books/${id}`);
        setBook(res.data);
      } catch (err) {
        alert("Failed to load book");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!book) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white shadow rounded-lg max-w-lg w-full p-6">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-fill rounded mb-4"
        />

        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-600">Author: {book.author}</p>
        <p className="text-gray-600">Category: {book.category}</p>
        <p className="text-gray-600">Condition: {book.condition}</p>
        <p className="text-xl font-semibold mt-2">₹{book.price}</p>

        {/* seller info */}
        <p className="text-gray-600 mt-3">
          Seller: <span className="font-semibold">{book.seller?.name}</span>
        </p>
        <p className="text-gray-600">
          Email: {book.seller?.email}
        </p>

        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
          Buy Book
        </button>
      </div>
    </div>
  );
}

export default BookDetails;
