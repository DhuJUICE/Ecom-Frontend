import React, { useState } from 'react';
import '../../styles/sign-up.css';
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
    <main className="sign-up">
      <fieldset>
        <div className="heading">
          <h1>Sign Up</h1>
        </div>

        <form id="sign-up-form" onSubmit={validateSignUpForm}>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" id="firstname" placeholder="Enter your first name" required />

          <label htmlFor="lastname">Last Name:</label>
          <input type="text" id="lastname" placeholder="Enter your last name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              minLength="6"
              required
            />
            <FaEye
              className="eye-icon"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            />
          </div>

          <label htmlFor="confirm-password">Confirm Password:</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm your password"
              minLength="6"
              required
            />
            <FaEye
              className="eye-icon"
              onMouseDown={() => setShowConfirmPassword(true)}
              onMouseUp={() => setShowConfirmPassword(false)}
              onMouseLeave={() => setShowConfirmPassword(false)}
            />
          </div>

          <button type="submit" className="sign-up-button">Sign Up</button>
        </form>

        <p className="redirect-text">
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </p>
      </fieldset>
    </main>
  );
};

export default Sign_Up;
