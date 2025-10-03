import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from "../apiComponents/api-signUp";
import { FaEye } from 'react-icons/fa';

const Sign_Up = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateSignUpForm = async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const data = await registerUser(firstName, lastName, email, password, confirmPassword);
      console.log(data);
      alert("Registration successful!");
      navigate('/sign-in');
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("There was an issue with your sign-up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-6">Sign Up</h1>

        <form id="sign-up-form" onSubmit={validateSignUpForm} className="space-y-4">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstname" className="mb-1 text-gray-700 font-medium">First Name:</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter your first name"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastname" className="mb-1 text-gray-700 font-medium">Last Name:</label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter your last name"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="mb-1 text-gray-700 font-medium">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              minLength="6"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
            />
            <FaEye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col relative">
            <label htmlFor="confirm-password" className="mb-1 text-gray-700 font-medium">Confirm Password:</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm your password"
              minLength="6"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
            />
            <FaEye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onMouseDown={() => setShowConfirmPassword(true)}
              onMouseUp={() => setShowConfirmPassword(false)}
              onMouseLeave={() => setShowConfirmPassword(false)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect Text */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-green-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sign_Up;
