import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/sign-in.css';
import { signIn } from '../apiComponents/api-signIn';
import { preloadMenuData } from '../preLoadMenuData/preloadMenu'; // 🔁 Reuse preload logic

const Sign_In = () => {
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validateForm = async (event) => {
    event.preventDefault();

    const userName = document.getElementById('email').value;
    const userPassword = document.getElementById('password').value;

    const result = await signIn(userName, userPassword);

    if (result.success) {
      alert('Sign-in successful! Welcome back.');

      // ⏳ Preload products before navigating
      await preloadMenuData();

      // ✅ Go to the menu page
      navigate('/menu');
    } else {
      alert(result.message); // Show error if failed
    }
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  };

  return (
    <div>
      <main className="sign-in">
        <div className="heading">
          <h1>Login</h1>
        </div>
        <fieldset>
          <form id="sign-in-form" onSubmit={validateForm}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              minLength="6"
              required
            />

            <div className="show-password">
              <input
                type="checkbox"
                id="show-password"
                onClick={togglePasswordVisibility}
              />
              <label htmlFor="show-password">Show Password</label>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </fieldset>

        {successMessage && <div className="success-message">{successMessage}</div>}
      </main>
    </div>
  );
};

export default Sign_In;
