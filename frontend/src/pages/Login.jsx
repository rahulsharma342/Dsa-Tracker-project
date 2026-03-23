import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
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
    try{
      await handleLogin(formData);
      navigate("/");
    }
    catch (error) {
      setError(error?.message || "Login failed. Please try again.");
    }
    finally {
    setLoading(false);
  };
  };
  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
  //     <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        
  //       {/* Title */}
  //       <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
  //         Welcome Back 👋
  //       </h2>

  //       {/* Error */}
  //       {error && (
  //         <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
  //           {error}
  //         </div>
  //       )}

  //       {/* Form */}
  //       <form onSubmit={handleSubmit} className="space-y-4">
          
  //         {/* Email */}
  //         <div>
  //           <label className="block text-sm font-medium mb-1">
  //             Email
  //           </label>
  //           <input
  //             type="email"
  //             name="email"
  //             placeholder="Enter your email"
  //             value={formData.email}
  //             onChange={handleChange}
  //             required
  //             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
  //           />
  //         </div>

  //         {/* Password */}
  //         <div>
  //           <label className="block text-sm font-medium mb-1">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             name="password"
  //             placeholder="Enter your password"
  //             value={formData.password}
  //             onChange={handleChange}
  //             required
  //             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
  //           />
  //         </div>

  //         {/* Button */}
  //         <button
  //           type="submit"
  //           disabled={loading}
  //           className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
  //         >
  //           {loading ? "Logging in..." : "Login"}
  //         </button>
  //       </form>

  //       {/* Register redirect */}
  //       <p className="text-sm text-center mt-4">
  //         Don’t have an account?{" "}
  //         <span
  //           onClick={() => navigate("/register")}
  //           className="text-blue-600 cursor-pointer"
  //         >
  //           Register
  //         </span>
  //       </p>
  //     </div>
  //   </div>
  // );
return (
  <div className="min-h-screen flex items-center justify-center bg-black px-4 pt-20">

    {/* Card */}
    <div className="w-full max-w-md bg-[#111111] border border-gray-800 shadow-xl rounded-2xl p-9 sm:p-8">

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
        Welcome Back 👋
      </h2>
      <p className="text-gray-400 text-center text-sm mb-6">
        Login to track your DSA progress
      </p>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-2 rounded mb-4 text-sm text-center">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

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
            placeholder="Enter your password"
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-700"></div>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-700"></div>
      </div>

      {/* Register */}
      <p className="text-sm text-center text-gray-400">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Register
        </span>
      </p>

    </div>
  </div>
);

};

export default Login;