import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../apiComponents/api-signIn';
import { FaEye } from 'react-icons/fa';
import { useCart } from '../pageComponents/CartPage/cart-context'; // import your cart context

const Sign_In = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loadCart } = useCart(); // get loadCart function from context

  const validateForm = async (event) => {
    event.preventDefault();

    const userName = document.getElementById('email').value;
    const userPassword = document.getElementById('password').value;

    const result = await signIn(userName, userPassword);

    if (result.success) {
      await loadCart(); // reload cart after login
      navigate('/');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-6">Login</h1>

        <form id="sign-in-form" onSubmit={validateForm} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-700 font-medium">Email:</label>
            <input
              type="email"
              name="email"
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
              name="password"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Redirect Text */}
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account yet?{" "}
          <Link to="/sign-up" className="text-green-600 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 text-green-600 font-medium text-center">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sign_In;
