import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔄 handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
        await handleRegister(formData);
        navigate("/login");
    }
    catch (error) {
      setError(error?.message || "Registration failed. Please try again.");
    }
    finally {
        setLoading(false);
    }
  };
 return (
  <div className="min-h-screen flex items-center justify-center bg-black px-4 pt-20">

    {/* Card */}
    <div className="w-full max-w-md bg-[#111111] border border-gray-800 shadow-xl rounded-2xl p-6 sm:p-8">

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
        Create Account 🚀
      </h2>
      <p className="text-gray-400 text-center text-sm mb-6">
        Start your DSA journey today
      </p>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-2 rounded mb-4 text-sm text-center">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-700"></div>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-700"></div>
      </div>

      {/* Login redirect */}
      <p className="text-sm text-center text-gray-400">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>

    </div>
  </div>
);
};

export default Register;