// api-signUp.js
import { API_URL } from "./api-base-url";

export const registerUser = async (firstName, lastName, email, password, confirmPassword) => {
  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }),
    });

    const data = await response.json();
    return data; // You can return the data from the API or handle accordingly
  } catch (error) {
    console.error('Error during registration:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};
