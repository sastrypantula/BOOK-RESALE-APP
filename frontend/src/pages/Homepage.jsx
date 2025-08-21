// src/pages/Homepage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../authslice";

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold">Welcome {user?.name || "Guest"}!</h1>
      <p className="mt-2">You are now logged in.</p>
      <button
        onClick={handleLogout}
        className="btn btn-error mt-4"
      >
        Logout
      </button>
    </div>
  );
}

export default Homepage;
