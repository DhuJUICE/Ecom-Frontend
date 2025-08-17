import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/sign-in.css';
import { signIn } from '../apiComponents/api-signIn';
import { preloadMenuProductData } from '../preLoadMenuData/preloadMenuProducts';
import { removeAccessToken, removeRefreshToken, removeBusinessOwner } from '../tokenManagement/tokenManager';
import { FaEye } from 'react-icons/fa'; // eye icon

const Sign_In = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = async (event) => {
        event.preventDefault();

        removeAccessToken();
        removeRefreshToken();
        removeBusinessOwner();

        const userName = document.getElementById('email').value;
        const userPassword = document.getElementById('password').value;

        const result = await signIn(userName, userPassword);

        if (result.success) {
            await preloadMenuProductData();
            navigate('/menu');
            window.location.reload();
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="sign-in">
            <fieldset>
                <div className="heading">
                    <h1>Login</h1>
                </div>
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
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
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

                    <button type="submit" className="btn-sign-in">Sign In</button>
                </form>

                {/* Redirect text instead of button */}
                <p className="redirect-text">
                    Don’t have an account yet? <Link to="/sign-up">Sign Up</Link>
                </p>

                {successMessage && <div className="success-message">{successMessage}</div>}
            </fieldset>
        </div>
    );
};

export default Sign_In;
