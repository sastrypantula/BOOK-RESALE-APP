
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../authslice";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector((state) => state.auth);

     const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  // If user logged in → go to homepage
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
 {/* Role selection */}
          <select
  name="role"
  value={form.role}
  onChange={handleChange}
  required
>
  <option value="buyer">Buyer</option>
  <option value="seller">Seller</option>
</select>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
// function Signup() {
//   return (
//     <div>
//       Signup Page
//     </div>
//   );
// }

// export default Signup;