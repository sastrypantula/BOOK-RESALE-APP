
import React, { useEffect, useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import axiosClient from "../utils/axiosClient";
import { logoutUser } from "../authslice";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const { user } = useSelector((state) => state.auth);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const navigate=useNavigate();
  const dispatch = useDispatch();   // ✅ ADD THIS

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axiosClient.get(`/${user?.role}/books`);
        // consolse.log(res.data.books);
        setBooks(res.data.books || []);
      } catch (err) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [user?.role]);

  // Dummy placeholders for purchased/sold books
  const purchasedBooks = books.filter(
    (book) => user?.role === "buyer" && book.buyerId === user?._id
  );
  const soldBooks = books.filter(
    (book) => user?.role === "seller" && book.sellerId === user?._id
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nav Bar */}
      <nav className="flex justify-between items-center bg-white shadow px-8 py-4">
        <div className="text-2xl font-bold text-purple-700">BookResaleApp</div>
        <div className="flex gap-6 items-center">
          {user?.role === "buyer" && (
            <span className="font-semibold text-blue-600">
              Purchased Books: {purchasedBooks.length}
            </span>
          )}
          {user?.role === "seller" && (
            <span className="font-semibold text-green-600">
              Sold Books: {soldBooks.length}
            </span>
          )}
          <div className="relative">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center gap-2 focus:outline-none"
            >
              {console.log(user)}
              <span className="font-medium">{user?.name}</span>
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || "User"}`}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg p-4 z-10">
                <h3 className="text-lg font-bold mb-2">Profile</h3>
                <p>
                  <span className="font-semibold">Name:</span> {user?.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {user?.email}
                </p>
                <p>
                  <span className="font-semibold">Role:</span> {user?.role}
                </p>
             <button 
  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
onClick={() => {
  console.log("Logout clicked");
  dispatch(logoutUser());
  setShowProfile(false);
   navigate("/login");
}}>
  Logout
</button>
{user?.role === "seller" && (
  <button
    className="w-full mb-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition"
    onClick={() => {
      setShowProfile(false);
      navigate("/admin");
    }}
  >
    Admin
  </button>
)}

              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Books Section Centered */}
      <div className="flex justify-center mt-12 px-2">
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-5xl">
          <h3 className="text-2xl font-bold mb-6 text-center">All Books</h3>
          {loading ? (
            <p className="text-center">Loading books...</p>
          ) : books.length === 0 ? (
            <p className="text-center">No books found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="border rounded-lg p-3 flex flex-col bg-gray-50 shadow hover:shadow-lg transition"
                onClick={() => {
                  console.log("Navigating to book:", book._id);
                  navigate(`/book/${book._id}`);
                }}
                >
                  {/* Book Image */}
                  <div className="w-full aspect-[4/3] bg-gray-200 rounded mb-3 overflow-hidden flex items-center justify-center">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-fill"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                  <div className="font-semibold text-lg mb-1">{book.title}</div>
                  <div className="text-gray-700 mb-1">
                    Price: <span className="font-bold">₹{book.price}</span>
                  </div>
                  {/* Add more book details as needed */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;