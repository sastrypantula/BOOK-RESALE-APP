import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashBoard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-10">
        Seller Dashboard
      </h1>

      <div className="w-full max-w-md space-y-6">
        {/* Sell Book */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow"
          onClick={() => navigate("/admin/sell")}
        >
          Sell a Book
        </button>

        {/* Update Book */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow"
          onClick={() => navigate("/admin/mybooks")}
        >
          Update or Delete Book 
        </button>

     
      </div>
    </div>
  );
}

export default AdminDashBoard;
