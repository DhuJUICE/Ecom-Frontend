import { API_URL } from "./api-base-url"; // Import the API base URL
import { setAccessToken, setRefreshToken, setBusinessOwner} from '../tokenManagement/tokenManager'; // Import token manager functions
import { fetchUserRole } from './api-user';

// Function to handle the sign-in API call
export const signIn = async (userName, userPassword) => {
  try {
    const response = await fetch(`${API_URL}/api/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, password: userPassword }),
    });

    const data = await response.json();

    if (data.access) {
      // Use token manager to store tokens
      setAccessToken(data.access); // Save access token with expiry time
      setRefreshToken(data.refresh); // Save refresh token without expiry time (optional)
	  setBusinessOwner(data.is_staff); //save the is_staff to indicate business owner for role based access control

	  //fetch the user role
	  const role = await fetchUserRole(data.user_id);
	  if (role) {
		localStorage.setItem("role", role);
	  } else {
		alert("Could not retrieve user role");
	  }

      return { success: true };
    } else {
      return { success: false, message: 'Login failed. Please check your credentials.' };
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
