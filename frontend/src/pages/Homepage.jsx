// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axiosClient from "../utils/axiosClient";

// function Homepage() {
//   const { user } = useSelector((state) => state.auth);
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all books on mount
//   useEffect(() => {
//     async function fetchBooks() {
//       try {
//         const res = await axiosClient.get(`/${user?.role}/books`);
//         console.log("Books API response:", res.data);
// setBooks(res.data.books || []);
//       } catch (err) {
//         setBooks([]);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBooks();
//   }, []);

//   // Dummy placeholders for purchased/sold books
//   // Replace with your actual API calls if you have them
//   const purchasedBooks = books.filter(
//     (book) => user?.role === "buyer" && book.buyerId === user?._id
//   );
//   const soldBooks = books.filter(
//     (book) => user?.role === "seller" && book.sellerId === user?._id
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Nav Bar */}
//       <nav className="flex justify-between items-center bg-white shadow px-8 py-4">
//         <div className="text-2xl font-bold text-purple-700">BookResaleApp</div>
//         <div className="flex gap-6 items-center">
//           {user?.role === "buyer" && (
//             <span className="font-semibold text-blue-600">
//               Purchased Books: {purchasedBooks.length}
//             </span>
//           )}
//           {user?.role === "seller" && (
//             <span className="font-semibold text-green-600">
//               Sold Books: {soldBooks.length}
//             </span>
//           )}
//           <div className="flex items-center gap-2">
//             <span className="font-medium">{user?.name}</span>
//             <img
//               src={`https://ui-avatars.com/api/?name=${user?.name || "User"}`}
//               alt="profile"
//               className="w-8 h-8 rounded-full"
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Profile Section */}
//       <div className="max-w-4xl mx-auto mt-8 flex flex-col md:flex-row gap-8">
//         <div className="bg-white rounded-lg shadow p-6 w-full md:w-1/3">
//           <h3 className="text-lg font-bold mb-2">Profile</h3>
//           <p>
//             <span className="font-semibold">Name:</span> {user?.name}
//           </p>
//           <p>
//             <span className="font-semibold">Email:</span> {user?.email}
//           </p>
//           <p>
//             <span className="font-semibold">Role:</span> {user?.role}
//           </p>
//         </div>

//         {/* Books Section */}
//         <div className="bg-white rounded-lg shadow p-6 w-full md:w-2/3">
//           <h3 className="text-lg font-bold mb-4">All Books</h3>
//           {loading ? (
//             <p>Loading books...</p>
//           ) : books.length === 0 ? (
//             <p>No books found.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// {books.map((book) => (
//   <div
//     key={book._id}
//     className="border rounded p-4 flex flex-col gap-2 bg-gray-50 shadow hover:shadow-lg transition"
//   >
//     {/* Book Image */}
//     {book.images ? (
//       <img
//         src={book.images}
//         alt={book.title}
//         className="w-full h-40 object-cover rounded mb-2"
//       />
//     ) : (
//       <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-2 text-gray-400">
//         No Image
//       </div>
//     )}

//     <div className="font-semibold text-lg">{book.title}</div>
//     <div className="text-gray-700">Price: <span className="font-bold">₹{book.sellingPrice}</span></div>
//     {/* Add more book details as needed */}
//   </div>
// ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Homepage;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";

function Homepage() {
  const { user } = useSelector((state) => state.auth);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await axiosClient.get(`/${user?.role}/books`);
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
                >
                  {/* Book Image */}
                  <div className="w-full aspect-[4/3] bg-gray-200 rounded mb-3 overflow-hidden flex items-center justify-center">
                    {book.images ? (
                      <img
                        src={book.images}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                  <div className="font-semibold text-lg mb-1">{book.title}</div>
                  <div className="text-gray-700 mb-1">
                    Price: <span className="font-bold">₹{book.sellingPrice}</span>
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